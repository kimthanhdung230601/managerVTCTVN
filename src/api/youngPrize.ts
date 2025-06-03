import { sendGet, sendPost } from "./api";

export const getListInfor = () => sendGet("YoungFight");

export const getListInforAdmin = (payload: any) =>
  sendGet(`YoungFight?idclub=${payload}`);

export const addNewMember = (payload: any) =>
  sendPost("YoungFight?type=Submit&mode=2", payload);

export const getManagamentMember = (payload?: any) =>
  sendPost("YoungFight?type=Detail", payload ? payload : {});

export const postFixF0 = (payload: any) =>
  sendPost("YoungFight?type=Fix", payload);
export const updateFile = (payload: any, value: number) =>
  sendPost(`YoungFight?type=Image&mode=${value}`, payload);

export const F0AddNewMember = (payload: any, idclub: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    sendPost(`YoungFight?type=AdminSubmit&mode=2&idclub=${idclub}`, payload)
      .then((response) => {
        resolve(response); // Resolve Promise khi API trả về thành công
      })
      .catch((error) => {
        reject(error); // Reject Promise nếu có lỗi
      });
  });
};

export const getListSubcribe = (param: any) =>
  sendPost(`/YoungFight?type=Detail`, param);

export const updateListSubcribe = (param: any) =>
  sendPost(`/YoungFight?type=Fix`, param);

export const getListMemberClub = (idclub: number) =>
  sendGet(`/YoungFight?idclub=${idclub}`);

export const acceptClubSubscribe = (param: any) =>
  sendPost(`/YoungFight?type=Accept`, param);

export const getListAcceptSubscribe = () =>
  sendPost(`/YoungFight?type=List`, {});
export const submitListmember = (idclub: any, param: any) =>
  sendPost(`/YoungFight?type=AdminSubmit&mode=1&idclub=${idclub}`, param);
export const getListMemberClubF2 = () => sendGet("/YoungFight");
export const submitListmemberF2 = (param: any) =>
  sendPost("/YoungFight?type=Submit&mode=1", param);

export const getInfoF2 = (param: any) => {
  if (param != undefined)
    return sendPost("/YoungFight?type=Info", { id: param });
  else return sendPost("/YoungFight?type=Info", {});
};
