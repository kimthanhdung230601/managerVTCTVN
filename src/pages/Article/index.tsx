import { Col, Image, Row } from 'antd'
import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import styles from "./Style.module.scss"
export default function Article() {
    document.title = "Khai mạc Giải vô địch Võ cổ truyền quốc gia lần thứ 32";
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
                        KHAI MẠC GIẢI VÔ ĐỊCH VÕ CỔ TRUYỀN QUỐC GIA LẦN THỨ 32
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.time}>
                        ĐĂNG NGÀY 2/10/2023 BY ADMIN
                    </div>
                    <div className={styles.article}>
                        <Image src={require("../../assets/image/post.jpg")} preview={false} className={styles.img}/>
                        <div className={styles.note}>Hình ảnh khai mạc giải đấu</div>
                        <div className={styles.paragraph}>Ngày 22/10, tại tỉnh Nam Định, Cục Thể dục Thể thao (Bộ Văn hoá, Thể thao và Du lịch) phối hợp Sở Văn hoá, 
                            Thể thao và Du lịch tỉnh Nam Định tổ chức khai mạc Giải vô địch Võ cổ truyền quốc gia lần thứ 32 năm 2023.
                        </div>
                        <div className={styles.paragraph}>
                            Ông Nguyễn Tân Anh, Phó Giám đốc Sở Văn hoá, Thể thao và Du lịch tỉnh Nam Định, Trưởng Ban tổ chức giải cho biết, Giải Vô địch Võ cổ truyền quốc gia lần thứ 32 là cơ hội,
                             điều kiện để các vận động viên thi đấu cọ sát, nâng cao trình độ chuyên môn, qua đó tuyển chọn những vận động viên tài năng bổ sung cho đội tuyển quốc gia tham dự các giải đấu lớn sắp tới. Giải cũng tạo động lực đẩy mạnh phát triển phong trào tập luyện, thi đấu môn võ cổ truyền rộng khắp trên mọi miền Tổ quốc.
                        </div>
                        <Image src={require("../../assets/image/image.jpg")} preview={false} className={styles.img}/>
                        <div className={styles.note}>Hình ảnh khai mạc giải đấu</div>
                        <div className={styles.paragraph}>
                        Giải đấu năm nay quy tụ 385 vận động viên đến từ 32 đoàn trong nước có phong trào tập luyện và thi đấu môn Võ cổ truyền Việt Nam phát triển như: Bình Định, Bình Dương, Bà Rịa-Vũng Tàu, Quân Đội, Thái Nguyên, Nam Định… Các vận động viên sẽ tham gia tranh tài ở 2 nội dung thi quyền biểu diễn và đối kháng. Trong đó, tại nội dung đối kháng, các vận động viên sẽ tranh tài từ hạng cân 50kg đến trên 90kg nam và từ hạng cân 48kg đến trên 75kg đối với nữ.
                        Giải Vô địch Võ cổ truyền quốc gia lần thứ 32 dự kiến sẽ kết thúc vào ngày 29/10.
                        </div>
                    </div>
                    <div className={styles.author}>
                        <Image src={require("../../assets/image/user.jpg")} preview={false} className={styles.authorImg}/>
                        <div className={styles.authorName}>ADMIN</div>
                    </div>
                </Col>
                <Col className='gutter-row' xxl={5} lg={8} md={24} xs={24}>
                    <div className={styles.orther}>Các bài viết khác</div>
                    
                    <ul className={styles.articleList}>
                        <li className={styles.post}>Khai mạc Giải Vô địch Võ cổ truyền quốc gia lần thứ 32</li>
                        <li className={styles.post}>Khai mạc Giải Vô địch Võ cổ truyền quốc gia lần thứ 31</li>
                        <li className={styles.post}>Tìm giải pháp đưa Võ cổ truyền Việt Nam ra thế giới</li>
                    </ul>
                </Col>
            </Row>
        </div>
        <Footer />
    </div>
  )
}
