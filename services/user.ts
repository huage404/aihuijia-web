import {useRequest} from "../composables/request";

export const userLogin = (data: {
    userName: string;
    passwd: string;
}) => {
    return useRequest<{
        token: string;
        userInfo: IUserInfo
    }>('/api/appApi/auth/app/login', {
        method: 'POST',
        body: {
            ...data,
            phoneType: "2"
        }
    })
}
