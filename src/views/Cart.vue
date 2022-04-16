<template>
  <div>
    <van-nav-bar title="购物车">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="goodList">
      <van-checkbox v-model="checked"></van-checkbox>
      <img src="../assets/aaaddd.png" alt="" />
      <div class="desc">
        <div class="title">
          <span>HUAWEI P50 Pocket 4G全网通 超光谱影...</span>
          <span>x1</span>
        </div>
        <div class="price">
          <span>¥10988</span>
          <van-stepper v-model="value" />
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="3050"
      button-text="结算"
      @submit="onSubmit"
      button-color="rgb(27, 174, 174)"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  components: { Footer },
  name: "Cart",
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    go() {
      this.$router.push("/home");
    },
    onSubmit() {},
    checked() {},
  },
};
</script>
<style lang="less" scoped>
.goodList {
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  width: 365px;
  height: 103px;
  //background-color: #fafafa;
  img {
    width: 100px;
    height: 100px;
  }
  .desc {
    width: 205px;
    //height: 63px;
    margin: 20px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      display: flex;
      span:nth-child(1) {
        display: block;
        width: 192px;
        height: 31px;
      }
    }
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 16px;
        color: #ff0000;
      }
    }
  }
}
.van-submit-bar {
  position: relative;
  top: 400px;
  left: 0;
  z-index: 100;
}
</style>
