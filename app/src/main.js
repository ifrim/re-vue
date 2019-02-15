import Vue from 'vue';
import store from './state/app.js';
import App from './app.vue';
import router from './router';
import './commons/filters/date.js';
import './commons/styles/buttons.less';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
