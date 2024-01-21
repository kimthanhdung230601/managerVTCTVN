import { Col, Image, Row } from 'antd'
import React from 'react'
import Header from '../../components/Header'
import styles from "../News/Style.module.scss"
import {FileTextOutlined, PlusOutlined} from'@ant-design/icons';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
export default function Guide() {
    document.title = "Hướng dẫn";
  return (
    <>
        <Header />
        <div className={styles.wrap}>
            <div className={styles.title}>
                HƯỚNG DẪN
            </div>
            <div className={styles.newPostWrap}>
                <Link to={"/dang-bai"} >
                    <button className={styles.newPostBtn}>
                    <PlusOutlined style={{marginRight: "6px"}}/> Tạo hướng dẫn
                    </button>
                </Link>  
            </div>
            
            <div className={styles.postWrap}>
                <div className={styles.postLabel}>
                    <FileTextOutlined style={{marginRight: "10px"}}/>
                    HƯỚNG DẪN MỚI
                </div>
                <div className={styles.postList}>
                    <Row gutter={40} className={styles.post} justify="center">
                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                            <Link to={"/bai-viet"} className={styles.imgWrap}>
                                <Image src={require("../../assets/image/guide.png")} preview={false} className={styles.postImg}/>
                            </Link>
                        </Col>
                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 10px"}}>
                            <Link to={"/bai-viet"}>
                                <div className={styles.postTitle}>Hướng dẫn cập nhật thông tin hội viên</div>
                            </Link>
                            <div className={styles.postContent}>Bài hướng dẫn này chỉ dành cho admin cấp 0. Để cập nhật thông tin, admin cần truy cập trang quản trị...</div>
                            <div className={styles.time}>Đăng ngày 2/10/2023</div>
                        </Col>
                    </Row>
                    <Row gutter={40} className={styles.post} justify="center">
                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                            <Link to={"/bai-viet"} className={styles.imgWrap}>
                                <Image src={require("../../assets/image/guide.png")} preview={false} className={styles.postImg}/>
                            </Link>
                        </Col>
                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 10px"}}>
                            <Link to={"/bai-viet"}>
                                <div className={styles.postTitle}>Hướng dẫn cập nhật thông tin hội viên</div>
                            </Link>
                            <div className={styles.postContent}>Bài hướng dẫn này chỉ dành cho admin cấp 0. Để cập nhật thông tin, admin cần truy cập trang quản trị...</div>
                            <div className={styles.time}>Đăng ngày 2/10/2023</div>
                        </Col>
                    </Row>
                    <Row gutter={40} className={styles.post} justify="center">
                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                            <Link to={"/bai-viet"} className={styles.imgWrap}>
                                <Image src={require("../../assets/image/guide.png")} preview={false} className={styles.postImg}/>
                            </Link>
                        </Col>
                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 10px"}}>
                            <Link to={"/bai-viet"}>
                                <div className={styles.postTitle}>Hướng dẫn cập nhật thông tin hội viên</div>
                            </Link>
                            <div className={styles.postContent}>Bài hướng dẫn này chỉ dành cho admin cấp 0. Để cập nhật thông tin, admin cần truy cập trang quản trị...</div>
                            <div className={styles.time}>Đăng ngày 2/10/2023</div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <Footer />
    </>
    
  )
}
