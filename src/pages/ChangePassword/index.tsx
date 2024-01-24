import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Image, Input } from 'antd'
import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import styles from "./Style.module.scss"

export default function ChangePassword() {
    document.title= "Đổi mật khẩu"
  return (
    <div className={styles.wrap}>
        <Header />
        <div className={styles.container}>
            <div className={styles.imageWrap}>
                <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img}/>
                <div className={styles.title}>ĐỔI MẬT KHẨU</div>
            </div>
            
                <Form
                    name="basic"
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    layout="vertical"
                    autoComplete="off"
                    className={styles.form}
                >
                    <Form.Item
                    name="oldPassword"
                    rules={[
                        {
                            pattern: /^.{8,}$/,
                            message: 'Ít nhất 8 ký tự',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        }]}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                    >
                    
                    <Input.Password
                        prefix={<LockOutlined className={styles.icon} />}
                        placeholder="Mật khẩu cũ"
                        className={styles.formInput}/>
                    </Form.Item>
                    <Form.Item
                    name="newPassword"
                    rules={[
                        {
                            pattern: /^.{8,}$/,
                            message: 'Ít nhất 8 ký tự',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!',
                        }]}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                    >
                    
                    <Input.Password
                        prefix={<LockOutlined className={styles.icon} />}
                        placeholder="Mật khẩu mới"
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
                            message: 'Vui lòng nhập lại mật khẩu một lần nữa!',
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
                    <Form.Item  className={styles.formItem} wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        Đặt lại mật khẩu
                    </Button>
                </Form.Item>
                </Form>
        </div>
           <Footer /> 
    </div>
  )
}
