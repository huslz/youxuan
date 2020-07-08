<template>
  <div class="order">
    <order-list
      v-show="showList"
      @showProductInfo="showProductInfo"
    ></order-list>
    <order-info
      v-if="showInfo"
      :order-info-data="OrderInfoData"
      @close="closeProductInfo"
    ></order-info>
  </div>
</template>

<script>
import order from "../api/order";
import orderList from "../components/orderList";
import orderInfo from "../components/orderInfo";
export default {
  name: "order",
  data() {
    return {
      showList: true,
      showInfo: false,
      OrderInfoData: {}
    };
  },
  components: {
    orderList,
    orderInfo
  },
  methods: {
    showProductInfo(data) {
      this.getOrderInfoData(data._id);
      this.showList = false;
      this.showInfo = true;
    },
    closeProductInfo() {
      this.showList = true;
      this.showInfo = false;
    },
    getOrderInfoData(id) {
      order
        .getOrderInfo(id)
        .then(res => {
          if (!res.data.status){
            this.OrderInfoData = res.data.data;
          } else this.$message.error("获取订单信息失败!");

        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="stylus"></style>
