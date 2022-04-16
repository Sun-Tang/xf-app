<template>
  <div>
    <Head :title="title"></Head>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :address-info="info"
    />
  </div>
</template>

<script>
import Head from "../components/Head.vue";
import { areaList } from "@vant/area-data";
export default {
  name: "addAddress",
  data() {
    return {
      title: "新增地址",
      areaList,
      searchResult: [],
      info: {},
    };
  },
  methods: {
    onSave(content) {
      console.log(content);
      this.$api.addAddress({ content }).then((res) => {
        console.log(res);
      });
      /*   let {
        addressId,
        cityName,
        defaultFlag,
        detailAddress,
        provinceName,
        regionName,
        userId,
        userName,
        userPhone,
      } = info; */
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  components: {
    Head,
  },
};
</script>

<style lang="less" scoped>
/deep/.van-button--round {
  background-color: rgb(27, 174, 174);
  border-color: rgb(27, 174, 174);
}
</style>