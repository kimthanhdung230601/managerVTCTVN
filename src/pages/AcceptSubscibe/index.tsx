import React, { useState } from "react";
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import { Table, Button, Tabs } from "antd";
import { TableProps, Popconfirm, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { acceptClubSubscribe, getListAcceptSubscribe } from "../../api/f0";
import { useNavigate } from "react-router";
import ModalAccept from "../../components/Modal/ModalAccept";
import TableCup from "./TableCup";
import TableYoung from "./TableYoung";

export default function AcceptSubscribe() {
  return (
    <>
      {" "}
      <Header />
      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>DUYỆT HỒ SƠ ĐĂNG KÝ</p>
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
    </>
  );
}
