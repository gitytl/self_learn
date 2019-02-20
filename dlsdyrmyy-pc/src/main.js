// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'

/*去除html标签*/
Vue.filter("word_lable",function(value){
  if(value){
    value=value.replace(/<[^>]+>/g,"");
    return value;
  }
});
/*限制字数*/
Vue.filter("word_len",function(value,start,end){
  if(value&&value.length>end){
    return value.slice(start,end)+"...";
  }else {
    return value;
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
