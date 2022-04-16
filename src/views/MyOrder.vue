<template>
  <div>
    <Head :title="title"></Head>
    <van-tabs>
      <van-tab v-for="item in list" :title="item.title" :key="item.id">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  name: "MyOrder",
  data() {
    return {
      title: "我的订单",
      list: [
        { title: "全部", id: 0 },
        { title: "待付款", id: 1 },
        { title: "待确认", id: 2 },
        { title: "代发货", id: 3 },
        { title: "已发货", id: 4 },
        { title: "交易完成", id: 5 },
      ],
    };
  },
  components: {
    Head,
  },
};
</script>


