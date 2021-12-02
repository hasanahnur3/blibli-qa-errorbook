import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {ClientTable} from 'vue-tables-2';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies';
// import Axios from 'axios';

Vue.config.productionTip = false
// Axios.defaults.baseURL = "http://172.18.69.96:9200";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(ClientTable, {}, false, 'bootstrap4')
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
