import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMember = (payload: any) =>
  sendGet(`/AdminGetMembers?${payload}`);
//lấy tất cả thông tin
export const getListMemberAll = () => sendGet(`/AdminGetMembers`);
export const deleteMemberF3 = (payload: any) =>
  sendPost(`/AdminDeleteMember`, payload);
//acount member
export const getListMemberF12 = (payload: any) =>
  sendGet(`/AdminGetUsers?${payload}`);
export const deleteMemberF12 = (payload: any) =>
  sendPost(`/AdminDeleteUser`, payload);
export const updateAccount = (payload: any) =>
  sendPost(`/AdminAcceptUser`, payload);
export const updateMemberF3 = (payload: any) =>
  sendPost(`/AdminAcceptMember`, payload);
export const getListClub = () => sendGet(`/GetNameClub`);
export const updateMultiAchie = (payload: any) =>
  sendPost(`/UpdateMultiData.php`, payload);

export const getDetailF3 = (payload: any) =>
  sendGet(`/AdminGetMemberID?id=${payload}`);
export const updateF3 = (payload: any) =>
  sendPost(`AdminUpdateMember`, payload);
export const findMember = (payload: any) => sendGet(`Find?data=${payload}`);
export const getDetailF2 = (payload: any) =>
  sendGet(`/AdminGetUserID?id=${payload}`);
export const updateUser = (payload: any) =>
  sendPost(`/AdminUpdateUser`, payload);
const path = {
  accountAdmin: "/AdminGetUserID?id=",
};
export const F0findF3ForCode = (payload: any) =>
  sendPost(`/AdminGetListNameMembers`, payload);
export const getInforAdmin = (param: any) =>
  sendGet("/AdminGetUserID?id=" + param);

export const upLoadImage = (param: any) => sendPost("/AdminUploadImage", param);
export const addNews = (param: any) => sendPost("/AdminAddNews", param);
export const getListNews = (page: string, category: string) =>
  sendGet("/GetListNews?page=" + page + "&category=" + category);
// update news
export const updateNew = (param: any) => sendPost("/EditNews", param);

export const deleteNews = (param: any) => sendPost("/DeleteNews", param);
export const getNewsbyID = (param: any) => sendGet(`/GetNewsID?id=${param}`);
export const signUpF1 = (param: any) => sendPost(`/AdminSignUpManage`, param);

export const getListSubcribe = (param: any) =>
  sendPost(`/Fight2024?type=Detail`, param);

export const updateListSubcribe = (param: any) =>
  sendPost(`/Fight2024?type=Fix`, param);

export const getListMemberClub = (idclub: number) =>
  sendGet(`/Fight2024?idclub=${idclub}`);

export const acceptClubSubscribe = (param: any) =>
  sendPost(`/Fight2024?type=Accept`, param);

export const getListAcceptSubscribe = () =>
  sendPost(`/Fight2024?type=List`, {});
export const submitListmember = (idclub: any, param: any) =>
  sendPost(`/Fight2024?type=AdminSubmit&mode=1&idclub=${idclub}`, param);
