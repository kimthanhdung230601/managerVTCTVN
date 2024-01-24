import { useState } from "react";
import ManagerAccount from "./managerAccount";
import ManagerMember from "./managerMember";
import {
  AudioOutlined,
  SettingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps, TabsProps } from "antd";
import type { SearchProps } from "antd/es/input";
import { Menu, Input, Divider, Radio, Table, Button, Tabs } from "antd";
import { admin } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import { setMaxListeners } from "stream";
import UpdateMember from "./updateMember";

type MenuItem = Required<MenuProps>["items"][number];

interface AdminProps {}

const Admin = (props: any) => {
  document.title = "Quản lý hội viên";
  const paramValue = useParams();
  // var check:any = paramValue.key;
  //  console.log("paramValue", paramValue);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(paramValue.key||1);
  let titleText = "";

  if (selectedMenuItem == 1) {
    titleText = "Quản lý hội viên";
  } else if (selectedMenuItem == 2) {
    titleText = "Quản lý tài khoản";
  } else if(selectedMenuItem == 3){
    titleText = "Cập nhật dữ liệu";
  }
  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log("click ", e);
  // };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Quản lý hội viên",
      children: (
        <>
          <ManagerMember />
        </>
      ),
    },
    {
      key: "2",
      label: "Quản lý tài khoản",
      children: (
        <>
          <ManagerAccount />
        </>
      ),
    },
    {
      key: "3",
      label: "Cập nhật dữ liệu",
      children: (
        <>
          <UpdateMember />
        </>
      ),
    },
  ];
  const handleClick = (key: string) => {
    console.log(key);
    setSelectedMenuItem(key);
  };
  return (
    <>
      <Header />
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImg}
              src={require("../../assets/image/logo.png")}
              alt="Logo"
            />
          </div>
          <div className={styles.titleText}>{titleText}</div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <Tabs
          defaultActiveKey={paramValue.key}
          items={items}
          className={styles.tab}
          centered={true}
          onTabClick={handleClick}
        />
      </div>
      <Footer />
    </>
  );
};

export default Admin;
