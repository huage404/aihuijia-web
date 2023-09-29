import {merge} from 'lodash';

type FetchType = typeof $fetch;
type ReqType = Parameters<FetchType>[0];
type FetchOptions = Parameters<FetchType>[1];

export const request = <T = unknown>(request: ReqType, body?: any, opts?: FetchOptions) => {
    const token = '';

    const defaultOpts = {
        baseURL: '/api',
        headers: {
            Authorization: token
        },
        onRequestError: onRequestError,
        onResponseError: onResponseError
    } as FetchOptions;

    return $fetch<T>(request, merge(defaultOpts, opts))
}

const onRequestError = () => {
    console.error("🚀 ~ log error: ----- 请求出错，请重试!");
}

const onResponseError = ({response}) => {
    switch (response.status){
        case 400:
            console.error("🚀 ~ log error: ----- 参数错误");
            break;
        case 401:
            console.error("🚀 ~ log error: ----- 没有访问权限，登陆信息过期，重新登录");
            navigateTo({
                path: '/login'
            });
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
            console.error("🚀 ~ log error: ----- 忘了链接错误");
            break;
    }
}
