import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import './plugins/element.js';
import states from './config/state';
import routes from './config/routes';

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueRouter);

let router = new VueRouter({
    routes
});

let store = new Vuex.Store(states);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');

