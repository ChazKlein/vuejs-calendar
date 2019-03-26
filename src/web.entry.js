import Vue from 'vue';
import './style.scss';

import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
// Create prototype to register library as data property
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }});

import App from './components/App.vue';

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store
});