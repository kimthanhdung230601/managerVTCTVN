import { sendDelete, sendGet, sendPost, sendPut } from "./api";
export const getListMemberF3 = ()=>sendGet(`/Members`);
export const editNote = (payload:any)=> sendPost(`/EditNoteMemberID`,payload);
export const deleteMemberF3 = (payload:any)=> sendPost(`DeleteMemberID`,payload);
