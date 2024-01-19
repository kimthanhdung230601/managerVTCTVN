import React from 'react'
import styles from "./Style.module.scss"
import { Button, Form, Image, Input } from 'antd'
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
export default function Signup() {
    // const handleRecaptchaChange = (value) => {
    //     // Xử lý giá trị reCAPTCHA khi thay đổi
    //     console.log("reCAPTCHA value:", value);
    // };
  return (
    <div className={styles.loginWrap}>
        <div className={styles.logo}>
            <Image src={require("../../assets/image/logo.png")} preview={false} width={"12%"}/>
        </div>
        <div className={styles.login}>
            <div className={styles.title}>Đăng ký</div>
            
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                layout="vertical"
                autoComplete="off"
                className={styles.form}
            >
                <Form.Item
                name="username"
                rules={[{ required: true, message: 'Hãy nhập họ tên!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<UserOutlined className={styles.icon} />} placeholder="Họ tên" className={styles.formInput}/>
               
                </Form.Item>
                <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<PhoneOutlined className={styles.icon} />} placeholder="Số điện thoại" className={styles.formInput}/>
               
                </Form.Item>
                <Form.Item
                name="password"
                rules={[
                    {
                        pattern: /^.{8,}$/,
                        message: 'Ít nhất 8 ký tự',
                    },
                    {
                        required: true,
                        message: 'Hãy nhập mật khẩu',
                    }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                   
                <Input.Password
                    prefix={<LockOutlined className={styles.icon} />}
                    placeholder="Mật khẩu"
                    className={styles.formInput}/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Hãy nhập lại mật khẩu một lần nữa!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password
                    prefix={<LockOutlined className={styles.icon} />}
                    placeholder="Nhập lại mật khẩu"
                    className={styles.formInput}/>
                </Form.Item>
                <Form.Item
                    name="captcha"
                    rules={[{ required: true, message: 'Captcha không hợp lệ' }]}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                >
                    <ReCAPTCHA
                    sitekey="6LcFNkYpAAAAAMS1ubxwdymx7cmbup8R3bCU3NYq"  // Đặt khóa API của bạn ở đây
                    // onChange={handleRecaptchaChange}
                    className={styles.captcha}
                    />
                </Form.Item>
                
                <Form.Item  className={styles.formItem} wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
           
        </div>
    </div>
  )
}
