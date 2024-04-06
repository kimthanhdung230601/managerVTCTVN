import { sendGet, sendPost } from "./api"

const path = {
    member: '/ManageGetMembers?page=',
    club: '/ManageGetUsers?page=',
    clubList: "/ManageGetClub",
    search: '/FindData?data='
}

export const getListMember = (param: string) => sendGet(path.member + param)
export const getListClub = (param: string) => sendGet(path.club +param)
export const getClubs = () => sendGet(path.clubList)
export const getFilterTable = (path: string, param:string) => sendGet(path+param)
export const searchInTable = (param: any) => sendGet(path.search+param)
export const getListClubs = ()=> sendGet(`/ManageGetClub`);
export const deleteMember = (param: any) => sendPost('/DeleteMemberID', param)




