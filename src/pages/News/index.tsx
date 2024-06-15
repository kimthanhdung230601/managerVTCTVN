import { Col, Image, Pagination, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useQuery } from "react-query";
import { getListNews } from "../../api/f0";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { isAdmin } from "../../api/ApiUser";
import NewCard from "../../components/NewCard";

export default function News() {
  document.title = "Tin tức";
  const navigate = useNavigate();
  const param = new URLSearchParams(useLocation().search);
  const [currentPage, setCurrentPage] = useState(param.get("page") || "1");
  const { data, isFetching } = useQuery(["news", currentPage], () =>
    getListNews(currentPage, "0")
  );
  const onChange = (page: number) => {
    navigate(`/tin-tuc?page=${page}`);
    setCurrentPage(page.toString());
  };

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.title}>TIN TỨC</div>
        {isAdmin() === "0" ? (
          <div className={styles.newPostWrap}>
            <Link to={"/dang-bai"}>
              <button className={styles.newPostBtn}>
                <PlusOutlined style={{ marginRight: "6px" }} /> Tạo bài viết
              </button>
            </Link>
          </div>
        ) : null}

        <div className={styles.postWrap}>
          <div className={styles.postLabel}>
            <FileTextOutlined style={{ marginRight: "10px" }} />
            TIN TỨC GẦN ĐÂY
          </div>
          <div className={styles.postList}>
            {isFetching ? (
              <Spin
                style={{ width: "100%", textAlign: "center" }}
                size="large"
              />
            ) : (
              <>
                {data?.total_products === 0 || data.status === "failed" ? (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "40px",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#000",
                    }}
                  >
                    Chưa có bài viết nào{" "}
                  </div>
                ) : (
                  <>
                    {data?.data.map((item: any, index: number) => {
                      return (
                        <NewCard
                          id={item.id}
                          content={item.content}
                          title={item.title}
                          time={item.time}
                        />
                      );
                    })}

                    <Pagination
                      defaultCurrent={parseInt(currentPage, 10)}
                      total={data?.total_products}
                      pageSize={12}
                      onChange={onChange}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
