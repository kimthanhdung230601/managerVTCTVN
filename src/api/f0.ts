
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
export const getInforAdmin= (param:any) => sendGet('/AdminGetUserID?id='+param)

export const upLoadImage = (param: any) => sendPost("/AdminUploadImage", param)
export const addNews = (param: any) =>  sendPost ("/AdminAddNews", param)
export const getListNews = (page: string, category: string) => sendGet("/GetListNews?page="+ page + "&category=" + category)
export const getNewsbyID = (param: any) =>  sendGet(`/GetNewsID?id=${param}`)
