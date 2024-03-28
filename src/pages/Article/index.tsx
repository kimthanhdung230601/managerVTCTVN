import { Col, Image, Row } from 'antd'
import {useEffect} from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getListNews, getNewsbyID } from '../../api/f0'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import styles from "./Style.module.scss"
export default function Article() {
    document.title = "Bài viết"
    const id = useParams()
    const {data} = useQuery(["new", id.id], ()=> getNewsbyID(id.id ? id.id : ""), {
        enabled: id.id !== undefined,
        onSuccess: (data) => {
            if(data.status === "success") {
                const content = document.getElementById("content")
                
                if(content){
                    content.innerHTML = data.data[0].content || ""
                    const imgElements = document.querySelectorAll("#content img");
                    imgElements.forEach(img => {
                    img.classList.add(`${styles.imgWrap}`);
                });
                } 
            }
        }

    })
    const {data: listNews} = useQuery(["listNews"], () => getListNews("1","0"))
    useEffect(()=> {
        document.title = data?.data[0].title
    }, [data])
  return (
    <div>
        <Header />
        <div className={styles.wrap}>
            <Row gutter={60} justify={"center"} className={styles.row}>
                <Col className={`gutter-row ${styles.postCol}`} xxl={12} lg={16} md={24} xs={24} >
                    <div className={styles.typePost}>
                        BÀI VIẾT GẦN ĐÂY
                    </div>
                    <div className={styles.title}>
                        {data?.data[0].title}
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.time}>
                        ĐĂNG NGÀY {data?.data[0].time} BY ADMIN
                    </div>
                    <div className={styles.article} id="content">
                        
                    </div>
                    <div className={styles.author}>
                        <Image src={require("../../assets/image/user.jpg")} preview={false} className={styles.authorImg}/>
                        <div className={styles.authorName}>ADMIN</div>
                    </div>
                </Col>
                <Col className='gutter-row' xxl={5} lg={8} md={24} xs={24}>
                    <div className={styles.orther}>Các bài viết khác</div>
                    
                    <ul className={styles.articleList}>
                        {
                            listNews?.data.map((item: any, index: number) => {
                                return (
                                    <Link to={`/bai-viet/${item.id}`}>
                                        <li className={styles.post}>{item.title}</li>
                                    </Link>
                                )
                            })
                        }
                        
                    </ul>
                </Col>
            </Row>
        </div>
        <Footer />
    </div>
  )
}
