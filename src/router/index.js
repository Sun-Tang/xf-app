import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta:{//路由元信息
      isshow:true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta:{//路由元信息
      isshow:true
    },
    component: () => import('../views/My.vue')
  },
  {
    path: '/list',
    name: 'List',
    meta:{//路由元信息
      isshow:true
    },
    component: () => import('../views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{//路由元信息
      isshow:true
    },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
