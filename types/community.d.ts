declare global {
    interface ICommunity {
        areaId: string;
        areaName: string;
    }

    interface IDoor {
        areaId: string;
        areaName: string;
        buildCode: string;
        buildId: string;
        buildName: string;
        deviceAddr: string;
        deviceGuid: string;
        deviceName: string;
        guardType: string;
        haveDevice: boolean;
        houseCode: string;
        houseId: string;
        id: string;
        unitCode: string;
        unitName: string;
    }
}
