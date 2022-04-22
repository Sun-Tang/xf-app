<template>
  <div>
    <!-- vant导航 -->
    <van-nav-bar title="购物车">
      <template #right>
        <van-icon name="ellipsis" size="20px" color="#6F717A" />
      </template>
    </van-nav-bar>

    <!-- vant空状态 -->
    <van-empty
      v-show="isShow"
      description="购物车空空如也"
      image="https://s.yezgea02.com/1604028375097/empty-car.png"
    >
      <van-button
        round
        type="primary"
        class="bottom-button"
        @click="gotoClassify"
      >
        前往选购
      </van-button>
    </van-empty>

    <div v-for="(item, index) in carts" :key="index">
      <!-- vant复选框组 -->
      <!-- vant布局 -->
      <!-- vant滑动单元格 -->
      <!-- vant商品卡片 -->
      <!-- vant步进器 -->
      <van-checkbox-group
        v-model="result"
        @change="onChecked"
        checked-color="rgb(27, 174, 174)"
      >
        <van-row style="background-color: white">
          <van-col span="2" style="margin-top: 40px">
            <van-checkbox :name="item"></van-checkbox>
          </van-col>

          <van-col span="22">
            <van-swipe-cell>
              <van-card
                :id="item.goodsId"
                :price="item.sellingPrice.toFixed(2)"
                :title="item.goodsName"
                :thumb="item.goodsCoverImg"
                class="goods-card"
              >
                <template #num>
                  <van-stepper v-model="item.goodsCount" max="5" />
                </template>
              </van-card>

              <template #right>
                <van-button
                  @click="del(item, index)"
                  square
                  text="删除"
                  type="danger"
                  class="delete-button"
                />
              </template>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </div>

    <!-- vant提交订单栏 -->
    <van-submit-bar :price="total" button-text="结算" @submit="onSubmit">
      <van-checkbox
        v-model="checkedAll"
        @click="onAll"
        checked-color="rgb(27, 174, 174)"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [], //添加到购物车的商品
      result: [], //所有复选框选中的商品
      checkedAll: false, //全选的状态
      isShow: true,
    };
  },
  created() {
    this.$api.shopCart().then((res) => {
      if (+res.resultCode == 200) {
        this.carts = res.data;
      }
    });

    if (this.carts.length > 0) {
      //显示或隐藏空状态
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  computed: {
    total() {
      //计算总价
      let total = 0;
      this.result.map((item) => {
        total += item.sellingPrice * 100 * item.goodsCount;
      });
      return total;
    },
  },
  methods: {
    onChecked() {
      //点击复选框，判断是否全选
      if (this.result.length == this.carts.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    onAll() {
      //点击全选按钮
      if (this.checkedAll) {
        //如果为false的话全部选中，否则全不选
        this.result = this.carts;
      } else {
        this.result = [];
      }
    },
    del(item, index) {
      //删除
      this.carts.splice(index, 1);
      this.checkedAll = this.result.length == this.carts.length; //删除后全选框还是全选状态

      if (this.carts.length > 0) {
        //显示或隐藏空状态
        this.isShow = false;
      } else {
        this.isShow = true;
        this.checkedAll = false;
      }
    },
    gotoClassify() {
      //跳转到首页
      this.$router.push({
        path: "/home",
      });
    },
    back() {
      window.history.back();
    },
    async onSubmit() {
      let pay = await this.$api.detailAddress();
      if (pay) {
        let cartString = [];
        this.result.forEach((item) => {
          cartString.push(item.cartItemId);
        });
        // console.log(cartString);
        this.$router.push({
          path: "/myaddress",
          query: {
            cartString:cartString
          },
        });
      } else {
        this.$router.push("/addaddress");
      }
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.goods-card {
  background-color: white;
}

.delete-button {
  height: 100%;
}

.bottom-button {
  background: rgb(27, 174, 174);
  width: 180px;
  height: 40px;
}
.van-card__title {
  font-size: 12px;
}
.van-card__price-currency,
.van-card__price-integer,
.van-card__price-decimal {
  font-size: 14px;
  color: #ff0000;
}
.van-submit-bar {
  position: absolute;
  left: 0;
  bottom: 50px;
}
.van-button {
  background: rgb(27, 174, 174);
}
</style>
