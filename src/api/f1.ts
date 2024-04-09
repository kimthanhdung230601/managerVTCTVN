import { sendGet, sendPost } from "./api"

const path = {
    member: '/ManageGetMembers?page=',
    club: '/ManageGetUsers?page=',
    clubList: "/ManageGetClub",
    search: '/FindData?data='
}

export const getListMember = (page:string, param: string) =>{
    if(param !== "") return sendGet(path.member +page+ param)
    return sendGet(path.member + page)
} 
// export const getListClub = (page: string, param: string) => {
//     if(param !== "") return sendGet(path.club +page+param)
//     else return sendGet(path.club +page)
// }
export const getListClub = (payload:any)=>sendGet(`/ManageGetUsers?${payload}`);
export const getClubs = () => sendGet(path.clubList)
export const getFilterTable = (path: string, param:string, page: string) => sendGet(path+param+ "&page="+page)
export const searchInTable = (param: any) => sendGet(path.search+param)
export const getListClubs = ()=> sendGet(`/ManageGetClub`);
export const deleteMember = (param: any) => sendPost('/DeleteMemberID', param)




