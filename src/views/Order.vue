<template>
  <div>
    <Head :title="title"></Head>
    <div class="addressList" @click="handle">
      <div class="info">
        <span>{{ addressData.userName }}</span>
        <span>{{ addressData.userPhone }}</span>
      </div>
      <span
        >{{ addressData.cityName }}{{ addressData.provinceName
        }}{{ addressData.regionName }}{{ addressData.detailAddress }}</span
      >
      <van-icon name="arrow" />
    </div>
    <div v-for="item in list" :key="item.goodsId">
      <van-card
        num="1"
        :price="item.sellingPrice"
        :title="item.goodsName"
        :thumb="item.goodsCoverImg"
      />
    </div>
    <div class="bottom">
      <van-cell title="商品金额" value="￥18999"></van-cell>
      <van-button type="primary" block @click="sendOrder">生成订单</van-button>

      <van-popup
        :overlay="false"
        v-model="show"
        closeable
        close-icon="close"
        click-close-icon="clickIcon"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-button
          type="primary"
          block
          color="rgb(27, 174, 174)"
          @click="payfor('2')"
          >微信支付</van-button
        >
        <van-button type="info" block color="skyblue" @click="payfor('1')"
          >支付宝支付</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  data() {
    return {
      title: "生成订单",
      show: false,
      addressList: "",
      addressData: {},
      cartListStr: [],
      arr: "",
      list: [],
      orderData: "",
    };
  },
  methods: {
    /* clickIcon() {
      this.$api.order().then((res) => {
        console.log(res);
        if (res.resultCode == 200) {
          //this.$router.push("/myorder");
          console.log(res.resultCode);
        }
      });
    }, */
    payfor(type) {
      this.$api.paySuccess(this.orderData, type).then((res) => {
        if (res.resultCode == 200) {
          //Toast("支付成功");
          this.$router.push("/myorder");
        }
      });
      this.$route.push;
    },
    async sendOrder() {
      console.log(this.addressList, Array.from(this.cartListStr));
      await this.$api
        .saveOrder(this.addressList, this.cartListStr)
        .then((res) => {
          this.orderData = res.data;
        });
      this.show = true;
    },
    addressDetail() {
      this.$api.getAddressDetail(this.addressList).then((res) => {
        if (res.resultCode == 200) {
          this.addressData = res.data;
          console.log(this.addressData);
        }
      });
    },
    cartArr() {
      this.$api.cartList(this.arr).then((res) => {
        if (res.resultCode == 200) {
          this.list = res.data;
          console.log(this.list);
        }
      });
    },
    handle() {
      this.$router.push("/myaddress");
    },
  },
  components: {
    Head,
  },
  created() {
    this.addressList = this.$route.query.id;
    this.cartListStr = this.$route.query.cartList;
    //console.log(this.cartListStr, "327549365");
    this.arr = this.cartListStr.join(",");
    console.log(this.arr);
    this.addressDetail();
    this.cartArr();
  },
};
</script>

<style lang="less" scoped>
.addressList {
  height: 78px;
  padding: 12px;
  margin-bottom: 16px;
  .info {
    height: 16px;
    margin: 8px 0;
  }
  .van-icon {
    position: absolute;
    right: 20px;
    top: 70px;
  }
}
.bottom {
  height: 70px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 24px;
  padding: 8px;
  .van-button {
    background-color: rgb(27, 174, 174);
  }
  .van-popup {
    .van-button {
      margin: 20px;
    }
  }
}
</style>