
import login from '@/pages/login/login';
import race from '@/pages/race/race';
import agent from '@/pages/agent/agent';
import statistics from '@/pages/statistics/statistics';
export default [
    {
        path: '/login',
        component: login
    },
    {
        path: '/index',
        alias: '/',
        component: race
    },
    {
        path: '/agent',
        component: agent
    },
    {
        path: '/statistics',
        component: statistics
    }
];