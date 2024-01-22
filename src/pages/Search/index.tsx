import { Image } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import styles from "./Style.module.scss"
export default function Search() {
    document.title = "Tra cứu hội viên";
  return (
    <>
        <Header />
        <div style={{paddingTop: '70px'}}>
           <div className={styles.wrap}>
                <div className={styles.imageWrap}>
                    <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img}/>
                    <div className={styles.title}>Liên đoàn võ thuật cổ truyền Việt Nam</div>
                </div>
                <div className={styles.search}>
                    <div className={styles.titleSearch}>
                        Tra cứu dữ liệu hội viên (Nhập mã hội viên):
                        <br />
                        <input type={"text"} className={styles.input}/>
                        <br />
                        <button className={styles.btn}>
                            <Link to={"/thong-tin-ho-so"}>
                                Tra cứu
                            </Link>
                            
                        </button>
                    </div>
                </div>
            </div> 
        </div>
        
    </>
    
  )
}