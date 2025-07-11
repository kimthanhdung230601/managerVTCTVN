import React, { useState, useRef } from "react";
import { Tabs, Button, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import CryptoJS from "crypto-js";

import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import Subcribe from "./Subcribe";
import TournamentRegistrationYoungPrize from "../giaidau_giaivodich/Dang_ky_giai_dau_doi_khang";
import { getInfoF2, updateFile } from "../../api/giaiVoDich";

export const generateRandomKey = (length: number) => {
  return Array(length)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2)) // Lấy ký tự ngẫu nhiên từ 'a-z' và '0-9'
    .join("");
};

export default function F2SubcribeClubPrize() {
  const { id } = useParams();

  const { data: infoF2 } = useQuery(["info"], () => getInfoF2(id));

  const [fileDoikhang, setFileDoiKhang] = useState<File | null>(null);
  const [fileQuyenThuat, setFileQuyenThuat] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const encryptionKey = generateRandomKey(16);
  const fileInputRefDoiKhang = useRef<HTMLInputElement>(null);
  const fileInputRefQuyenThuat = useRef<HTMLInputElement>(null);

  // Handle file change
  const handleFileChangeDoiKhang = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    // Allow PDF, PNG, JPG, and JPEG files
    const validFileTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFileDoiKhang(selectedFile);
      message.success(`Đã chọn file ${selectedFile.name}`);
    } else {
      message.error("Vui lòng chọn file PDF, PNG, JPG hoặc JPEG.");
      setFileDoiKhang(null);
    }
  };
  const handleFileChangeQuyenThuat = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files && e.target.files[0];
    // Allow PDF, PNG, JPG, and JPEG files
    const validFileTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFileQuyenThuat(selectedFile);
      message.success(`Đã chọn file ${selectedFile.name}`);
    } else {
      message.error("Vui lòng chọn file PDF, PNG, JPG hoặc JPEG.");
      setFileQuyenThuat(null);
    }
  };

  // Handle form submission
  const handleSubmitDoiKhang = async (value: number) => {
    if (!fileDoikhang) {
      message.error("Vui lòng chọn file.");
      return;
    }

    const originalFileName = fileDoikhang.name;
    const fileExtension = originalFileName.split(".").pop(); // Lấy phần mở rộng fileDoikhang
    const encryptedFileName = CryptoJS.HmacSHA256(
      originalFileName,
      encryptionKey
    ).toString();

    // Tạo một fileDoikhang mới với tên mã hóa
    const newFileName = `${encryptedFileName}.${fileExtension}`; // Giữ nguyên phần mở rộng fileDoikhang
    const renamedFile = new File([fileDoikhang], newFileName, {
      type: fileDoikhang.type,
    });

    const formData = new FormData();
    formData.append("imageClb", renamedFile);

    setIsLoading(true);

    try {
      const response = await updateFile(formData, value);

      if (response.status === "success") {
        message.success("Tải file lên thành công");
        window.location.reload(); // Tải lại trang để cập nhật thông tin
      } else {
        message.error("Tải file thất bại");
      }
    } catch (error) {
      message.error("Tải file thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitQuyenThuat = async (value: number) => {
    if (!fileQuyenThuat) {
      message.error("Vui lòng chọn file.");
      return;
    }

    const originalFileName = fileQuyenThuat.name;
    const fileExtension = originalFileName.split(".").pop(); // Lấy phần mở rộng fileQuyenThuat
    const encryptedFileName = CryptoJS.HmacSHA256(
      originalFileName,
      encryptionKey
    ).toString();

    // Tạo một fileQuyenThuat mới với tên mã hóa
    const newFileName = `${encryptedFileName}.${fileExtension}`; // Giữ nguyên phần mở rộng fileQuyenThuat
    const renamedFile = new File([fileQuyenThuat], newFileName, {
      type: fileQuyenThuat.type,
    });

    const formData = new FormData();
    formData.append("imageClb", renamedFile);

    setIsLoading(true);

    try {
      const response = await updateFile(formData, value);

      if (response.status === "success") {
        message.success("Tải file lên thành công");
        window.location.reload(); // Tải lại trang để cập nhật thông tin
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
  const handleDownload = async (value: number) => {
    setIsLoading(true);
    const fileUrl = infoF2?.image[value].image;

    if (!fileUrl) {
      message.error("Không tìm thấy file.");
      setIsLoading(false);

      return;
    }

    const fileName = fileUrl.split("/").pop();
    if (!fileName) {
      console.error("Không tìm thấy file.");
      setIsLoading(false);

      return;
    }

    try {
      // Fetch the file data
      const response = await fetch(
        `https://vocotruyen.id.vn/PHP_IMG/${fileName}`
      );
      const blob = await response.blob();

      // Create an object URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary <a> element for downloading
      const link = document.createElement("a");
      link.href = downloadUrl;

      // Set the new file name
      link.setAttribute(
        "download",
        `Giáy giới thiệu CLB ${infoF2?.data[0].nameClb}`
      );

      document.body.appendChild(link);
      link.click();

      // Clean up the object URL and the <a> element
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
      setIsLoading(false);
    }
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
            <div style={{ color: "#036D3C", fontWeight: "bold" }}>
              ĐĂNG KÝ GIẢI VÔ ĐỊCH VÕ CỔ TRUYỀN QUỐC GIA LẦN THỨ XXXIV NĂM 2025{" "}
            </div>
          </div>
        </div>
      </div>
      {/* F2 dang ky ho so */}

      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng hình thức">
          <div
            style={{
              marginLeft: "30%",
              marginRight: "30%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {infoF2?.image[0] && infoF2?.image[0]?.image !== "" ? (
              <>
                <Button
                  style={{ flex: 1, width: "100%" }}
                  type="dashed"
                  onClick={() => handleDownload(0)}
                >
                  Đã gửi giấy giới thiệu đối kháng (Tải giấy giới thiệu tại đây)
                </Button>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 16,
                  }}
                >
                  <input
                    id="custom-file-input-doi-khang"
                    type="file"
                    accept=".pdf, .png, .jpg, .jpeg"
                    onChange={handleFileChangeDoiKhang}
                    style={{ display: "none" }}
                    ref={fileInputRefDoiKhang}
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
                        fileInputRefDoiKhang.current &&
                        fileInputRefDoiKhang.current.click()
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
                      {fileDoikhang ? (
                        <>
                          <span>{fileDoikhang.name}</span>
                          <CloseCircleOutlined
                            onClick={() => setFileDoiKhang(null)}
                            style={{
                              position: "absolute",
                              right: 12,
                              color: "#757884",
                            }}
                          />
                        </>
                      ) : (
                        <span style={{ color: "#ccc" }}>Giấy giới thiệu</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => handleSubmitDoiKhang(2)}
                  disabled={!fileDoikhang || isLoading}
                >
                  Tải giấy giới thiệu đối kháng (định dạng PDF, PNG, JPG, JPEG)
                </Button>
              </>
            )}
          </div>
          <TournamentRegistrationYoungPrize />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <div
            style={{
              marginLeft: "30%",
              marginRight: "30%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {infoF2?.image[1] && infoF2?.image[1]?.image !== "" ? (
              <>
                <Button
                  style={{ flex: 1, width: "100%" }}
                  type="dashed"
                  onClick={() => handleDownload(1)}
                >
                  Đã gửi giấy giới thiệu quyền thuật(Tải giấy giới thiệu tại
                  đây)
                </Button>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 16,
                  }}
                >
                  <input
                    id="custom-file-input-quyen-thuat"
                    type="file"
                    accept=".pdf, .png, .jpg, .jpeg"
                    onChange={handleFileChangeQuyenThuat}
                    style={{ display: "none" }}
                    ref={fileInputRefQuyenThuat}
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
                        fileInputRefQuyenThuat.current &&
                        fileInputRefQuyenThuat.current.click()
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
                      {fileQuyenThuat ? (
                        <>
                          <span>{fileQuyenThuat.name}</span>
                          <CloseCircleOutlined
                            onClick={() => setFileQuyenThuat(null)}
                            style={{
                              position: "absolute",
                              right: 12,
                              color: "#757884",
                            }}
                          />
                        </>
                      ) : (
                        <span style={{ color: "#ccc" }}>Giấy giới thiệu</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => handleSubmitQuyenThuat(1)}
                  disabled={!fileQuyenThuat || isLoading}
                >
                  Tải giấy giới thiệu quyền thuật (định dạng PDF, PNG, JPG,
                  JPEG)
                </Button>
              </>
            )}
          </div>
          <Subcribe />
        </TabPane>
      </Tabs>
    </div>
  );
}
