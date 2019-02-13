import Vue from 'vue';

Vue.filter('date', value => new Date(value).toDateString());
