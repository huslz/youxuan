<template>
  <div class="user">
    <el-card>
      <div class="title">
        <el-button type="primary" @click="handleAddUser">创建用户</el-button>
      </div>
      <el-table
        ref="userTable"
        :data="userData.list"
        border
        v-loading="loading"
      >
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="roleName" label="角色id"></el-table-column>
        <el-table-column prop="create_time" label="注册时间"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
    </el-card>
    <user-edit-dialog
      :isShow="isEdit"
      :data="editForm"
      :type="type"
    ></user-edit-dialog>
  </div>
</template>

<script>
import userEditDialog from "../components/userEditDialog";
import user from "../api/user";
export default {
  name: "user",
  data() {
    return {
      type: 0,
      userData: [],
      pageNum: 1,
      pageSize: 3,
      TotalPageSize: null,
      isEdit: false,
      isDelete: false,
      editForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        role_id: ""
      },
      loading: true,
      paginationDisabled:false
    };
  },
  mounted() {
    this.getUserList();
  },
  components: {
    userEditDialog
  },
  methods: {
    getUserList() {
      user
        .getUserList(this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.loading = false;
            this.paginationDisabled = false;
            this.TotalPageSize = (res.data.data.total / this.pageSize) * 10;
            this.userData = res.data.data;
            this.setUserRoleName();
            this.setUserCreateTime();
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    setUserCreateTime() {
      this.userData.list.forEach(val => {
        val.create_time = new Date().filterTime(val.create_time);
      });
    },
    setUserRoleName() {
      this.userData.list.forEach(val => {
        this.userData.roles.some(value => {
          if (value._id === val.role_id) this.$set(val, "roleName", value.name);
        });
      });
    },
    handleCurrentChange(val) {
      this.paginationDisabled = true;
      this.pageNum = val;
      this.getUserList();
    },
    handleEdit(scope) {
      this.isEdit = true;
      this.editForm = { ...scope.row };
      this.editForm.roles = this.userData.roles;
      this.type = 0;
    },
    handleCancel() {
      this.isEdit = false;
    },
    handleDelete(index, row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(row._id, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAddUser() {
      for (let editFormKey in this.editForm) {
        this.editForm[editFormKey] = "";
      }
      this.editForm.roles = this.userData.roles;
      this.type = 1;
      this.isEdit = true;
    },
    deleteUser(id, index) {
      user
        .deleteUser(id)
        .then(res => {
          if (!res.data.status) {
            this.userData.list.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.title
    text-align left
.el-table
    margin-top 50px
</style>
