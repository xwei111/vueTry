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

  let user = sessionStorage.getItem('user');
  let pass = sessionStorage.getItem('pass');

  let toName = to.name;
  let fromName = from.name;
  let shortname = store.state.userInfo.shortname;

  if(!shortname&&fromName!=='Home'&&toName!=='Home'){
    const userinfoObj={
            user:user,
            pass:pass
          }
          store.dispatch('getUserInfo',userinfoObj)
            .then((data)=>{
              if(data.code=='200'){
                next();
              }
            })
  }else if(!shortname&&toName!=='Home'){
      next({
        name:'Home'
      })
  }else{
      if(shortname&&toName==='Home'){
          sessionStorage.setItem('user','')
          sessionStorage.setItem('pass','')
          store.commit('SET_USERINFO',{});
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

export default router;
