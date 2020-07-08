<template>
  <div class="roleUpdateDialog">
    <el-dialog
      title="设置权限"
      v-if="isShow"
      :visible="isShow"
      :modal-append-to-body="false"
      :append-to-body="true"
      @close="$emit('handleClose')"
    >
      <el-tree
        :data="roleData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="defaultData.menus"
        ref="tree"
      >
      </el-tree>
      <div slot="footer">
        <el-button @click="$emit('handleClose')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import role from "../api/role";
export default {
  name: "roleUpdateDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    defaultData: Object
  },
  data() {
    return {
      auth_time: 0,
      auth_name: "",
      roleData: [
        {
          label: "首页",
          id: "/home"
        },
        {
          label: "商品",
          id: "/goods",
          children: [
            { label: "品类管理", id: "/goods" },
            { label: "商品管理", id: "/product" },
            { label: "规格属性", id: "/spec" }
          ]
        },
        {
          label: "用户",
          id: "/users",
          children: [
            { label: "用户管理", id: "/user" },
            { label: "权限管理", id: "/role" }
          ]
        },
        {
          label: "订单",
          id: "/orders",
          children: [{ label: "订单管理", id: "/order" }]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      checkedValue: []
    };
  },
  methods: {
    handleSubmit() {
      this.checkedValue = this.$refs.tree.getCheckedKeys();
      this.auth_time = parseInt(+new Date());
      this.auth_name = JSON.parse(localStorage.getItem("userData")).username;
      this.updateRole();
    },
    updateRole() {
      role
        .updateRoles(
          this.defaultData._id,
          this.checkedValue,
          this.auth_time,
          this.auth_name
        )
        .then(res => {
          if (!res.data.status) {
            this.$message.success("修改权限成功!");
            this.$emit("handleClose");
            this.$emit("refresh");
          } else this.$message.error("修改权限失败!");
        })
        .catch(() => {
          this.$message.error("服务器错误");
        });
    }
  }
};
</script>

<style scoped lang="stylus"></style>
