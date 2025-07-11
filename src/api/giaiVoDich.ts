import { sendGet, sendPost } from "./api";

export const getListInfor = () => sendGet("ChampionFight");

export const getListInforAdmin = (payload: any) =>
  sendGet(`ChampionFight?idclub=${payload}`);

export const addNewMember = (payload: any) =>
  sendPost("ChampionFight?type=Submit&mode=2", payload);

export const getManagamentMember = (payload?: any) =>
  sendPost("ChampionFight?type=Detail", payload ? payload : {});

export const postFixF0 = (payload: any) =>
  sendPost("ChampionFight?type=Fix", payload);
export const updateFile = (payload: any, value: number) =>
  sendPost(`ChampionFight?type=Image&mode=${value}`, payload);

export const F0AddNewMember = (payload: any, idclub: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    sendPost(`ChampionFight?type=AdminSubmit&mode=2&idclub=${idclub}`, payload)
      .then((response) => {
        resolve(response); // Resolve Promise khi API trả về thành công
      })
      .catch((error) => {
        reject(error); // Reject Promise nếu có lỗi
      });
  });
};

export const getListSubcribe = (param: any) =>
  sendPost(`/ChampionFight?type=Detail`, param);

export const updateListSubcribe = (param: any) =>
  sendPost(`/ChampionFight?type=Fix`, param);

export const getListMemberClub = (idclub: number) =>
  sendGet(`/ChampionFight?idclub=${idclub}`);

export const acceptClubSubscribe = (param: any) =>
  sendPost(`/ChampionFight?type=Accept`, param);

export const getListAcceptSubscribe = () =>
  sendPost(`/ChampionFight?type=List`, {});
export const submitListmember = (idclub: any, param: any) =>
  sendPost(`/ChampionFight?type=AdminSubmit&mode=1&idclub=${idclub}`, param);
export const getListMemberClubF2 = () => sendGet("/ChampionFight");
export const submitListmemberF2 = (param: any) =>
  sendPost("/ChampionFight?type=Submit&mode=1", param);

export const getInfoF2 = (param: any) => {
  if (param != undefined)
    return sendPost("/ChampionFight?type=Info", { id: param });
  else return sendPost("/ChampionFight?type=Info", {});
};

// đăng ký giải vô địch
