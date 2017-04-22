// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource';
// import FastClick from 'fastclick';
import VuePreview from 'vue-preview';

Vue.use(VueResource);
Vue.use(VuePreview);

// FastClick.attach(document.body);
Vue.config.productionTip = false;

new Vue({router}).$mount('#app');
