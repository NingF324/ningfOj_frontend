<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 10px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userName" label="用户名称">
        <a-input v-model="form.userName" placeholder="请输入用户名称" />
      </a-form-item>
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item field="confirmPassword" label="确认密码">
        <a-input-password
          v-model="form.confirmPassword"
          placeholder="请确认密码"
          @input="confirmPassword"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" style="width: 120px" type="primary"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userName: "",
  userAccount: "",
  userPassword: "",
  confirmPassword: "",
} as UserLoginRequest);
const router = useRouter();

const store = useStore();

//todo 前端完成对密码的校验
/*const confirmPassword = () => {
  if (form.userPassword === form.confirmPassword) {

  }
};*/
/**
 * 提交表单
 * @param form
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      //使用replace避免回退时会返回登录页
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>
