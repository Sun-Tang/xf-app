<template>
    <div class="home">
        <div class="hd_wrap"
             :class="{scroll:flag}">
            <i class="iconfont icon-caidan"></i>
            <div class="hd_search">
                <span class="hd_title">新蜂商城</span>
                <span class="hd_input">快 乐 就 是 买 买 买~</span>
            </div>
            <span class="login">登录</span>
        </div>
        <div class="con_wrap"
             ref="con">
            <div class="swiper_wrap">
                <van-swipe :autoplay="3000"
                           indicator-color="#52aaad">
                    <van-swipe-item v-for="(image, index) in carousels"
                                    :key="index">
                        <a :href="image.redirectUrl">
                            <img v-lazy="image.carouselUrl" />
                        </a>
                    </van-swipe-item>
                </van-swipe>
            </div>
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
            <div class="goods_wrap">
                <div v-for="(item, index) in goods"
                     :key="index">
                    <h2 class="goods_title">{{item.title}}</h2>
                    <div class="goods_list">
                        <div class="goods_item"
                             v-for="(item1, index1) in item.subGoods"
                             :key="index1"
                             @click="gotoDetail(item1.goodsId)">
                            <img :src="item1.goodsCoverImg">
                            <p class="goods_name van-multi-ellipsis--l2">{{item1.goodsName}}</p>
                            <p class="sellingPrice">￥&nbsp;{{item1.sellingPrice}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                //此标识控制，当页面滚动到一定位置时，头部背景色改变
                flag: false,
                // 轮播图
                carousels: [],
                // navbar数据
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
            // 页面滚动位置
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
                this.$router.push("/my?goodsId=" + goodsId);
            },
        },
        created() {
            this.getIndexInfo();
        },
        mounted() {
            // 添加监听
            this.$refs.con.addEventListener("scroll", this.showScroll);
        },
        beforeDestroy() {
            // 移除监听
            this.$refs.con.removeEventListener("scroll", this.showScroll);
        },
        //在页面离开时记录滚动位置
        beforeRouteLeave(to, from, next) {
            this.top = this.$refs.con.scrollTop;
            next();
        },
        //进入该页面时，用之前保存的滚动位置赋值，恢复到初始位置
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.$nextTick(() => {
                    vm.$refs.con.scrollTop = vm.top;
                });
            });
        },
    };
</script>
<style lang="less" scoped>
    // 引入自定义图标
    @import "../assets/myicon.less";
    // 主题颜色
    @themeColor: #52aaad;
    .home {
        background-color: #f9f9f9;
        height: calc(100vh - 110px);
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
