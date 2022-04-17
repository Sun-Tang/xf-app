<template>
  <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
    <template #right>
      <van-icon name="ellipsis" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-icon-arrow-left,
.van-icon-ellipsis {
  color: #000;
}
</style>