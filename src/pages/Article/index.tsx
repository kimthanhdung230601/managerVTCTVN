import { Col, Image, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getListNews, getNewsbyID } from "../../api/f0";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
export default function Article() {
  const id = useParams();
  const [post, setPost] = useState("");
  const { data, isFetching } = useQuery(
    ["new", id.id],
    () => getNewsbyID(id.id ? id.id : ""),
    {
      enabled: id.id !== undefined,
      onSuccess: (data) => {
        if (data.status === "success") {
          setPost(data.data[0].content);
        }
      },
    }
  );
  const { data: listNews } = useQuery(
    ["listNews"],
    () => getListNews("1", data?.data?.[0]?.category),
    {
      enabled: data?.data?.[0]?.category !== undefined,
    }
  );
  useEffect(() => {
    document.title = data?.data[0].title;
    if (data) {
      const content = document.getElementById("content");
      if (content) {
        content.innerHTML = post || "";
        const imgElements = document.querySelectorAll("#content img");
        imgElements.forEach((img) => {
          img.classList.add(`${styles.imgWrap}`);
        });
      }
    }
  }, [data, post]);
  return (
    <div>
      <Header />
      {isFetching ? (
        <div className={styles.fetchWrap}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {data?.status === "success" ? (
            <div className={styles.wrap}>
              <Row gutter={60} justify={"center"} className={styles.row}>
                <Col
                  className={`gutter-row ${styles.postCol}`}
                  xxl={12}
                  lg={16}
                  md={24}
                  xs={24}
                >
                  <div className={styles.typePost}>BÀI VIẾT GẦN ĐÂY</div>
                  <div className={styles.title}>{data?.data[0].title}</div>
                  <div className={styles.border}></div>
                  <div className={styles.time}>
                    ĐĂNG NGÀY {data?.data[0].time} BY ADMIN
                  </div>
                  <div className={styles.article} id="content">
                    Nội dung
                  </div>
                  <div className={styles.author}>
                    <Image
                      src={require("../../assets/image/user.jpg")}
                      preview={false}
                      className={styles.authorImg}
                    />
                    <div className={styles.authorName}>ADMIN</div>
                  </div>
                </Col>
                <Col className="gutter-row" xxl={5} lg={8} md={24} xs={24}>
                  <div className={styles.orther}>Các bài viết khác</div>

                  <ul className={styles.articleList}>
                    {listNews?.data
                      ?.slice(0, 5)
                      .map((item: any, index: number) => {
                        return (
                          <Link to={`/bai-viet/${item.id}`}>
                            <li className={styles.post}>{item.title}</li>
                          </Link>
                        );
                      })}
                  </ul>
                </Col>
              </Row>
            </div>
          ) : (
            <div className={styles.fetchWrap}>Không có dữ liệu</div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
