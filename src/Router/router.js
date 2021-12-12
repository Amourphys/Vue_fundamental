import Main from '@/Pages/Main';
import { createRouter, createWebHistory } from 'vue-router';
import UserPage from '@/Pages/UserPage';
import About from '@/Pages/About';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/users',
        component: UserPage
    },
    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;