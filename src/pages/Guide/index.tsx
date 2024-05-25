import { Col, Image, Pagination, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from "../News/Style.module.scss"
import {FileTextOutlined, PlusOutlined} from'@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useQuery } from 'react-query';
import { getListNews } from '../../api/f0';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY || "";
const isAdmin = (): string => {
    const isAdminn = Cookies.get("permission") || ""
    const bytes = CryptoJS.AES.decrypt(isAdminn, secretKey);
    const permission = bytes.toString(CryptoJS.enc.Utf8);
    return permission;
}

const extractContent = (html: string) =>  {
    const pTags = html.match(/<p>(.*?)<\/p>/g);
  
    let paragraphs: string[] = [];
    let images: string[] = [];

    if (pTags) {
      pTags.forEach(pTag => {
       
        const imgMatch = pTag.match(/<img.*?src="(.*?)".*?>/);
        if (imgMatch) {
          images.push(imgMatch[1]);
        } else {
          const textMatch = pTag.match(/<p>(.*?)<\/p>/);
          if (textMatch) {
            paragraphs.push(textMatch[1]);
          }
        }
      });
    }
  
    return {
      paragraphs: paragraphs,
      images: images
    };
}

export default function Guide() {
    document.title = "Hướng dẫn";
    const navigate = useNavigate()
    const param = new URLSearchParams(useLocation().search)
    const [currentPage, setCurrentPage] = useState(param.get("page") || "1")
    const {data, isFetching} = useQuery(["news", currentPage], () => getListNews(currentPage, "0"))
    const onChange = (page: number) => {
        navigate(`/huong-dan?page=${page}`)
        setCurrentPage(page.toString())
    }
  return (
    <>
        <Header />
        <div className={styles.wrap}>
            <div className={styles.title}>
                HƯỚNG DẪN
            </div>
            {
                isAdmin() === "0" ? 
                <div className={styles.newPostWrap}>
                    <Link to={"/dang-bai"} >
                        <button className={styles.newPostBtn}>
                        <PlusOutlined style={{marginRight: "6px"}}/> Tạo hướng dẫn
                        </button>
                    </Link>  
                </div>
                : 
                null
            }
            
            <div className={styles.postWrap}>
                <div className={styles.postLabel}>
                    <FileTextOutlined style={{marginRight: "10px"}}/>
                    HƯỚNG DẪN MỚI
                </div>
                <div className={styles.postList}>
                    {
                        isFetching ? <Spin style={{width: "100%", textAlign: "center"}} size='large'/>
                        :
                        <>
                            { 
                                data?.total_products === 0 || data.status === "failed" ? 
                                    <div style={{width: "100%", textAlign: "center", fontSize: "18px", fontWeight: "500"}}>Chưa có bài viết nào </div>
                                :
                                <>
                               { 
                                data?.data.map((item: any, index: number) => {
                                const result = extractContent(item.content)
                                return (
                                    <Row gutter={40} className={styles.post} justify="center">
                                        <Col className={`gutter-row`} xxl={8} lg={8} md={8} >
                                            <Link to={`/bai-viet/${item.id}`} className={styles.imgWrap}>
                                                <Image src={result.images[0] ? result.images[0] : require("../../assets/image/new.png")} preview={false} className={styles.postImg}/>
                                            </Link>
                                        </Col>
                                        <Col className='gutter-row' xxl={16} lg={16} md={16} style={{padding:"20px 20px"}}>
                                            <Link to={`/bai-viet/${item.id}`}>
                                                <div className={styles.postTitle}>{item.title}</div>
                                            </Link>
                                            <div className={styles.postContent}>{result.paragraphs}</div>
                                            <div className={styles.time}>Đăng ngày {" "} {item.time}</div>
                                        </Col>
                                    </Row>
                                )   
                                })
                                }
                            <Pagination 
                                defaultCurrent={parseInt(currentPage, 10)}
                                total={data?.total_products} 
                                onChange={onChange}
                                style={{textAlign: "center", marginTop: "20px"}}
                                />
                            </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
        <Footer />
    </>
    
  )
}
