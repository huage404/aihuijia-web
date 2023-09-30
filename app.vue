<script lang="ts" setup>
import {NConfigProvider, GlobalThemeOverrides, zhCN, dateZhCN} from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#FF0000'
  },
  Button: {
    textColor: '#FF0000'
  }
}
</script>


<template>
  <Html>
    <n-config-provider
        preflight-style-disabled
        :locale="zhCN"
        :date-locale="dateZhCN"
        :theme-overrides="themeOverrides"
    >
      <n-message-provider>
        <NuxtLayout>
          <NuxtPage/>
        </NuxtLayout>
      </n-message-provider>
      <n-global-style/>
    </n-config-provider>
  </Html>
</template>
