<template>
    <div class="footer">
        <van-tabbar v-model="active"
                    active-color="#1FAEAE"
                    inactive-color="#000000">
            <van-tabbar-item icon="home-o"
                             to="/home">
                首页
            </van-tabbar-item>
            <van-tabbar-item icon="search"
                             to="/list">
                分类
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o"
                             to="/cart">
                购物车
            </van-tabbar-item>
            <van-tabbar-item icon="setting-o"
                             to="/my">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                active: 0,
                // tab栏路由对象
                routerArr: ["/home", "/list", "/cart", "/my"],
            };
        },
        methods: {
            setActiveRoute() {
                //当前激活的路由，设置字体颜色高亮
                this.routerArr.forEach((item, index) => {
                    if (item === this.$route.path) this.active = index;
                });
            },
        },
        watch: {
            $route() {
                this.setActiveRoute();
            },
        },
        created() {
            this.setActiveRoute();
        },
    };
</script>
<style lang="less" scoped>
    @import "../assets/icon.less";
    .footer {
        .van-tabbar-item {
            a {
                color: #000;
            }
            .router-link-active {
                color: #1baeae;
            }
        }
    }
</style>
