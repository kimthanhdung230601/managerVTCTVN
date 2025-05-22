import React, { useState } from "react";
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import { Tabs } from "antd";
import TableCup from "./TableCup";
import TableYoung from "./TableYoung";

export default function AcceptSubscribe() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>DUYỆT HỒ SƠ ĐĂNG KÝ</p>
          <div className={styles.tabsContainer}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Giải cup" key="1">
                <TableCup />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Giải trẻ" key="2">
                <TableYoung />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
