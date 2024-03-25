import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMember = ()=>sendGet(`/AdminGetMembers`);
export const deleteMemberF3 = (payload:any)=> sendPost(`/AdminDeleteMember`,payload);
export const getListMemberF12 = ()=> sendGet(`/AdminGetUsers`);
export const deleteMemberF12 = (payload:any)=> sendPost(`/AdminDeleteUser`,payload)