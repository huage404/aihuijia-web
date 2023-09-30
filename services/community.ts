import {useRequest} from "../composables/request";

// 获取授权小区列表
export const getCommunityList = (userId: string) => {
    return useRequest('/api/appApi/mqi/pageOrData/77a54089a2894bf68fea8c1732871deb', {
        method: 'POST',
        body: {
            init: 0,
            pageNum: 1,
            pageSize: 10,
            queryPair: {
                userId
            }
        }
    })
}


// 获取小区可被控制的门列表
export const getDoorList = (params: {
    userId: string;
    areaId: string
}) => {
    return useRequest('/api/appApi/device/device/findListByUserId', {
        method: 'GET',
        params: {
            ...params,
            isMore: 1
        }
    })
}

// 开启门禁
export const enableAccessControl = (data: {
    userId: string;
    deviceGuid: string;
    houseId: string;
}) => {
    return useRequest('/api/appApi/bus/gateDevice/open', {
        method: 'POST',
        body: {
            userId: data.userId,
            houseId: data.houseId,
            sid: data.deviceGuid,
            openType: 'B'
        }
    })
}
