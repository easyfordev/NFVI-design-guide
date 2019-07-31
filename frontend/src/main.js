import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import store from './store'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(VueGoodTablePlugin);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
