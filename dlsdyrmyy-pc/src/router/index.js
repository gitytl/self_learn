import Vue from 'vue'
import Router from 'vue-router'
import promise from 'es6-promise'
import baseConfig from "../baseConfig";
import Axios from "axios";

import Index from '@/components/Index'
import Other from '@/components/public/Other'
import single from '@/components/Single'
import detail from '@/components/Detail'
import list from '@/components/Lists'

Vue.use(Router)
Vue.use(baseConfig)
let module='';
promise.polyfill();
Vue.prototype.$axios = Axios;
export default new Router({
  linkActiveClass: 'on',
  linkExactActiveClass: 'on',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/:main_nav_name/:main_nav_id',
      name:'main_nav',
      component: Other,
      /*/!*路由指定跳转*!/
      redirect:to=>{
        if (to.path === '/survey/1') {
          return { path: '/survey/1/jianjie/2'}
        }
        if (to.path === '/news/11') {
          return { path: '/news/11/jkyd/108'}
        }
        if (to.path === '/departmentks/19') {
          return { path: '/departmentks/19/clinical/21'}
        }
        if (to.path === '/departmentzj/49') {
          return { path: '/departmentzj/49/clinical/21'}
        }
        if (to.path === '/service/78') {
          return { path: '/service/78/ksdemand/79'}
        }
        if (to.path === '/guide/87') {
          return { path: '/guide/87/zhuyuan/88'}
        }
        if (to.path === '/dqwork/95') {
          return { path: '/dqwork/95/dyhome/96'}
        }
        if (to.path === '/contactus/103') {
          return { path: '/contactus/103/map/104'}
        }
      },*/
      children: [
        {
          path: ':sub_nav_name/:sub_nav_id/:module',
          name:'sub_nav',
          components: {
            single: single,
            detail: detail,
          },
        },
      ]
    },
    /*{ path: '/survey',name:'survey', component: Other,redirect:'/survey/jianjie',
      children: [
        { path: 'jianjie',name:'jianjie', component: Other },/!*医院简介*!/
        { path: 'culture',name:'culture', component: Other },/!*医院文化*!/
        { path: 'structure',name:'structure', component: Other },/!*组织架构*!/
        { path: 'leader',name:'leader', component: Other },/!*领导班子*!/
        { path: 'honor',name:'honor', component: Other },/!*医院荣誉*!/
        { path: 'machine',name:'machine', component: Other },/!*医疗设备*!/
        { path: 'position',name:'position', component: Other },/!*地理位置*!/
        { path: 'relation',name:'relation', component: Other },/!*联系我们*!/
        { path: 'place',name:'place', component: Other },/!*院容院貌*!/
      ]
    },
    /!*新闻公告*!/
    { path: '/news',name:'news', component: Other,
      children: [
        { path: 'jkyd',name:'jkyd', component: Other },/!*健康咨询*!/
        { path: 'zhaopin',name:'zhaopin', component: Other },/!*招聘信息*!/
        { path: 'yynews',name:'yynews', component: Other },/!*医院新闻*!/
        { path: 'hynews',name:'hynews', component: Other },/!*行业新闻*!/
        { path: 'affairs',name:'affairs', component: Other },/!*院务公开*!/
        { path: 'activity',name:'activity', component: Other },/!*公益活动*!/
        { path: 'information',name:'information', component: Other },/!*信息公开*!/
        { path: 'kydynamic',name:'kydynamic', component: Other },/!*科研动态*!/
        { path: 'yydynamic',name:'yydynamic', component: Other },/!*医院动态*!/
      ]
    },
    /!*科室介绍*!/
    { path: '/departmentks',name:'departmentks', component: Other,
      children: [
        { path: 'clinical',name:'clinical', component: Other },/!*临床科室*!/
        { path: 'technology',name:'technology', component: Other },/!*医技科室*!/
        { path: 'logistics',name:'logistics', component: Other },/!*后勤服务中心*!/
        { path: 'important',name:'important', component: Other },/!*云南省省级临床重点专科*!/
      ]
    },
    /!*专家介绍*!/
    { path: '/departmentzj',name:'departmentzj', component: Other,
      children: [
        { path: 'clinical',name:'clinical', component: Other },/!*临床科室*!/
        { path: 'technology',name:'technology', component: Other },/!*医技科室*!/
        { path: 'logistics',name:'logistics', component: Other },/!*后勤服务中心*!/
        { path: 'important',name:'important', component: Other },/!*云南省省级临床重点专科*!/
      ]
    },
    /!*医疗服务*!/
    { path: '/service',name:'service', component: Other,
      children: [
        { path: 'ksdemand',name:'ksdemand', component: Other },/!*科室查询*!/
        { path: 'ysdemand',name:'ysdemand', component: Other },/!*医师查询*!/
        { path: 'pbdemand',name:'pbdemand', component: Other },/!*排班查询*!/
        { path: 'register',name:'register', component: Other },/!*预约挂号*!/
        { path: 'square',name:'square', component: Other },/!*诊间结算*!/
        { path: 'bgdemand',name:'bgdemand', component: Other },/!*报告查询*!/
        { path: 'zddemand',name:'zddemand', component: Other },/!*已缴费查询*!/
        { path: 'toPayCost',name:'toPayCost', component: Other },/!*待缴费查询*!/
        { path: 'jgdemand',name:'jgdemand', component: Other },/!*药品价格查询*!/
      ]
    },
    /!*就诊指引*!/
    { path: '/guide',name:'guide', component: Other,
      children: [
        { path: 'zhuyuan',name:'zhuyuan', component: Other },/!*住院指南*!/
        { path: 'menzhen',name:'menzhen', component: Other },/!*门诊指南*!/
        { path: 'louyu',name:'louyu', component: Other },/!*楼宇分布*!/
        { path: 'liucheng',name:'liucheng', component: Other },/!*服务流程*!/
        { path: 'kstelephone',name:'kstelephone', component: Other },/!*科室电话*!/
        { path: 'jiaotong',name:'jiaotong', component: Other },/!*来院交通*!/
        { path: 'environment',name:'environment', component: Other },/!*院内环境*!/
      ]
    },
    /!*党风廉政*!/
    { path: '/dqwork',name:'dqwork', component: Other,
      children: [
        { path: 'dyhome',name:'dyhome', component: Other },/!*党员之家*!/
        { path: 'workgroup',name:'workgroup', component: Other },/!*工作工会*!/
        { path: 'zgactivity',name:'zgactivity', component: Other },/!*职工活动*!/
      ]
    },
    /!*联系我们*!/
    { path: '/contactus',name:'contactus', component: Other,
      children: [
        { path: 'map',name:'map', component: Other },/!*电子地图*!/
        { path: 'yzemail',name:'yzemail', component: Other },/!*院长信箱*!/
        { path: 'diaocha',name:'diaocha', component: Other },/!*满意度调查*!/
        { path: 'tousu',name:'tousu', component: Other },/!*投诉建议*!/
      ]
    },*/
  ]
})
