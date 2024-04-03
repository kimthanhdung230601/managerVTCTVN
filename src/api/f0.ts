import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMember = (payload: any) =>
  sendGet(`/AdminGetMembers?${payload}`);
export const deleteMemberF3 = (payload: any) =>
  sendPost(`/AdminDeleteMember`, payload);
//acount member
export const getListMemberF12 = (payload: any) =>
  sendGet(`/AdminGetUsers?${payload}`);
  export const getListMemberF12Accept = (payload: any) =>
  sendGet(`/AdminGetUsers?page=${payload}`);
export const getListMemberF12UnAccept = (payload: any) =>
  sendGet(`/AdminGetUsers?page=${payload}`);
  /////
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


export const getInforAdmin= (param:any) => sendGet('/AdminGetUserID?id='+param)

export const upLoadImage = (param: any) => sendPost("/AdminUploadImage", param)
export const addNews = (param: any) =>  sendPost ("/AdminAddNews", param)
export const getListNews = (page: string, category: string) => sendGet("/GetListNews?page="+ page + "&category=" + category)
export const getNewsbyID = (param: any) =>  sendGet(`/GetNewsID?id=${param}`)
export const adminSignupf1 = (param: any) => sendPost('/AdminSignUpManage', param)


