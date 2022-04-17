<template>
  <div>
    <Head :title="title"></Head>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- <van-button round type="primary" @click="add">新增地址</van-button> -->
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  name: "myaddress",
  data() {
    return {
      title: "地址管理",
      /*  list: [
        {
          addressId: 7777,
          cityName: "北京市",
          defaultFlag: 0,
          detailAddress: "1",
          provinceName: "北京",
          regionName: "东城区",
          userId: 17284,
          userName: "1",
          userPhone: "11111111111",
        },
        {
          addressId: 7777,
          cityName: "北京市",
          defaultFlag: 0,
          detailAddress: "1",
          provinceName: "北京",
          regionName: "东城区",
          userId: 17284,
          userName: "1",
          userPhone: "11111111111",
        },
      ], */
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/addaddress");
    },
    onEdit(item, index) {
      this.$api.updateAddress(item, index);
      console.log(item, index);
    },
  },
  components: {
    Head,
  },
};
</script>

<style lang="less" scoped>
.van-button--round {
  width: 100%;
  background-color: rgb(27, 174, 174);
  border-color: rgb(27, 174, 174);
}
</style>