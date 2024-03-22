import { useState } from "react";
import ManagerMemberTwo from "./managerMember";
import {
  AudioOutlined,
  PlusOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { SearchProps } from "antd/es/input";
import { Menu, Input, Divider, Radio, Table, Button, Space } from "antd";
import { admin, randomState } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}


interface AdminProps {}

const items: MenuItem[] = [
  getItem(admin, "sub1", [
    getItem("Đăng xuất", "1"),
    getItem("Đổi mật khẩu", "2"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1"];



const AdminTwo = () => {
  document.title = "Đơn vị quản lý"
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <>
      <Header/>
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImg}
              src={require("../../assets/image/logo.png")}
              alt="Logo"
            />
          </div>
          <div className={styles.titleContent}>
            <div className={styles.titleText}>Đơn vị:</div>{" "}
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle && styles.title}>Thông tin người quản lý</div>
              {/* <div className={styles.titleName}>
                <button className={styles.btnView} style={{marginTop: "8px"}} onClick={() => navigate("/thong-tin-tai-khoan")}>
                    Chi tiết
                </button>
              </div> */}
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Họ tên: </div>
              <div className={styles.titleName}>Nguyễn Văn A</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Số điện thoại:</div>
              <div className={styles.titleName}>Nguyễn Văn A</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Email: </div>
              <div className={styles.titleName}>Nguyễn Văn A</div>
            </div>
            
            
          </div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <ManagerMemberTwo />
      </div>
      <Footer/>
    </>
  );
};

export default AdminTwo;
