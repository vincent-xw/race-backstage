import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import './plugins/element.js';
import states from './config/state';
import routes from './config/routes';
import axios from 'axios';
import qs from 'qs';
import axiosConfig from './config/axios';
import mock from './mock/mock.config.js';
// 加载mock功能,此功能在正式环境不会使用届时会移除
// mock.init();

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
let router = new VueRouter({
    routes
});

let store = new Vuex.Store(states);

axiosConfig();

let vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');

