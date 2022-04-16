<template>
    <div class="login">
        <!-- nav bar -->
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
                <Verify @success="alert('success')"
                        @error="alert('error')"
                        :type="2"
                        :figure="10"
                        fontSize="26px"
                        :showButton="false"
                        ref="verify"></Verify>
            </template>
            <p class="mytext"
               @click="changeLogin">{{isLogin?'立即注册':'已有账号，立即登录'}}</p>
            <div style="margin: 16px;">
                <van-button round
                            block
                            type="info"
                            native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import Verify from "vue2-verify";
    export default {
        name: "Login",
        components: {
            Verify,
        },
        props: ["needback"],
        data() {
            return {
                /* 表单相关 */
                userName: "",
                pwd: "",
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
            alert(text) {
                if (text === "success") {
                    this.resultCode = true;
                } else {
                    this.resultCode = false;
                }
            },
            changeLogin() {
                this.userName = "";
                this.pwd = "";
                this.$refs.verify.refresh();
                this.isLogin = !this.isLogin;
            },
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
            // background-color: pink;

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
