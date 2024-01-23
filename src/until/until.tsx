export const admin =["Nguyễn Văn A"];
export const level:any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
export const managerf1:any = ["Liên đoàn võ thuật tỉnh","Hội võ thuật","Trung tâm huấn luyện tt","Sở VHTTDL"];
export const statess = ["nghỉ", "hoạt động", "chưa duyệt HS"];

export const accountF0 = [{username:"123", password:"f000"}];
export const accountF1 = [{username:"123", password:"f111"}];
export const accountF2 = [{username:"123", password:"f222"}];
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