<script lang="ts" setup>
import useCommunityStore from "../../stores/community";
import {onMounted} from "vue";

const communityStore = useCommunityStore();
onMounted(() => {
  communityStore.getAuthorizedCommunityList();
})
</script>

<template>
  <n-layout-sider
      collapse-mode="width"
      :collapsed-width="40"
      :width="140"
      :native-scrollbar="true"
      :show-collapsed-content="false"
      show-trigger="arrow-circle"
      bordered
      :default-collapsed="true"
  >
    <n-list hoverable clickable>
      <n-list-item v-for="item in communityStore.communityList" :key="item.areaId">
        <n-thing :title="item.areaName" content-style="margin-top: 10px;" @click="communityStore.toggleCurrentCommunity(item)" />
      </n-list-item>
    </n-list>
  </n-layout-sider>
</template>
