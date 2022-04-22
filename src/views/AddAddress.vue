<template>
  <div>
    <Head :title="title"></Head>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :show-delete="isFlag"
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
      id: "",
      title: "新增地址",
      //冻结地址列表，不能修改
      areaList: Object.freeze(areaList),
      info: {},
      isFlag: false,
    };
  },
  methods: {
    getAreaCode(area) {
      area = area.replace(/区|县/, ""); // 肥乡
      for (let k in areaList.county_list) {
        if (areaList.county_list[k].includes(area)) {
          return k;
        }
      }
    },
    //获取详细信息
    async getDetail() {
      //用data接收地址栏详细信息
      //编辑
      let data = await this.$api.getAddressDetail(this.id);
      let {
        addressId,
        cityName,
        defaultFlag,
        detailAddress,
        provinceName,
        regionName,
        userId,
        userName,
        userPhone,
      } = data.data;
      this.info = {
        id: addressId,
        name: userName,
        tel: userPhone,
        province: provinceName,
        city: cityName,
        county: regionName,
        addressDetail: detailAddress,
        postalCode: "100000",
        areaCode: this.getAreaCode(regionName),
        isDefault: defaultFlag,
      };
    },
    onSave(obj) {
      //保存
      let {
        addressDetail,
        areaCode,
        city,
        country,
        county,
        id,
        isDefault,
        name,
        postalCode,
        province,
        tel,
      } = obj;
      let option = {
        cityName: city,
        defaultFlag: isDefault ? 1 : 0,
        detailAddress: addressDetail,
        provinceName: province,
        regionName: county,
        userName: name,
        userPhone: tel,
        areaCode,
        postalCode,
      };
      if (this.id) {
        this.$api.updateAddress({ addressId: id, ...option }).then((res) => {
          if (+res.resultCode == 200) {
            this.$router.push("/myaddress");
          }
        });
      } else {
        this.$api.addressList({ ...option }).then((res) => {
          if (+res.resultCode == 200) {
            this.$router.push("/myaddress");
          }
        });
      }
    },
    onDelete() {
      this.$api.deleteAddress(this.id).then((res) => {
        if (+res.resultCode == 200) {
          this.$router.push("/myaddress");
        }
      });
    },
    onChangeDetail() {},
  },
  components: {
    Head,
  },
  created() {
    this.id = this.$route.query.addressId;
    if (this.id) {
      this.getDetail();
      this.isFlag = true;
      this.title = "编辑地址";
    }
  },
};
</script>

<style lang="less" scoped>
/deep/.van-button--round {
  background-color: rgb(27, 174, 174);
  border-color: rgb(27, 174, 174);
}
</style>