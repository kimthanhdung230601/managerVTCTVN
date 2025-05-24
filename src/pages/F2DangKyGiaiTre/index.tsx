import React, { useState, useRef } from "react";
import { Tabs, Input, Button, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import CryptoJS from "crypto-js";

import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { getManagamentMember, updateFile } from "../../api/youngPrize";
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import { getInfoF2 } from "../../api/youngPrize";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        {/* Custom file input */}
        <div
          style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
        >
          <input
            id="custom-file-input"
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <div
            className="custom-file-upload-wrapper"
            style={{
              display: "flex",
              gap: "1rem",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "4px",
              alignItems: "center",
            }}
          >
            <Button
              style={{ flex: 1, width: "100%" }}
              type="dashed"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              Chọn tệp
            </Button>
            <div
              style={{
                flex: 2,
                width: "100%",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              {file ? (
                <>
                  <span>{file.name}</span>
                  <CloseCircleOutlined
                    onClick={() => setFile(null)}
                    style={{
                      position: "absolute",
                      right: 12,
                      color: "#757884",
                    }}
                  />
                  {/* <Button
                    type="text"
                    style={{ position: "absolute", right: 0 }}
                    icon={
                      <span className="anticon anticon-close">
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="close"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M563.8 512l262.1-262.1c6.5-6.5 6.5-17 0-23.5l-28.3-28.3c-6.5-6.5-17-6.5-23.5 0L512 460.2 249.9 198.1c-6.5-6.5-17-6.5-23.5 0l-28.3 28.3c-6.5 6.5-6.5 17 0 23.5L460.2 512 198.1 774.1c-6.5 6.5-6.5 17 0 23.5l28.3 28.3c6.5 6.5 17 6.5 23.5 0L512 563.8l262.1 262.1c6.5 6.5 17 6.5 23.5 0l28.3-28.3c6.5-6.5 6.5-17 0-23.5L563.8 512z"></path>
                        </svg>
                      </span>
                    }
                    onClick={() => setFile(null)}
                  /> */}
                </>
              ) : (
                <span style={{ color: "#ccc" }}>Giấy giới thiệu</span>
              )}
            </div>
          </div>
        </div>
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
