
import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMember = () => sendGet(`/AdminGetMembers`);
export const deleteMemberF3 = (payload: any) =>
  sendPost(`/AdminDeleteMember`, payload);
export const getListMemberF12 = () => sendGet(`/AdminGetUsers`);
export const deleteMemberF12 = (payload: any) =>
  sendPost(`/AdminDeleteUser`, payload);
export const updateAccount = (payload: any) =>
  sendPost(`/AdminAcceptUser`, payload);
export const updateMemberF3 = (payload: any) =>
  sendPost(`/AdminAcceptMember`, payload);
export const getListClub = () => sendGet(`/GetNameClub`);
export const updateMultiAchie = (payload: any) =>
  sendPost(`/UpdateMultiData.php`, payload);
export const findMember = (payload:any)=>sendGet(`Find?data=${payload}`)
const path = {
    accountAdmin: '/AdminGetUserID?id=',
}
export const getInforAdmin= (param:any) => sendGet('/AdminGetUserID?id='+param)

