<template>
  <div class="product">
    <product-list
      v-show="showList"
      @enterProductAddAndUpdate="enterProductAddAndUpdate"
      @enterProductDetail="enterProductDetail"
    ></product-list>
    <product-add-and-update
      :parentData="productData"
      :type="type"
      v-if="showAdd"
      @goBack="(showList = true) && (showAdd = false)"
    ></product-add-and-update>
    <product-detail
      :data="detailData"
      v-if="showDetail"
      @goBack="(showList = true) && (showDetail = false)"
    ></product-detail>
  </div>
</template>

<script>
import productDetail from "../components/productDetail";
import productList from "../components/productList";
import productAddAndUpdate from "../components/productAddAndUpdate";
export default {
  name: "product",
  data() {
    return {
      showList: true,
      showAdd: false,
      showDetail: false,
      showEdit: false,
      productData: {},
      detailData: {},
      type: 0
    };
  },
  components: {
    productList,
    productDetail,
    productAddAndUpdate
  },
  methods: {
    enterProductAddAndUpdate(data, type) {
      this.type = type;
      this.productData = {};
      if (data) this.productData = data;
      (this.showAdd = true) && (this.showList = false);
    },
    enterProductDetail(data) {
      if (data) this.detailData = data;
      (this.showDetail = true) && (this.showList = false);
    }
  }
};
</script>

<style scoped lang="stylus"></style>
