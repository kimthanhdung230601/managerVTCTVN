import { Col, Image, message, QRCode, Row, Spin } from 'antd'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useParams } from 'react-router-dom';
import { getInforF3 } from '../../api/ApiUser';
import Header from '../../components/Header'
import styles from "./Style.module.scss"

const secretKey = process.env.REACT_APP_SECRET_KEY || "";
const isAdmin = (): string => {
    const isAdminn = Cookies.get("permission") || ""
    const bytes = CryptoJS.AES.decrypt(isAdminn, secretKey);
    const permission = bytes.toString(CryptoJS.enc.Utf8);
    return permission;
}
export default function Detail() {
    document.title = "Thông tin hồ sơ";
    const params = useParams()
    const search = useLocation()
    const keyword = new URLSearchParams(useLocation().search)
    const isMobile = useMediaQuery({ maxWidth: 576 });
    const {data: userInfor, isFetching} = useQuery(['userInfor', params.id, search], 
    ()=> {
        const data = keyword.get("keyword") || ""
        if(search.search.includes("keyword")) return  getInforF3(data, search.search)
        else return getInforF3(params.id, search.pathname)
    },{
        
        onSettled: (data) => {
            if(data.status === "failed"){
                setTimeout(()=> {
                    window.history.back()
                },1200)
            } 
        }
    })

  return (
    <div>
        <Header />
        <div style={{paddingTop: '70px'}}>
            {
                isFetching ? <div className={styles.searchWrap}><Spin size="large" /></div>
                : 
                <>
                {
                    userInfor?.status === "failed" || !userInfor ?
                    <div className={styles.searchWrap}>Không có dữ liệu.</div>
                    : 
                    <>
                        {
                        <div className={styles.wrap}>
                            <div className={styles.imageWrap}>
                                <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img}/>
                                <div className={styles.title}>THÔNG TIN HỒ SƠ</div>
                            </div>
                            <Row gutter={40} justify="center" style={{marginTop: "40px"}}>
                                <Col className='gutter-row' xxl={3} lg={6} md={8} xs={24}>
                                    <Row gutter={20} style={{marginBottom: "20px"}}>
                                        <Col xxl={24} md={24} xs={12} className={`${styles.colImg} gutter-row`}>
                                            <Image src={`https://vocotruyen.id.vn/PHP_IMG/${userInfor?.data[0].image_certificate}`} preview={false} className={styles.detailImg}/>
                                        </Col>
                                        <Col className='gutter-row' xxl={24} md={24} xs={12} style={isMobile ? {} : {marginTop: "20px"}}>
                                            <QRCode 
                                                value={`https://vocotruyen.id.vn/thong-tin-ho-so/${userInfor?.data[0].idcard}`} 
                                                icon={require("../../assets/image/logo.png")} 
                                                className={styles.qrImg}
                                                bgColor="#fff"
                                            />
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
                                            {userInfor?.data[0].name}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>2.</span> 
                                            Quốc tịch
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].nationality}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>3.</span> 
                                            Mã định danh
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].idcard}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>4.</span> 
                                            Ngày sinh
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].birthday}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>5.</span> 
                                            Giới tính
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].sex}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>6.</span> 
                                            CLB, Môn phái, Võ đường, Võ phái, Trung tâm
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].club}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>7.</span> 
                                            Tỉnh/ Thành - Quận/ Huyện
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].hometown}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>8.</span> 
                                            Cấp đai/ đẳng hiện tại
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].level}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>9.</span> 
                                            Số CCCD
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].idcard}
                                        </Col>
                                    </Row>
                                    
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            Địa chỉ thường trú
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].address}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            SĐT
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].phone}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                
                                            Email
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                        {userInfor?.data[0].email}
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>10.</span> 
                                            Thành tích cá nhân (cấp quốc gia từ 2020 trở lại đây)
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                            <ul className={styles.awardsList}>
                                                {/* {userInfor?.data[0].achievements.split(',').include(",") ? 
                                                    userInfor?.data[0].achievements.split(',').filter((achie:string) => achie.trim() !== '')
                                                    : null
                                                } */}
                                                <li className={styles.award}>{userInfor?.data[0].achievements}</li>
                                            </ul>
                                            
                                        </Col>
                                    </Row>
                                    <Row gutter={40} className={styles.DetailItem}>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12} >
                                            <span className={styles.NumberOrders}>11.</span> 
                                            Ghi chú
                                        </Col>
                                        <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                            {userInfor?.data[0].note}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        }
                    </>
                }
                </>
            }
            
        </div>
    </div>
    
  )
}