import { Col, Modal, Row, Upload, UploadFile, UploadProps, Form, Input, Button, message, Select } from 'antd'
import React, { useRef, useState, useCallback } from 'react'
import Header from '../../components/Header'
import styles from "./Style.module.scss"
import { PlusOutlined } from '@ant-design/icons';
import Footer from '../../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'react-query';
import { addNews, upLoadImage } from '../../api/f0';
import CryptoJS from 'crypto-js';


    

  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};



export default function Post() {
    document.title = "Đăng bài";
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill>(null)
    const addNewsMutation = useMutation(
      async (payload: any) =>  await addNews(payload), 
      {
        onSuccess: (data) => {
          if(data.status) {
            message.success("Thêm bài viết thành công")
          } else {
            message.error("Có lỗi xảy ra, vui lòng thử lại sau")
          }
        },
        onError: (error) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau")
        }
      }
    )
  
    const modules = {
      toolbar: {
        container: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'align': [] }],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          'image': useCallback(() => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
              if (input !== null && input.files !== null) {
                const file = input.files[0];
                const randomKey = CryptoJS.lib.WordArray.random(32).toString();
                const formdata = new FormData();
                formdata.append("image", file,
                CryptoJS.AES.encrypt(file.name, randomKey).toString());
                const imageURL = await upLoadImage(formdata)
                const quill = quillRef.current;
                if (quill) {
                  console.log(`https://vocotruyen.id.vn/PHP_IMG/${imageURL.status}`)
                  const range = quill.getEditorSelection();
                  range && quill.getEditor().insertEmbed(range.index, "image", `https://vocotruyen.id.vn/PHP_IMG/${imageURL.status}`);
                }
              }
            };
          }, [])
        }
      }
    };
    const onFinish = (values: any) => {
        addNewsMutation.mutate(values)
    }
  return (
    <div>
        <Header />
        <div className={styles.wrap}>
            <div className={styles.title}>
                ĐĂNG BÀI 
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
                    className={styles.formWrap}
                >
                    <Form.Item
                      label="Tiêu đề"
                      name="title"
                      rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết!' }]}
                    >
                        <Input style={{padding: "10px 12px"}} />
                    </Form.Item>
                    <Form.Item
                      label="Danh mục"
                      name="category"
                      rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết!' }]}
                    >
                      <Select>
                        <Select.Option value="0" style={{padding: "10px 12px"}}>Tin tức</Select.Option>
                        <Select.Option value="1" style={{padding: "10px 12px"}}>Hướng dẫn</Select.Option>
                      </Select>
                        
                    </Form.Item>
                    <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
                    >
                        <ReactQuill 
                          theme="snow" 
                          value={value} 
                          onChange={setValue} 
                          ref={quillRef}
                          modules={modules}
                          formats={[
                            "header",
                            "font",
                            "size",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                            "list",
                            "bullet",
                            "indent",
                            "align",
                            "link",
                            "image",
                            "video",
                            "code-block",
                          ]}
                          className={styles.quill}
                          />
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                      <Button  htmlType="submit" className={styles.btn}>
                          Đăng bài
                      </Button>
                    </Form.Item>
             </Form>
        </div>
        <Footer />
    </div>
  )
}
