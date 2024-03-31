import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { sendGet, sendPost } from "./api"

const secretKey = process.env.REACT_APP_SECRET_KEY || "";
export const isAdmin = (): string => {
    const isAdminn = Cookies.get("permission") || ""
    const bytes = CryptoJS.AES.decrypt(isAdminn, secretKey);
    const permission = bytes.toString(CryptoJS.enc.Utf8);
    return permission;
}
const path = {
    signup: "/Signup",
    signin: "/Signin",
    addMember: "/AddMember",
    searchUser: "/Find?data="
}

export const signup = (param: any) => sendPost(path.signup, param)
export const signin = (param: any) => sendPost(path.signin, param)
export const addMember = (param: any) => sendPost(path.addMember, param)
export const searchUser = (param: string) => sendGet(path.searchUser+param)
export const getInforF3 = (payload:any, type: string) =>{
    if(type.includes("keyword")) {
        return sendGet(`/Find?data=${payload}`)
    } else {
        const idDecode = decodeURIComponent(payload)
        const bytes = CryptoJS.AES.decrypt(idDecode, secretKey);
        const id = bytes.toString(CryptoJS.enc.Utf8)
        alert(id)
        if(isAdmin() === "0") return sendGet(`/AdminGetMemberID?id=${id}`)
        else return sendGet(`/GetMemberID?id=${id}`)
    }
} 
export const changePassword = (params: any) => sendPost("/ChangePass", params)