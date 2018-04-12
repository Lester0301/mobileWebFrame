// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import FastClick from 'fastclick'
import VueJsonp from 'vue-jsonp'
import { InfiniteScroll } from 'mint-ui'

Vue.directive('InfiniteScroll', InfiniteScroll);
// 引入自定义的样式文件
import './assets/styles/reset_lp.css'
import './assets/styles/style_cui.css'

FastClick.attach(document.body);
Vue.use(VueJsonp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
