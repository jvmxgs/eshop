<template>
    <v-app-bar app>
        <v-toolbar-title><router-link :to="{ name: 'Index'}">EShop</router-link></v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Iterate menuItems to show menu for each user type -->
        <template v-for="item in menuItems[user.role]">
            <router-link :to="item.link">
                <v-btn text>
                    <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
                </v-btn>
            </router-link>
        </template>

        <!-- If user is logged in, show menu with an option to loggout -->

        <v-menu bottom left v-if="loggedIn">
            <template v-slot:activator="{ on }">
                <v-btn
                icon
                v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-on:click="logout">
                    <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- If not logged in show links to register and login -->

        <router-link :to="{ name: 'register'}">
            <v-btn
            text
            v-if="!loggedIn">
                <v-icon>mdi-account-plus</v-icon> Register
            </v-btn>
        </router-link>

        <router-link :to="{ name: 'login'}">
            <v-btn
            text
            v-if="!loggedIn">
                <v-icon>mdi-login</v-icon> Login
            </v-btn>
        </router-link>

      </v-app-bar>
</template>
<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        props: {
            source: String,
        },
        computed: {
            ...mapState('auth', ['user']),
            ...mapGetters('auth', ['loggedIn', 'isAdmin'])
        },
        data() {
            return {
                menuItems : {
                    admin: [
                        {title: 'Products', icon: 'mdi-package-variant', link: {name :'products'}},
                        {title: 'Users', icon: 'mdi-account-group', link: {name :'users'}}
                    ],
                    user: [
                        {title: 'Cart', icon: 'mdi-cart', link: {name :'cart'}}
                    ]
                }
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("auth/destroyToken").then(response => {
                  this.$router.push({ name: "login" });
                });
            }
        }
    }
</script>
