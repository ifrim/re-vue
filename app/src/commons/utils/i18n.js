import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '../../i18n/index.js';
import { DEFAULT_LOCALE } from '../../state/static-data.js';

Vue.use(VueI18n);

export default new VueI18n({
  locale: DEFAULT_LOCALE,
  messages
});
