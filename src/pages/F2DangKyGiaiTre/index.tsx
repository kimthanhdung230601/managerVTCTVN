import React, { useState } from "react";
import { Tabs, Input, Button, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import CryptoJS from "crypto-js";

import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { getManagamentMember, updateFile } from "../../api/thiDau";
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import { getInfoF2 } from "../../api/f2";
import Subcribe from "./Subcribe";
import TournamentRegistrationYoungPrize from "../giaidau_giaitre/Dang_ky_giai_dau_doi_khang";

export const generateRandomKey = (length: number) => {
  return Array(length)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2)) // Lấy ký tự ngẫu nhiên từ 'a-z' và '0-9'
    .join("");
};

export default function F2SubcribeYoungPrize() {
  const { id } = useParams();

  const { data: infoF2 } = useQuery(["info"], () => getInfoF2(id));

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const encryptionKey = generateRandomKey(16);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    // Allow PDF, PNG, JPG, and JPEG files
    const validFileTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      message.success(`Đã chọn file ${selectedFile.name}`);
    } else {
      message.error("Vui lòng chọn file PDF, PNG, JPG hoặc JPEG.");
      setFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) {
      message.error("Vui lòng chọn file.");
      return;
    }

    const originalFileName = file.name;
    const fileExtension = originalFileName.split(".").pop(); // Lấy phần mở rộng file
    const encryptedFileName = CryptoJS.HmacSHA256(
      originalFileName,
      encryptionKey
    ).toString();

    // Tạo một file mới với tên mã hóa
    const newFileName = `${encryptedFileName}.${fileExtension}`; // Giữ nguyên phần mở rộng file
    const renamedFile = new File([file], newFileName, { type: file.type });

    const formData = new FormData();
    formData.append("imageClb", renamedFile);

    setIsLoading(true);

    try {
      const response = await updateFile(formData);

      if (response.status === "success") {
        message.success("Tải file lên thành công");
      } else {
        message.error("Tải file thất bại");
      }
    } catch (error) {
      message.error("Tải file thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (key: string) => {
    // console.log(key);
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
            <div className={styles.titleText}>
              {infoF2?.data && <> Đơn vị: {infoF2?.data[0].nameClb}</>}
            </div>
          </div>
        </div>
      </div>
      {/* F2 dang ky ho so */}
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
          accept=".pdf, .png, .jpg, .jpeg"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!file || isLoading}
        >
          Tải giấy giới thiệu (định dạng PDF, PNG, JPG, JPEG)
        </Button>
      </div>

      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng hình thức">
          <TournamentRegistrationYoungPrize />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <Subcribe />
        </TabPane>
      </Tabs>
    </div>
  );
}
