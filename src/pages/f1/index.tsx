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
import { useLocation, useNavigate } from "react-router";

export default function LevelOne() {
  document.title = "Quản lý Liên đoàn, Sở, Ngành";
  const navigate = useNavigate()
  const tab = new URLSearchParams(useLocation().search);
  const  [activeTab, setActiveTab] = useState(tab.get("tab") || "CLB")
  const onChange = (key: string) => {
    navigate(`/admin1?tab=${key}&page=1`)
  };
  const items: TabsProps["items"] = [
    {
      key: "CLB",
      label: "Hội viên CLB",
      children: (
        <ManageClub />
      ),
    },
    {
      key: "Member",
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
          <Tabs defaultActiveKey={activeTab} items={items} className={styles.tab} onChange={onChange}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
