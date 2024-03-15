<script setup>
import _service from "@/service";
import { ref } from "vue";
import router from "@/router";
import { sha256 } from 'js-sha256'

const email = ref('');
const password = ref('');

const submitForm = () => {

  let params = {
    username: email.value,
    pwd: sha256(password.value)
  }

  _service.login(params).then(res => {
    if (res.code === "200") {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      // 登陆成功，缓存用户信息
      // useUserStore().setUserInfo({
      //   userId: res.data.userId,
      //   username: res.data.username,
      //   token: res.data.token
      // })
      ElNotification({ type: 'success', message: '登陆成功!' });
      // 跳转到首页
      router.push({ path: '/' })
    } else {
      ElNotification({ type: 'warning', message: '登录失败!' });
    }
  })
}

const toSignup = () => {
  router.push({ path: '/signup' })
}
</script>

<template>
  <div class="container">
    <h1>登陆</h1>
    <form>
      <div class="form-group">
        <label for="email">用户名/邮箱</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="actionButton">
        <button type="submit" @click.prevent="submitForm">登陆</button>
        <a type="submit" @click.prevent="toSignup">立即注册</a>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #007aff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.actionButton {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.actionButton>a {
  color: #007aff;
  font-size: 1rem;
  cursor: pointer;
}
</style>
