import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import ProductDetails from './components/productdetails'
import Home from './components/Home'
export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/products/:id', component: ProductDetails },
    { path: '/', component: Home },
  ]
})
