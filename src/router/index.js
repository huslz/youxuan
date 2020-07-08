import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.replace = function replace(location) {
  return routerPush.call(this, location).catch(error => error);
};
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
    component: () => import("../views/Login.vue")
  },
  {
    path: "/index",
    redirect: "/home",
    name: "index",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          keepAlive: true
        },
        component: () => import("../views/home.vue")
      },
      {
        path: "/category",
        name: "category",
        component: () => import("../views/category.vue"),
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
        component: () => import("../views/product.vue")
      },
      {
        path: "/spec",
        name: "spec",
        meta: {
          keepAlive: true
        },
        component: () => import("../views/spec.vue")
      },
      {
        path: "/user",
        name: "user",
        meta: {
          keepAlive: true
        },
        component: () => import("../views/user.vue")
      },
      {
        path: "/role",
        name: "role",
        meta: {
          keepAlive: true
        },
        component: () => import("../views/role.vue")
      },
      {
        path: "/order",
        name: "order",
        meta: {
          keepAlive: true
        },
        component: () => import("../views/order.vue")
      }
    ]
  },
  {
    path: "*",
    component: () => import("../views/notFound.vue")
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
