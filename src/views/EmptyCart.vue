<template>
  <div>
    <van-nav-bar title="购物车">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="mid">
      <img src="../assets/empty-car.png" alt="" />
      <p>购物车空空如也</p>
      <van-button round type="primary" @click="go">前往选购</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {};
  },
  methods: {
    go() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
.mid {
  text-align: center;
  position: relative;
  top: 200px;

  img {
    width: 150px;
    height: 120px;
  }

  p {
    color: #2c3e50;
    font-size: 20px;
  }

  .van-button--round {
    width: 200px;
    background-color: rgb(27, 174, 174);
    border-color: rgb(27, 174, 174);
  }
}
</style>
