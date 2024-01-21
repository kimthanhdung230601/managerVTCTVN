import React, { useEffect, useState } from 'react'
import styles from "./Style.module.scss"
import { Button, Form, Image, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { accountF0, accountF1, accountF2 } from '../../until/until';
export default function Login() {
    const navigate = useNavigate();
    document.title = "Đăng nhập";
    const dispatch = useDispatch();
    const reloadCount = useSelector((state:any) => state.reloadCount);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const handleRecaptchaChange = (value:any) => {
        setIsVerify(true);
    };
    useEffect(() => {
        dispatch({ type: 'INCREMENT_LOAD_COUNT' });
        if (reloadCount.loadCount >= 18) {
          setShowCaptcha(true)
        }
        if(reloadCount.loadCount < 18 && !showCaptcha){
            setTimeout(() => {
            dispatch({ type: 'RESET_LOAD_COUNT' });
        }, 120000);
        }
        if(isVerify) dispatch({ type: 'RESET_LOAD_COUNT' });
         
      }, [isVerify]);
      //form
      const [form] = useForm();
      const onFinish = (value:any)=>{
        console.log("value",value);
        if (accountF0[0].password === value.password && accountF0[0].username === value.username) {
            console.log("Mật khẩu đúng cho accountF0"); navigate("/Admin0/1")
            
          } else if (accountF1[0].password === value.password && accountF1[0].username === value.username) {
            console.log("Mật khẩu đúng cho accountF1"); navigate("/Admin1")
          } else if (accountF2[0].password=== value.password && accountF2[0].username === value.username) {
            console.log("Mật khẩu đúng cho accountF2"); navigate("/Admin2")
          } else {
            alert("Nhập sai tài khoản hoặc mật khẩu");
          }
      }
  return (
    <div className={styles.loginWrap}>
        <div className={styles.logo}>
            <Image src={require("../../assets/image/logo.png")} preview={false} width={"12%"}/>
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
                    name="username"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                >
                <Input prefix={<UserOutlined className={styles.icon} />} placeholder="Số điện thoại" className={styles.formInput}/>
               
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                   
                <Input.Password
                    prefix={<LockOutlined className={styles.icon} />}
                    placeholder="Mật khẩu"
                    className={styles.formInput}/>
                </Form.Item>
                {
                    showCaptcha ? 
                    <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: 'Captcha không hợp lệ' }]}
                        wrapperCol={{ span: 24 }}
                        className={styles.formItem}
                    >
                        <ReCAPTCHA
                        sitekey="6LcFNkYpAAAAAMS1ubxwdymx7cmbup8R3bCU3NYq"  
                        onChange={handleRecaptchaChange}
                        className={styles.captcha}
                        />
                    </Form.Item>
                    : null
                }
                <Form.Item  className={styles.formItem} wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <div className={styles.signup}>Bạn chưa có tài khoản? Đăng ký thành viên mới <Link to={"/dang-ky"} style={{color: "#046C39", fontWeight: "600"}}>tại đây!</Link></div>
        </div>
    </div>
  )
}
