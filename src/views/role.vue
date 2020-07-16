<template>
  <div class="role">
    <el-card>
      <div class="title">
        <el-button type="primary" @click="showAddDialog = true"
          >创建角色</el-button
        >
      </div>
      <el-table ref="roleTable" :data="PageData" border v-loading="loading">
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="auth_time" label="授权时间"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="auth_name" label="授权人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showUpdate(scope.row)"
              >设置权限</el-button
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
      <role-update-dialog
        :isShow="showUpdateDialog"
        @handleClose="closeUpdateDialog"
        @refresh="getUserList"
        :default-data="roleMenuData"
      ></role-update-dialog>
      <el-dialog
        @close="showAddDialog = false"
        title="创建角色"
        :visible="showAddDialog"
        v-if="showAddDialog"
        :modal-append-to-body="false"
        :append-to-body="true"
      >
        <el-form
          label-width="100px"
          :rules="rules"
          ref="addRoleForm"
          :model="roleForm"
        >
          <el-form-item label="角色名称:" prop="roleName">
            <el-input v-model="roleForm.roleName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addRoleSubmit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import role from "../api/role";
import roleUpdateDialog from "../components/roleUpdateDialog";
import user from "../api/user";
export default {
  name: "role",
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      loading: true,
      TotalPageSize: null,
      roleData: [],
      showUpdateDialog: false,
      roleMenuData: {},
      showAddDialog: false,
      roleForm: {
        roleName: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      paginationDisabled: true
    };
  },
  methods: {
    getUserList() {
      user
        .getUserList(this.pageNum, this.pageSize)
        .then(res => {
          if (!res.data.status) {
            this.loading = false;
            this.paginationDisabled = false;
            this.TotalPageSize =
              (res.data.data.roles.length / this.pageSize) * 10;
            this.roleData = res.data.data.roles;
            this.setTime();
          }
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    setTime() {
      this.roleData.forEach(value => {
        value.auth_time = new Date().filterTime(value.auth_time);
        value.create_time = new Date().filterTime(value.create_time);
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    closeUpdateDialog() {
      this.showUpdateDialog = false;
    },
    showUpdate(data) {
      this.roleMenuData = { ...data };
      this.showUpdateDialog = true;
    },
    addRoleSubmit() {
      this.$refs.addRoleForm.validate(valid => {
        if (valid) {
          role
            .addRole(this.roleForm.roleName)
            .then(res => {
              if (!res.data.status) {
                this.$message.success("添加角色成功!");
                this.getUserList();
                this.showAddDialog = false;
              }
            })
            .catch(() => {
              this.$message.error("服务器错误!");
            });
        }
      });
    }
  },
  mounted() {
    this.getUserList();
  },
  computed: {
    PageData() {
      let data = [];
      let length = this.pageSize * this.pageNum;
      if (length > this.roleData.length) length = this.roleData.length;
      for (let i = (this.pageNum - 1) * this.pageSize; i < length; i++) {
        data.push(this.roleData[i]);
      }
      return data;
    }
  },
  components: {
    roleUpdateDialog
  }
};

</script>

<style scoped lang="stylus">
.title
  text-align left
.el-table
  margin-top 50px
/deep/.el-dialog
  text-align left
</style>
