import { sendDelete, sendGet, sendPost, sendPut } from "./api";

export const getList = (payload?:any)=>sendGet("https://64380678894c9029e8cca33d.mockapi.io/api/products/exams");
export const addNewData = (payload:any) =>sendPost("https://64380678894c9029e8cca33d.mockapi.io/api/products/exams",payload);
export const updateData = (payload:any)=> sendPut(`https://64380678894c9029e8cca33d.mockapi.io/api/products/exams/${payload}`);
export const deletaDate = (payload:any)=>sendDelete(`https://64380678894c9029e8cca33d.mockapi.io/api/products/exams/${payload}`)