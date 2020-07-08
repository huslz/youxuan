<template>
  <div class="specEditAndAddDialog">
    <el-dialog
      :title="title"
      :modal-append-to-body="false"
      :append-to-body="true"
      v-if="show"
      :visible="show"
      @close="$emit('handleCloseDialog')"
    >
      <el-form
        label-width="80px"
        :model="formData"
        :rules="rules"
        ref="specForm"
      >
        <el-form-item label="分类名称" prop="category_id">
          <my-select
            first-name="formData"
            name="category_id"
            :default-val="formData.category_id"
          >
          </my-select>
        </el-form-item>
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" prop="option">
          <el-select
            v-model="formData.option"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请填写属性"
          >
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="$emit('handleCloseDialog')">取消</el-button>
        <el-button type="primary" @click="handleSubmit"
          ><a v-if="!type">添加</a><a v-else>修改</a></el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mySelect from "./mySelect";
import spec from "../api/spec";
export default {
  name: "specEditAndAddDialog",
  props: {
    title: String,
    show: Boolean,
    dialogData: Object,
    type: Number
  },
  data() {
    return {
      formData: {
        name: "",
        option: [],
        category_id: ""
      },
      rules: {
        name: [{ required: true, message: "请输入规格名称!", trigger: "blur" }],
        option: [
          {
            required: true,
            message: "请至少有一个规格属性！",
            trigger: "change"
          }
        ],
        category_id: [
          { required: true, message: "请选择分类!", trigger: "change" }
        ]
      }
    };
  },
  components: {
    mySelect
  },
  methods: {
    handleSubmit() {
      this.$refs.specForm.validate(valid => {
        if (valid) {
          if (!this.type) {
            this.addSpec();
          } else this.updateSpec();
        } else {
          this.$message.error("存在错误信息！");
          return false;
        }
      });
    },
    addSpec() {
      spec
        .addSpec(
          this.formData.name,
          this.formData.category_id,
          this.formData.option
        )
        .then(res => {
          if (!res.data.status) {
            this.$message.success("添加规格成功!");
            this.$emit("handleCloseDialog");
          } else this.$message.error("添加规格失败!");
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    updateSpec() {
      spec
        .updateSpec(
          this.formData._id,
          this.formData.name,
          this.formData.category_id,
          this.formData.option
        )
        .then(res => {
          if (!res.data.status) {
            this.$message.success("修改规格成功!");
            this.$emit("handleCloseDialog");
          } else this.$message.error("修改规格失败!");
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    }
  },
  watch: {
    dialogData(val) {
      this.formData = { ...val };
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="stylus">
/deep/.el-dialog
    text-align left
/deep/.el-select
    width 100%
</style>
