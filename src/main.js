import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import ViewUI from 'view-design'
import 'iview/dist/styles/iview.css'
//引入vuex状态机组件
import store from './store'

//注册到全局
Vue.use(ViewUI,);
Vue.use(VueRouter);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
