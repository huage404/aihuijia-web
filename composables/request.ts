import {merge} from 'lodash';
import {$fetch} from 'ofetch';
import useUserStore from "~/stores/user";

type FetchType = typeof $fetch;
type ReqType = Parameters<FetchType>[0];
type FetchOptions = Parameters<FetchType>[1];

export const useRequest = <T = unknown>(request: ReqType, opts?: FetchOptions) => {
    const token = useUserStore().token;

    const defaultOpts = {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        },
        onRequestError: onRequestError,
        onResponseError: onResponseError
    } as FetchOptions;

    return $fetch<IResponse<T>>(request, merge(defaultOpts, opts))
}

const onRequestError = ({error, request}) => {
    console.error(`🚀 ~ log error: ----- ${request}`, error.message);
}

const onResponseError = ({response}) => {
    const userStore = useUserStore();
    console.info("🚀 ~ log info: ----- parseInt(response.status):", parseInt(response.status));
    switch (parseInt(response.status)){
        case 400:
            console.error("🚀 ~ log error: ----- 参数错误");
            break;
        case 401:
            console.error("🚀 ~ log error: ----- 没有访问权限，登陆信息过期，重新登录");
            userStore.logout();
            break;
        case 403:
            console.error("🚀 ~ log error: ----- 服务器拒绝访问");
            break;
        case 404:
            console.error("🚀 ~ log error: ----- 请求地址错误");
            break;
        case 500:
            console.error("🚀 ~ log error: ----- 服务器故障");
            break;
        default:
            console.error("🚀 ~ log error: ----- 网络链接错误");
            break;
    }
}
