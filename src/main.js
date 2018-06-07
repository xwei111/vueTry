// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(ElementUI);

import echarts from 'echarts';

Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false

// import {updateData,addData,searchData,deleteData} from './indexedDB'
// var data1={
// 	name:'zy',
// 	sex:1,
//   age:18,
// }
// addData()
// updateData(data1)
// searchData()
// deleteData(1)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
