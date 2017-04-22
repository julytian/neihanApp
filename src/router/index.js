import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Home = resolve => {
  require.ensure(['../views/home.vue'], () => {
    resolve(require('../views/home.vue'));
  });
};
const List = resolve => {
  require.ensure(['../views/list.vue'], () => {
    resolve(require('../views/list.vue'));
  });
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/list',
      name: 'list',
      component: List
    }, {
      path: '*',
      component: Home
    }
  ]
})
