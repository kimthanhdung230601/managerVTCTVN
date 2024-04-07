import { useState, useEffect, useMemo } from "react";
import { Tabs } from "antd";
import { useParams, useNavigate } from "react-router-dom"; // Thay đổi ở đây
import ManagerAccount from "./managerAccount";
import ManagerMember from "./managerMember";
import UpdateMember from "./updateMember";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles.module.scss";
import ManagerF1 from "./manageF1";

const { TabPane } = Tabs;

const Admin = () => {
  document.title = "Quản lý hội viên";
  const navigate = useNavigate(); // Thay đổi ở đây
  const paramValue = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    paramValue.key || "quan-ly-hoi-vien"
  );
  const [titleText, setTitleText] = useState("Quản lý hội viên");

  const handleTabChange = (key: string) => {
    setSelectedMenuItem(key);
    navigate(`/lien-doan/${key}`); // Thay đổi ở đây
  };

  const items = useMemo(
    () => [
      {
        key: "quan-ly-hoi-vien",
        tab: "Quản lý hội viên",
        content: <ManagerMember />,
      },
      {
        key: "quan-ly-tai-khoan-F1",
        tab: "Tài khoản đơn vị quản lý",
        content: <ManagerF1 />,
      },
      {
        key: "quan-ly-tai-khoan",
        tab: "Tài khoản hội viên",
        content: <ManagerAccount />,
      },
      {
        key: "cap-nhat-du-lieu",
        tab: "Cập nhật dữ liệu",
        content: <UpdateMember />,
      },
    ],
    []
  );

  useEffect(() => {
    switch (selectedMenuItem) {
      case "quan-ly-hoi-vien":
        setTitleText("Quản lý hội viên");
        break;
      case "quan-ly-tai-khoan-F1":
        setTitleText("Tài khoản đơn vị quản lý");
        break;
      case "quan-ly-tai-khoan":
        setTitleText("Tài khoản hội viên");
        break;
      case "cap-nhat-du-lieu":
        setTitleText("Cập nhật dữ liệu");
        break;
      default:
        setTitleText("Cập nhật dữ liệu");
    }
  }, [selectedMenuItem]);

  return (
    <div style={{ backgroundColor: "#fff", minHeight:"100vh" }} >
      <Header />
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImg}
              src={require("../../assets/image/logo.png")}
              alt="Logo"
            />
          </div>
          <div className={styles.titleText}>{titleText}</div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <Tabs
          activeKey={selectedMenuItem}
          onChange={handleTabChange}
          className={styles.tab}
          centered
        >
          {items.map((item) => (
            <TabPane tab={item.tab} key={item.key}>
              {item.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
