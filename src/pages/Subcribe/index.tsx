import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe from "./Subcribe";
import { useMutation } from "react-query";
import { submitListmember } from "../../api/f2";

const secretKey = process.env.REACT_APP_SECRET_KEY as string;
export default function SubcribePage() {
  const name = CryptoJS.AES.decrypt(Cookies.get("name") as string, secretKey);
  const decryptedName = name.toString(CryptoJS.enc.Utf8);
  const phone = CryptoJS.AES.decrypt(Cookies.get("phone") as string, secretKey);
  const decryptedPhone = phone.toString(CryptoJS.enc.Utf8);
  const email = CryptoJS.AES.decrypt(Cookies.get("email") as string, secretKey);
  const decryptedEmail = email.toString(CryptoJS.enc.Utf8);
  const NameClb = CryptoJS.AES.decrypt(
    Cookies.get("NameClb") as string,
    secretKey
  );
  const decryptedNameClb = NameClb.toString(CryptoJS.enc.Utf8);
  const [userId, setUserId] = useState<any>({
    name: decryptedName,
    phone: decryptedPhone,
    email: decryptedEmail,
    clb: decryptedNameClb,
  });

  return (
    <div>
      <Header />
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <div className={styles.titleContent}>
            <div className={styles.titleText}>Đơn vị: {userId.clb}</div>{" "}
            <div className={styles.subTitleText}>
              <div className={`$(styles.boldText)`}>
                Thông tin người quản lý
              </div>
              <div className={styles.titleName}></div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Họ tên: </div>
              <div className={styles.titleName}>{userId.name}</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Số điện thoại:</div>
              <div className={styles.titleName}>{userId.phone}</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Email: </div>
              <div className={styles.titleName}>{userId.email}</div>
            </div>
          </div>
        </div>
      </div>

      <Subcribe />
    </div>
  );
}
