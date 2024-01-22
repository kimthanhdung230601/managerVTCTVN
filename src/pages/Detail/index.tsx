import { Col, Image, Row } from 'antd'
import React from 'react'
import Header from '../../components/Header'
import styles from "./Style.module.scss"

export default function Detail() {
    document.title = "Thông tin hồ sơ";
  return (
    <div>
        <Header />
        <div style={{paddingTop: '70px'}}>
            <div className={styles.wrap}>
                <div className={styles.imageWrap}>
                    <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img}/>
                    <div className={styles.title}>THÔNG TIN HỒ SƠ</div>
                </div>
                <Row gutter={40} justify="center" style={{marginTop: "40px"}}>
                    <Col className='gutter-row' xxl={3} lg={6} md={8} xs={24}>
                        <Row gutter={20}>
                            <Col className='gutter-row' xxl={24} md={24} xs={12}>
                                <Image src={require("../../assets/image/jisoo.jpg")} preview={false} className={styles.detailImg}/>
                            </Col>
                            <Col className='gutter-row' xxl={24} md={24} xs={12}>
                                <Image src={require("../../assets/image/qr.png")} preview={false} className={styles.detailImg}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='gutter-row' xxl={12} lg={16} md={16} xs={24}>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>1.</span> 
                                Họ tên
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Nguyễn Văn A
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>2.</span> 
                                Quốc tịch
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Việt Nam
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>3.</span> 
                                Mã định danh
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                VCT0120304958578
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>4.</span> 
                                Năm sinh
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                1990
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>5.</span> 
                                Giới tính
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Nữ
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>6.</span> 
                                CLB(Môn phái/ Võ đường/ Võ phái)
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Tổ Thanh Hà
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>7.</span> 
                                Tỉnh/ Thành/ Quận/ Huyện
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Đông Anh - Hà Nội
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>8.</span> 
                                Cấp đai/ đẳng hiện tại
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                13
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>9.</span> 
                                Số CCCD
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                008769888746
                            </Col>
                        </Row>
                        
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                Địa chỉ thường trú
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Văn Miếu - Đống Đa - Hà Nội
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                SĐT
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                09876452737
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                    
                                Email
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                anguyenvan@gmail.com
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>10.</span> 
                                Thành tích cá nhân (cấp quốc gia từ 2020 trở lại đây)
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                <ul className={styles.awardsList}>
                                    <li className={styles.award}>Giải nhất Giải Vô địch võ cổ truyền quốc gia lần thứ 30</li>
                                    <li className={styles.award}>Giải nhất Giải Vô địch võ cổ truyền quốc gia lần thứ 29</li>
                                </ul>
                                
                            </Col>
                        </Row>
                        <Row gutter={40} className={styles.DetailItem}>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>11.</span> 
                                Ghi chú
                            </Col>
                            <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                Thành viên tiềm năng
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    
  )
}