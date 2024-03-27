import { sendGet, sendPost } from "./api"

const path = {
    accountAdmin: '/AdminGetUserID?id=',
}

export const getInforAdmin= (param:any) => sendGet('/AdminGetUserID?id='+param)