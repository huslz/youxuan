<template>
  <div class="category">
    <el-card>
      <my-header @handleHeaderAdd="showAdd = true" title="添加分类">
        <div slot="title">
          <span v-if="!isSecond">一级商品列表</span>
          <span v-else> <a @click="back">一级商品列表</a>/二级处理 </span>
        </div>
      </my-header>
      <category-table
        :type="type"
        :data="categoryData"
        :size="TotalPageSize"
        @handleSecond="handleSecond"
        @handleUpdate="handleUpdate"
      >
      </category-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="TotalPageSize"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        ref="pagination"
        :disabled="paginationDisabled"
      >
      </el-pagination>
      <el-dialog
        title="修改分类"
        :visible="showEdit"
        :modal-append-to-body="false"
        @close="showEdit = false"
        style="text-align: left"
      >
        <el-row>
          <el-col>
            请输入新类名
          </el-col>
          <el-col>
            <el-input v-model="editText"></el-input>
          </el-col>
        </el-row>
        <div slot="footer">
          <el-button @click="showEdit = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateSure">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="添加分类"
        :visible="showAdd"
        :modal-append-to-body="false"
        :append-to-body="true"
        @close="showAdd = false"
        style="text-align: left"
      >
        <el-form>
          <el-form-item label="分类列表">
            <el-select v-model="selectVal">
              <el-option
                :label="item.name"
                :value="item.val"
                v-for="(item, index) in optionVals"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input style="width: 70%" v-model="AddText"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="showAdd = false">取消</el-button>
          <el-button type="primary" @click="handleAdd">确认</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import category from "../api/category";
import myHeader from "../components/myHeader";
import categoryTable from "../components/categoryTable";
export default {
  name: "category",
  data() {
    return {
      type: 0,
      TotalPageSize: null,
      pageNum: 1,
      secondPageNum: 1,
      pageSize: 5,
      categoryData: [],
      isSecond: false,
      id: "0",
      editId: "0",
      editText: "",
      showEdit: false,
      showAdd: false,
      selectVal: "0",
      optionVals: [{ name: "一级菜单", val: "0" }],
      AddText: "",
      paginationDisabled: false
    };
  },
  computed: {},
  watch: {},
  components: {
    myHeader,
    categoryTable
  },
  methods: {
    getCategoryData() {
      category
        .getCategory(this.id, this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.paginationDisabled = false;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
            this.categoryData = res.data.data.list;
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
          this.paginationDisabled = false;
        });
    },
    handleSecond(data) {
      this.id = data._id;
      this.selectVal = data._id;
      this.pageNum = 1;
      this.getCategoryData();
      this.isSecond = true;
      this.type = 1;
    },
    back() {
      this.pageNum = this.secondPageNum;
      this.$nextTick(() => {
        this.$refs.pagination.internalCurrentPage = this.pageNum;
      });
      this.selectVal = "0";
      this.isSecond = false;
      this.type = 0;
      this.id = "0";
      this.getCategoryData();
    },
    handleCurrentChange(val) {
      this.secondPageNum = val;
      this.paginationDisabled = true;
      this.getCategoryData();
    },
    handleUpdate(data) {
      this.showEdit = true;
      this.editId = data._id;
    },
    handleUpdateSure() {
      category
        .updateCategory(this.editId, this.editText)
        .then(res => {
          if (!res.data.status) {
            this.$message.success("修改品类名称成功!");
            this.editText = "";
            this.getCategoryData();
            this.showEdit = false;
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    handleAdd() {
      if (this.selectVal && this.AddText) {
        category
          .addCategory(this.selectVal, this.AddText)
          .then(res => {
            if (!res.data.status) {
              this.$message.success("添加品类成功!");
              this.AddText = "";
              this.getCategoryData();
              this.showAdd = false;
            }
          })
          .catch(() => {
            this.$message.error("服务器错误!");
          });
      } else this.$message.error("存在未填信息!");
    }
  },
  mounted() {
    this.getCategoryData();
  }
};
</script>

<style scoped lang="stylus">
a
  color #2fa0ec
  cursor pointer
</style>
