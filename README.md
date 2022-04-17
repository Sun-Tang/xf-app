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

```js
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

```js
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

#### tabbar 配置

utils/vant.js  引入需要的组件

```js
import Vue from 'vue'
import { Button, Icon, Tabbar, TabbarItem } from 'vant'

Vue.use(Button)
    .use(Icon)
    .use(Tabbar)
    .use(TabbarItem)
```

创建公共组件 Footer.vue

```vue
<template>
    <div class="footer">
        <van-tabbar v-model="active" active-color="#1FAEAE" inactive-color="#000000">
            <van-tabbar-item icon="home-o" to="/home">
                首页
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/list">
                分类
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/cart">
                购物车
            </van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/my">
                我的
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

```vue
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

#### tabbar导航页面显示控制

router/index.js

```js
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
```

### 封装api

#### 配置跨域：vue.config.js

```js
module.exports={
	devServer:{
		//proxy:"http://backend-api-01.newbee.ltd"//支配配置一个跨域
		proxy:{
			"/api":{
				target:"http://backend-api-01.newbee.ltd"
			}
		}
	}
}
```

#### api/http.js

```js
import axios from "axios";
import {Notify} from "vant";
import router from '../router/index.js';

axios.defaults.baseURL =process.env.NODE_ENV == 'production' ? 'http://backend-api-01.newbee.ltd/api/v1' : '/api/v1';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	let token=localStorage.getItem("xfdata");
	if(token){
		config.headers.token=token;
	}
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
	if(+response.data.resultCode!=200){
		//取消掉详情页面的重复弹框
		if(response.data.message.includes("已存在")){
			return response.data;
		}
		
		Notify({ type: 'danger', message: response.data.message||"系统繁忙" });
		if(+response.data.resultCode==416){//跳转到 登录页面，去登录
			router.push("/login?needback=true");
		}
	}
	return response.data;
}, reason => {
    console.log('当前网络繁忙，请您稍后再试~');
    return Promise.reject(reason);
});

export default axios;
```

#### api/index.js

```js
import http from "./http";

export function test() {
    return http.post('/shop-cart')
  }
```

### 注册、登录功能页面

#### html结构

```html
<template>
    <div class="login">
        <!-- nav bar -->
      	<!-- 
					+ click-left事件：点击nav bar左箭头，返回上一个页面
					+ <template #right>插槽，自定义nav bar右侧内容
				-->
        <van-nav-bar :title="isLogin?'登录':'注册'"
                     left-arrow
                     @click-left="$router.back()">
            <template #right>
                <van-popover v-model="showPopover"
                             trigger="click"
                             :actions="actions"
                             placement="bottom-end">
                    <template #reference>
                        <van-icon name="ellipsis" />
                    </template>
                </van-popover>
            </template>
        </van-nav-bar>
        <!-- 登录区 -->
        <div class="logo">
            <img src="../assets/mlogo.png"
                 alt="">
        </div>
        <!-- form表单 -->
        <van-form validate-first
                  @submit="onSubmit">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field v-model="userName"
                       label="用户名"
                       name="userName"
                       placeholder="请输入用户名"
                       :rules="rules.userName" />
            <van-field v-model="pwd"
                       label="密码"
                       name="pwd"
                       type="password"
                       placeholder="请输入密码"
                       :rules="rules.pwd" />
            <template>
          <!-- 
            + Verify组件，是为了实现验证码校验的功能
						+ 校验成功，触发@success事件
						+ 校验失败，触发@error事件
         	-->
                <Verify @success="alert('success')"
                        @error="alert('error')"
                        :type="2"
                        :figure="10"
                        fontSize="26px"
                        :showButton="false"
                        ref="verify"></Verify>
            </template>
         <!-- 
            + 点击切换注册/登录功能
         	-->
            <p class="mytext"
               @click="changeLogin">{{isLogin?'立即注册':'已有账号，立即登录'}}</p>
         <!-- 
            + 提交表单
         	-->
            <div style="margin: 16px;">
                <van-button round
                            block
                            type="info"
                            native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
```

#### script代码

