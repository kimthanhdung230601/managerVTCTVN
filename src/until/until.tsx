import CryptoJS from "crypto-js";
export const admin = ["Nguyễn Văn A"];
export const level: any = [
  "Võ sinh cấp 1",
  "Võ sinh cấp 2",
  "Võ sinh cấp 3",
  "Võ sinh cấp 4",
  "Võ sinh cấp 5",
  "Võ sinh cấp 6",
  "Võ sinh cấp 7",
  "Võ sinh cấp 8",
  "Võ sinh cấp 9",
  "Võ sinh cấp 10",
  "Võ sinh cấp 11",
  "Võ sinh cấp 12",
  'HLV 1 đẳng',
  'HLV 2 đẳng',
  'HLV 3 đẳng',
  'HLV 4 đẳng',
  'Võ sư 5 đẳng',
  'Võ sư 6 đẳng',
  'Võ sư 7 đẳng',
  'Võ sư 8 đẳng',
  'Võ sư 9 đẳng',
  'Đại võ sư'
];
export const levelFilters = level.map((item:any) => ({ text: item, value: item }));

export const managerf1: any = [
  "Liên đoàn võ thuật tỉnh",
  "Hội võ thuật",
  "Trung tâm huấn luyện tt",
  "Sở VHTTDL",
];
export const statess = ["nghỉ", "hoạt động", "chưa duyệt HS"];

export const accountF0 = [{ username: "123", password: "f000" }];
export const accountF1 = [{ username: "123", password: "f111" }];
export const accountF2 = [{ username: "123", password: "f222" }];
export const randomState = () => {
  const randomNumber = Math.random();
  if (randomNumber < 0.33) {
    return "Hoạt động";
  } else if (randomNumber < 0.66) {
    return "Nghỉ";
  } else {
    return "Chưa duyệt HS";
  }
};
export const province = [
  "Hà Giang",
  "Cao Bằng",
  "Lào Cai",
  "Sơn La",
  "Lai Châu",
  "Bắc Kạn",
  "Lạng Sơn",
  "Tuyên Quang",
  "Yên Bái",
  "Thái Nguyên",
  "Điện Biên",
  "Phú Thọ",
  "Vĩnh Phúc",
  "Bắc Giang",
  "Bắc Ninh",
  "Hà Nội",
  "Quảng Ninh",
  "Hải Dương",
  "Hải Phòng",
  "Hòa Bình",
  "Hưng Yên",
  "Hà Nam",
  "Thái Bình",
  "Nam Định",
  "Ninh Bình",
  "Thanh Hóa",
  "Nghệ An",
  "Hà Tĩnh",
  "Quảng Bình",
  "Quảng Trị",
  "Thừa Thiên Huế",
  "Đà Nẵng",
  "Quảng Nam",
  "Quảng Ngãi",
  "Kon Tum",
  "Gia Lai",
  "Bình Định",
  "Phú Yên",
  "Đắk Lắk",
  "Khánh Hòa",
  "Đắk Nông",
  "Lâm Đồng",
  "Ninh Thuận",
  "Bình Phước",
  "Tây Ninh",
  "Bình Dương",
  "Đồng Nai",
  "Bình Thuận",
  "Thành phố Hồ Chí Minh",
  "Long An",
  "Bà Rịa – Vũng Tàu",
  "Đồng Tháp",
  "An Giang",
  "Tiền Giang",
  "Vĩnh Long",
  "Bến Tre",
  "Cần Thơ",
  "Kiên Giang",
  "Trà Vinh",
  "Hậu Giang",
  "Sóc Trăng",
  "Bạc Liêu",
  "Cà Mau",
  "Quân Đội",
  "Công An",
  "Giáo Dục",
];
// export const bytes = (ciphertext:any)=> CryptoJS.AES.decrypt(ciphertext, "e1c3465b54ef1e1a36726b0c2c8058da1eb59e224fa4b1133e6da677dc960c24");
// export const decryptedText = bytes.toString(CryptoJS.enc.Utf8);