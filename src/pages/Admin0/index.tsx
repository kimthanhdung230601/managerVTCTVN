import { useState } from "react";
import ManagerAccount from "./managerAccount";
import ManagerMember from "./managerMember";
import {
  AudioOutlined,
  SettingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { SearchProps } from "antd/es/input";
import { Menu, Input, Divider, Radio, Table, Button, } from "antd";
import { admin } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type MenuItem = Required<MenuProps>["items"][number];



interface AdminProps {}

const Admin = () => {
  document.title="Quản lý hội viên";
  const [selectedMenuItem, setSelectedMenuItem] = useState("member");
  const handleMenuItemClick = (menuItem: any) => {
    setSelectedMenuItem(menuItem);
  };
  let titleText = "";

  if (selectedMenuItem === "member") {
    titleText = "Quản lý hội viên";
  } else if (selectedMenuItem === "account") {
    titleText = "Quản lý tài khoản";
  }
  const items: MenuProps["items"] = [
    {
      label: admin,
      key: "SubMenu",

      icon: <CaretDownOutlined />,
      children: [
        {
          type: "group",
          style: { cursor: "pointer" },
          label: "Đăng xuất",
        },
        {
          type: "group",
          label: "Đổi mật khẩu",
          style: { cursor: "pointer" },
        },
      ],
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <Header/>
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImg}
              src={require("../../assets/image/logo.png")}
              alt="Logo"
            />
          </div>
          <div>
            <span
              onClick={() => handleMenuItemClick("member")}
              className={`${styles.subnav} ${
                selectedMenuItem === "member" ? styles.choosenBtn : ""
              }`}
            >
              QUẢN LÝ HỘI VIÊN
            </span>
            <span
              onClick={() => handleMenuItemClick("account")}
              className={`${styles.subnav} ${
                selectedMenuItem === "account" ? styles.choosenBtn : ""
              }`}
            >
              QUẢN LÝ TÀI KHOẢN
            </span>
          </div>

          <div className={styles.titleText}>
            
            {titleText}</div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        {selectedMenuItem === "member" && <ManagerMember />}
        {selectedMenuItem === "account" && <ManagerAccount />}
      </div>
      <Footer/>
    </>
  );
};

export default Admin;
