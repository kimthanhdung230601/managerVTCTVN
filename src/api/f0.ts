import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getListMember = ()=>sendGet(`/AdminGetMembers`);
