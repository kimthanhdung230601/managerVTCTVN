import { sendGet, sendPost } from "./api"

const path = {
    member: '/ManageGetMembers',
    club: '/ManageGetUsers'
}

export const getListMember = () => sendGet(path.member)
export const getListClub = () => sendGet(path.club)

