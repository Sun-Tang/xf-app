<template>
    <div>

        <Head :title="title"></Head>
        <div class="message">
            <div class="img">
                <img src="../assets/aaaddd.png"
                     alt="" />
            </div>
            <ul>
                <li>昵称 : xxx</li>
                <li>登录名 : xxx</li>
                <li>个性签名 ：随新所欲，蜂富多彩</li>
            </ul>
        </div>
        <van-cell title="我的订单"
                  is-link
                  to="/myorder" />
        <van-cell title="账号管理"
                  is-link />
        <van-cell title="地址管理"
                  is-link
                  to="myaddress" />
        <van-cell title="关于我们"
                  is-link />
    </div>
</template>

<script>
    import Head from "../components/Head.vue";
    export default {
        name: "My",
        data() {
            return {
                title: "我的",
            };
        },
        components: {
            Head,
        },
    };
</script>

<style lang="less" scoped>
    .nav-bar-text-color {
        color: #000;
    }

    .message {
        width: 352px;
        height: 115px;
        margin: 10px auto;
        background-color: #51c7c7;
        border-radius: 14px;
        display: flex;
        align-items: center;
        //justify-content: center;

        .img {
            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin: 0 10px 0 20px;
            }
        }

        ul {
            color: #fff;
            font-size: 14px;

            li {
                padding: 2px 0;
            }
        }
    }
</style>
