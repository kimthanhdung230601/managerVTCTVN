import React, { useState } from "react";
import styles from "./style.module.scss";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Row,
  Col,
  Tooltip,
  Space,
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

  //image avatar
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
  //image CN đẳng cấp
  const [fileListLevel, setFileListLevel] = useState<any>([]);
  const normFileLevel = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileListLevel;
  };
  const getSrcFromFileLevel = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };

  const onChangeImgLevel = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileListLevel(newFileList);
  };
  const onPreviewLevel = async (file: any) => {
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
                    <Row>
                      <Col span={12}>
                        {" "}
                        <Form.Item
                          label="Tải ảnh lên"
                          name="upload"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          rules={[
                            { required: true, message: "Vui lòng tải ảnh" },
                          ]}
                        >
                          <ImgCrop showGrid showReset>
                            <Upload
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
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                  </div>
                                </>
                              )}
                            </Upload>
                          </ImgCrop>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        {" "}
                        <Form.Item
                          label="Tải ảnh lên"
                          name="upload"
                          valuePropName="fileListLevel"
                          getValueFromEvent={normFile}
                          rules={[
                            { required: true, message: "Vui lòng tải ảnh" },
                          ]}
                        >
                          <ImgCrop showGrid showReset>
                            <Upload
                              listType="picture-card"
                              fileList={fileListLevel}
                              onChange={onChangeImgLevel}
                              onPreview={onPreviewLevel}
                            >
                              {fileListLevel.length >= 1 ? null : (
                                <>
                                  {" "}
                                  <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>
                                      Tải giấy CN đẳng cấp
                                    </div>
                                  </div>
                                </>
                              )}
                            </Upload>
                          </ImgCrop>
                        </Form.Item>
                      </Col>
                    </Row>{" "}
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
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {" "}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ float: "left" }}
                          icon={<PlusOutlined />}
                        >
                          Thành tích cá nhân
                        </Button>
                      </Form.Item>
                      {fields.map(({ key, name, ...restField }) => (
                        <div style={{ display: "flex", justifyContent:"space-between"}}>
                          <Space
                            key={key}
                            style={{ display: "flex", width:"97%"}}
                            // align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              label={"Thành tích"}
                              name={[name, "achie"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng điền thành tích",
                                },
                              ]}
                            >
                              <Input style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "prize"]}
                              label={"Giải"}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng điền giải",
                                },
                              ]}
                            >
                              <Input placeholder="Giải" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "last"]}
                              label={"Thời gian"}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng thời gian",
                                },
                              ]}
                            >
                              <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                          </Space>{" "}
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
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
