import Vue from 'vue';
import VueMaterial from 'vue-material';
import i18n from './commons/utils/i18n.js';
import store from './state/app.js';
import App from './app.vue';
import router from './router';
import './commons/filters/date.js';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import './commons/styles/buttons.less';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.material.locale.dateFormat = 'DD/MM/YYYY';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
