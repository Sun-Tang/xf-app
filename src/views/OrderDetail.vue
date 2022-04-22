<template>
  <div>
    <Head :title="title"></Head>
    <div class="orderDteail">
      <div class="order">
        <div>
          订单状态 : <span>{{ orderData.orderStatusString }}</span>
        </div>
        <div>
          订单编号 : <span>{{ orderData.orderNo }}</span>
        </div>
        <div>
          下单时间 : <span>{{ orderData.createTime }}</span>
        </div>
        <van-button
          type="primary"
          block
          color="rgb(27, 174, 174)"
          v-show="payShow"
          >去支付</van-button
        >
        <van-button type="default" block v-show="show" @click="deleteOrder"
          >取消订单</van-button
        >
      </div>
      <div class="detail">
        <div>
          商品金额 : <span>￥{{ orderData.totalPrice }}</span>
        </div>
        <div>配送方式 : <span>普通快递</span></div>
      </div>
      <div v-for="item in orderData.newBeeMallOrderItemVOS" :key="item.goodsId">
        <van-card
          :num="1"
          :price="item.sellingPrice"
          desc="全场包邮"
          :title="item.goodsName"
          :thumb="item.goodsCoverImg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  components: { Head },
  data() {
    return {
      title: "订单详情",
      b: "",
      show: false,
      payShow: false,
      orderData: {},
    };
  },
  methods: {
    getData() {
      this.$api.orderDetail(this.b).then((res) => {
        this.orderData = res.data;
        if (res.data.orderStatusString == "已支付") {
          this.show = true;
          this.payShow = false;
        } else if (res.data.orderStatusString == "手动关闭") {
          this.show = false;
          this.payShow = false;
        } else {
          this.show = true;
          this.payShow = true;
        }
        console.log(this.orderData);
      });
    },
    deleteOrder() {
      this.$api.deleteOrder(this.b).then((res) => {
        this.getData();
      });
    },
  },
  created() {
    this.b = this.$route.query.orderNo;
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.orderDteail {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .order {
    background-color: #fff;
    height: 180px;
    padding: 15px;
    margin-bottom: 16px;

    div {
      margin-bottom: 8px;
      font-size: 12px;
      color: #999;
      span {
        color: #000;
      }
    }
    .van-button {
      margin-bottom: 8px;
    }
  }
  .detail {
    background-color: #fff;
    margin-bottom: 16px;
    height: 76px;
    padding: 16px;
    div {
      margin: 8px;
      font-size: 12px;
      color: #999;
      span {
        color: #000;
      }
    }
  }
  .van-card {
    background-color: #fff;
  }
}
</style>