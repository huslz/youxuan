import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.replace = function replace(location) {
//   return routerPush.call(this, location).catch(error => error);
// };
const routes = [
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: (resolve) => require(["../views/Login.vue"],resolve)
  },
  {
    path: "/index",
    redirect: "/home",
    name: "index",
    component: (resolve) => require(["../views/Index.vue"],resolve),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(["../views/home.vue"],resolve)
      },
      {
        path: "/category",
        name: "category",
        component: (resolve) => require(["../views/category.vue"],resolve),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/product",
        name: "product",
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(["../views/product.vue"],resolve)
      },
      {
        path: "/spec",
        name: "spec",
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(["../views/spec.vue"],resolve)
      },
      {
        path: "/user",
        name: "user",
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(["../views/user.vue"],resolve)
      },
      {
        path: "/role",
        name: "role",
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(["../views/role.vue"],resolve)
      },
      {
        path: "/order",
        name: "order",
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(["../views/order.vue"],resolve)
      }
    ]
  },
  {
    path: "*",
    component: (resolve) => require(["../views/notFound.vue"],resolve)
  }
];

const router = new VueRouter({
  routes,
  mode: "hash"
});
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;

  const isChunkLoadFailed = error.message.match(pattern);

  const targetPath = router.history.pending.fullPath;

  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
router.beforeEach((to, from, next) => {
  if (to.path == "/login" || (localStorage["token"] && to.path != "/login")) {
    next();
  } else {
    router.replace("/login");
  }
  if (to.path == "/login" && localStorage["token"]) router.replace("/index");
});
export default router;
