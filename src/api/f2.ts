import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMemberF3 = (payload:any)=>sendGet(`/Members?club=${payload}`);
export const editNote = (payload:any)=> sendPost(`/EditNoteMemberID`,payload);
export const deleteMemberF3 = (payload:any)=> sendPost(`DeleteMemberID`,payload);
export const getInforF3 = (payload:any) => sendGet(`/GetMemberID?id=${payload}`)
export const addNewF3 = (payload:any)=> sendPost("/AddMember",payload);