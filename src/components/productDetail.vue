<template>
  <div class="productDetail">
    <el-card>
      <el-page-header
        @back="$emit('goBack')"
        content="商品详情"
      ></el-page-header>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="3"> <el-tag>商品名称</el-tag></el-col>
        <el-col :span="21">{{ data.name }}</el-col>
      </el-row>
      <el-divider><i class="el-icon-shopping-cart-full"></i></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>商品描述</el-tag>
        </el-col>
        <el-col :span="21">{{ data.desc }}</el-col>
      </el-row>
      <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>商品价格</el-tag>
        </el-col>
        <el-col :span="21">{{ data.price }}元</el-col>
      </el-row>
      <el-divider><i class="el-icon-money"></i></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>所属分类</el-tag>
        </el-col>
        <el-col :span="21">{{ category }}</el-col>
      </el-row>
      <el-divider><i class="el-icon-folder-opened"></i></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>规格属性</el-tag>
        </el-col>
        <el-col :span="21">
          {{ spec }}
        </el-col>
      </el-row>
      <el-divider><i class="el-icon-folder-opened"></i></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>商品图片</el-tag>
        </el-col>
        <el-col :span="21">
          <el-image
            style="width: 100px;height: 100px"
            v-for="(item, index) in src"
            :src="item"
            :key="index"
            fit="fill"
            :preview-src-list="src"
          >
          </el-image>
        </el-col>
      </el-row>
      <el-divider><i class="el-icon-picture-outline"></i></el-divider>
      <el-row>
        <el-col :span="3">
          <el-tag>商品详情</el-tag>
        </el-col>
        <el-col :span="21">
          <div v-html="data.detail"></div>
        </el-col>
      </el-row>
      <el-divider><i class="el-icon-set-up"></i></el-divider>
    </el-card>
  </div>
</template>

<script>
import category from "../api/category";
export default {
  name: "productDetail",
  props: {
    data: Object
  },
  data() {
    return {
      category: "无",
      spec: "无"
    };
  },
  methods: {},
  computed: {
    src() {
      let img = [];
      this.data.imgs.notEmpty().map(value => {
        let url =
          value.indexOf("http://118.24.25.7:5000/upload/") === -1
            ? "http://118.24.25.7:5000/upload/" + value
            : value;
        img.push(url);
      });
      return img;
    }
  },
  mounted() {
    category
      .getCategoryName(this.data.categoryId)
      .then(res => {
        if (!res.data.status) this.category = res.data.data.name;
      })
      .catch(() => {
        this.$message.error("服务器错误!");
      });
  }
};
</script>

<style scoped lang="stylus">
/deep/.el-col
    text-align left
.content
    margin-left 20px
/deep/.el-image
    margin-left 20px
</style>
