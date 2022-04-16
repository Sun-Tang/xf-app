<template>
    <div id="app">
        <van-overlay :show="isLoading">
            <div class="wrapper">
                <img src="./assets/loading.gif"
                     class="block">
            </div>
        </van-overlay>
        <!-- 需要缓存的组件 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 不需要缓存的组件 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <Footer v-if="showfooter"></Footer>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Footer from "./components/Footer.vue";
    export default {
        name: "App",
        components: {
            Footer,
        },
        data() {
            return {
                showfooter: false,
            };
        },
        computed: {
            ...mapState(["isLoading"]),
        },
        watch: {
            $route(route) {
                this.showfooter = route.meta.isshow || false;
            },
        },
    };
</script>

<style lang="less">
    html,
    body,
    #app {
        height: 100%;
    }
    // loading样式
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .van-overlay {
        background-color: #fff !important;
    }
    .block {
        width: 230px;
        height: 230px;
        background-color: #fff;
    }
</style>
