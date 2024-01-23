import { Col, Image, Row } from 'antd'
import React from 'react'
import Header from '../../components/Header'
import styles from "../Detail/Style.module.scss"

export default function Account() {
    document.title = "Thông tin tài khoản";
  return (
    <div>
        <Header />
        <div style={{paddingTop: '70px'}}>
            <div className={styles.wrap}>
                <div className={styles.imageWrap}>
                    <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img}/>
                    <div className={styles.title}>THÔNG TIN TÀI KHOẢN</div>
                </div>
                <Row gutter={40} justify="center" style={{marginTop: "40px"}}>
                    <Col className='gutter-row' xxl={5} lg={6} md={8} xs={24}>
                        <Row gutter={20}>
                            <Col className='gutter-row' xxl={24} md={24} xs={12} style={{textAlign: "center", marginBottom: "10px"}}>
                               
                                    <Image src={require("../../assets/image/degree.jpg")} preview={true} className={styles.detailImg}/>
                                    <div style={{fontWeight: "500"}}>Ảnh Bằng cấp hiện tại</div>

                            </Col>
                            <Col className='gutter-row' xxl={24} md={24} xs={12} style={{textAlign: "center", marginBottom: "10px"}}>
                               
                                    <Image src={require("../../assets/image/referral.jpg")} preview={true} className={styles.detailImg}/>
                                    <div style={{fontWeight: "500"}}>Ảnh giấy giới thiệu</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='gutter-row' xxl={9} lg={16} md={16} xs={24}>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>1.</span> 
                                Họ tên
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Nguyễn Văn A
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>2.</span> 
                                Mã định danh
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                VCT0120304958578
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                            <span className={styles.NumberOrders}>3.</span> 
                                SĐT
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                09876452737
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                            <span className={styles.NumberOrders}>4.</span> 
                                Email
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Nguyễn Văn A
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>5.</span> 
                                Tỉnh/ Thành Phố
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Hà Nội
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>6.</span> 
                                Đơn vị quản lý
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Liên đoàn
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>7.</span> 
                                CLB(Môn phái/ Võ đường/ Võ phái)
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Tổ Thanh Hà
                            </Col>
                        </Row>
                        
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>8.</span> 
                                Tài khoản đăng nhập
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                nguyenvanaa
                            </Col>
                        </Row>
                        
                        
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                            <span className={styles.NumberOrders}>9.</span> 
                                Mật khẩu
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                0122334455
                            </Col>
                        </Row>    
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    
  )
}