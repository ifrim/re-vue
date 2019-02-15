import Vue from 'vue';
import Router from 'vue-router';
import Home from './home/home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/create',
      component: () => import(/* webpackChunkName: "events-create" */ './create/create.vue')
    }
  ]
});
