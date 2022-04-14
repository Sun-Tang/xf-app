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
