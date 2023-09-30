import {defineStore} from 'pinia';
import to from "await-to-js";
import {enableAccessControl, getCommunityList, getDoorList} from "../services/community";
import useUserStore from "./user";

const useCommunityStore = defineStore('community', {
    state: () => ({
        currentCommunity: null,
        communityList: [],
        controllableDoorList: [],
    }),

    actions: {
        async getAuthorizedCommunityList() {
            const userStore = useUserStore()
            const [err, res] = await to(getCommunityList<ICommunity[]>(userStore?.userInfo.id));
            if (err || !res?.data?.list?.length) {
                return;
            }
            this.communityList = res.data.list;
            this.currentCommunity = res.data.list[1];
            await this.getControllableDoorList();
        },

        async getControllableDoorList() {
            const userStore = useUserStore()
            const params = {
                areaId: this.currentCommunity?.areaId,
                userId: userStore.userInfo.id
            }
            const [err, res] = await to(getDoorList<IDoor[]>(params));
            if (err || !res?.data?.length) {
                return;
            }
            this.controllableDoorList = res.data;
        },

        toggleCurrentCommunity(community: ICommunity) {
            this.currentCommunity = community;
            this.getControllableDoorList();
        },

        async enableAccessControl(data: {
            userId: string;
            deviceGuid: string;
            houseId: string;
        }) {

            const [err] = await to(enableAccessControl(data));
            if(err){
                return;
            }
        }
    }
})

export default useCommunityStore;
