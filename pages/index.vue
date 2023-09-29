<script lang="ts" setup>
import {onMounted} from "vue";
import useUserStore from "../stores/user";
import {navigateTo} from "nuxt/app";

const userStore = useUserStore();
onMounted(() => {
  const targetPath = userStore.isLoggedIn ? '/home' : '/login';
  navigateTo({path: targetPath}, {replace: true})
})
</script>

<template>
  <div>Loading</div>
</template>
