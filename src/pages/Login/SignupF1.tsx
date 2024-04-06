import React, { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  DatePicker,
} from "antd";
import {
  LineChartOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  PlusOutlined,
  MailOutlined,
  CheckOutlined,
  BankOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  DeploymentUnitOutlined,
  SolutionOutlined,
  ProfileOutlined,
  CalendarOutlined,
  AimOutlined,
} from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
// <
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { signup } from "../../api/ApiUser";
import { level, province } from "../../until/until";
import Cookies from "js-cookie";
import { signUpF1 } from "../../api/f0";
import { useDispatch, useSelector } from "react-redux";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function SignupF1() {
  document.title = "Đăng ký tài khoản";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reloadCount = useSelector((state: any) => state.reloadCount);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
//   const permission = CryptoJS.AES.decrypt(Cookies.get("permission") as string, secretKey);
//   const decryptedPermission = permission.toString(CryptoJS.enc.Utf8);
  const signupMutation = useMutation(
    async (payload: any) => await signUpF1(payload),
    {
      onSuccess: (data: any) => {
        if (data.status === "success") {
          message.success("Đăng ký thành công!");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else if (data.status === "failed") {
          message.error(data.data);
        } else message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      },
      onError: () => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      },
    }
  );

  const handleRecaptchaChange = (value: any) => {
    setIsVerify(true);
  };
  const isImage = (file: any) => {
    const acceptedImageTypes = ["image/jpeg", "image/png"];
    return acceptedImageTypes.includes(file.type);
  };
  const onChange = (value: string) => {
    // console.log(`selected ${value}`);
  };
  const onSearch = (value: string) => {
    // console.log('search:', value);
  };
  const filterOption = (
    input: string,
    option?: { children: React.ReactNode }
  ) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
  const onFinish = (value: any) => {
    // delete value.confirm
    console.log("value", value);
    const payload = {
      name: value.name,
      phone: value.phone,
      manage: value.manage,
      level: value.level,
      location: value.location,
      password: value.password,
      username: value.username
    };
    signupMutation.mutate(payload);
  };
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

  return (
    <div className={styles.loginWrap}>
      <div className={styles.logo}>
        <Image
          src={require("../../assets/image/logo.png")}
          preview={false}
          className={styles.logoImg}
        />
      </div>
      <div className={styles.login}>
        <div className={styles.title}>
          Đăng ký tài khoản liên đoàn, sở, ngành
        </div>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input
              prefix={<UserOutlined className={styles.icon} />}
              placeholder="Họ tên"
              className={styles.formInput}
            />
          </Form.Item>
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
              placeholder="Số điện thoại"
              className={styles.formInput}
            />
          </Form.Item>
          <DeploymentUnitOutlined className={styles.iconSelect} />
          <Form.Item
            name="manage"
            rules={[
              { required: true, message: "Vui lòng chọn đơn vị quản lý!" },
            ]}
            wrapperCol={{ span: 24 }}
            className={styles.formSelect}
          >
            <Select
              menuItemSelectedIcon={<CheckOutlined />}
              showSearch
              placeholder={"Đơn vị quản lý"}
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              className={styles.select}
            >
              <Select.Option value="Liên đoàn võ thuật">
                Liên đoàn võ thuật
              </Select.Option>
              <Select.Option value="Liên đoàn võ thuật cổ truyền">
                Liên đoàn võ thuật cổ truyền
              </Select.Option>
              <Select.Option value="Hội Võ Thuật">Hội Võ Thuật</Select.Option>
              <Select.Option value="Hội Võ Thuật Cổ Truyền">
                Hội Võ Thuật Cổ Truyền
              </Select.Option>
              <Select.Option value="Công An">Công An</Select.Option>
              <Select.Option value="Quân Đội">Quân Đội</Select.Option>
              <Select.Option value="Giáo Dục">Giáo Dục</Select.Option>
              <Select.Option value="Sở VHTT và Du lịch">
                Sở VHTT và Du lịch
              </Select.Option>
              <Select.Option value="Trung tâm huấn luyện thể thao">
                Trung tâm huấn luyện thể thao
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="level"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập chức danh người quản lý!",
              },
            ]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input
              prefix={<MailOutlined className={styles.icon} />}
              placeholder="Chức danh"
              className={styles.formInput}
            />
          </Form.Item>
          <EnvironmentOutlined className={styles.iconSelect} />
          <Form.Item
            name="location"
            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành!" }]}
            wrapperCol={{ span: 24 }}
            className={styles.formSelect}
          >
            <Select
              menuItemSelectedIcon={<CheckOutlined />}
              showSearch
              placeholder={"Tỉnh/Thành"}
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              className={styles.select}
            >
              {province.map((option) => {
                if (
                  option !== "Công An" &&
                  option !== "Quân Đội" &&
                  option !== "Giáo Dục"
                )
                  return (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản đăng nhập!" }]}
            wrapperCol={{ span: 24 }}
            className={styles.formItem}
          >
            <Input
              prefix={<UserOutlined className={styles.icon} />}
              placeholder="Tài khoản đăng nhập"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                pattern: /^.{8,}$/,
                message: "Ít nhất 8 ký tự",
              },
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
              placeholder="Mật khẩu"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
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
                  if (!value || getFieldValue("password") === value) {
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
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
