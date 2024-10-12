import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import Subcribe from "./Subcribe";
import { Tabs, Input, Button, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import TournamentRegistration from "../giaidau/Dang_ky_giai_dau_doi_khang";
import { updateFile } from "../../api/thiDau";

const secretKey = process.env.REACT_APP_SECRET_KEY as string;

export default function SubcribePage() {
  const name = CryptoJS.AES.decrypt(Cookies.get("name") as string, secretKey);
  const decryptedName = name.toString(CryptoJS.enc.Utf8);
  const phone = CryptoJS.AES.decrypt(Cookies.get("phone") as string, secretKey);
  const decryptedPhone = phone.toString(CryptoJS.enc.Utf8);
  const email = CryptoJS.AES.decrypt(Cookies.get("email") as string, secretKey);
  const decryptedEmail = email.toString(CryptoJS.enc.Utf8);
  const NameClb = CryptoJS.AES.decrypt(
    Cookies.get("NameClb") as string,
    secretKey
  );
  const decryptedNameClb = NameClb.toString(CryptoJS.enc.Utf8);

  const [userId, setUserId] = useState<any>({
    name: decryptedName,
    phone: decryptedPhone,
    email: decryptedEmail,
    clb: decryptedNameClb,
  });

  const [file, setFile] = useState<File | null>(null);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      message.success(`Đã chọn file ${selectedFile.name}`);
    } else {
      message.error("Vui lòng chọn file PDF.");
      setFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) {
      message.error("Vui lòng chọn file PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await updateFile(formData);

      if (response.status === "success") {
        message.success("Tải file lên thành công");
      } else {
        message.error("Tải file thất bại");
      }
    } catch (error) {
      message.error("Tải file thất bại");
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Header />
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <div className={styles.titleContent}>
            <div className={styles.titleText}>Đơn vị: {userId.clb}</div>
            <div className={styles.subTitleText}>
              <div className={styles.boldText}>Thông tin người quản lý</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Họ tên: </div>
              <div className={styles.titleName}>{userId.name}</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Số điện thoại:</div>
              <div className={styles.titleName}>{userId.phone}</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Email: </div>
              <div className={styles.titleName}>{userId.email}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginLeft: "30%",
          marginRight: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleSubmit} disabled={!file}>
          Tải ảnh giấy giới thiệu (định dạng PDF)
        </Button>
      </div>

      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng">
          <TournamentRegistration />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <Subcribe />
        </TabPane>
      </Tabs>
    </div>
  );
}
