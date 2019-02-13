import Vue from 'vue';
import Router from 'vue-router';
import Home from './home/home.vue';
import app from './state/app.js';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      props: { app }
    },
    {
      path: '/create',
      component: () => import(/* webpackChunkName: "events-create" */ './create/create.vue'),
      props: { app }
    }
  ]
});