```javascript
<script>
  //引入Verify，实现验证码校验功能
    import Verify from "vue2-verify";
    export default {
        name: "Login",
        components: {
            Verify,
        },
      //此属性接收的是路由的query参数，
      // + 若存在，则注册/登录成功后，返回上一页
      // + 若不存在，则注册/登录成功后，跳转到首页
        props: ["needback"],
        data() {
            return {
                /* 表单相关 */
                userName: "",
                pwd: "",
              //表单校验规则
                rules: {
                    userName: [
                        {
                            message: "用户名必输",
                            required: true,
                            trigger: "onBlur",
                        },
                    ],
                    pwd: [
                        {
                            pattern: /\d{2,6}/,
                            message: "密码必须为2至6为数字",
                            required: true,
                            trigger: "onBlur",
                        },
                    ],
                },
                /* 导航条右侧的“...” */
                showPopover: false,
                // 导航条右侧的“...”,点击后显示的内容
                actions: [
                    { text: "你是谁", icon: "add-o" },
                    { text: "你吃了么", icon: "music-o" },
                    { text: "你想干啥", icon: "more-o" },
                ],
                /* 登录/注册标识 */
                isLogin: true,
                /* 验证码校验 */
                resultCode: false,
            };
        },
        methods: {
          //验证码校验成功/失败后，执行的方法
            alert(text) {
                if (text === "success") {
                    this.resultCode = true;
                } else {
                    this.resultCode = false;
                }
            },
          //切换注册/登录功能，切换的同时，并清空表单和验证码的已输入内容
            changeLogin() {
                this.userName = "";
                this.pwd = "";
                this.$refs.verify.refresh();
                this.isLogin = !this.isLogin;
            },
          //提交表单执行的方法
            async onSubmit(formData) {
                // 验证码校验
                this.$refs.verify.checkCode();
                //验证通过
                if (this.resultCode) {
                    let { userName, pwd } = formData;
                    try {
                        if (this.isLogin) {
                            // 登录功能
                            let { resultCode, data } = await this.$api.login(
                                userName,
                                pwd
                            );
                            // 登录失败
                            if (+resultCode !== 200) {
                                return;
                            }
                            /* 登录成功 */
                            // 存储token
                            localStorage.setItem("xfdata", data);
                            this.$notify({
                                type: "success",
                                message: "登录成功",
                            });
                            // 需要返回上一页
                            if (this.needback) {
                                this.$router.back();
                            } else {
                                this.$router.push("/home");
                            }
                        } else {
                            // 注册功能
                            let { resultCode, message } = await this.$api.register(
                                userName,
                                pwd
                            );
                            // 注册失败
                            if (+resultCode !== 200) {
                                this.$notify({
                                    type: "danger",
                                    message,
                                });
                                return;
                            }
                            // 注册成功
                            this.$notify({
                                type: "success",
                                message: "注册成功, 请重新登录",
                            });
                            // 刷新验证码
                            this.$refs.verify.refresh();
                            // 切换到登录模式
                            this.isLogin = !this.isLogin;
                            // 返回上一页
                            // this.$router.back();
                        }
                    } catch (_) {
                        console.log("", _);
                        return;
                    }
                } else {
                    this.$toast("验证码错误, 请重新输入");
                    this.$refs.verify.refresh();
                }
            },
        },
    };
</script>
```

#### css样式

```css
<style lang="less" scoped>
    .login {
        // 标题样式
        /deep/ .van-nav-bar__title {
            font-weight: normal;
        }
        // logo 样式
        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            img {
                width: 120px;
                height: 120px;
            }
        }
        // 表单样式
        /deep/ .van-cell__title {
            text-align: center;
        }
        // 验证码样式
        /deep/ .cerify-code-panel {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 30px;
            margin-top: 10px;
            .verify-code {
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex: 2;
                height: 29px !important;
                line-height: 29px !important;
                margin-bottom: 0;
            }
            .verify-code-area {
                display: flex;
                flex: 3;
                margin-left: 10px;
                .verify-input-area {
                    flex: 2;
                }
                .verify-change-area {
                    flex: 1;
                    margin: 0 20px 0 10px;
                    text-align: center;
                    background-color: skyblue;
                    border-radius: 5px;
                }
            }
        }
        // 切换登录/注册
        .mytext {
            display: flex;
            align-items: center;
            padding: 0 30px;
            height: 30px;
            font-size: 16px;
            color: red;
            font-weight: 300;
            text-decoration: underline;
        }
    }
</style>
```

### 首页页面

#### html结构

