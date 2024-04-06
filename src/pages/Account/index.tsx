import { Col, Image, message, Row, Spin } from 'antd'
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getInforAdmin } from '../../api/f2';
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
                    // window.history.back()
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
                adminInfor?.status === "failed" ?
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
                                        <div style={{fontWeight: "500",color: "#000", marginTop: "8px"}}>Ảnh Bằng cấp hiện tại</div>

                                </Col>
                                <Col className={`${styles.colImg} gutter-row`} xxl={24} md={24} xs={12} style={{textAlign: "center", marginBottom: "30px"}}>
                                        <Image src={`https://vocotruyen.id.vn/PHP_IMG/${adminInfor?.data[0].image_ref}`} preview={true} className={styles.accImg}/>
                                        <div style={{fontWeight: "500",color: "#000", marginTop: "8px"}}>Ảnh giấy giới thiệu</div>
                                </Col>
                                <Col className={`${styles.colImg} gutter-row`} xxl={24} md={24} xs={12} style={{textAlign: "center", marginBottom: "30px"}}>
                                        <Image src={`https://vocotruyen.id.vn/PHP_IMG/${adminInfor?.data[0].image_cmnd}`} preview={true} className={styles.accImg}/>
                                        <div style={{fontWeight: "500",color: "#000", marginTop: "8px"}}>Ảnh CCCD</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' xxl={9} lg={16} md={16} xs={24}>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>1.</span> 
                                    <span style={{color: "#000"}}>Họ tên</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                <span style={{color: "#000"}}>{adminInfor?.data[0].name}</span>
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>2.</span> 
                                    <span style={{color: "#000"}}>Mã định danh</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                <span style={{color: "#000"}}>{adminInfor?.data[0].idcard}</span>
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>3.</span> 
                                    <span style={{color: "#000"}}>SĐT</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    <span style={{color: "#000"}}>{adminInfor?.data[0].phone}</span>
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>4.</span> 
                                    <span style={{color: "#000"}}>Email</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    <span style={{color: "#000"}}>{adminInfor?.data[0].email}</span>
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>5.</span> 
                                    <span style={{color: "#000"}}>Tỉnh/ Thành Phố</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    <span style={{color: "#000"}}>{adminInfor?.data[0].location}</span>
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>6.</span> 
                                    <span style={{color: "#000"}}>Đơn vị quản lý</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                <span style={{color: "#000"}}>{adminInfor?.data[0].manage}</span>
                                </Col>
                            </Row>
                            <Row gutter={40} className={styles.DetailItem}>
                                <Col className='gutter-row' xxl={9} lg={12} md={12} xs={12} >
                                    <span className={styles.NumberOrders}>7.</span> 
                                    <span style={{color: "#000"}}>Môn phái/Võ phái/Võ đường/Trung tâm/CLB</span>
                                </Col>
                                <Col className='gutter-row' xxl={12} lg={12} md={12} xs={12}>
                                    <span style={{color: "#000"}}>{adminInfor?.data[0].NameClb}</span>
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