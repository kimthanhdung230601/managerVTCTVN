import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";

import Subcribe from "./Subcribe";
import { Tabs, Input, Button, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { updateFile } from "../../api/thiDau";
import { useQuery } from "react-query";
import { getInfoF2 } from "../../api/f2";
import { useParams } from "react-router";
import AdminManagement from "../giaidau/Thu_thap_du_lieu_doi_khang";

const secretKey = process.env.REACT_APP_SECRET_KEY as string;

export default function F0AcceptFile() {
  const { id } = useParams();

  const { data: infoF2 } = useQuery(["info"], () => getInfoF2(id));

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
            <div className={styles.titleText}>
              {infoF2 && <> Đơn vị: {infoF2?.data[0].nameClb}</>}
            </div>
          </div>
        </div>
      </div>
      {/* f0 duyệt hồ sơ */}
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
          <AdminManagement idClub={Number(id)} />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <Subcribe />
        </TabPane>
      </Tabs>
    </div>
  );
}
