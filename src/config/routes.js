
import login from '@/pages/login/login';
import race from '@/pages/race/race';
import agent from '@/pages/agent/agent';
import statistics from '@/pages/statistics/statistics';
export default [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/race',
        name: 'race',
        alias: '/',
        component: race
    },
    {
        path: '/agent',
        name: 'agent',
        component: agent
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: statistics
    }
];