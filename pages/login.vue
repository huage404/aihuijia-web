<script lang="ts" setup>
import {reactive} from 'vue'
import useUserStore from "../stores/user";
import to from "await-to-js";
import {navigateTo} from "nuxt/app";

const userStore = useUserStore();

const fromData = reactive({
  userName: '15797782051',
  passwd: 'xiazhenhua123.'
})

const handleLoginBtnClick = async () => {
  const [err] = await to(userStore.login(fromData));
  if(err){
    console.error(err.message);
    return;
  }
  if (userStore.isLoggedIn) {
    navigateTo({
      path: '/'
    }, {
      replace: true
    })
  }
}
</script>

<template>
  <n-card>
    <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" tab="登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input v-model:value="fromData.userName"/>
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input v-model:value="fromData.passwd"/>
          </n-form-item-row>
        </n-form>
        <n-button @click="handleLoginBtnClick" type="primary" block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
