import { sendGet, sendPost } from "./api"

const path = {
    member: '/Members',
    club: '/Members?club='
}

export const getListMember = () => sendGet(path.member)
export const getListClub = (param: any) => sendGet(path.member+param)

