import Vue from 'vue';

Vue.filter('date', (value, locale) => new Date(value).toDateString(locale));
