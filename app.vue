<script lang="ts" setup>
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

import {NConfigProvider, GlobalThemeOverrides, zhCN, dateZhCN} from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#FF0000'
  },
  Button: {
    textColor: '#FF0000'
  }
}

useHead({
  meta: [{name: 'naive-ui-style'}]
})

</script>


<template>
  <NuxtLayout>
    <n-config-provider
        preflight-style-disabled
        :locale="zhCN"
        :date-locale="dateZhCN"
        :theme-overrides="themeOverrides"
    >
      <NuxtPage/>
      <n-global-style/>
    </n-config-provider>
  </NuxtLayout>
</template>
