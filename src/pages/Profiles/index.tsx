import React, { useEffect, useState } from "react";
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
  message,
} from "antd";
import type { DatePickerProps } from "antd";
import type { UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

import useImageCompression from "../../hook/imageCompression";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { level } from "../../until/until";
import moment from "moment";
import { useMutation } from "react-query";
import { addNewF3 } from "../../api/f2";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

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
  const filterOption = (
    input: string,
    option?: { children: React.ReactNode }
  ) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
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
    // console.log(date, dateString);
  };

  //button
  const [selectedButton, setSelectedButton] = useState("show");

  const handleButtonClick = (buttonName: any) => {
    setSelectedButton(buttonName);
  };
  //tỉnh,thành,quận,huyện
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvinceFullName, setSelectedProvinceFullName] = useState("");
  const [selectedDistrictFullName, setSelectedDistrictFullName] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    // Fetch provinces when component mounts
    axios
      .get(
        "https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100"
      )
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (value: any) => {
    const [selectedProvinceId, selectedProvinceFullName] = value.split("-");
    setSelectedProvinceFullName(selectedProvinceFullName);
    // setSelectedDistrictFullName(selectedProvinceId);
    form.setFieldValue("district", "");
    // Update selected province and fetch corresponding districts
    setSelectedProvince(selectedProvinceId); // Update selected province and fetch corresponding districts
    setSelectedProvince(value);
    axios
      .get(
        `https://vnprovinces.pythonanywhere.com/api/provinces/${selectedProvinceId}`
      )
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };
  // giải mã cookieJS
  const permission = CryptoJS.AES.decrypt(
    Cookies.get("permission") as string,
    secretKey
  );
  const decryptedPermission = permission.toString(CryptoJS.enc.Utf8);
  const club = CryptoJS.AES.decrypt(Cookies.get("club") as string, secretKey);
  const decryptedClub = club.toString(CryptoJS.enc.Utf8);
  // const permission = CryptoJS.AES.decrypt(
  //   Cookies.get("permission") as string,
  //   secretKey
  // );
  // const decryptedPermission = permission.toString(CryptoJS.enc.Utf8);
  //fill club
  useEffect(() => {
    form.setFieldValue("club", "CLB Hà Nội");
  }, [form]);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(addNewF3, {
    onSuccess: () => {
      message.success(
        "Thêm thành công, yêu cầu đã được gửi đến Liên đoàn VTCT Việt Nam"
      );
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      message.error("Thêm thất bại");
      // Xử lý lỗi nếu cần
    },
  });
  const onFinish = (values: any) => {
    const formattedBirthday = moment(values.birthday).format("YYYY-MM-DD");
    setLoading(true);
    console.log("form", values);
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("birthday", formattedBirthday);
    formdata.append("sex", values.sex);
    formdata.append("phone", values.phone);
    formdata.append("idcard", values.idcard);
    formdata.append("level", values.level);
    formdata.append("note", values.note);
    formdata.append("detail", values.detail);
    formdata.append("achievements", values.achievements);
    formdata.append("club", decryptedClub);
    formdata.append("hometown", values.hometown);
    formdata.append(
      "address",
      `${selectedProvinceFullName} - ${values.district}`
    );
    formdata.append("nationality", values.nationality);
    formdata.append(
      "image_certificate",
      values.image_certificate[0].originFileObj
    );
    formdata.append("image_ref", values.image_ref[0].originFileObj);
    console.log("data", formdata.values);
    mutation.mutate(formdata);
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
                          name="image_certificate"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          rules={[
                            { required: true, message: "Vui lòng tải ảnh" },
                          ]}
                        >
                          {/* <ImgCrop showGrid showReset> */}
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
                          {/* </ImgCrop> */}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        {" "}
                        <Form.Item
                          label="Tải ảnh lên"
                          name="image_ref"
                          valuePropName="fileListLevel"
                          getValueFromEvent={normFile}
                          rules={[
                            { required: true, message: "Vui lòng tải ảnh" },
                          ]}
                        >
                          {/* <ImgCrop showGrid showReset> */}
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
                          {/* </ImgCrop> */}
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
                      name="phone"
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
                      name="nationality"
                      rules={[
                        { required: true, message: "Vui lòng điền quốc tịch" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Ngày sinh"
                          name="birthday"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng điền năm sinh",
                            },
                          ]}
                        >
                          <DatePicker onChange={onChange} />
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
                            <Select.Option value="Nam">Nam</Select.Option>
                            <Select.Option value="Nữ">Nữ</Select.Option>
                            <Select.Option value="Khác">Khác</Select.Option>
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
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Cấp/đai đẳng hiện tại"
                      name="level"
                      rules={[{ required: true, message: "Vui lòng chọn đai" }]}
                    >
                      <Select placeholder="Chọn cấp/đai">
                        {level.map((item: any, index: any) => (
                          <Option key={index} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
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
                      label="Tỉnh/Thành"
                      name="province"
                      rules={[
                        { required: true, message: "Vui lòng chọn tỉnh/thành" },
                      ]}
                    >
                      <Select
                        onChange={handleProvinceChange}
                        filterOption={filterOption}
                        optionFilterProp="children"
                        showSearch
                      >
                        {provinces.map((province: any) => (
                          <Option
                            key={province.id}
                            value={`${province.id}- ${province.full_name}`}
                          >
                            {province.full_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Quận/Huyện"
                      name="district"
                      rules={[
                        { required: true, message: "Vui lòng chọn quận/huyện" },
                      ]}
                    >
                      <Select>
                        {districts.map((district: any) => (
                          <Option
                            // key={district.id}
                            value={district.full_name}
                          >
                            {district.full_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} md={8}>
                    <Form.Item
                      label="Số CCCD "
                      name="idcard"
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
                      name="hometown"
                      rules={[
                        { required: true, message: "Vui lòng điền quê quán" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                {decryptedPermission == "0" ? (
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Space
                              key={key}
                              style={{ display: "flex", width: "97%" }}
                              // align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                label={"Thành tích"}
                                name={[name, "achievements"]}
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
                ) : (
                  <Space></Space>
                )}
                <Form.Item
                  name="note"
                  label="Ghi chú hiển thị với người dùng"
                  rules={[
                    { required: true, message: "Vui lòng điền thông tin" },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input.TextArea showCount maxLength={1000} />
                </Form.Item>
                <Form.Item>
                  <Button
                    className={styles.btn}
                    htmlType="submit"
                    loading={loading}
                  >
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
