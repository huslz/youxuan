<template>
  <div class="categoryTable">
    <el-table v-if="!type" border v-loading="loading" :data="categoryData">
      <el-table-column label="商品分类" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button primary @click="handleUpdate(scope.row)"
            >修改分类</el-button
          >
          <el-button type="primary" @click="handleSecond(scope.row)"
            >查看子分类</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table v-else border v-loading="loading" :data="categoryData">
      <el-table-column label="商品分类" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button primary @click="handleUpdate(scope.row)"
            >修改分类</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "categoryTable",
  props: {
    type: Number,
    data: Array,
    size: Number
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    categoryData() {
      return this.data;
    }
  },
  watch: {
    categoryData(val) {
      if (val) this.loading = false;
    }
  },
  methods: {
    handleUpdate(data) {
      this.$emit("handleUpdate", data);
    },
    handleSecond(data) {
      this.$emit("handleSecond", data);
    }
  }
};
</script>

<style scoped lang="stylus">
.el-table
    margin-top 50px
</style>
