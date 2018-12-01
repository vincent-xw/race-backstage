import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './plugins/element.js';
import routes from './config/routes';

Vue.config.productionTip = false;
Vue.use(VueRouter);

let router = new VueRouter({
    routes
});
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
