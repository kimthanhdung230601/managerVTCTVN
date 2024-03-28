import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMemberF3 = (payload:any)=> {
    console.log(payload)
    if(payload) return sendGet(`/Members?club=`+ payload);
    else return sendGet(`/Members3`);
}
export const editNote = (payload:any)=> sendPost(`/EditNoteMemberID`,payload);
export const deleteMemberF3 = (payload:any)=> sendPost(`DeleteMemberID`,payload);
export const addNewF3 = (payload:any)=> sendPost("/AddMember",payload);