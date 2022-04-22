<template>
  <div>
    <Head :title="title"></Head>
    <van-address-list
      :list="list"
      :disabled-list="disabledList"
      @add="onAdd"
      @edit="onEdit"
      @click-item="clickItem"
    />
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  name: "myaddress",
  data() {
    return {
      title: "地址管理",
      disabledList: [],
      list: [],
      cartList: [],
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/addaddress");
    },
    clickItem(item) {
      console.log(item);
      this.$router.push({
        path: "/order",
        query: {
          id: item.id,
          cartList: this.cartList,
        },
      });
    },
    onEdit(item, index) {
      //通过传递一个参数的方式来区分新增还是编辑
      this.$router.push("/addaddress?addressId=" + item.id);
    },
    addMessage() {
      this.$api.detailAddress().then((res) => {
        this.list = res.data.map((ele) => {
          return {
            id: ele.addressId,
            name: ele.userName,
            tel: ele.userPhone,
            address:
              ele.provinceName +
              ele.cityName +
              ele.regionName +
              ele.detailAddress,
          };
        });
      });
    },
  },
  components: {
    Head,
  },
  created() {
    this.addMessage();
    this.cartList = this.$route.query.cartString;
    console.log(this.$route.query.cartString);
    console.log(this.cartList, "00000000000");
  },
};
</script>

<style lang="less" scoped>
.van-button--round {
  width: 100%;
  background-color: rgb(27, 174, 174);
  border-color: rgb(27, 174, 174);
}
.van-radio__icon {
  opacity: 0;
}
</style>