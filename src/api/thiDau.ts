import { sendGet, sendPost } from "./api";

export const getListInfor = () => sendGet("Fight2024");

export const getListInforAdmin = (payload: any) =>
  sendGet(`Fight2024?idclub=${payload}`);

export const addNewMember = (payload: any) =>
  sendPost("Fight2024?type=Submit&mode=2", payload);

export const getManagamentMember = (payload: any) =>
  sendPost("Fight2024?type=Detail", payload);

export const postFixF0 = (payload: any) =>
  sendPost("Fight2024?type=Fix", payload);
