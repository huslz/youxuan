<template>
  <div class="orderInfo">
    <el-card>
      <el-page-header title="订单详情" @back="$emit('close')"> </el-page-header>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>订单号</el-tag>
        </el-col>
        <el-col :span="21">{{ productData.orderId }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-tag>订单人</el-tag>
        </el-col>
        <el-col :span="21"> {{ productData.recipient }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-tag>创建时间</el-tag>
        </el-col>
        <el-col :span="21">
          {{ new Date().filterTime(productData.create_time) }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-tag>订单状态</el-tag>
        </el-col>
        <el-col :span="21"
          ><a v-if="!productData.payStatus">已支付</a
          ><a v-else style="color: red">未支付</a>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-tag>商品价格</el-tag>
        </el-col>
        <el-col :span="21"> {{ productData.allPrice }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-tag>支付方式</el-tag>
        </el-col>
        <el-col :span="21"
          ><a v-if="productData.paymentMethod === 1">支付宝</a
          ><a v-else>微信</a>
        </el-col>
      </el-row>
      <el-divider><i class="el-icon-shopping-cart-full"></i></el-divider>
      <el-table :data="productData.details" border>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="imgs" label="商品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100%;height: 100%"
              v-for="(item, index) in scope.row.imgs"
              :src="
                item.indexOf('http://118.24.25.7:5000/upload/') === -1
                  ? 'http://118.24.25.7:5000/upload/' + item
                  : item
              "
              :key="index"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="info" label="商品信息"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "orderInfo",
  props: {
    OrderInfoData: Object
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
  computed: {
    productData() {
      return this.OrderInfoData;
    }
  }
};
</script>

<style scoped lang="stylus">
/deep/.el-row
    margin-top 10px
/deep/.el-col
    line-height 30px
    text-align left
</style>
