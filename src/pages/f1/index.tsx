import { Image, Pagination } from "antd";
import type { PaginationProps } from "antd";
import React, { Key, useState } from "react";
import styles from "./Style.module.scss";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Search, { SearchProps } from "antd/es/input/Search";
import ManageClub from "./manageClub";
import ManageMember from "./manageMember";

export default function LevelOne() {
  document.title = "Quản lý Liên đoàn, Sở, Ngành";
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Hội viên CLB",
      children: (
        <ManageClub />
      ),
    },
    {
      key: "2",
      label: "Hội viên cá nhân",
      children: (
        <ManageMember />
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/logo.png")}
            preview={false}
            className={styles.img}
          />
          <div className={styles.title}>
            Đơn vị quản lý: Liên đoàn, Sở, Ngành
          </div>
        </div>
        <div className={styles.tableWrap}>
          <Tabs defaultActiveKey="1" items={items} className={styles.tab} />
        </div>
      </div>
      <Footer />
    </>
  );
}
