import * as VueRouter from 'vue-router';
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import ProductList from './components/ProductList.vue'

const routes = [
    { path: '/sign-up', component: SignUp },
    { path: '/sign-in', component: SignIn },
    { path: '/devices', component: ProductList }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router