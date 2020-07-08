<template>
  <div class="spec">
    <el-card>
      <my-header title="添加规格" @handleHeaderAdd="handleSelectOperation({})">
        <div slot="title">
          <el-input placeholder="关键字" v-model="searchKey"></el-input>
          <el-button @click="selectOperation">搜索</el-button>
        </div>
      </my-header>
      <el-table border v-loading="loading" :data="specData.list">
        <el-table-column prop="name" label="规格名称"></el-table-column>
        <el-table-column prop="option" label="规格属性值"></el-table-column>
        <el-table-column prop="categoryName" label="规格归类"></el-table-column>
        <el-table-column label="操作选项">
          <template slot-scope="scope">
            <el-button @click="handleSelectOperation(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row._id)"
              >删除</el-button
            >
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
      <spec-edit-and-add-dialog
        :type="type"
        :dialogData="dialogData"
        :show="dialogShow"
        :title="dialogTitle"
        @handleCloseDialog="closeDialog"
      ></spec-edit-and-add-dialog>
    </el-card>
  </div>
</template>

<script>
import spec from "../api/spec";
import myHeader from "../components/myHeader";
import category from "../api/category";
import specEditAndAddDialog from "../components/specEditAndAddDialog";
export default {
  name: "spec",
  data() {
    return {
      loading: true,
      specData: [],
      pageNum: 1,
      pageSize: 5,
      TotalPageSize: null,
      searchKey: "",
      isSearch: false,
      dialogShow: false,
      dialogData: {},
      type: 0,
      dialogTitle: "添加规格",
      paginationDisabled:false
    };
  },
  components: {
    myHeader,
    specEditAndAddDialog
  },
  methods: {
    getSpecData() {
      spec
        .getSpec(this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.paginationDisabled = false;
            this.loading = false;
            this.specData = res.data.data;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
          } else this.$message.error(res.data.msg);
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    searchSpec() {
      spec
        .searchSpec(this.searchKey, this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.paginationDisabled = false;
            this.specData = res.data.data;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
          } else this.$message.error(res.data.msg);
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    handleCurrentChange(val) {
      this.paginationDisabled = true;
      this.pageNum = val;
      this.isSearch && this.searchKey ? this.searchSpec() : this.getSpecData();
    },
    selectOperation() {
      this.paginationDisabled = true;
      this.searchKey ? (this.isSearch = true) : (this.isSearch = false);
      this.$nextTick(() => {
        this.isSearch ? this.searchSpec() : this.getSpecData();
      });
    },
    handleSelectOperation(data) {
      this.dialogData = {};
      if (!(JSON.stringify(data) === "{}")) {
        if (!Array.isArray(data.option)) data.option = data.option.split(",");
        this.dialogData = { ...data };
        this.type = 1;
        this.dialogTitle = "修改规格";
      } else {
        this.type = 0;
        this.dialogTitle = "添加规格";
      }
      this.dialogShow = true;
    },
    handleDelete(id) {
      spec
        .deleteSpec(id)
        .then(res => {
          if (!res.data.status) {
            this.$message.success("删除成功!");
            this.getSpecData();
            this.searchKey = "";
          } else this.$message.success("删除失败!");
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    closeDialog(){
      this.dialogShow = false;
      this.getSpecData();
    }
  },
  mounted() {
    this.getSpecData();
  },
  watch: {
    specData() {
      this.$forceUpdate();
      this.specData.list.forEach(val => {
        val.option = val.option.join(",");
        category
          .getCategoryName(val.category_id)
          .then(res => {
            if (!res.data.status)
              this.$set(val, "categoryName", res.data.data.name);
          })
          .catch(() => {
            this.$message.error("服务器错误!");
          });
      });
    },
    isSearch() {
      this.pageNum = 1;
    }
  }
};
</script>

<style scoped lang="stylus">
.el-table
  margin-top 50px
</style>
