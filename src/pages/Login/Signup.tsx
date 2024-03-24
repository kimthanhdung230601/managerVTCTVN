import React, { useEffect, useState } from 'react'
import styles from "./Style.module.scss"
import { Button, Form, Image, Input, message, Modal, Select, Upload, UploadFile, UploadProps } from 'antd'
import { LockOutlined, UserOutlined, PhoneOutlined, IdcardOutlined, PlusOutlined, MailOutlined, CheckOutlined, BankOutlined, HomeOutlined, EnvironmentOutlined, DeploymentUnitOutlined, SolutionOutlined, ProfileOutlined, CalendarOutlined, AimOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { signup } from '../../api/ApiUser';
import CryptoJS from 'crypto-js';

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});
const province = [
    'Công An', 'Quân Đội', 'Giáo Dục','Hà Giang', 'Cao Bằng', 'Lào Cai', 'Sơn La', 'Lai Châu', 'Bắc Kạn', 'Lạng Sơn', 'Tuyên Quang', 'Yên Bái',
    'Thái Nguyên', 'Điện Biên', 'Phú Thọ', 'Vĩnh Phúc', 'Bắc Giang', 'Bắc Ninh', 'Hà Nội', 'Quảng Ninh', 'Hải Dương',
    'Hải Phòng', 'Hòa Bình', 'Hưng Yên', 'Hà Nam', 'Thái Bình', 'Nam Định', 'Ninh Bình', 'Thanh Hóa', 'Nghệ An',
    'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Kon Tum', 'Gia Lai',
    'Bình Định', 'Phú Yên', 'Đắk Lắk', 'Khánh Hòa', 'Đắk Nông', 'Lâm Đồng', 'Ninh Thuận', 'Bình Phước', 'Tây Ninh',
    'Bình Dương', 'Đồng Nai', 'Bình Thuận', 'Thành phố Hồ Chí Minh', 'Long An', 'Bà Rịa – Vũng Tàu', 'Đồng Tháp',
    'An Giang', 'Tiền Giang', 'Vĩnh Long', 'Bến Tre', 'Cần Thơ', 'Kiên Giang', 'Trà Vinh', 'Hậu Giang', 'Sóc Trăng',
    'Bạc Liêu', 'Cà Mau', 
  ];
