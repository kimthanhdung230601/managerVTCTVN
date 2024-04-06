import { useId, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useQuery } from "react-query";
import { getInforAdmin, getListMemberF3 } from "../../api/f2";
import { useDispatch, useSelector } from "react-redux";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

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
  document.title = "Đơn vị quản lý";
  const navigate = useNavigate();
  const idClub = new URLSearchParams(useLocation().search);
  // const { data: listF3, refetch } = useQuery(
  //   ["listF3", idClub.get("club")],
  //   () => getListMemberF3(idClub.get("club"))
  // );
  // const [openKeys, setOpenKeys] = useState(["sub1"]);
  // const name = Cookies.get("name") as string;
  const name = CryptoJS.AES.decrypt(Cookies.get("name") as string, secretKey);
  const decryptedName = name.toString(CryptoJS.enc.Utf8);
  const phone = CryptoJS.AES.decrypt(Cookies.get("phone") as string, secretKey);
  const decryptedPhone = phone.toString(CryptoJS.enc.Utf8);
  const email = CryptoJS.AES.decrypt(Cookies.get("email") as string, secretKey);
  const decryptedEmail = email.toString(CryptoJS.enc.Utf8);
  const id = CryptoJS.AES.decrypt(Cookies.get("id") as string, secretKey);
  const decryptedId = id.toString(CryptoJS.enc.Utf8);
  const club = CryptoJS.AES.decrypt(Cookies.get("club") as string, secretKey);
  const decryptedClub = club.toString(CryptoJS.enc.Utf8);
  const NameClb = CryptoJS.AES.decrypt(
    Cookies.get("NameClb") as string,
    secretKey
  );
  const decryptedNameClb = NameClb.toString(CryptoJS.enc.Utf8);

  const onClick: MenuProps["onClick"] = (e) => {};
  const urlParams = new URLSearchParams(window.location.search);
  const [userId, setUserId] = useState<any>({
    name: decryptedName,
    phone: decryptedPhone,
    email: decryptedEmail,
    clb: decryptedNameClb,
  });

  var idValue: any = 0;
  if (urlParams.has("id")) {
    idValue = urlParams.get("id");
  }
  const { data: getInforId } = useQuery(["getInfor", idValue], () =>
    getInforAdmin(1)
  );
  if (getInforId?.data?.status == "success") {
    setUserId({
      name: getInforId?.data[0].name,
      phone: getInforId?.data[0].phone,
      email: getInforId?.data[0].email,
      // clb: data?.data[0].,
    });
  }
  return (
    <div style={{ backgroundColor: "#fff"}}>
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
          <div className={styles.titleContent}>
            <div className={styles.titleText}>Đơn vị: {userId.clb}</div>{" "}
            <div className={styles.subTitleText}>
              <div className={`$(styles.boldText)`}>
                Thông tin người quản lý
              </div>
              <div className={styles.titleName}>
                {/* <button
                  className={styles.btnView}
                  style={{ marginTop: "8px" }}
                  onClick={() => {
                    const idEncode = CryptoJS.AES.encrypt(
                      decryptedId,
                      secretKey
                    ).toString();
                    const id = encodeURIComponent(idEncode);
                    return navigate(`/thong-tin-tai-khoan/${id}`);
                  }}
                >
                  Chi tiết
                </button> */}
              </div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Họ tên: </div>
              <div className={styles.titleName}>{userId.name}</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Số điện thoại:</div>
              <div className={styles.titleName}>{userId.phone}</div>
            </div>
            <div className={styles.subTitleText}>
              <div className={styles.labelTitle}>Email: </div>
              <div className={styles.titleName}>{userId.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <ManagerMemberTwo />
      </div>
      <Footer />
    
      
    </div>
  );
};

export default AdminTwo;
