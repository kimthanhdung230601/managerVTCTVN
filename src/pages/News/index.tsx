import { Col, Image, Row } from 'antd'
import React from 'react'
import Header from '../../components/Header'
import styles from "./Style.module.scss"
import {FileTextOutlined, PlusOutlined} from'@ant-design/icons';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
export default function News() {
    document.title = "Tin tức";
  return (
    <>
        <Header />
        <div className={styles.wrap}>
            <div className={styles.title}>
                TIN TỨC
            </div>
            <div className={styles.newPostWrap}>
                <Link to={"/dang-bai"} >
                    <button className={styles.newPostBtn}>
                    <PlusOutlined style={{marginRight: "6px"}}/> Tạo bài viết
                    </button>
                </Link>  
            </div>
            
            <div className={styles.postWrap}>
                <div className={styles.postLabel}>
                    <FileTextOutlined style={{marginRight: "10px"}}/>
                    TIN TỨC GẦN ĐÂY
                </div>
                <div className={styles.postList}>
                    <Row gutter={40} className={styles.post} justify="center">
                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                            <Link to={"/bai-viet"} className={styles.imgWrap}>
                                <Image src={require("../../assets/image/post.jpg")} preview={false} className={styles.postImg}/>
                            </Link>
                        </Col>
                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 10px"}}>
                            <Link to={"/bai-viet"}>
                                <div className={styles.postTitle}>Khai mạc giải vô địch các Câu lạc bộ Võ cổ truyền quốc gia lần thứ 32 năm 2023</div>
                            </Link>
                            <div className={styles.postContent}>Tối 21/8, tại Nhà thi đấu Thể dục thể thao tỉnh Bà Rịa-Vũng Tàu (thành phố Vũng Tàu), Sở Văn hóa, Thể thao tỉnh Bà Rịa-Vũng Tàu phối hợp cùng Cục Thể dục, Thể thao, Liên đoàn Võ thuật Việt Nam tổ chức khai mạc Giải vô địch các Câu lạc bộ Võ cổ truyền toàn quốc lần thứ XII.</div>
                            <div className={styles.time}>Đăng ngày 2/10/2023</div>
                        </Col>
                    </Row>
                    <Row gutter={40} className={styles.post} justify="center">
                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                            <Link to={"/bai-viet"} className={styles.imgWrap}>
                                <Image src={require("../../assets/image/post.jpg")} preview={false} className={styles.postImg}/>
                            </Link>
                        </Col>
                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 10px"}}>
                            <Link to={"/bai-viet"}>
                                <div className={styles.postTitle}>Khai mạc giải vô địch các Câu lạc bộ Võ cổ truyền quốc gia lần thứ 32 năm 2023</div>
                            </Link>
                            <div className={styles.postContent}>Tối 21/8, tại Nhà thi đấu Thể dục thể thao tỉnh Bà Rịa-Vũng Tàu (thành phố Vũng Tàu), Sở Văn hóa, Thể thao tỉnh Bà Rịa-Vũng Tàu phối hợp cùng Cục Thể dục, Thể thao, Liên đoàn Võ thuật Việt Nam tổ chức khai mạc Giải vô địch các Câu lạc bộ Võ cổ truyền toàn quốc lần thứ XII.</div>
                            <div className={styles.time}>Đăng ngày 2/10/2023</div>
                        </Col>
                    </Row>
                    <Row gutter={40} className={styles.post} justify="center">
                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                            <Link to={"/bai-viet"} className={styles.imgWrap}>
                                <Image src={require("../../assets/image/post.jpg")} preview={false} className={styles.postImg}/>
                            </Link>
                        </Col>
                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 10px"}}>
                            <Link to={"/bai-viet"}>
                                <div className={styles.postTitle}>Khai mạc giải vô địch các Câu lạc bộ Võ cổ truyền quốc gia lần thứ 32 năm 2023</div>
                            </Link>
                            <div className={styles.postContent}>Tối 21/8, tại Nhà thi đấu Thể dục thể thao tỉnh Bà Rịa-Vũng Tàu (thành phố Vũng Tàu), Sở Văn hóa, Thể thao tỉnh Bà Rịa-Vũng Tàu phối hợp cùng Cục Thể dục, Thể thao, Liên đoàn Võ thuật Việt Nam tổ chức khai mạc Giải vô địch các Câu lạc bộ Võ cổ truyền toàn quốc lần thứ XII.</div>
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
