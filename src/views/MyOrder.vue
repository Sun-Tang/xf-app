<template>
  <div>
    <Head :title="title"></Head>
    <van-tabs @click="onClick">
      <van-tab v-for="item in list" :title="item.title" :key="item.id">
      </van-tab>
    </van-tabs>

    <div v-for="item in dataList" :key="item.orderId">
      <van-field
        v-model="value"
        :label="`订单时间${item.createTime}`"
        :placeholder="`${item.orderStatusString}`"
        input-align="right"
      />
      <van-card
        num="1"
        @click="dataListClick(item.orderNo)"
        :price="item.newBeeMallOrderItemVOS[0].sellingPrice"
        :title="item.newBeeMallOrderItemVOS[0].goodsName"
        :thumb="item.newBeeMallOrderItemVOS[0].goodsCoverImg"
      />
    </div>
    <div class="box-bottom">没有更多了...</div>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  name: "MyOrder",
  data() {
    return {
      title: "我的订单",
      value: "",
      list: [
        { title: "全部", id: 0 },
        { title: "待付款", id: 1 },
        { title: "待确认", id: 2 },
        { title: "代发货", id: 3 },
        { title: "已发货", id: 4 },
        { title: "交易完成", id: 5 },
      ],
      dataList: [],
      pageNumber: 1,
    };
  },
  components: {
    Head,
  },
  methods: {
    onClick(name, title) {
      console.log(name, title);
      this.$api.order(this.pageNumber, name).then((res) => {
        if (res.resultCode == 200) {
          this.dataList = res.data.list;
        }
      });
    },
    async dataListClick(a) {
      console.log(a);
      this.$router.push({
        path: "/orderdetail",
        query: {
          orderNo: a,
        },
      });
    },
  },
  created() {
    this.$api.order().then((res) => {
      if (res.resultCode == 200) {
        this.dataList = res.data.list;
        console.log(this.dataList);
      }
    });
  },
};
</script>

<style lang="less" scoped>
/deep/.van-cell__title {
  display: block;
  width: 172px;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}
.van-card {
  margin-top: 0;
}
.box-bottom {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
</style>


