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
const { RangePicker } = DatePicker;
const { TextArea } = Input;
interface ProfilesProps {}

const Profiles = () => {
  const [form] = Form.useForm();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onFinish = (values: any) => {
    console.log("values", values);
  };
  return (
    <>
      <div className={styles.wrap}>
      <div className={styles.header}>
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
      
      </div>
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
                      <Upload
                        action="/upload.do"
                        listType="picture-card"
                        className={styles.uploadImg}
                      >
                        <button
                          style={{ border: 0, background: "none" }}
                          type="button"
                        >
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                      </Upload>
                    </Form.Item>{" "}
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
                      label="Mã định danh"
                      name="id"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền mã định danh",
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
                        <Form.Item label="Giới tính">
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
                    <Form.Item label="Email">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item label="Tỉnh/Thành ">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item label="Quận/Huyện">
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
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Địa chỉ thường trú"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền địa chỉ thường trú",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
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
                <Form.Item
                  name="Thành tích cá nhân"
                  label="Thành tích cá nhân"
                  style={{ width: "100%" }}
                  rules={[{ required: true, message: "Please input Intro" }]}
                >
                  <Input.TextArea showCount maxLength={1000} />
                </Form.Item>
                <Form.Item
                  name="Ghi chú hiển thị với người dùng"
                  label="Ghi chú hiển thị với người dùng"
                  rules={[{ required: true, message: "Please input Intro" }]}
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
    </>
  );
};

export default Profiles;
