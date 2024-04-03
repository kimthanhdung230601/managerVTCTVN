import { sendDelete, sendGet, sendPost, sendPut } from "./api";
import { isAdmin } from "./ApiUser";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY || "";
export const getListMemberF3 = (payload: any) =>
  sendGet(`/Members?club=${payload}`);
export const editNote = (payload: any) =>
  sendPost('/EditNoteMemberID', payload);
export const deleteMemberF3 = (payload: any) =>
  sendPost('/DeleteMemberID', payload);
export const addNewF3 = (payload: any) => sendPost("/AddMember", payload);

export const getInforAdmin= (param:any) => {
  const idDecode = decodeURIComponent(param)
  const bytes = CryptoJS.AES.decrypt(idDecode, secretKey);
  const id = bytes.toString(CryptoJS.enc.Utf8)
  if(isAdmin() === "1") return sendGet(`/ManageGetUserID?id=1`)
  return sendGet('/AdminGetUserID?id='+id)
}
export const getFilterTable = (path: string, param:string) => sendGet(path+param)
export const searchInTable = (param: any) => sendGet('/FindData?data='+param)
