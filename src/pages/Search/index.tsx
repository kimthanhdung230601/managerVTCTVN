import { Button, Image, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;
export default function SearchId() {
  document.title = "Tra cứu hội viên";
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    navigate(`/thong-tin-ho-so?keyword=${value}`);
  };
  const onClickSearchBtn = () => {
    if (key === "")
      message.warning("Vui lòng nhập số CCCD hoặc mã định danh để tra cứu");
    else navigate(`/thong-tin-ho-so?keyword=${key}`);
  };
  return (
    <>
      <Header />
      <div style={{ paddingTop: "70px" }}>
        <div className={styles.wrap}>
          <div className={styles.imageWrap}>
            <Image
              src={require("../../assets/image/logo.png")}
              preview={false}
              className={styles.img}
            />
            <div className={styles.title}>
              Liên đoàn Võ thuật cổ truyền Việt Nam
            </div>
          </div>
          <div className={styles.search}>
            <div className={styles.titleSearch}>
              Tra cứu dữ liệu hội viên (Nhập mã hội viên):
              <br />
              <Search
                placeholder="Nhập mã định danh hoặc số CCCD để tra cứu"
                allowClear
                onSearch={onSearch}
                size="large"
                className={styles.input}
                onChange={(e) => setKey(e.target.value)}
              />
              <br />
              <Button className={styles.btn} onClick={onClickSearchBtn}>
                Tra cứu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