```html
<template>
    <div class="home">
     <!-- 
				头部区域
					+ scroll类，控制页面滚动到指定的位置时，头部区域的背景色和字体颜色发生改变
			-->
        <div class="hd_wrap"
             :class="{scroll:flag}">
            <i class="iconfont icon-caidan"
               @click="$router.push('/list')"></i>
            <div class="hd_search">
                <span class="hd_title">新蜂商城</span>
                <span class="hd_input">快 乐 就 是 买 买 买~</span>
            </div>
            <span class="login"
                  v-if="!isLogin"
                  @click="$router.push('/login')">登录</span>
            <van-icon v-else
                      name="user-circle-o"
                      @click="$router.push('/my')" />
        </div>
        <div class="con_wrap"
             ref="con">
            <!-- 轮播图 -->
            <div class="swiper_wrap">
                <van-swipe :autoplay="3000"
                           indicator-color="#52aaad">
                    <van-swipe-item v-for="(image, index) in carousels"
                                    :key="index">
                        <a :href="image.redirectUrl">
                          <!-- v-lazy指令，实现图片懒加载 -->
                            <img v-lazy="image.carouselUrl" />
                        </a>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 导航区 -->
            <div class="nav_bar">
                <van-grid :border="false"
                          :column-num="5">
                    <van-grid-item v-for="(item, index) in navData"
                                   :key="index">
                        <img :src="item.url">
                        <p>{{item.category}}</p>
                    </van-grid-item>
                </van-grid>
            </div>
          <!-- 循环渲染商品展示区 -->
            <div class="goods_wrap">
                <div v-for="(item, index) in goods"
                     :key="index">
                    <h2 class="goods_title">{{item.title}}</h2>
                    <div class="goods_list">
                        <div class="goods_item"
                             v-for="(item1, index1) in item.subGoods"
                             :key="index1"
                             @click="gotoDetail(item1.goodsId)">
                            <img v-lazy="item1.goodsCoverImg">
                        <p class="goods_name van-multi-ellipsis--l2">{{item1.goodsName}}</p>
                            <p class="sellingPrice">￥&nbsp;{{item1.sellingPrice}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
```

#### script代码

```javascript
<script>
    export default {
        name: "home",
        data() {
            return {
                // 是否登录标识，true-->登录
                isLogin: false,
                //此标识控制，当页面滚动到一定位置时，动态添加类名，使头部背景色改变
                flag: false,
                // 轮播图
                carousels: [],
                // navbar数据
                //由于未提供接口获取该部分的数据。因此手动书写
                navData: [
                    {
                        category: "新蜂超市",
                        // 动态渲染图片，必须用require,因为要求是绝对路径
                        url: require("../assets/navImg/1.png"),
                    },
                    {
                        category: "新蜂服饰",
                        url: require("../assets/navImg/2.png"),
                    },
                    {
                        category: "全球购",
                        url: require("../assets/navImg/3.png"),
                    },
                    {
                        category: "新蜂生鲜",
                        url: require("../assets/navImg/4.png"),
                    },
                    {
                        category: "新蜂到家",
                        url: require("../assets/navImg/5.png"),
                    },
                    {
                        category: "充值缴费",
                        url: require("../assets/navImg/6.png"),
                    },
                    {
                        category: "9.9元拼",
                        url: require("../assets/navImg/7.png"),
                    },
                    {
                        category: "领券",
                        url: require("../assets/navImg/8.png"),
                    },
                    {
                        category: "省钱",
                        url: require("../assets/navImg/9.png"),
                    },
                    {
                        category: "全部",
                        url: require("../assets/navImg/10.png"),
                    },
                ],
                // 展示商品
                goods: [
                    {
                        //新品上线
                        title: "新品上线",
                        subGoods: [],
                    },
                    {
                        // 热门商品
                        title: "热门商品",
                        subGoods: [],
                    },
                    {
                        // 为你推荐
                        title: "为你推荐",
                        subGoods: [],
                    },
                ],
            };
        },
        methods: {
            // 当内容区(即class="con_wrap"所包含的区域)滚动超过150像素，通过修改flag的值，
            // 动态添加类名，是头部区域背景色及字体颜色发生改变
            showScroll() {
                if (this.$refs.con.scrollTop > 150) {
                    this.flag = true;
                } else {
                    this.flag = false;
                }
            },
            // 获取首页信息
            async getIndexInfo() {
                try {
                    let {
                        resultCode,
                        data: {
                            carousels,
                            hotGoodses,
                            newGoodses,
                            recommendGoodses,
                        },
                    } = await this.$api.getIndexInfo();
                    if (+resultCode !== 200) {
                        return;
                    }
                  //Object.freeze 使无需修改的数据不做响应式处理，提升性能
                    this.carousels = Object.freeze(carousels);
                    this.goods[0].subGoods = Object.freeze(newGoodses);
                    this.goods[1].subGoods = Object.freeze(hotGoodses);
                    this.goods[2].subGoods = Object.freeze(recommendGoodses);
                } catch (_) {
                    console.log("home组件请求后台失败了", _);
                }
            },
            // 跳转到详情页
            gotoDetail(goodsId) {
                this.$router.push("/detail?goodsId=" + goodsId);
            },
            whetherLogin() {
                // 判断用户是否登录，若获取不到token，说明没登录
              	// + 若登录，头部区域右侧，显示“头像”，点击可跳转到"我的"页面
              	// + 若未登录，头部区域右侧，显示"登录"，点击可跳转到"注册/登录"页面
                let tk = localStorage.getItem("xfdata");
                if (tk) this.isLogin = true;
            },
        },
        created() {
            this.getIndexInfo();
            this.whetherLogin();
        },
        mounted() {
            // 添加监听页面滚动位置
            this.$refs.con.addEventListener("scroll", this.showScroll);
        },
        beforeDestroy() {
            // 移除监听
            this.$refs.con.removeEventListener("scroll", this.showScroll);
        },
        //首页做了缓存，所以使用此钩子
        activated() {
            // 首页再次被激活时，重新判断下用户是否登录
            this.whetherLogin();
        },
        //在页面离开时记录滚动位置
        beforeRouteLeave(to, from, next) {
            this.top = this.$refs.con.scrollTop;
            next();
        },
        //进入该页面时，用之前保存的滚动位置赋值，恢复到该页面跳转之前的位置
        beforeRouteEnter(to, from, next) {
            next((vm) => {
              //必须使用$nextTick，否则$refs.con.scrollTop始终为0
                vm.$nextTick(() => {
                    vm.$refs.con.scrollTop = vm.top;
                });
            });
        },
    };
</script>
```

