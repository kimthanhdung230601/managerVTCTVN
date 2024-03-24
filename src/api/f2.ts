import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMemberF3 = ()=>sendGet(`/Members`);
export const editNote = (payload:any)=> sendPost(`/EditNoteMemberID`,payload);
export const deleteMemberF3 = (payload:any)=> sendPost(`DeleteMemberID`,payload);
export const getInforF3 = (param:any) => sendGet("/GetMemberID?id="+param)
export const addNewF3 = (payload:any)=> sendPost("/AddMember",payload);