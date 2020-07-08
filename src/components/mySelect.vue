<template>
  <div class="categorySelect">
    <el-select v-model="selectVal">
      <el-option
        v-for="(item, index) in selectData"
        :label="item.name"
        :value="item._id"
        :key="index"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import category from "../api/category";
export default {
  name: "mySelect",
  props: {
    name: String,
    firstName: String,
    defaultVal: String
  },
  data() {
    return {
      selectData: [],
      selectVal: ""
    };
  },
  mounted() {
    category
      .getCategory("0")
      .then(res => {
        if (!res.data.status) this.selectData = res.data.data.list;
        else this.$message.error("获取品类表失败!");
      })
      .catch(() => {
        this.$message.error("服务器错误!");
      });
  },
  methods: {},
  watch: {
    selectVal(val) {
      this.$parent.$parent.$parent.$parent[this.firstName][this.name] = val;
    },
    defaultVal: {
      immediate: true,
      handler: function(val) {
        this.selectVal = val;
      }
    }
  }
};
</script>

<style scoped></style>
