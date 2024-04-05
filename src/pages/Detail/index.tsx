import { Col, Image, message, QRCode, Row, Spin } from "antd";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import { useLocation, useParams } from "react-router-dom";
import { getInforF3 } from "../../api/ApiUser";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
import moment from "moment";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

interface Infor {
  name: string;
  nationality: string;
  code: string;
  birthday: string;
  sex: string;
  NameClb: string;
  hometown: string;
  level: string;
  idcard: string;
  address: string;
  phone: string;
  email: string;
  achievements: string;
  note: string;
}

const title = [
  "Họ tên",
  "Quốc tịch",
  "Mã định danh",
  "Ngày sinh",
  "Giới tính",
  "CLB, Môn phái, Võ đường, Võ phái, Trung tâm",
  "Tỉnh/Thành",
  "Cấp đai/ đẳng hiện tại",
  "Số CCCD",
  "Địa chỉ thường trú",
  "SĐT",
  "Email",
  "Thành tích cá nhân (cấp quốc gia từ 2020 trở lại đây)",
  "Ghi chú",
];

const initialData = {
  name: "",
  nationality: "",
  code: "",
  birthday: "",
  sex: "",
  NameClb: "",
  hometown: "",
  level: "",
  idcard: "",
  address: "",
  phone: "",
  email: "",
  achievements: "",
  note: "",
};

export default function Detail() {
  document.title = "Thông tin hồ sơ";
  var i = 0;
  const params = useParams();
  const search = useLocation();
  const [userData, setUserData] = useState(initialData);
  const keyword = new URLSearchParams(useLocation().search);
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const { data: userInfor, isFetching } = useQuery(
    ["userInfor", params.id, search],
    () => {
      const data = keyword.get("keyword") || "";
      if (search.search.includes("keyword"))
        return getInforF3(data, search.search);
      else return getInforF3(params.id, search.pathname);
    },
    {
      onSettled: (data) => {
        if (data.status === "failed") {
          setTimeout(() => {
            window.history.back();
          }, 1200);
        }
        if (data.status === "success") {
          setUserData({
            name: data.data[0].name,
            nationality: data.data[0].nationality,
            code: data.data[0].code,
            birthday: moment(data.data[0].birthday).format("DD/MM/YYYY"),
            sex: data.data[0].sex,
            NameClb: data.data[0].NameClb,
            hometown: data.data[0].hometown,
            level: data.data[0].level,
            idcard: data.data[0].idcard,
            address: data.data[0].address,
            phone: data.data[0].phone,
            email: data.data[0].email,
            achievements:
              data.data[0].achievements !== "undefined"
                ? data.data[0].achievements
                : "Không có giải",

            note: data.data[0].note,
          });
        }
      },
    }
  );

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "70px" }}>
        {isFetching ? (
          <div className={styles.searchWrap}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {userInfor?.status === "failed" || !userInfor ? (
              <div className={styles.searchWrap}>Không có dữ liệu.</div>
            ) : (
              <>
                {
                  <div className={styles.wrap}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={require("../../assets/image/logo.png")}
                        preview={false}
                        className={styles.img}
                      />
                      <div className={styles.title}>THÔNG TIN HỒ SƠ</div>
                    </div>
                    <Row
                      gutter={20}
                      justify="center"
                      style={{ marginTop: "40px" }}
                    >
                      <Col className="gutter-row" xxl={6} lg={6} md={8} xs={24}>
                        <Row
                          gutter={20}
                          style={{ marginBottom: "20px" }}
                          justify="end"
                        >
                          <Col
                            xxl={24}
                            md={24}
                            xs={8}
                            className={`${styles.colImg} gutter-row`}
                          >
                            {userInfor?.data[0].avatar ? (
                              <div
                                style={{ textAlign: "center", width: "auto" }}
                              >
                                <Image
                                  src={`https://vocotruyen.id.vn/PHP_IMG/${userInfor?.data[0].avatar}`}
                                  preview={true}
                                  className={styles.detailImg}
                                />
                                <div
                                  style={{
                                    fontWeight: "500",
                                    color: "#000",
                                    textAlign: "center",
                                    marginTop: "8px",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Ảnh đại diện
                                </div>
                              </div>
                            ) : null}
                          </Col>
                          <Col
                            xxl={24}
                            md={24}
                            xs={8}
                            className={`${styles.colImg} gutter-row`}
                            style={isMobile ? {} : { marginTop: "20px" }}
                          >
                            {userInfor?.data[0].image_certificate ? (
                              <div style={{ textAlign: "center" }}>
                                <Image
                                  src={`https://vocotruyen.id.vn/PHP_IMG/${userInfor?.data[0].image_certificate}`}
                                  preview={true}
                                  className={styles.detailImg}
                                />
                                <div
                                  style={{
                                    fontWeight: "500",
                                    color: "#000",
                                    textAlign: "center",
                                    marginTop: "8px",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Bằng cấp
                                </div>
                              </div>
                            ) : null}
                          </Col>
                          <Col
                            className={`${styles.colImg} gutter-row`}
                            xxl={24}
                            md={24}
                            xs={8}
                            style={isMobile ? {} : { marginTop: "20px" }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <QRCode
                                value={`https://vocotruyen.id.vn/thong-tin-ho-so?keyword=${userInfor?.data[0].idcard}`}
                                icon={require("../../assets/image/logo.png")}
                                className={styles.detailImg}
                                bgColor="#fff"
                                style={{ margin: "0 auto" }}
                              />
                              <div
                                style={{
                                  fontWeight: "500",
                                  color: "#000",
                                  textAlign: "center",
                                  marginTop: "8px",
                                  fontStyle: "italic",
                                }}
                              >
                                Mã QR
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        className="gutter-row"
                        xxl={12}
                        lg={16}
                        md={16}
                        xs={24}
                      >
                        {title.map((item: any, index: number) => {
                          if (userData !== null) {
                            const keys = Object.keys(userData);
                            const key = keys[index] as keyof Infor;
                            const data = userData[key];
                            if (data) {
                              i++;
                              return (
                                <Row gutter={40} className={styles.DetailItem}>
                                  <Col
                                    className="gutter-row"
                                    xxl={12}
                                    lg={12}
                                    md={12}
                                    xs={12}
                                  >
                                    <span className={styles.NumberOrders}>
                                      {i}.
                                    </span>
                                    <span style={{ color: "#000" }}>
                                      {item}
                                    </span>
                                  </Col>
                                  <Col
                                    className="gutter-row"
                                    xxl={12}
                                    lg={12}
                                    md={12}
                                    xs={12}
                                  >
                                    <span style={{ color: "#000" }}>
                                      {key === "birthday"
                                        ? data.split(" ")[0]
                                        : data}
                                    </span>
                                  </Col>
                                </Row>
                              );
                            }
                          }
                        })}
                      </Col>
                    </Row>
                  </div>
                }
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
