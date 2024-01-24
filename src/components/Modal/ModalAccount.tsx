import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Upload,
  DatePicker,
  Select,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useState } from "react";

interface ModalAccountProps {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
}
const { TextArea } = Input;
const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});
const ModalAccount = ({
  isModalOpen,
  handleCancel,
  handleOk,
}: ModalAccountProps) => {
  const [form] = useForm();
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
  const onFinish = (value: any) => {
    console.log("value:", value);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Modal
        title="Quản lý tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={990}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Account"
                name="name"
                rules={[{ required: true, message: "Vui lòng điền account" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tỉnh"
                name="city"
                rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Người quản lý"
                name="Manager"
                rules={[
                  { required: true, message: "Vui lòng điền tên quản lý" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Mật khẩu"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mật khẩu",
                  },
                ]}
              >
                <Input />
              </Form.Item>{" "}
              <Form.Item
                label="Đơn vị "
                name="type"
                rules={[{ required: true, message: "Vui lòng chọn đơn vị " }]}
              >
                <Select>
                  <Option value="Liên đoàn">Liên đoàn</Option>
                  <Option value="Hội võ thuật">Hội võ thuật</Option>
                  <Option value="Công An">Công An</Option>
                  <Option value="Quân đội">Quân đội</Option>
                  <Option value="Sở VHTT">Sở VHTT</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền số điện thoại",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền email",
                  },
                  {
                    type: "email",
                    message: "Vui lòng điền đúng định dạng email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CLB"
                name="Câu lạc bộ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền câu lạc bộ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.formImage}>
                    <div style={{height: "100%"}}>
                    <div style={{textAlign: "center", marginBottom: "10px"}}>Ảnh Bằng cấp hiện tại</div>
                       <Form.Item
                        name="image1"
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
                    
                    <div style={{height: "100%"}}>
                        <div style={{textAlign: "center", marginBottom: "10px"}}>Ảnh giấy giới thiệu</div>
                        <Form.Item
                            name="image2"
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
          <Form.Item className={styles.btn}>
            <div className={styles.btnContainer}>
              <Button className="btn" htmlType="submit">
                Lưu
              </Button>
              <Button
                onClick={handleCancel}
                className="btn-boder"
                style={{ marginLeft: "10px" }}
              >
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAccount;
