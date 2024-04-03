import { sendGet, sendPost } from "./api"

const path = {
    member: '/ManageGetMembers',
    club: '/ManageGetUsers',
    clubList: "/ManageGetClub",
    search: '/FindData?data='
}

export const getListMember = () => sendGet(path.member)
export const getListClub = () => sendGet(path.club)
export const getClubs = () => sendGet(path.clubList)
export const getFilterTable = (path: string, param:string) => sendGet(path+param)
export const searchInTable = (param: any) => sendGet(path.search+param)
<<<<<<< HEAD
export const getListClubs = ()=> sendGet(`/ManageGetClub`);
export const deleteMember = (param: any) => sendPost('/DeleteMemberID', param)
=======

export const deleteMember = (param: any) => sendPost('/DeleteMemberID', param)



>>>>>>> ccc89728520390f47dc14999a23ad14ace50629e
