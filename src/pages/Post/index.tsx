import { Col, Modal, Row, Upload, UploadFile, UploadProps, Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import Header from '../../components/Header'
import styles from "./Style.module.scss"
import { PlusOutlined } from '@ant-design/icons';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { TextArea } = Input;

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};



export default function Post() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
  return (
    <div>
        <Header />
        <div className={styles.wrap}>
            <div className={styles.title}>
                ĐĂNG BÀI VIẾT MỚI
            </div>
            <Form
                    name="basic"
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={styles.form}
                >
                <Row gutter={40} className={styles.formWrap} justify="space-between">
                    <Col className='gutter-row' xxl={6}>
                        <Form.Item
                        label="Tải ảnh"
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng tải ảnh bài viết!' }]}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                className={styles.upload}
                            >
                                    {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </Form.Item>
                    </Col>  
                    <Col className='gutter-row' xxl={12}>
                        <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết!' }]}
                        >
                            <Input style={{padding: "10px 12px"}} />
                        </Form.Item>
                        
                        <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
                        >
                            <TextArea rows={10} placeholder="Nội dung bài viết..." />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 11, span: 24 }}>
                        <Button  htmlType="submit" className={styles.btn}>
                            Đăng bài
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
  )
}
