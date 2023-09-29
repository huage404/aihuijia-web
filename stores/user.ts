import {defineStore} from 'pinia';
import to from "await-to-js";
import {userLogin} from "../services/user";
import {ELocalStorageKey} from '../config/enum'
import {navigateTo} from "nuxt/app";

const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userInfo: null as IUserInfo
    }),

    getters: {
        isLoggedIn(): boolean {
            return !!this.token
        }
    },

    actions: {
        setToken(token: string){
          this.token = token;
        },
        setUserInfo(data: IUserInfo){
          this.userInfo = data;
        },

        async login(params: {
            userName: string;
            passwd: string;
        }) {
            const [err, res] = await to(userLogin(params));
            if (err || !res?.data) {
                console.info("🚀 ~ log info: ----- 登陆失败:");
                return;
            }
            this.loginSuccess(res.data);
        },

        loginSuccess(data: {
            token: string;
            userInfo: IUserInfo
        }) {
            this.setToken(data.token);
            this.setUserInfo(data.userInfo);
            localStorage.setItem(ELocalStorageKey.TOKEN, data.token);
            localStorage.setItem(ELocalStorageKey.USER_INFO, JSON.stringify(data.userInfo));
        },

        logout() {
            this.token = '';
            this.userInfo = null;
            localStorage.removeItem(ELocalStorageKey.TOKEN);
            localStorage.removeItem(ELocalStorageKey.USER_INFO);

            navigateTo({
                path: '/login'
            }, {
                replace: true
            })
        }
    }
})

export default useUserStore;
