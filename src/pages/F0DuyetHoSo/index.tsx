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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    const fileUrl = infoF2?.image[1].image;

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
      {/* f0 sửa hồ sơ */}
      <div
        style={{
          marginLeft: "30%",
          marginRight: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginBottom: "36px" }}
          disabled={isLoading}
        >
          Tải giấy giới thiệu
        </Button>
      </div>

      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng hình thức">
          <AdminManagement idClub={Number(id)} />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <Subcribe />
        </TabPane>
      </Tabs>
    </div>
  );
}
