import store from "@/store";
import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);

  let loginUser = store.state.user.loginUser;

  //自动登录
  if (!loginUser || !loginUser.userRole) {
    //使用await阻断用户登录，成功之后再执行后续代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //要跳转的页面需要登陆的话
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      //todo 如果登录后不应该直接跳转，应该再次进行鉴权
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //已登录权限不足，跳转到无权限界面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
