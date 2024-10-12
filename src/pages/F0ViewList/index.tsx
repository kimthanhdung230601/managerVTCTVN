import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import TournamentRegistration from "../giaidau/Dang_ky_giai_dau_doi_khang";
import { useQuery } from "react-query";
import { getInfoF2 } from "../../api/f2";
import { useParams } from "react-router";
import SubcribePageEdit from "../Subcribe Edit";
import AdminManagement from "../giaidau/Thu_thap_du_lieu_doi_khang";

export default function F0ViewList() {
  const { id } = useParams();

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
              DANH SÁCH ĐĂNG KÝ CUP CÂU LẠC BỘ
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng">
          <AdminManagement />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <SubcribePageEdit />
        </TabPane>
      </Tabs>
    </div>
  );
}
