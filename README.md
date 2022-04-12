# Vue项目

### 项目初始化

```
vue create xf-app
```

```
  Please pick a preset: (Use arrow keys)
  Default ([Vue 2] babel, eslint) 
  Default (Vue 3) ([Vue 3] babel, eslint) 
❯ Manually select features 
```

```
? Please pick a preset: Manually select features
? Check the features needed for your project: 
 ◉ Choose Vue version
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
❯◉ CSS Pre-processors
 ◯ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router,
 Vuex, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with (Use arrow 
keys)
❯ 2.x 
  3.x 


```

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router,
 Vuex, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback 
in production) (Y/n)  => n  // 路由历史模式
```

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router,
 Vuex, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback 
in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported 
by default): 
  Sass/SCSS (with dart-sass) 
  Sass/SCSS (with node-sass) 
❯ Less 
  Stylus 
```

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router,
 Vuex, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback 
in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported 
by default): Less
? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files 
  In package.json 
```

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router,
 Vuex, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback 
in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported 
by default): Less
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated confi
g files
? Save this as a preset for future projects? (y/N) => m
```

```
cd xf-app
npm run serve 
// 运行以上两个指令即可运行刚创建的项目
```

### 引入Vant

#### 安装vant

```
npm i vant@latest-v2
```

#### 按需引入

安装插件

```
npm i babel-plugin-import -D
```

配置插件

在.babelrc 或 babel.config.js 中添加配置：

```
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

全局配置

1.创建 utils 文件夹 

2.在 utils 文件夹下创建 vant.js

```
import Vue from 'vue'
import {Button,Icon} from 'vant'

Vue.use(Button).use(Icon)
```

3.main.js中引入

```
import './utils/vant'
```

### 配置基础路由

#### 创建基础 Vue 文件

1. 删除 views 文件夹下面的所有文件

2. 在views文件下创建五个vue文件：

   1. Home.vue
   2. My.vue
   3. Cart.vue
   4. List.vue
   5. Login.vue

   ```vue
   <template>
     <div class="home">
       home
     </div>
   </template>
   
   <script>
   
   export default {
     name: 'Home'
   }
   </script>
   
   ```

#### 配置基础路由

src/router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
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

```

### 移动端 REM 适配

#### 安装插件

```
npm i postcss-pxtorem lib-flexible -D
```

#### PostCSS 示例配置

```
// postcss.config.js  没有的话就创建 postcss.config.js 
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

#### 报错问题处理

```
Syntax Error: Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.
Migration guide for end-users:
https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
```

以上问题是 postcss-pxtorem 版本太高，需要降级，操作以下指令即可

```
npm i postcss-pxtorem@5.1.1 -D
```

#### vue2项目注意重点

main.js 中引入一下语句，不然无法生效

```
import 'lib-flexible/flexible'
```

### 配置 tabbar 导航

utils/vant.js  引入需要的组件

```
import Vue from 'vue'
import { Button, Icon, Tabbar, TabbarItem } from 'vant'

Vue.use(Button)
    .use(Icon)
    .use(Tabbar)
    .use(TabbarItem)
```

创建公共组件 Footer.vue

```
<template>
    <div class="footer">
        <van-tabbar v-model="active" active-color="#1FAEAE" inactive-color="#000000">
            <van-tabbar-item icon="home-o">
                <router-link to="/home">首页</router-link>
            </van-tabbar-item>
            <van-tabbar-item icon="search">
                <router-link to="/list">分类</router-link>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o">
                <router-link to="/cart">购物车</router-link>
            </van-tabbar-item>
            <van-tabbar-item icon="setting-o">
                <router-link to="/my">我的</router-link>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            active: 0,
        };
    }
}
</script>
<style lang="less" scoped>
    @import '../assets/icon.less';
    .footer{
        .van-tabbar-item{
            a{
                color: #000;
            }
            .router-link-active{
                color: #1BAEAE;
            }
        }
    }
</style>

```

App.vue 中使用 Footer组件

```
<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue"
export default {
  name: 'App',
  components:{
    Footer
  }
}
</script>

<style lang="less">

</style>
```

