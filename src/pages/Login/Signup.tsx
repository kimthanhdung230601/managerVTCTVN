import React, { useEffect, useState } from 'react'
import styles from "./Style.module.scss"
import { Button, Form, Image, Input, message, Modal, Upload, UploadFile, UploadProps } from 'antd'
import { LockOutlined, UserOutlined, PhoneOutlined, IdcardOutlined, PlusOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

export default function Signup() {
    document.title = "Đăng ký";
    const dispatch = useDispatch();
    const reloadCount = useSelector((state:any) => state.reloadCount);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const [previewOpen1, setPreviewOpen1] = useState(false);
    const [previewImage1, setPreviewImage1] = useState('');
    const [previewTitle1, setPreviewTitle1] = useState('');
    const [fileList1, setFileList1] = useState<UploadFile[]>([]);
    const [previewOpen2, setPreviewOpen2] = useState(false);
    const [previewImage2, setPreviewImage2] = useState('');
    const [previewTitle2, setPreviewTitle2] = useState('');
    const [fileList2, setFileList2] = useState<UploadFile[]>([]);
    const handleCancel1 = () => setPreviewOpen1(false);
    const handleCancel2 = () => setPreviewOpen2(false);
    const handlePreview1 = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
        }
        setPreviewImage1(file.url || (file.preview as string));
        setPreviewOpen1(true);
        setPreviewTitle1(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange1: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList1(newFileList);
    const handlePreview2 = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
        }
        setPreviewImage2(file.url || (file.preview as string));
        setPreviewOpen2(true);
        setPreviewTitle2(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange2: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList2(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
        </button>
    );
    const handleRecaptchaChange = (value:any) => {
        setIsVerify(true);
    };
    const isImage = (file:any) => {
        const acceptedImageTypes = ['image/jpeg', 'image/png'];
        return acceptedImageTypes.includes(file.type);
      };
    
      const props = {
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        beforeUpload: (file:any) => {
          if (!isImage(file)) {
            message.error('Chỉ cho phép tải lên các file ảnh (JPEG, PNG).');
            return false; 
          }
          return true; // Cho phép tải lên nếu là file ảnh
        },
        onChange(info:any) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} tải ảnh thành công`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải ảnh thất bại.`);
          }
        },
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
  return (
    <div className={styles.loginWrap}>
        <div className={styles.logo}>
            <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.logoImg}/>
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
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<UserOutlined className={styles.icon} />} placeholder="Họ tên" className={styles.formInput}/>
               
                </Form.Item>
                <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<PhoneOutlined className={styles.icon} />} placeholder="Số điện thoại" className={styles.formInput}/>
               
                </Form.Item>
                <Form.Item
                name="id"
                rules={[{ required: true, message: 'Vui lòng nhập mã định danh!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<IdcardOutlined className={styles.icon} />} placeholder="Mã định danh" className={styles.formInput}/>
               
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
                        message: 'Vui lòng nhập mật khẩu!',
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
                <div className={styles.formImage}>
                    <Form.Item
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]}
                        wrapperCol={{ span: 24 }}
                        className={`${styles.uploadForm} ${styles.formItem}`}
                    >
                        <div style={{textAlign: "center", marginBottom: "10px"}}>Tải ảnh văn bằng</div>
                        <Upload
                            {...props}
                            listType="picture-card"
                            fileList={fileList1}
                            onPreview={handlePreview1}
                            onChange={handleChange1}
                            className={styles.uploadImg}
                        >
                            {fileList1.length >= 1 ? null : uploadButton}
                        </Upload>
                        
                        <Modal open={previewOpen1} title={previewTitle1} footer={null} onCancel={handleCancel1}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage1} />
                        </Modal>
                    </Form.Item>
                    <Form.Item
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]}
                        wrapperCol={{ span: 24 }}
                        className={`${styles.uploadForm} ${styles.formItem}`}
                    >
                        <div style={{textAlign: "center", marginBottom: "10px"}}>Tải giấy giới thiệu</div>
                        <Upload
                            {...props}
                            listType="picture-card"
                            fileList={fileList2}
                            onPreview={handlePreview2}
                            onChange={handleChange2}
                            className={styles.uploadImg}
                        >
                            {fileList2.length >= 1 ? null : uploadButton}
                        </Upload>
                        
                        <Modal open={previewOpen2} title={previewTitle2} footer={null} onCancel={handleCancel2}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                        </Modal>
                    </Form.Item>
                </div>
                <div className={styles.note}>Lưu ý: Kích thước ảnh không vượt quá 25MB.</div>
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
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <div className={styles.signup}>Bạn đã có tài khoản ? Đăng nhập <Link to={"/dang-nhap"} style={{color: "#046C39", fontWeight: "600"}}>tại đây!</Link></div>
        </div>
    </div>
  )
}
