import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//Routes
import publicRoutes from './public'
import commonRoutes from './common'
import adminRoutes from './admin/admin'


//concat all routes
var routes = [...publicRoutes,
            ...commonRoutes,
            ...adminRoutes];

// Router
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes
});

export default router
