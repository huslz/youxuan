<template>
  <div class="login-wrap">
    <div class="bg"></div>
    <div class="login-container">
      <div class="title">
        登陆
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" :disabled="showLoading">
        <el-form-item prop="account">
          <div class="account">
            <label for="account" class="item"
              ><img src="../assets/imgs/user_icon_copy.png" alt=""/></label
            ><el-input
              id="account"
              class="item"
              placeholder="用户名"
              autocomplete="off"
              v-model="loginForm.account"
            />
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="password">
            <label class="item" for="password"
              ><img src="../assets/imgs/lock_icon_copy.png" alt=""/></label
            ><el-input
              id="password"
              class="item"
              placeholder="密码"
              autocomplete="off"
              type="password"
              v-model="loginForm.password"
            />
          </div>
        </el-form-item>
        <el-form-item prop="code">
          <div class="virifiCode">
            <label class="item" for="virifi"
              ><img src="../assets/imgs/key.png" alt=""/></label
            ><el-input
              id="virifi"
              class="item"
              placeholder="验证码"
              autocomplete="off"
              v-model="loginForm.code"
            />
            <div class="code item">{{ code }}</div>
          </div>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="handleLogin">登陆</el-button>
      </div>
    </div>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import api from "../api/login";
import loading from "../components/loading";
export default {
  name: "Login",
  data() {
    return {
      code: "",
      showLoading:false,
      isChecked: false,
      loginForm: {
        account: "",
        password: "",
        code: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号!", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码!", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码!", trigger: "blur" }]
      }
    };
  },
  components:{
    loading
  },
  methods: {
    generateCode() {
      for (let i = 0; i < 4; i++) {
        let str = Math.round(Math.random() * 9);
        this.code += str;
      }
    },
    handleLogin() {
      this.showLoading = true;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.isChecked = !this.isChecked;
          if(this.code!==this.loginForm.code){
            this.$message.error("验证码错误!");
            this.showLoading = false;
            return;
          }
          api
            .loginCheck(this.loginForm.account, this.loginForm.password)
            .then(res => {
              this.showLoading = false;
              if (!res.data.status) {
                let userData = {};
                userData.username = res.data.data.username;
                userData.id = res.data.data._id;
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userData", JSON.stringify(userData));
                this.$router.replace("/index");
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(() => {
              this.$message.error("服务器错误!");
            });
        } else this.$message.error("存在错误信息!");
      });
    }
  },
  mounted() {
    this.generateCode();
  }
};
</script>

<style scoped lang="stylus">
.login-wrap
  position: absolute;
  left 0
  top 0
  width 100%
  height 100%
  .bg
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -2
  .login-container
    position absolute
    left 50%
    top 50%
    transform  translate(-50%,-50%)
    height 440px
    width 320px
    box-shadow -15px 15px 15px rgb(6,17,47)
    background #19aa8d
    opacity .7
    padding 100px 40px 40px
    color #eee
    overflow hidden
    text-align left
    .title
      padding 20px 0
      margin-left 10px
      font-size 18px
    .item
      display inline-block
      margin-left 10px
      font-size 16px
      img
        opacity .5
      img:focus
        opacity 1
    .virifiCode
        white-space nowrap
        .code
          background #19aa8d
          padding 0 10px
          border-radius 20px
    .footer
        margin-top 60px
        text-align right
input:-internal-autofill-selected
  background transparent!important
  -webkit-appearance none!important
.el-input
  width auto
  /deep/.el-input__inner
      background transparent
      border 0
      color white
.el-form-item
  /deep/.el-form-item__error
    left 50px
.el-form-item
  margin-bottom 30px
</style>
