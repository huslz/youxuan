<template>
  <div class="productList">
    <el-card>
      <my-header
        title="添加商品"
        @handleHeaderAdd="$emit('enterProductAddAndUpdate', {}, 0)"
      >
        <div slot="title">
          <el-select v-model="searchParams">
            <el-option label="按照名称搜索" value="productName"></el-option>
            <el-option label="按照描述搜索" value="productDesc"></el-option>
          </el-select>
          <el-input v-model="searchKey" placeholder="关键字"></el-input>
          <el-button type="primary" @click="selectOperation">搜索</el-button>
        </div>
      </my-header>
      <el-table :data="productData.list" border v-loading="loading">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="desc" label="商品描述"></el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <el-button @click="updateProductStatus(scope.row, 0)"
                >下架</el-button
              >
              <a style="color: #42b983">销售中</a>
            </div>
            <div v-else>
              <el-button @click="updateProductStatus(scope.row, 1)"
                >上架</el-button
              >
              <a style="color: red">已下架</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作选项">
          <template slot-scope="scope">
            <el-button @click="$emit('enterProductDetail',scope.row)">详情</el-button>
            <el-button
              type="primary"
              @click="$emit('enterProductAddAndUpdate', scope.row, 1)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="TotalPageSize"
        :current-page.sync="pageNum"
        ref="pagination"
        @current-change="handleCurrentChange"
        :disabled="paginationDisabled"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import myHeader from "../components/myHeader";
import product from "../api/product";
export default {
  name: "productList",
  data() {
    return {
      searchParams: "productName",
      searchKey: "",
      productData: [],
      pageNum: 1,
      pageSize: 5,
      TotalPageSize: null,
      loading: true,
      isSearch: false,
      paramsChange:false,
      paginationDisabled:false
    };
  },
  components: {
    myHeader
  },
  methods: {
    getProductData() {
      this.isSearch = false;
      product
        .getProduct(this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.loading = false;
            this.paginationDisabled = false;
            this.productData = res.data.data;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.paginationDisabled = true;
      this.isSearch && this.searchKey
        ? this.searchProduct()
        : this.getProductData();
    },
    selectOperation() {
      this.paginationDisabled = true;
      if(this.paramsChange){
        this.pageNum = 1;
        this.paramsChange = false;
      }
      this.searchKey ? (this.isSearch = true) : (this.isSearch = false);
      this.$nextTick(() => {
        this.isSearch ? this.searchProduct() : this.getProductData();
      });
    },
    searchProduct() {
      product
        .searchProduct(
          this.pageNum,
          this.pageSize,
          this.searchParams,
          this.searchKey
        )
        .then(res => {
          if (!res.data.status) {
            this.paginationDisabled = false;
            this.loading = false;
            this.productData = res.data.data;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    updateProductStatus(row, status) {
      product
        .updateProductStatus(row._id, status)
        .then(res => {
          if (!res.data.status) {
            row.status = status;
            this.$message.success("操作成功!");
          } else this.$message.errror("修改状态错误!");
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    }
  },
  mounted() {
    this.getProductData();
  },
  watch: {
    isSearch() {
      this.pageNum = 1;
    },
    searchParams(){
      this.paramsChange = true;
    }
  }
};
</script>

<style scoped lang="stylus">
.el-table
    margin-top 50px
</style>
