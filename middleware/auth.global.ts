import useUserStore from "../stores/user";
import {navigateTo, useNuxtApp, defineNuxtRouteMiddleware} from "nuxt/app";
import {ELocalStorageKey} from "../config/enum";
import {isJson} from "../utils";

export default defineNuxtRouteMiddleware((to) => {
    const app = useNuxtApp();
    const userStore = useUserStore();

    if (process.client && app.isHydrating) {
        loadDataFromLocalStorage();
        return;
    }

    if(!userStore.isLoggedIn && to.path !== '/login'){
        return navigateTo({
            path: '/login'
        })
    }
})

const loadDataFromLocalStorage = () => {
    const userStore = useUserStore();

    const token = localStorage.getItem(ELocalStorageKey.TOKEN);
    const userInfo = localStorage.getItem(ELocalStorageKey.USER_INFO);

    userStore.setToken(token);
    if(isJson(userInfo)){
        userStore.setUserInfo(JSON.parse(userInfo));
    }
}
