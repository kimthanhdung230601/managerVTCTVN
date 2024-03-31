import { Col, Image, message, Row, Spin } from 'antd'
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getInforAdmin } from '../../api/f0';
import Header from '../../components/Header'
import styles from "../Detail/Style.module.scss"

export default function Account() {
    document.title = "Thông tin tài khoản";
    const params = useParams()
    const {data: adminInfor, isFetching} = useQuery(['adminInfor', params.id], () => getInforAdmin(params.id), {
        enabled: params.id !== undefined,
        onSettled: (data) => {
            if(data.status === "failed"){
                message.error("Có lỗi xảy ra, vui lòng thử lại sau")
                setTimeout(()=> {
                    window.history.back()
                },2000)
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
                adminInfor?.status === "failed" || !adminInfor ?
                <div className={styles.searchWrap}>Không có dữ liệu.</div>
                : 
                <>
                {
                <div className={styles.wrap}>
                    <div className={styles.imageWrap}>
                        <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img}/>
                        <div className={styles.title}>THÔNG TIN TÀI KHOẢN</div>
                    </div>
                    <Row gutter={40} justify="center" style={{marginTop: "40px"}}>
                        <Col className='gutter-row' xxl={5} lg={6} md={8} xs={24} style={{marginBottom: "40px"}}>
                            <Row gutter={20}>
                                <Col className={`${styles.colImg} gutter-row`} xxl={24} md={24} xs={12} style={{textAlign: "center", marginBottom: "30px"}}>
                                        <Image src={`https://vocotruyen.id.vn/PHP_IMG/${adminInfor?.data[0].image_certificate}`} preview={true} className={styles.accImg}/>
                                        <div style={{fontWeight: "500", marginTop: "8px"}}>Ảnh Bằng cấp hiện tại</div>

                                </Col>
                                <Col className={`${styles.colImg} gutter-row`} xxl={24} md={24} xs={12} style={{textAlign: "center", marginBottom: "30px"}}>
                                        <Image src={`https://vocotruyen.id.vn/PHP_IMG/${adminInfor?.data[0].image_ref}`} preview={true} className={styles.accImg}/>
                                        <div style={{fontWeight: "500", marginTop: "8px"}}>Ảnh giấy giới thiệu</div>
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
                                    {adminInfor?.data[0].name}
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>2.</span> 
                                    Mã định danh
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    {adminInfor?.data[0].idcard}
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>3.</span> 
                                    SĐT
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    {adminInfor?.data[0].phone}
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                <span className={styles.NumberOrders}>4.</span> 
                                    Email
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    {adminInfor?.data[0].email}
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>5.</span> 
                                    Tỉnh/ Thành Phố
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    {adminInfor?.data[0].location}
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>6.</span> 
                                    Đơn vị quản lý
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    {adminInfor?.data[0].manage}
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>7.</span> 
                                    CLB(Môn phái/ Võ đường/ Võ phái)
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    {adminInfor?.data[0].NameClb}
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