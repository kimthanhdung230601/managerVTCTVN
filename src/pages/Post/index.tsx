import {
  Col,
  Modal,
  Row,
  Upload,
  UploadFile,
  UploadProps,
  Form,
  Input,
  Button,
  message,
  Select,
  Spin,
} from "antd";
import React, { useRef, useState, useCallback } from "react";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery } from "react-query";
import { addNews, getNewsbyID, updateNew, upLoadImage } from "../../api/f0";
import CryptoJS from "crypto-js";
import { useParams } from "react-router";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;
const onFinishFailed = (errorInfo: any) => {};
const randomKey = CryptoJS.lib.WordArray.random(32).toString();

const isImage = (file: any) => {
  const acceptedImageTypes = ["image/jpeg", "image/png"];
  return acceptedImageTypes.includes(file.type);
};
const props = {
  beforeUpload: (file: any) => {
    if (!isImage(file)) {
      message.error("Chỉ cho phép tải lên các file ảnh (JPEG, PNG).");
      return false;
    }
    return true;
  },
  onChange(info: any) {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} tải ảnh thành công`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải ảnh thất bại.`);
    }
  },
};

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Post() {
  const id = useParams();
  const hasId = Object.keys(id).length;
  document.title = hasId !== 0 ? "Sửa bài viết" : "Đăng bài";
  const [form] = useForm();
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data, isFetching } = useQuery(
    ["new", id.id],
    () => getNewsbyID(id.id ? id.id : ""),
    {
      enabled: hasId !== 0,
      onSuccess: (data) => {
        if (data?.status === "success") {
          console.log("title", data?.data[0]?.title);
          form.setFieldValue("title", data?.data[0]?.title);
          form.setFieldValue("category", data?.data[0]?.category);
          form.setFieldValue("description", data?.data[0]?.description);
          form.setFieldValue("content", data?.data[0]?.content);
          if (data?.data[0].image_title !== "") {
            setFileList([
              {
                uid: Math.random().toString(),
                name: `Hình ảnh thumbnail ${data?.data[0]?.image_title}`,
                status: "done",
                url: data?.data[0]?.image_title,
              },
            ]);
            form.setFieldValue("image_title", data?.data[0]?.image_title);
          }
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      },
    }
  );
  const addNewsMutation = useMutation(
    async (payload: any) => await addNews(payload),
    {
      onSuccess: (data) => {
        if (data.status) {
          message.success("Thêm bài viết thành công");
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      },
      onError: (error) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      },
    }
  );
  const updateNewsMutation = useMutation(
    async (payload: any) => await updateNew(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          message.success("Sửa bài viết thành công");
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      },
      onError: (error) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      },
    }
  );
  const uploadImageMutation = useMutation(
    async (payload: any) => await upLoadImage(payload)
  );

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: useCallback(() => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
          input.onchange = async () => {
            if (input !== null && input.files !== null) {
              const file = input.files[0];
              const randomKey = CryptoJS.lib.WordArray.random(32).toString();
              const formdata = new FormData();
              formdata.append(
                "image",
                file,
                CryptoJS.AES.encrypt(file.name, randomKey).toString()
              );
              uploadImageMutation.mutate(formdata, {
                onSuccess: (data) => {
                  if (data?.status) {
                    const quill = quillRef.current;
                    if (quill) {
                      const range = quill.getEditorSelection();
                      range &&
                        quill
                          .getEditor()
                          .insertEmbed(
                            range.index,
                            "image",
                            `https://vocotruyen.id.vn/PHP_IMG/${data?.status}`
                          );
                    }
                  }
                },
                onError: () => {
                  message.error("Có lỗi khi tải ảnh");
                },
              });
            }
          };
        }, []),
        video: useCallback(() => {
          const quill = quillRef.current;
          if (quill) {
            const url = prompt("Nhập mã nhúng của video Youtube:");
            const range = quill.getEditorSelection();
            range && quill.getEditor().insertEmbed(range.index, "video", url);
          }
        }, []),
      },
    },
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </button>
  );
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const formdata = new FormData();
    formdata.append(
      `image`,
      newFileList[0].originFileObj as File,
      CryptoJS.AES.encrypt(newFileList[0].name, randomKey).toString()
    );
    uploadImageMutation.mutate(formdata, {
      onSuccess: (data) => {
        if (data) {
          form.setFieldValue(
            "image_title",
            `https://ronisoftware.com/PHP_IMG/${data?.status}`
          );
          setFileList([
            {
              uid: Math.random().toString(),
              name: `Hình ảnh thumbnail`,
              status: "done",
              url: `https://ronisoftware.com/PHP_IMG/${data?.status}`,
            },
          ]);
        }
      },
      onError: () => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      },
    });
  };
  const removeImage: UploadProps["onRemove"] = (file: any) => {
    setFileList([]);
    form.setFieldValue("image_title", "");
    return false;
  };
  const handleCancelModalPreviewImg = () => {
    setPreviewOpen(false);
  };
  const onFinish = (values: any) => {
    addNewsMutation.mutate(values);
    // if (hasId === 0)
    //   addNewsMutation.mutate({
    //     ...values,
    //     image_title: values.image_title ? values.image_title : "",
    //   });
    // else updateNewsMutation.mutate({ ...values, id: id?.id });
  };

  return (
    <div>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.title}>
          {hasId === 0 ? "ĐĂNG BÀI" : "SỬA BÀI VIẾT"}
        </div>
        <Form
          form={form}
          name="basic"
          layout="vertical"
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
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài viết!" },
            ]}
          >
            <Input style={{ padding: "10px 12px" }} />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài viết!" },
            ]}
          >
            <Select>
              <Select.Option value="0" style={{ padding: "10px 12px" }}>
                Tin tức
              </Select.Option>
              <Select.Option value="1" style={{ padding: "10px 12px" }}>
                Hướng dẫn
              </Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Mô tả ngắn"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả bài viết!" },
            ]}
          >
            <TextArea
              showCount
              maxLength={165}
              style={{ height: 70, resize: "none", padding: "4px" }}
            />
          </Form.Item> */}
          <Spin spinning={uploadImageMutation.isLoading}>
            {/* <Form.Item
              label="Ảnh thumbnail"
              name="image_title"
              wrapperCol={{ span: 24 }}
              className={styles.uploadForm}
            >
              <Upload
                {...props}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                className={styles.uploadImg}
                onRemove={removeImage}
              >
                {fileList.length === 0 && uploadButton}
              </Upload>
            </Form.Item> */}
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                { required: true, message: "Vui lòng nhập nội dung bài viết!" },
              ]}
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

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                htmlType="submit"
                className={styles.btn}
                disabled={addNewsMutation.isLoading}
              >
                {hasId === 0 ? "Đăng bài" : "Sửa bài viết"}
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelModalPreviewImg}
      >
        <img alt="degree" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Footer />
    </div>
  );
}
