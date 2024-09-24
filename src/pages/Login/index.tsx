import React, { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import { Button, Form, Image, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { accountF0, accountF1, accountF2 } from "../../until/until";
import { signin } from "../../api/ApiUser";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

const secretKey = process.env.REACT_APP_SECRET_KEY as string;

export default function Login() {
  const navigate = useNavigate();
  document.title = "Đăng nhập";
  const dispatch = useDispatch();
  const reloadCount = useSelector((state: any) => state.reloadCount);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const handleRecaptchaChange = (value: any) => {
    setIsVerify(true);
  };
  //club
  const NameClb = useSelector((state: any) => state.NameClb);
  const club = useSelector((state: any) => state.club);
  useEffect(() => {
    dispatch({ type: "INCREMENT_LOAD_COUNT" });
    if (reloadCount.loadCount >= 18) {
      setShowCaptcha(true);
    }
    if (reloadCount.loadCount < 18 && !showCaptcha) {
      setTimeout(() => {
        dispatch({ type: "RESET_LOAD_COUNT" });
      }, 120000);
    }
    if (isVerify) dispatch({ type: "RESET_LOAD_COUNT" });
  }, [isVerify]);
  //form
  const [form] = useForm();
  const onFinish = async (value: any) => {
    const res = await signin(value);

    if (res.status === "success") {
      switch (true) {
        case res?.info_user[0].permission == "0":
          Cookies.set(
            "permission",
            CryptoJS.AES.encrypt(
              res?.info_user[0].permission,
              secretKey
            ).toString()
          );
          navigate("/lien-doan/quan-ly-hoi-vien");
          break;
        case res?.info_user[0].permission == "1":
          navigate("/quan-ly-lien-doan-so-nganh");
          break;

        case res?.info_user[0].permission === "2":
          navigate("/quan-ly-don-vi");
          break;
        default:
          alert("Nhập sai tài khoản hoặc mật khẩu");
          break;
      }
      Cookies.set("token", res.jwt);
      Cookies.set(
        "club",
        CryptoJS.AES.encrypt(res?.info_user[0].club, secretKey).toString()
      );
      Cookies.set(
        "location",
        CryptoJS.AES.encrypt(res?.info_user[0].location, secretKey).toString()
      );
      Cookies.set(
        "NameClb",
        CryptoJS.AES.encrypt(res?.info_user[0].NameClb, secretKey).toString()
      );
      // Cookies.set("NameClb", res?.info_user[0].NameClb);
      Cookies.set(
        "name",
        CryptoJS.AES.encrypt(res?.info_user[0].name, secretKey).toString()
      );
      Cookies.set(
        "phone",
        CryptoJS.AES.encrypt(res?.info_user[0].phone, secretKey).toString()
      );
      Cookies.set(
        "email",
        CryptoJS.AES.encrypt(res?.info_user[0].email, secretKey).toString()
      );
      Cookies.set(
        "permission",
        CryptoJS.AES.encrypt(res?.info_user[0].permission, secretKey).toString()
      );
      Cookies.set(
        "manage",
        CryptoJS.AES.encrypt(res?.info_user[0].manage, secretKey).toString()
      );
      Cookies.set(
        "id",
        CryptoJS.AES.encrypt(res?.info_user[0].id, secretKey).toString()
      );
    } else {
      message.error("Nhập sai tài khoản hoặc mật khẩu");
    }
  };
  return (
    <div className={styles.loginWrap}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.login}>
        <div className={styles.title}>Đăng nhập</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          layout="vertical"
          autoComplete="off"
          className={styles.form}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại hoặc tên tài khoản!",
              },
            ]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input
              prefix={<UserOutlined className={styles.icon} />}
              placeholder="Số điện thoại hoặc tài khoản"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.icon} />}
              placeholder="Mật khẩu"
              className={styles.formInput}
            />
          </Form.Item>
          {showCaptcha ? (
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: "Captcha không hợp lệ" }]}
              wrapperCol={{ span: 24 }}
              className={styles.formItem}
            >
              <ReCAPTCHA
                sitekey="6LcFNkYpAAAAAMS1ubxwdymx7cmbup8R3bCU3NYq"
                onChange={handleRecaptchaChange}
                className={styles.captcha}
              />
            </Form.Item>
          ) : null}
          <Form.Item className={styles.formItem} wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.signup}>
          Bạn chưa có tài khoản? Đăng ký thành viên mới{" "}
          <Link
            to={"/dang-ky-tai-khoan"}
            style={{ color: "#046C39", fontWeight: "600" }}
          >
            tại đây!
          </Link>
          <div style={{ marginTop: "1vh" }}>
            <Link to={"/"} style={{ color: "#046C39", fontWeight: "600" }}>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
