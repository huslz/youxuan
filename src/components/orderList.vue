<template>
  <div class="orderList">
    <el-card>
      <my-header :show-add="false">
        <div slot="title">
          <el-select v-model="searchParams">
            <el-option value="orderId" label="按照订单号搜索"></el-option>
            <el-option value="recipient" label="按照收件人搜索"></el-option>
          </el-select>
          <el-input v-model="searchKey" placeholder="关键字"></el-input>
          <el-button type="primary" @click="selectOperation">搜索</el-button>
        </div>
      </my-header>
      <el-table border v-loading="loading" :data="orderData.list">
        <el-table-column label="订单号" prop="orderId"></el-table-column>
        <el-table-column label="收件人" prop="recipient"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <a v-if="!scope.row.status">已支付</a>
            <a v-else style="color: red">未支付</a>
          </template>
        </el-table-column>
        <el-table-column label="订单总价" prop="allPrice"></el-table-column>
        <el-table-column label="创建时间" prop="create_time"></el-table-column>
        <el-table-column label="操作选项">
          <template slot-scope="scope">
            <a style="color: #42b983;cursor: pointer" @click="$emit('showProductInfo',scope.row)">查看详情</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="TotalPageSize"
        @current-change="handleCurrentChange"
        :disabled="paginationDisabled"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import order from "../api/order";
import myHeader from "./myHeader";
export default {
  name: "orderList",
  data() {
    return {
      searchParams: "orderId",
      searchKey: "",
      loading: true,
      orderData: [],
      pageNum: 1,
      pageSize: 5,
      TotalPageSize: null,
      isSearch: false,
      paramsChange: false,
      paginationDisabled: false
    };
  },
  components: {
    myHeader
  },
  methods: {
    getOrderData() {
      order
        .getOrder(this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.paginationDisabled = false;
            this.loading = false;
            this.orderData = res.data.data;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
            this.setTime();
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    searchOrder() {
      this.paginationDisabled = false;
      order
        .searchOrder(
          this.searchParams,
          this.searchKey,
          this.pageNum,
          this.pageSize
        )
        .then(res => {
          if (!res.data.status) {
            this.orderData = res.data.data;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
            this.setTime();
          }
        })
        .catch(() => {
          this.$message.error("服务器错误");
        });
    },
    selectOperation() {
      this.paginationDisabled = true;
      if (this.paramsChange) {
        this.pageNum = 1;
        this.paramsChange = false;
      }
      this.searchKey ? (this.isSearch = true) : (this.isSearch = false);
      this.$nextTick(() => {
        this.isSearch ? this.searchOrder() : this.getOrderData();
      });
    },
    setTime() {
      this.orderData.list.forEach(value => {
        value.create_time = new Date().filterTime(value.create_time);
      });
    },
    handleCurrentChange(val) {
      this.paginationDisabled = true;
      this.pageNum = val;
      this.isSearch && this.searchKey
        ? this.searchOrder()
        : this.getOrderData();
    }
  },
  mounted() {
    this.getOrderData();
  },
  watch: {
    isSearch() {
      this.pageNum = 1;
    },
    searchParams() {
      this.paramsChange = true;
    }
  }
};
</script>

<style scoped lang="stylus">
.el-table
    margin-top 50px
</style>