export default function Signup() {
    document.title = "Đăng ký";
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
    const signupMutation = useMutation(
        async (payload: any) => await signup(payload), 
        {
            
            onSuccess: (data: any) => {
                if(data.status === "success") {
                    message.success("Đăng ký thành công, vui lòng đăng nhập để tiếp tục")
                    setTimeout(()=> {
                        navigate(`/dang-nhap`)
                    },2000)
                } else if(data.status === "failed") {
                   message.error(data.data)
                } else message.error("Có lỗi xảy ra, vui lòng thử lại sau")
            },
            onError: () => {
                message.error("Có lỗi xảy ra, vui lòng thử lại sau")
            }
        }
        
    )
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
    const onChange = (value: string) => {
        // console.log(`selected ${value}`);
    };
    const onSearch = (value: string) => {
        // console.log('search:', value);
    };
    const filterOption = (input: string, option?: { children: React.ReactNode }) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
    const onFinish = (value: any) => {
        delete value.confirm
        const randomKey = CryptoJS.lib.WordArray.random(32).toString();
        const formdata = new FormData();
        formdata.append("name", value.name);
        formdata.append("club", value.club);
        formdata.append("idcard", value.idcard);
        formdata.append("idday", value.idday);
        formdata.append("idlocation", value.idlocation);
        formdata.append("phone", value.phone);
        formdata.append("email", value.email);
        formdata.append("location", value.location);
        formdata.append("manage", value.manage);
        formdata.append("password", value.password);
        formdata.append(
            `image_certificate`,
            value.image_certificate.file.originFileObj as File,
            CryptoJS.AES.encrypt(value.image_certificate.file.name, randomKey).toString()
        );
        formdata.append(
            `image_ref`,
            value.image_ref.file.originFileObj as File,
            CryptoJS.AES.encrypt(value.image_ref.file.name, randomKey).toString()
        );
        signupMutation.mutate(formdata)
    }
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
            // console.log(info.file, info.fileList);
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
                onFinish={onFinish}
                className={styles.form}
            >
                <Form.Item
                    name="club"
                    rules={[{ required: true, message: 'Vui lòng nhập câu lạc bộ!' }]}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                    >
                    <Input prefix={<SolutionOutlined  className={styles.icon} />} placeholder="CLB (Môn Phái, Võ Phái, Võ Đường, CLB,...)" className={styles.formInput}/>
                
                </Form.Item>
                <Form.Item
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                    <Input prefix={<UserOutlined className={styles.icon} />} placeholder="Họ tên" className={styles.formInput}/>
                </Form.Item>
                <Form.Item
                name="idcard"
                rules={[{ required: true, message: 'Vui lòng nhập mã định danh!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<IdcardOutlined className={styles.icon} />} placeholder="Mã định danh" className={styles.formInput}/>
               
                </Form.Item>
                <div style={{display: "flex", width: "100%"}}>
                    <Form.Item
                        name="idday"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày cấp!' }]}
                        wrapperCol={{ span: 24 }}
                        className={styles.formItem}
                        style={{marginRight: "10px"}}
                    >
                        <Input prefix={<CalendarOutlined className={styles.icon} />} placeholder="Ngày cấp" type='date' className={styles.formInput}/>
                    </Form.Item>
                    <Form.Item
                        name="idlocation"
                        rules={[{ required: true, message: 'Vui lòng nhập nơi cấp!' }]}
                        wrapperCol={{ span: 24 }}
                        className={styles.formItem}
                        style={{marginLeft: "10px", width: "100%"}}
                    >
                        <Input prefix={<AimOutlined  className={styles.icon} />} placeholder="Nơi cấp" className={styles.formInput}/>
                    </Form.Item>
                </div>
                <Form.Item
                    name="phone"
                    rules={[
                        {
                        pattern: /^[0-9]{10}$/,
                        message: 'Số điện thoại không đúng định dạng',
                        },
                        {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại',
                        },
                    ]}
                    wrapperCol={{ span: 24 }}
                    className={styles.formItem}
                >
                <Input prefix={<PhoneOutlined className={styles.icon} />} placeholder="Số điện thoại" className={styles.formInput}/>
                </Form.Item>
                <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: "Email không đúng định dạng!",
                    }
                ]}
                wrapperCol={{ span: 24 }}
                className={styles.formItem}
                >
                <Input prefix={<MailOutlined className={styles.icon} />} placeholder="Email" className={styles.formInput}/>
               
                </Form.Item>
                <EnvironmentOutlined  className={styles.iconSelect}/>
                <Form.Item
                name="location"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành/ngành!' }]}
                wrapperCol={{ span: 24 }}
                className={styles.formSelect}
                >
                    <Select
                       menuItemSelectedIcon={<CheckOutlined />}
                       showSearch
                       placeholder={"Tỉnh/Thành/Ngành"}
                       optionFilterProp="children"
                       onChange={onChange}
                       onSearch={onSearch}
                       filterOption={filterOption}
                       className={styles.select}
                    >
                        {province.map((option) => (
                            <Select.Option key={option} value={option}>
                            {option}
                            </Select.Option>))
                        }
                    </Select>
                </Form.Item>
                <DeploymentUnitOutlined  className={styles.iconSelect}/>
                <Form.Item
                name="manage"
                rules={[{ required: true, message: 'Vui lòng chọn đơn vị quản lý!' }]}
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
                        <Select.Option value="Liên Đoàn">Liên Đoàn</Select.Option>
                        <Select.Option value="Hội Võ Thuật">Hội Võ Thuật</Select.Option>
                        <Select.Option value="Công An">Công An</Select.Option>
                        <Select.Option value="Quân Đội">Quân Đội</Select.Option>
                        <Select.Option value="Giáo Dục">Giáo Dục</Select.Option>
                        <Select.Option value="Sở VHTT">Sở VHTT</Select.Option>
                </Select>
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
                    <div style={{height: "265px", overflow: "hidden"}}>
                    <div style={{textAlign: "center", marginBottom: "10px"}}>Ảnh Bằng cấp hiện tại</div>
                       <Form.Item
                        name="image_certificate"
                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]}
                        wrapperCol={{ span: 24 }}
                        className={`${styles.uploadForm} ${styles.formItem}`}
                        >
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
                        </Form.Item>
                        <Modal open={previewOpen1} title={previewTitle1} footer={null} onCancel={handleCancel1}>
                            <img alt="degree" style={{ width: '100%' }} src={previewImage1} />
                        </Modal> 
                    </div>
                    
                    <div style={{height: "265px", overflow: "hidden"}}>
                        <div style={{textAlign: "center", marginBottom: "10px"}}>Ảnh giấy giới thiệu</div>
                        <Form.Item
                            name="image_ref"
                            rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]}
                            wrapperCol={{ span: 24 }}
                            className={`${styles.uploadForm} ${styles.formItem}`}
                        >
                            
                            <Upload
                                {...props}
                                listType="picture-card"
                                // fileList={fileList2}
                                onPreview={handlePreview2}
                                onChange={handleChange2}
                                className={styles.uploadImg}
                            >
                                {fileList2.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Modal open={previewOpen2} title={previewTitle2} footer={null} onCancel={handleCancel2}>
                            <img alt="referral" style={{ width: '100%' }} src={previewImage2} />
                        </Modal>
                    </div>             
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
