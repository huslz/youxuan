<template>
  <div class="index">
    <el-container class="wrap">
      <el-aside class="aside-nav" :class="isListOut ? '' : 'aside-nav-in'">
        <div class="aside-nav-header">
          <div class="user-img">
            <img :src="userImg" />
          </div>
          <div class="clear">
            <span class="user-name">
              {{ userName }}
            </span>
            <span class="user-identity">
              {{ userIdentity }}
            </span>
          </div>
        </div>
        <el-menu @select="handleMenuClick" :default-active="activeIndex">
          <el-menu-item
            v-for="(val, index) in firstMenuData"
            :index="val.index"
            :key="index"
          >
            <i :class="val.className"></i>
            <span slot="title">{{ val.value }}</span>
          </el-menu-item>
          <el-submenu
            v-for="value in secondMenuData"
            :index="value.index"
            :key="value.index"
          >
            <template slot="title"
              ><i :class="value.className"></i>{{ value.menuName }}</template
            >
            <el-menu-item
              v-for="ItemValue in value.menuItem"
              :index="ItemValue.index"
              :key="ItemValue.index"
            >
              <i :class="ItemValue.className"></i>
              <span slot="title">{{ ItemValue.value }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="list" @click="handleListClick">
            <img src="../assets/imgs/header-list.png" />
          </div>
          <div class="header-words">
            欢迎来到本系统!
          </div>
          <div class="header-item theme">
            <i class="el-icon-s-operation"></i>主题
          </div>
          <div class="header-item message">
            <i class="el-icon-message-solid"></i>消息
          </div>
          <div class="header-item mail">
            <i class="el-icon-message"></i>邮件
          </div>
        </el-header>
        <div class="page-tabs">
          <div class="icon item right cancel" @click="handleUserCancel">
            <i class="el-icon-switch-button"></i>退出
          </div>
          <el-dropdown
            class="icon item right close"
            @command="handleClosePage"
            trigger="click"
          >
            <span class="el-dropdown-link">
              关闭操作<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="all">关闭所有选项卡</el-dropdown-item>
              <el-dropdown-item>关闭其他选项卡</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="page-item-area item">
            <el-tabs
              v-model="editTableTabsValue"
              type="card"
              @tab-remove="removeTab"
              @tab-click="clickTab"
            >
              <el-tab-pane
                v-for="item in editTableTabs"
                :key="item.index"
                :label="item.value"
                :name="item.index"
                :closable="item.closable"
              >
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <el-main>
          <keep-alive :include="cacheList">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store/index";
export default {
  name: "Index",
  data() {
    return {
      userName: "黄钰云",
      userIdentity: "管理员",
      userImg:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      menuData: [
        {
          index: "3-1",
          className: "el-icon-menu",
          value: "首页",
          link: "/home",
          componentPath: "",
          closable: false
        },
        {
          index: "4",
          className: "el-icon-s-shop",
          menuName: "商品",
          menuItem: [
            {
              index: "4-1",
              value: "品类管理",
              link: "/category",
              componentPath: "",
              className: "el-icon-s-marketing",
              closable: true
            },
            {
              index: "4-2",
              value: "商品管理",
              link: "/product",
              componentPath: "",
              className: "el-icon-shopping-cart-full",
              closable: true
            },
            {
              index: "4-3",
              value: "规格属性",
              link: "/spec",
              componentPath: "",
              className: "el-icon-paperclip",
              closable: true
            }
          ]
        },
        {
          index: "6",
          className: "el-icon-user",
          menuName: "用户",
          menuItem: [
            {
              index: "6-1",
              value: "用户管理",
              link: "/user",
              componentPath: "",
              className: "el-icon-s-custom",
              closable: true
            },
            {
              index: "6-2",
              value: "权限管理",
              link: "/role",
              componentPath: "",
              className: "el-icon-setting",
              closable: true
            }
          ]
        },
        {
          index: "8",
          className: "el-icon-platform-eleme",
          menuName: "订单",
          menuItem: [
            {
              index: "8-1",
              value: "订单管理",
              link: "/order",
              componentPath: "",
              className: "el-icon-phone-outline",
              closable: true
            }
          ]
        }
      ],
      editTableTabsValue: "3-1",
      tabIndex: "0",
      editTableTabs: [
        {
          index: "3-1",
          className: "el-icon-menu",
          value: "首页",
          link: "/home",
          componentPath: "",
          closable: false
        }
      ],
      isOut: true,
      activeIndex: "3-1",
      pageCount: 0,
      isLogin: true,
      isListOut: true
    };
  },
  methods: {
    handleMenuClick(index) {
      for (let i = 0; i < this.AllMenuItem.length; i++) {
        let item = this.AllMenuItem[i];
        if (index === item.index) {
          let newTabName = item.index;
          if (
            !this.editTableTabs.some(value => {
              return value.index === item.index;
            })
          ) {
            this.editTableTabs.push(item);
          }
          this.$router.replace(item.link);
          this.editTableTabsValue = newTabName;
        }
      }
    },
    handleUserCancel(){
      localStorage.clear();
      this.$router.replace("/login");
    },
    handleListClick() {
      this.isListOut = !this.isListOut;
    },
    handleClosePage(command) {
      if (command === "all") {
        this.editTableTabs.splice(1, this.editTableTabs.length);
        this.editTableTabsValue = "3-1";
        this.$router.replace("/index");
      } else {
        this.editTableTabs.forEach((tab, index) => {
          if (tab.index === this.editTableTabsValue) {
            if (this.editTableTabs.length - 1 > index) {
              this.editTableTabs.splice(
                index + 1,
                this.editTableTabs.length - index
              );
              this.editTableTabs.splice(1, index - 1);
            } else {
              this.editTableTabs.splice(1, index - 1);
            }
          }
        });
      }
    },
    removeTab(targetName) {
      let tabs = this.editTableTabs;
      let activeName = this.editTableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.index === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.index;
              this.$router.replace(nextTab.link);
              this.activeIndex = nextTab.index;
            } else {
              this.activeIndex = "0";
            }
          }
        });
      }
      this.editTableTabsValue = activeName;
      this.editTableTabs = tabs.filter(tab => tab.index !== targetName);
    },
    clickTab(targetName) {
      let tabs = this.editTableTabs;
      tabs.forEach(tab => {
        if (tab.index === targetName.name) {
          this.$router.replace(tab.link);
          this.activeIndex = tab.index;
        }
      });
    }
  },
  watch: {
    editTableTabsValue(newVal) {
      this.activeIndex = newVal;
    },
    $route(newRoute) {
      const { name, path, meta } = newRoute;
      let newList = [...this.keepAliveList];
      let index = newList.findIndex(item => item.name === name);
      if (meta.keepAlive && index < 0) {
        // 需要缓存
        newList.push({ name, path, meta });
      }
      store.commit("setKeepAliveList", newList);
    },
    editTableTabs(newVal) {
      let List = [...this.keepAliveList];
      let newList = [];
      newList = List.filter(value => {
        return newVal.some(val => val.link === value.path);
      });
      store.commit("setKeepAliveList", newList);
    }
  },
  computed: {
    ...mapGetters(["keepAliveList"]),
    cacheList() {
      let cacheList = [];
      if (this.keepAliveList.length) {
        cacheList = [
          ...cacheList,
          ...this.keepAliveList
            .filter(item => {
              return item.meta && item.meta.keepAlive;
            })
            .map(item => item.name)
        ];
      }
      return cacheList;
    },
    secondMenuData() {
      return this.menuData.filter(value => {
        return value["menuItem"];
      });
    },
    firstMenuData() {
      return this.menuData.filter(value => {
        return !value["menuItem"];
      });
    },
    AllMenuItem() {
      let data = [];
      for (let i = 0; i < this.menuData.length; i++) {
        if (this.menuData[i]["menuItem"]) {
          for (let j = 0; j < this.menuData[i].menuItem.length; j++) {
            data.push(this.menuData[i].menuItem[j]);
          }
        } else data.push(this.menuData[i]);
      }
      return data;
    }
  },
  mounted() {
    window.addEventListener("load", () => {
      if (this.$route.path !== "/index") this.$router.replace("/index");
    });
  }
};
</script>
<style scoped lang="stylus">
a{
  text-decoration none;
  color #a7b1c2;
}
.router-link-active{
  text-decoration none;
  color #fff
}
.index {
  position absolute
  width 100%
  height: 100%;
  z-index 999
}
.wrap {
  height: 100%;
}
.el-menu{
  border-right 0
  text-align left
}
.el-menu-item{
  background #293846
  color #a7b1c2
  border-left 3px #19AA8D solid
}
.el-submenu{
  background #2f4050
  &:hover{
    background #293846
  }
}
.is-active{
  color white !important
}
.el-dropdown{
  border-bottom 0 !important
}
/deep/.el-submenu__title{
  color #a7b1c2
  /*padding-right  130px*/
  &:hover{
    background #293846
  }
}
.el-main{
}
.aside-nav{
  width: 220px !important
  transition .32s
  background #2f4050
  .aside-nav-header{
    background url("../assets/imgs/header-profile.png") no-repeat
    padding 33px 25px
    text-align left
    .user-img{
      width 64px
      height 64px
      border-radius 50%
      overflow hidden
      img{
        width 100%
        height 100%
      }
    }
    .user-name{
      display block
      font-weight 600
      font-size 16px
      color #DFE4ED
      margin-top 5px
      width 100px
    }
    .user-identity{
      display block
      font-size 12px
      color #8095a8
      width 100px
    }
    .clear{
      display block
      overflow hidden
    }
  }
}
.aside-nav-in{
  width 0px !important
}
.header{
  background #f3f3f4
  line-height 60px
  font-weight bold
  .list{
    cursor pointer
    float left
    width 38px
    height 30px
    background #19AA8D
    border-radius 3px
    margin-top 15px
    line-height 35px
  }
  .header-words{
    float left
    margin-left 10px
  }
  .header-item{
    float right
    padding 0 5px
    letter-spacing 5px
    color #999c9e
    margin-right 10px
  }
}
.page-tabs{
  min-height 40px
  max-height 40px
  overflow hidden
  position relative
  .icon-left{
    float left
  }
  .item{
    height 100%
    line-height 40px
    color #999c9e
    cursor pointer
  }
  .icon {
    min-width 40px
    padding 0 5px
    border solid 1px #eee
    letter-spacing 5px
    &:hover{
      background #f2f2f2
    }
  }
  .right {
    float right
  }
  .page-item-area{
    font-size 16px
    overflow hidden
    max-width calc(100%-(107px+69px))
    .page-item-area-wrap{
      width 500%
      transition .32s linear
      .page-item{
        height 100%
        min-width 40px
        float left
        padding 0 5px
        transition .32s linear
        border solid 1px #eee
        box-shadow 0 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.01) inset
        &:hover{
          background #f2f2f2
        }
        .page-item-close{
          margin-left 5px
          &:hover{
            color red
          }
        }
      }
    }
  }
}
.card-height{
  height 100%
}
</style>
