import { sendDelete, sendGet, sendPost, sendPut } from "./api";
export const getListMemberF3 = (payload?:any)=>sendGet(`Members`);
