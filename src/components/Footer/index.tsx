import React from 'react'
import {CopyrightOutlined } from "@ant-design/icons"
import styles from "./Style.module.scss"
export default function Footer() {
  return (
    <div className={styles.wrap}>
        <CopyrightOutlined className={styles.icon}/>
        <span>LIÊN ĐOÀN VÕ THUẬT CỔ TRUYỀN VIỆT NAM</span>
    </div>
  )
}