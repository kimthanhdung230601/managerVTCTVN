import React, { useState } from "react";
import styles from "./style.module.scss";
import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Row,
  Col,
} from "antd";
import type { DatePickerProps } from "antd";
import type { UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

import useImageCompression from "../../hook/imageCompression";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
interface ProfilesProps {}
const Profiles = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const { compressImage } = useImageCompression();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = async (file: File) => {
    const compressedFile = await compressImage(file);
    setFileList([compressedFile]); // Chỉ giữ ảnh mới, xóa ảnh cũ nếu có
    return false; // Trả về false để ngăn chặn hành vi mặc định của Upload
  };
  const getSrcFromFile = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };

  const onChangeImg = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  // date
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onFinish = (values: any) => {
    console.log("values", values);
  };
  //button
  const [selectedButton, setSelectedButton] = useState("show");

  const handleButtonClick = (buttonName: any) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <div className={styles.wrap}>
        {/* <div className={styles.header}>
          <div className={styles.logo}>
            <div>
              <img
                className={styles.logoImg}
                src={require("../../assets/image/logo.png")}
              />
            </div>
            <div className={styles.title}>
              LIÊN ĐOÀN VÕ THUẬT CỔ TRUYỀN VIỆT NAM
            </div>
          </div>
        </div> */}
        <Header />
        <div className={styles.content}>
          <div className={styles.title}>THÔNG TIN HỒ SƠ</div>
          <div className={styles.form}>
            <>
              <Form
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                onFinish={onFinish}
                form={form}
              >
                <Row gutter={16}>
                  <Col span={8} xs={24} sm={12} md={8}>
                    {" "}
                    <Form.Item
                      label="Tải ảnh lên"
                      name="upload"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: "Vui lòng tải ảnh" }]}
                    >
                      <ImgCrop showGrid showReset>
                        <Upload
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileList}
                          onChange={onChangeImg}
                          onPreview={onPreview}
                        >
                          {fileList.length >= 1 ? null : (
                            <>
                              {" "}
                              <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            </>
                          )}
                        </Upload>
                      </ImgCrop>
                    </Form.Item>{" "}
                    <div className={styles.buttonGroup}>
                      <span
                        className={`${styles.showBtn} ${
                          selectedButton === "show"
                            ? styles.selectedBtn
                            : styles.noneSelectedBtn
                        }`}
                        onClick={() => handleButtonClick("show")}
                      >
                        Hiển thị
                      </span>
                      <span
                        className={`${styles.showBtn} ${
                          selectedButton === "hide"
                            ? styles.selectedBtn
                            : styles.noneSelectedBtn
                        }`}
                        onClick={() => {
                          handleButtonClick("hide");
                        }}
                      >
                        Ẩn
                      </span>
                    </div>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Họ tên"
                      name="name"
                      rules={[
                        { required: true, message: "Vui lòng điền họ tên" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền số điện thoại",
                        },
                        {
                          pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                          message: "Vui lòng điền đúng định dạng số điện thoại",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    {" "}
                    <Form.Item
                      label="Quốc tịch"
                      name="countries"
                      rules={[
                        { required: true, message: "Vui lòng điền quốc tịch" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Năm sinh"
                          name="yearBorn"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng điền năm sinh",
                            },
                          ]}
                        >
                          <DatePicker onChange={onChange} picker="year" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Giới tính"
                          name="sex"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng điền số điện thoại",
                            },
                          ]}
                        >
                          <Select>
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                            <Select.Option value="other">Khác</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>{" "}
                <Row gutter={16}>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Câu lạc bộ "
                      name="club"
                      rules={[
                        { required: true, message: "Vui lòng điền câu lạc bộ" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Cấp/đai đẳng hiện tại"
                      name="level"
                      rules={[{ required: true, message: "Vui lòng chọn đai" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Vui lòng điền email" },
                        {
                          type: "email",
                          message: "Định dạng email không đúng",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Tỉnh/Thành "
                      name="city"
                      rules={[
                        { required: true, message: "Vui lòng điền thông tin" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Quận/Huyện"
                      name="district"
                      rules={[
                        { required: true, message: "Vui lòng điền thông tin" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Số CCCD "
                      name="CCCD"
                      rules={[
                        { required: true, message: "Vui lòng điền CCCD" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Quê quán"
                      name="contry"
                      rules={[
                        { required: true, message: "Vui lòng điền quê quán" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="Thành tích cá nhân"
                  label="Thành tích cá nhân"
                  style={{ width: "100%" }}
                  rules={[
                    { required: true, message: "Vui lòng điền thông tin" },
                  ]}
                >
                  <Input.TextArea showCount maxLength={1000} />
                </Form.Item>
                <Form.Item
                  name="Ghi chú hiển thị với người dùng"
                  label="Ghi chú hiển thị với người dùng"
                  rules={[
                    { required: true, message: "Vui lòng điền thông tin" },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input.TextArea showCount maxLength={1000} />
                </Form.Item>
                <Form.Item>
                  <Button className={styles.btn} htmlType="submit">
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
            </>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profiles;
