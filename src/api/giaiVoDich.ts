import { sendGet, sendPost } from "./api";

export const getListInfor = () => sendGet("YoungFight");

export const getListInforAdmin = (payload: any) =>
  sendGet(`CubFight?idclub=${payload}`);

export const addNewMember = (payload: any) =>
  sendPost("CubFight?type=Submit&mode=2", payload);

export const getManagamentMember = (payload?: any) =>
  sendPost("CubFight?type=Detail", payload ? payload : {});

export const postFixF0 = (payload: any) =>
  sendPost("CubFight?type=Fix", payload);
export const updateFile = (payload: any, value: number) =>
  sendPost(`CubFight?type=Image&mode=${value}`, payload);

export const F0AddNewMember = (payload: any, idclub: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    sendPost(`CubFight?type=AdminSubmit&mode=2&idclub=${idclub}`, payload)
      .then((response) => {
        resolve(response); // Resolve Promise khi API trả về thành công
      })
      .catch((error) => {
        reject(error); // Reject Promise nếu có lỗi
      });
  });
};

export const getListSubcribe = (param: any) =>
  sendPost(`/CubFight?type=Detail`, param);

export const updateListSubcribe = (param: any) =>
  sendPost(`/CubFight?type=Fix`, param);

export const getListMemberClub = (idclub: number) =>
  sendGet(`/CubFight?idclub=${idclub}`);

export const acceptClubSubscribe = (param: any) =>
  sendPost(`/CubFight?type=Accept`, param);

export const getListAcceptSubscribe = () => sendPost(`/CubFight?type=List`, {});
export const submitListmember = (idclub: any, param: any) =>
  sendPost(`/CubFight?type=AdminSubmit&mode=1&idclub=${idclub}`, param);
export const getListMemberClubF2 = () => sendGet("/CubFight");
export const submitListmemberF2 = (param: any) =>
  sendPost("/CubFight?type=Submit&mode=1", param);

export const getInfoF2 = (param: any) => {
  if (param != undefined) return sendPost("/CubFight?type=Info", { id: param });
  else return sendPost("/CubFight?type=Info", {});
};

// đăng ký giải vô địch
