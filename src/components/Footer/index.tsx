import React from "react";
import { CopyrightOutlined } from "@ant-design/icons";
import styles from "./Style.module.scss";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className={styles.wrap}>
      <span className={styles.footerText}> Thiết kế và phát triển bởi</span>{" "}
      <Link
        to={"https://zalo.me/0978131878"}
        style={{ color: "#f6c404", marginLeft: "8px", fontWeight: "600" }}
      >
        Chippisoft.
      </Link>
    </div>
  );
}
