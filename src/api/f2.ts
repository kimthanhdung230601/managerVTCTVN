import { sendDelete, sendGet, sendPost, sendPut } from "./api";
import { isAdmin } from "./ApiUser";

export const getListMemberF3 = (payload: any) =>
  sendGet(`/Members?club=${payload}`);
export const editNote = (payload: any) =>
  sendPost('/EditNoteMemberID', payload);
export const deleteMemberF3 = (payload: any) =>
  sendPost('/DeleteMemberID', payload);
export const getInforF3 = (payload: any) =>
  sendGet(`/GetMemberID?id=${payload}`);
export const addNewF3 = (payload: any) => sendPost("/AddMember", payload);

export const getInforAdmin= (param:any) => {
  if(isAdmin() === "1") return sendGet(`/ManageGetUserID?id=`+param)
  return sendGet('/AdminGetUserID?id='+param)
}
export const getFilterTable = (path: string, param:string) => sendGet(path+param)
export const searchInTable = (param: any) => sendGet('/FindData?data='+param)
