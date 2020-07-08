<template>
  <div class="categoryHeader">
    <div class="nav">
      <slot name="title" class="title"></slot>
    </div>
    <div class="add" v-if="showAdd">
      <el-button type="primary" @click="$emit('handleHeaderAdd')">{{title}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryHeader",
  props: {
    showAdd: {
      type: Boolean,
      default: true
    },
    title:{
      type: String
    }
  }
};
</script>

<style scoped lang="stylus">
.nav
    float left
.el-input
    width 150px
    margin-left 20px
    margin-right 20px
.add
    float right
</style>
