import { sendDelete, sendGet, sendPost, sendPut } from "./api";
export const getListMemberF3 = (payload?:any)=>sendGet(`Members`);
export const getInforF3 = (payload: any) => sendGet(`/GetMemberID?id=${payload}`)