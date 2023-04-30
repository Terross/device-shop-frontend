import * as VueRouter from 'vue-router';
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import ProductList from './components/ProductList.vue'
import ComparisonDevice from './components/ComparisonDevice.vue'
import UserOrder from './components/UserOrder.vue'
import UserProfile from './components/UserProfile.vue'
import AdminPanel from './components/AdminPanel.vue'

const routes = [
    { path: '/sign-up', component: SignUp },
    { path: '/sign-in', component: SignIn },
    { path: '/devices', component: ProductList },
    { path: '/comparison', component: ComparisonDevice },
    { path: '/order', component: UserOrder },
    { path: '/profile', component: UserProfile },
    { path: '/admin', component: AdminPanel }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router