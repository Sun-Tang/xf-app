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
