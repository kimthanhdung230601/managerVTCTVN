import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe from "./Subcribe";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router";

export default function SubcribePageEdit() {
  const navigate = useNavigate();
  const paramURL = new URLSearchParams(useLocation().search);
  const location = useLocation();
  const onChange = (key: string) => {
    paramURL.set("tab", key);
    navigate(`${location.pathname}?${paramURL.toString()}`);
  };

  const items: TabsProps["items"] = [
    {
      key: "Male",
      label: "Bảng Nam",
      children: <Subcribe sex="Nam" />,
    },
    {
      key: "Female",
      label: "Bảng Nữ",
      children: <Subcribe sex="Nữ" />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <div className={styles.titleContent}>
            <div className={styles.titleText}>
              Danh sách đăng ký Quyền Thuật
            </div>{" "}
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey={paramURL.get("tab") || "Male"}
        items={items}
        onChange={onChange}
      />
      ;
    </div>
  );
}
