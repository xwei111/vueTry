import Vue from 'vue'
import Router from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../store'

import {leftMenu} from 'assets/js/config';

Vue.use(Router)

const routes= [{
            path: '/',
            name: 'Home',
            component: resolve => require(['components/home/Home'], resolve)
          },
          {
            path: '/main',
            name: 'Main',
            redirect:'/main/vipmanage/situation',
            component: resolve => require(['components/main/Main'], resolve),
            children:leftMenuF(leftMenu)
          }
        ]

const router =new Router({
  routes,
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to,from,next)=>{

  NProgress.done().start()//浏览器进度

  let toName = to.name;
  let fromName = from.name;
  let token = sessionStorage.getItem('token');

  if(!token&&toName!=='Home'){
      next({
        name:'Home'
      })
  }else{
      if(token&&!fromName){
        store.commit('SET_USERINFO',{token:token});
        if(toName=='Home'){
            next({
              name:'Main'
            })
            return;
        }else{
            next();
          return;
        }
      }

      next()
  }
})

router.afterEach(route => {
  NProgress.done()
})


function leftMenuF(leftMenu) {
  let ary=[];
  let leftData=[];
  for(let value in leftMenu){
    ary=[...ary,...leftMenu[value]]
  }

  for(let v of ary){
    if(v.child){
      leftData=[...leftData,...v.child]
    }else{
      leftData=[...leftData,v]
    }
  }

  return leftData
}

// Vue.nextTick()
//     .then(function () {
//       alert('a')
//     })

export default router;
