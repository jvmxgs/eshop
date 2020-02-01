import Admin from '../../views/admin/Admin'

export default [{
                    path: '/admin',
                    name: 'admin',
                    component: Admin,
                    meta: {
                        requiresAuth: true,
                        requiresAdmin: true,
                    }
                }]
