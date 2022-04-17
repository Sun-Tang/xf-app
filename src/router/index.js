import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [{
    path: "/home",
    name: "Home",
    meta: {
      //路由元信息
      isshow: true,
      // 需要缓存
      keepAlive: true,
    },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/my",
    name: "My",
    meta: {
      //路由元信息
      isshow: true,
    },
    component: () => import("../views/My.vue"),
  },
  {
    path: "/list",
    name: "List",
    meta: {
      //路由元信息
      isshow: true,
    },
    component: () => import("../views/List.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {
      //路由元信息
      isshow: true,
    },
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // query参数注册成为组件实例属性
    props: route => ({
      needback: route.query.needback
    }),
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/myaddress',
    name: 'MyAddress',
    component: () => import('../views/MyAddress.vue')
  }, {
    path: '/myorder',
    name: 'MyOrder',
    component: () => import('../views/MyOrder.vue')
  }, {
    path: '/addaddress',
    name: 'AddAddress',
    component: () => import('../views/AddAddress.vue')
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes,
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 开启loading
  store.state.isLoading = true;
  next();
});
// 全局后置守卫
router.afterEach((to, from) => {
  // 关闭loading
  store.state.isLoading = false;
});
export default router;