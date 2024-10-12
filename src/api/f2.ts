import { sendDelete, sendGet, sendPost, sendPut } from "./api";
import { isAdmin } from "./ApiUser";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY || "";
export const getListMemberF3 = (payload: any) => sendGet(`/Members?${payload}`);
export const editNote = (payload: any) =>
  sendPost("/EditNoteMemberID", payload);
export const deleteMemberF3 = (payload: any) =>
  sendPost("/DeleteMemberID", payload);
export const addNewF3 = (payload: any) => sendPost("/AddMember", payload);

export const getInforAdmin = (param: any) => {
  const idDecode = decodeURIComponent(param);
  const bytes = CryptoJS.AES.decrypt(idDecode, secretKey);
  const id = bytes.toString(CryptoJS.enc.Utf8);
  if (isAdmin() === "1") return sendGet(`/ManageGetUserID?id=${id}`);
  return sendGet("/AdminGetUserID?id=" + id);
};
export const getFilterTable = (path: string, param: string) =>
  sendGet(path + param);
export const searchInTable = (param: any) => sendGet("/FindData?data=" + param);
export const getListMemberClubF2 = () => sendGet("/Fight2024");
export const submitListmember = (param: any) =>
  sendPost("/Fight2024?type=Submit&mode=1", param);

export const getInfoF2 = (param: any) => {
  if (param != undefined)
    return sendPost("/Fight2024?type=Info", { id: param });
  else return sendPost("/Fight2024?type=Info");
};
