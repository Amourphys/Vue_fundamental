import Main from '@/Pages/Main';
import { createRouter, createWebHistory } from 'vue-router';
import UserPage from '@/Pages/UserPage';
import About from '@/Pages/About';
import PostIdPage from '@/Pages/PostIdPage';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: UserPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;