import { sendPost } from "./api"

const path = {
    signup: "/Signup",
    signin: "/Signin",
    addMember: "/AddMember"
}

export const signup = (param: any) => sendPost(path.signup, param)
export const signin = (param: any) => sendPost(path.signin, param)
export const addMember = (param: any) => sendPost(path.addMember, param)