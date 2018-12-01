
import login from '@/pages/login/login';
import race from '@/pages/race/race';
import raceDetail from '@/pages/raceDetail/raceDetail';
import agent from '@/pages/agent/agent';
import league from '@/pages/league/league';
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
        path: '/race/:detailId',
        name: 'raceDetail',
        component: raceDetail
    },
    {
        path: '/agent',
        name: 'agent',
        component: agent
    },
    {
        path: '/league',
        name: 'league',
        component: league
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: statistics
    }
];