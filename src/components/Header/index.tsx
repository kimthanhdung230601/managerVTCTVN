import { Col, Image, Row } from 'antd'
import React from 'react'
import styles from "./Style.module.scss"
export default function Header() {
  return (
    <Row  justify="space-between" className={styles.wrap}>
        <Col className='gutter-row'>
        <Row gutter={40} className={styles.headerList}>
            <Col className={styles.headerItem}>
                <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img} />
            </Col>
            <Col className={styles.headerItem}>
                Tra cứu hội viên
            </Col>
            <Col className={styles.headerItem}>
                Hội viên đủ tư cách giám khảo
            </Col>
            <Col className={styles.headerItem}>
                Tin tức
            </Col>
            <Col className={styles.headerItem}>
                Hướng dẫn
            </Col>
        </Row>
            
        </Col>
        <Col className={ `${styles.headerItem} gutter-row`}>
            Đăng xuất
        </Col>
    </Row>
  )
}
