<template>
  <div class="dialog">
    <el-dialog
      v-if="isShow"
      :visible="isShow"
      :modal-append-to-body="false"
      :append-to-body="true"
      @close="handleCancel"
    >
      <el-form :model="editForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <div v-if="type === 1">
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="editForm.password"
              autocomplete="off"
              @input="change()"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="手机号:" prop="phone">
          <el-input
            v-model="editForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="role_id">
          <el-select v-model="editForm.role_id">
            <el-option
              v-for="item in editForm.roles"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSure">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from "../api/user";
export default {
  name: "userEditDialog",
  props: {
    isShow: {
      type: Boolean
    },
    data: {
      type: Object
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名!", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码!", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号!", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱!", trigger: "blur" }],
        role_id: [
          { required: true, message: "请选择活动名称", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    editForm() {
      return this.data;
    }
  },
  methods: {
    handleCancel() {
      this.$parent.handleCancel();
    },
    handleSure() {
      if (!this.type) {
        user
          .updateUser(
            this.editForm._id,
            this.editForm.username,
            this.editForm.phone,
            this.editForm.email,
            this.editForm.role_id
          )
          .then(res => {
            if (!res.data.status) {
              this.$parent.getUserList();
              this.$message.success("更新用户成功!");
              this.handleCancel();
            } else this.$message.error(res.data.msg);
          })
          .catch(() => {
            this.$message.error("服务器错误!");
          });
      } else {
        user
          .addUser(
            this.editForm.username,
            this.editForm.password,
            this.editForm.phone,
            this.editForm.email,
            this.editForm.role_id
          )
          .then(res => {
            if (!res.data.status) {
              this.$parent.getUserList();
              this.$message.success("用户添加成功!");
              this.handleCancel();
            } else this.$message.error(res.data.msg);
          })
          .catch(() => {
            this.$message.error("服务器错误!");
          });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
/deep/.el-select
  float left
</style>
