import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, message } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/api";
import { changePassword } from "../../api/ApiUser";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

export default function ChangePassword() {
  document.title = "Đổi mật khẩu";
  const navigate = useNavigate();
  const changePasswordMutation = useMutation(
    async (payload: any) => await changePassword(payload),
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          message.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại!");
          setTimeout(() => {
            logout();
            navigate("/dang-nhap");
          }, 2000);
        } else {
          message.error(data.data);
        }
      },
      onError: () => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
    }
  );

  const onFinish = (values: any) => {
    delete values.confirm;
    changePasswordMutation.mutate(values);
  };
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.container}>
        <div className={styles.imageWrap}>
          <Logo />
          <div className={styles.title}>ĐỔI MẬT KHẨU</div>
        </div>

        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          layout="vertical"
          autoComplete="off"
          className={styles.form}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không đúng định dạng",
              },
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input
              prefix={<PhoneOutlined className={styles.icon} />}
              placeholder="Nhập số điện thoại"
              className={styles.formInput}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.icon} />}
              placeholder="Mật khẩu cũ"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                pattern: /^.{8,}$/,
                message: "Ít nhất 8 ký tự",
              },
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
            ]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.icon} />}
              placeholder="Mật khẩu mới"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["newPassword"]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu một lần nữa!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.icon} />}
              placeholder="Nhập lại mật khẩu"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item className={styles.formItem} wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
