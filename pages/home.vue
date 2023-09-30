<script lang="ts" setup>
import SiderBar from "../components/home/SiderBar.vue";
import useCommunityStore from "../stores/community";
import useUserStore from "../stores/user";
import {useMessage} from "naive-ui";

const communityStore = useCommunityStore();
const userStore = useUserStore();
const message = useMessage()

const enableAccessControl = (item) => {
  const params = {
    userId: userStore.userInfo?.id,
    deviceGuid: item.deviceGuid,
    houseId: item.houseId
  }
  communityStore.enableAccessControl(params);
  message.success('开门成功')
}
</script>

<template>
    <div class="h-full flex flex-col">
      <n-layout-header :bordered="true">
        <n-page-header class="py-3 px-4" :title="communityStore.currentCommunity?.areaName" />
      </n-layout-header>
      <n-layout content-style="flex-1" has-sider sider-placement="left">
        <SiderBar/>
        <n-layout-content>
          <n-list hoverable>
            <n-list-item v-for="item in communityStore.controllableDoorList" :key="item.id">
              <n-thing :title="item.deviceName" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag v-if="item.areaName" :bordered="false" type="info" size="small">
                      {{ item.areaName }}
                    </n-tag>
                    <n-tag v-if="item.unitName" :bordered="false" type="info" size="small">
                      {{ item.unitName }}
                    </n-tag>
                  </n-space>
                </template>
              </n-thing>

              <template #suffix>
                <n-button type="info" size="tiny" @click="enableAccessControl(item)">
                  开门
                </n-button>
              </template>
            </n-list-item>
          </n-list>
        </n-layout-content>
      </n-layout>
    </div>
</template>
