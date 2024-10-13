export interface Person {
  nam: thongTin[];
  nu: thongTin[];
}
export interface thongTin {
  hangCan: any;
}
export interface weight {
  nam?: string;
  nữ?: string;
}
//f2 dang ky thi dau doi khang 1
export const tableThead: string[] = [
  "Giới Tính",
  "STT",
  "Hạng Cân",
  "Họ Tên",
  "Ngày Sinh",
  "Mã định danh",
];
export const data_weight_1: Person = {
  nam: [
    { hangCan: "Trên 51kg đến 54kg" },
    { hangCan: "Trên 54kg đến 57kg" },
    { hangCan: "Trên 57kg đến 60kg" },
    { hangCan: "Trên 60kg đến 64kg" },
    { hangCan: "Trên 64kg đến 68kg" },
  ],
  nu: [
    { hangCan: "Trên 51kg đến 54kg" },
    { hangCan: "Trên 54kg đến 57kg" },
    { hangCan: "Trên 57kg đến 60kg" },
  ],
};
//f2 dang ky thi dau doi khang 2
export const data_weight_2: Person = {
  nam: [
    { hangCan: "Trên 45kg đến 48kg" },
    { hangCan: "Trên 48kg đến 51kg" },
    { hangCan: "Trên 51kg đến 54kg" },
    { hangCan: "Trên 54kg đến 57kg" },
    { hangCan: "Trên 57kg đến 60kg" },
    { hangCan: "Trên 60kg đến 64kg" },
    { hangCan: "Trên 64kg đến 68kg" },
    { hangCan: "Trên 68kg đến 72kg" },
    { hangCan: "Trên 72kg đến 76kg" },
    { hangCan: "Trên 76kg đến 80kg" },
    { hangCan: "Trên 80kg đến 85kg" },
    { hangCan: "Trên 85kg đến 90kg" },
    { hangCan: "Trên 90kg đến 95kg" },
    { hangCan: "Trên 95kg đến 110kg" },
  ],
  nu: [
    { hangCan: "Trên 42kg đến 45kg" },
    { hangCan: "Trên 45kg đến 48kg" },
    { hangCan: "Trên 48kg đến 51kg" },
    { hangCan: "Trên 51kg đến 54kg" },
    { hangCan: "Trên 54kg đến 57kg" },
    { hangCan: "Trên 57kg đến 60kg" },
    { hangCan: "Trên 60kg đến 64kg" },
    { hangCan: "Trên 64kg đến 68kg" },
    { hangCan: "Trên 68kg đến 72kg" },
    { hangCan: "Trên 72kg đến 76kg" },
    { hangCan: "Trên 76kg đến 80kg" },
    { hangCan: "Trên 80kg đến 85kg" },
  ],
};
export const tableTheadAdmin: string[] = [
  "Giới Tính",
  "STT",
  "Hạng Cân",
  "Họ Tên",
  "Ngày Sinh",
  "Đơn vị",
  "Mã định danh",
];

export interface adminManagement {
  id: string;
  idclub: string;
  mode: string;
  name: string;
  sex: string;
  type: string;
  iduser: string;
  hoTen: string;
  tenClb: string;
  birthday: string;
  code: string;
}
export const exampleData: adminManagement[] = [
  {
    id: "609",
    idclub: "87",
    mode: "2",
    name: "Trên 51kg đến 54kg",
    sex: "Nam",
    type: "doi_khang",
    iduser: "740",
    hoTen: "Ngô Thị Duyên test 4",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000740",
  },
  {
    id: "609",
    idclub: "87",
    mode: "2",
    name: "Trên 51kg đến 54kg",
    sex: "Nam",
    type: "doi_khang",
    iduser: "740",
    hoTen: "Ngô Thị Duyên test 4",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000740",
  },
  {
    id: "609",
    idclub: "87",
    mode: "2",
    name: "Trên 51kg đến 54kg",
    sex: "Nam",
    type: "doi_khang",
    iduser: "740",
    hoTen: "Ngô Thị Duyên test 4",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000740",
  },
  {
    id: "610",
    idclub: "87",
    mode: "2",
    name: "Trên 51kg đến 54kg",
    sex: "Nữ",
    type: "doi_khang",
    iduser: "738",
    hoTen: "Ngô Thị Duyên test 2",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000738",
  },
  {
    id: "611",
    idclub: "87",
    mode: "2",
    name: "Trên 54kg đến 57kg",
    sex: "Nam",
    type: "doi_khang",
    iduser: "740",
    hoTen: "Ngô Thị Duyên test 4",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000740",
  },
  {
    id: "613",
    idclub: "87",
    mode: "2",
    name: "Trên 57kg đến 60kg",
    sex: "Nam",
    type: "doi_khang",
    iduser: "739",
    hoTen: "Ngô Thị Duyên test 3",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000739",
  },
  {
    id: "614",
    idclub: "87",
    mode: "2",
    name: "Trên 57kg đến 60kg",
    sex: "Nữ",
    type: "doi_khang",
    iduser: "737",
    hoTen: "Ngô Thị Duyên test 1",
    tenClb: "develop test",
    birthday: "2024-10-08 00:00:00",
    code: "VCT04000737",
  },
  {
    id: "615",
    idclub: "87",
    mode: "2",
    name: "Trên 60kg đến 64kg",
    sex: "Nam",
    type: "doi_khang",
    iduser: "739",
    hoTen: "Ngô Thị Duyên test 3",
    tenClb: "develop test",
    birthday: "2024-10-09 00:00:00",
    code: "VCT04000739",
  },
  {
    id: "618",
    idclub: "87",
    mode: "2",
    name: "Trên 64kg đến 68kg",
    sex: "Nữ",
    type: "doi_khang",
    iduser: "737",
    hoTen: "Ngô Thị Duyên test 1",
    tenClb: "develop test",
    birthday: "2024-10-08 00:00:00",
    code: "VCT04000737",
  },
];
