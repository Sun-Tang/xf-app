<template>
  <div>
    <van-nav-bar title="我的" left-arrow @click-left="onClick">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="message">
      <div class="img">
        <img src="../assets/aaaddd.png" alt="" />
      </div>
      <ul>
        <li>昵称 : {{ myInfo.loginName }}</li>
        <li>登录名 : {{ myInfo.nickName }}</li>
        <li>个性签名 : {{ myInfo.introduceSign }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  name: "My",
  data() {
    return {
      title: "我的",
      myInfo: {},
    };
  },
  components: {
    Head,
  },
  methods: {
    onClick() {
      this.$router.push({ path: "/home" });
    },
  },
  created() {
    this.$api.test().then((res) => {
      this.myInfo = res.data;
    });
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

/deep/.van-icon-arrow-left,
.van-icon-ellipsis {
  color: #000;
}
</style>
