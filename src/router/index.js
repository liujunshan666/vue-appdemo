import Vue from 'vue'
import VueRouter from 'vue-router'
import  Goods from'@/pages/modules/Goods.vue'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: ()=> import('@/pages/modules/Evaluate.vue')
  },
  {
    path: '/business',
    name: 'business',
    component: ()=> import('@/pages/modules/Business.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
