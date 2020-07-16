<template>
  <div class="productAddAndUpdate">
    <el-card>
      <el-page-header
        @back="$emit('goBack')"
        :content="!type ? '添加商品' : '修改商品'"
      ></el-page-header>
      <el-divider></el-divider>
      <el-form
        :model="addForm"
        label-width="100px"
        :rules="rules"
        ref="productForm"
      >
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="addForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model.number="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="categoryId">
          <el-select v-model="addForm.categoryId">
            <el-option
              v-for="(item, index) in selectData"
              :label="item.name"
              :value="item._id"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            ref="upload"
            name="image"
            action="http://118.24.25.7:5000/api/manage/img/upload"
            list-type="picture-card"
            drag
            :auto-upload="true"
            :on-success="handleSuccess"
            :before-upload="showTips"
            :on-error="showError"
            :on-remove="handleRemove"
            :multiple="true"
            accept=".png,.jpg,.gif"
            :headers="header"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品详情" prop="detail">
          <div class="editor-container">
            <quill-editor
              v-model="addForm.detail"
              :options="editorOption"
              @ready="onEditorReady($event)"
              ref="myQuillEditor"
              class="editor"
            ></quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="$refs['productForm'].resetFields()">重置</el-button>
          <el-button type="primary" @click="handleSubmit"
            ><a v-if="!type">确定添加</a><a v-else>确定修改</a></el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import category from "../api/category";
import product from "../api/product";
export default {
  name: "productAddAndUpdate",
  props: {
    parentData: Object,
    type: Number
  },
  data() {
    return {
      addForm: {
        name: "",
        desc: "",
        price: "",
        detail: "",
        imgs: [],
        pCategoryId: "0",
        categoryId: "",
        spec: ""
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入商品描述", trigger: "blur" }],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格为数字类型!" }
        ],
        detail: [
          { required: true, message: "请输入商品详情", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ]
      },
      selectData: [],
      editorOption: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
          ["blockquote", "code-block"], // 引用  代码块
          [{ header: 1 }, { header: 2 }], // 1、2 级标题
          [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
          [{ script: "sub" }, { script: "super" }], // 上标/下标
          [{ indent: "-1" }, { indent: "+1" }], // 缩进
          // [{'direction': 'rtl'}],                        // 文本方向
          [{ size: ["small", false, "large", "huge"] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
          [{ font: [] }], // 字体种类
          [{ align: [] }], // 对齐方式
          ["clean"] // 清除文本格式
        ], //工具菜单栏配置
        placeholder: "请输入内容...", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      },
      header: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
  },
  methods: {
    getCategoryData() {
      category
        .getCategory(this.addForm.pCategoryId)
        .then(res => {
          if (!res.data.status) this.selectData = res.data.data.list;
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    onEditorReady(){
    },
    showTips(file) {
      if (!this.addForm.name) {
        this.$message.error("请先输入商品名称!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      } else {
        this.$notify({
          title: "提示",
          message: file.name + "开始上传"
        });
      }
      return isLt2M;
    },
    handleSuccess(res, file) {
      this.addForm.imgs.push(res.data.name);
      this.$notify({
        title: "提示",
        message: file.name + "上传成功!"
      });
    },
    handleRemove(file) {
      this.addForm.imgs.splice(
        this.addForm.imgs.findIndex(value => value === file.name),
        1
      );
    },
    showError(err, file) {
      this.$notify({
        title: "提示",
        message: file.name + "上传失败!"
      });
    },
    handleSubmit() {
      this.$refs.productForm.validate(valid => {
        if (valid) {
          if (!this.type) this.addProduct();
          else this.updateProduct();
        } else {
          this.$message.error("存在错误信息!");
          return false;
        }
      });
    },
    addProduct() {
      product
        .addProduct(
          this.addForm.categoryId,
          this.addForm.pCategoryId,
          this.addForm.name,
          this.addForm.desc,
          this.addForm.price,
          this.addForm.detail,
          this.addForm.imgs
        )
        .then(res => {
          if (!res.data.status) this.$message.success("添加商品成功!");
          else this.$message.error("添加商品失败!");
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    },
    updateProduct() {
      product
        .updateProduct(
          this.addForm._id,
          this.addForm.categoryId,
          this.addForm.pCategoryId,
          this.addForm.name,
          this.addForm.desc,
          this.addForm.price,
          this.addForm.detail,
          this.addForm.imgs
        )
        .then(res => {
          if (!res.data.status) this.$message.success("更新商品成功!");
          else this.$message.error("更新商品错误!");
        })
        .catch(() => {
          this.$message.error("服务器错误!");
        });
    }
  },
  mounted() {
    if (this.parentData.imgs) this.addForm = { ...this.parentData };
    this.addForm.imgs = this.addForm.imgs.notEmpty();
    this.getCategoryData();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    fileList() {
      let list = [];
      this.addForm.imgs.forEach(val => {
        let url =
          val.indexOf("http://118.24.25.7:5000/upload/") === -1
            ? "http://118.24.25.7:5000/upload/" + val
            : val;
        let item = {
          name: val,
          url: url
        };
        list.push(item);
      });
      return list;
    }
  }
};
</script>

<style scoped lang="stylus">
/deep/.el-upload-dragger
    height 148px
    width 148px
/deep/.el-form-item__content
    text-align left
.editor-container
  width 100%
  height 300px
/deep/.ql-editor
  height 200px !important
</style>