#### css样式

```css
<style lang="less" scoped>
    // 引入自定义图标，图标使用的是阿里字体图标库
		//链接：https://at.alicdn.com/t/font_3332890_cfy0om7gx1a.css?  spm=a313x.7781069.1998910419.51&file=font_3332890_cfy0om7gx1a.css
    @import "../assets/myicon.less";
    // 主题颜色
    @themeColor: #52aaad;
    .home {
        background-color: #f9f9f9;
        height: calc(100vh - 110px);
        // 头部区域
        .hd_wrap {
            box-sizing: border-box;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            height: 60px;
            color: @themeColor;
            font-size: 20px;
            transition: all 0.3s;
            .icon-caidan {
                flex: 1;
                text-align: center;
            }
            // 搜索
            .hd_search {
                flex: 8;
                position: relative;
                height: 40px;
                margin: 0 10px 0 5px;
                background-color: #cbe5e7;
                border-radius: 30px;
                .hd_title {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    &::after {
                        content: "";
                        position: absolute;
                        right: -12px;
                        top: 50%;
                        transform: translateY(-50%);
                        height: 20px;
                        border-right: 2px solid #666;
                    }
                }
                .hd_input {
                    position: absolute;
                    left: 110px;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    color: rgb(120, 109, 109);
                }
            }
            .login {
                flex: 1;
                font-size: 16px;
                text-align: center;
            }
        }
        // 下滑，变更头部区域背景色和文字颜色
        .scroll {
            background-color: #52abad;
            .icon-caidan,
            .login {
                color: #fff;
            }
        }
        // 内容区域
        .con_wrap {
            height: 100%;
            overflow-y: auto;
            // 轮播图
            .swiper_wrap {
                .van-swipe {
                    height: 168px;
                    .van-swipe__track {
                        width: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            // 导航
            .nav_bar {
                .van-grid-item {
                    /deep/ .van-grid-item__content {
                        padding-bottom: 0;
                        img {
                            width: 40px;
                            height: 40px;
                        }
                    }
                }
            }
            // 商品展示
            .goods_wrap {
                .goods_title {
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    color: @themeColor;
                }
                .goods_list {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    .goods_item {
                        width: 44%;
                        margin: 0 2px 2px 0;
                        padding: 0.26667rem 0.26667rem;
                        height: 200px;
                        text-align: center;
                        background-color: #fff;
                        img {
                            width: 120px;
                            height: 120px;
                        }
                        .goods_name {
                            font-size: 13px;
                            color: rgb(71, 68, 68);
                        }
                        .sellingPrice {
                            color: @themeColor;
                            font-size: 13px;
                        }
                    }
                }
            }
        }
    }
</style>
```

