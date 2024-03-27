import { Col, Image, message, Row } from 'antd'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getInforF3 } from '../../api/f2';
import Header from '../../components/Header'
import styles from "./Style.module.scss"

export default function Detail() {
    document.title = "Thông tin hồ sơ";
    const params = useParams()
    const {data: userInfor} = useQuery(['userInfor', params.id], ()=> getInforF3(params.id),{
        onSettled: (data) => {
            if(data.status === "failed"){
                message.error("Có lỗi xảy ra, vui lòng thử lại sau")
                setTimeout(()=> {
                    window.history.back()
                },2000)
                
            } 
        }
    })
    // useEffect(()=> {
    //     if(userInfor){
    //         if(userInfor.status === "failed") message.error("Có lỗi xảy ra, vui lòng thử lại sau")
    //     }
    // }, [userInfor])
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
                                <Image src={`https://vocotruyen.id.vn/PHP_IMG/${userInfor?.data[0].image_certificate}`} preview={false} className={styles.detailImg}/>
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
                                CLB(Môn phái/ Võ đường/ Võ phái)
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
        </div>
    </div>
    
  )
}