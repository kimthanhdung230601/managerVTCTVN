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
  Spin,
} from "antd";
import type { DatePickerProps } from "antd";
import type { UploadFile, UploadProps } from "antd";
import dayjs from "dayjs";

import useImageCompression from "../../hook/imageCompression";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { OnlyProvince, level, province } from "../../until/until";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { addMember } from "../../api/ApiUser";
import { addNewF3 } from "../../api/f2";
import { getDetailF3, updateF3 } from "../../api/f0";
import { useParams } from "react-router";
import customParseFormat from "dayjs/plugin/customParseFormat";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

interface UpdateProfilesProps {}
const UpdateProfiles = () => {
  dayjs.extend(customParseFormat);
  const dateFormat = "DD/MM/YYYY";
  document.title = "Chỉnh sửa thành viên";
  const [form] = Form.useForm();
  const param = useParams();

  const {
    data: dataDetailF3,
    refetch,
    isLoading,
    isFetched,
    isFetching,
  } = useQuery("dataDetail", () => getDetailF3(param.key), {
    onSettled: (data) => {
      //  form.setFieldsValue(data.data[0]);
      form.setFieldValue("name", data.data[0].name);
      //  form.setFieldValue("birthday",data.data[0].birthday);
      form.setFieldValue("sex", data.data[0].sex);
      form.setFieldValue("phone", data.data[0].phone);
      form.setFieldValue("idcard", data.data[0].idcard);
      form.setFieldValue("level", data.data[0].level);
      form.setFieldValue("note", data.data[0].note);
      form.setFieldValue("detail", data.data[0].detail);
      form.setFieldValue("status", data.data[0].status);
      form.setFieldValue("achievements", data.data[0].achievements);
      form.setFieldValue("NameClb", data.data[0].NameClb);
      form.setFieldValue("hometown", data.data[0].hometown);
      // form.setFieldValue("address", data.data[0].address);
      const [city, district] = data.data[0].address.split(" - ");
      form.setFieldValue("city", city);
      form.setFieldValue("district", district);
      form.setFieldValue("nationality", data.data[0].nationality);
      form.setFieldValue("email", data.data[0].email);
      form.setFieldValue("code", data.data[0].code);
      form.setFieldValue("club", dataDetailF3);
      // form.setFieldValue("birthday",formattedBirthday)
    },
  });
  let birthday: any; // Khai báo biến birthday mà không gán giá trị
  useEffect(() => {
    birthday = dataDetailF3?.data[0].birthday;
  }, [birthday, dataDetailF3]);
  const birthdayPart = birthday?.split(" ")[0];
  const [fileListcCertificate, setFileListCertificate] = useState<any>([]);
  const [fileListLevel, setFileListLevel] = useState<any>([]);
  //image
  useEffect(() => {
    // Lấy tên file từ dữ liệu
    const imageCertificateFileName = dataDetailF3?.data[0].image_certificate;
    const avatarFileName = dataDetailF3?.data[0].avatar;
    // Nếu tên file tồn tại, tạo đối tượng fileList từ tên file
    if (imageCertificateFileName && avatarFileName) {
      const CertificateFileList = [
        {
          uid: "-1",
          name: imageCertificateFileName,
          status: "done",
          url: `https://vocotruyen.id.vn/PHP_IMG/${imageCertificateFileName}`,
        },
      ];
      setFileListCertificate(CertificateFileList);
    }
    const avatarFileList = [
      {
        uid: "-1",
        name: avatarFileName,
        status: "done",
        url: `https://vocotruyen.id.vn/PHP_IMG/${avatarFileName}`,
      },
    ];
    setFileListLevel(avatarFileList);
  }, [dataDetailF3]);

  const updateMemberMutation = useMutation(
    async (payload: any) => await updateF3(payload),
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          message.success("Sửa hội viên thành công!");
          setLoading(false);
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          setLoading(false);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        }
      },
      // onError(error, variables, context) {
      //   message.error("Có lỗi xảy ra , vui lòng thử lại sau!");
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 2000);
      // },
    }
  );
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
  const [uploadedCertificate, setUploadedCertificate] = useState<any>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<any>(null);

  const onChangeCertificate = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    // Nếu người dùng đã upload ảnh, lưu trạng thái ảnh đã upload
    if (newFileList.length > 0) {
      setUploadedCertificate(newFileList[0]);
    } else {
      setUploadedCertificate(null);
    }
    setFileListCertificate(newFileList);
  };
  const onPreviewCertificate = async (file: any) => {
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
    // Nếu người dùng đã upload ảnh, lưu trạng thái ảnh đã upload
    if (newFileList.length > 0) {
      setUploadedAvatar(newFileList[0]);
    } else {
      setUploadedAvatar(null);
    }
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

  //button
  const [selectedButton, setSelectedButton] = useState("show");

  const handleButtonClick = (buttonName: any) => {
    setSelectedButton(buttonName);
  };

  // giải mã cookieJS
  const permission = CryptoJS.AES.decrypt(
    Cookies.get("permission") as string,
    secretKey
  );
  const decryptedPermission = permission.toString(CryptoJS.enc.Utf8);
  const club = CryptoJS.AES.decrypt(Cookies.get("club") as string, secretKey);
  const decryptedClub = club.toString(CryptoJS.enc.Utf8);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    const formattedBirthday = moment(values.birthday).format("YYYY-MM-DD");
    setLoading(true);
    const randomKey = CryptoJS.lib.WordArray.random(16).toString();
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("birthday", formattedBirthday);
    formdata.append("sex", values.sex);
    formdata.append("phone", values.phone);
    formdata.append("email", values.email);
    formdata.append("idcard", values.idcard);
    formdata.append("level", values.level);
    formdata.append("note", values.note);
    formdata.append("detail", dataDetailF3?.data[0].detail);
    formdata.append("achievements", dataDetailF3?.data[0].achievements);
    formdata.append("club", decryptedClub);
    formdata.append("hometown", values.hometown);
    const address = `${values.city} - ${values.district}`;
    formdata.append("address", address);
    formdata.append("nationality", values.nationality);
    formdata.append("email", values.email);
    formdata.append("club", dataDetailF3?.data[0].club);
    formdata.append("status", dataDetailF3?.data[0].status);
    formdata.append("id", dataDetailF3?.data[0].id);
    formdata.append("code", dataDetailF3?.data[0].code);
    let certificateFile = null;
    let avatarFile = null;

    if (uploadedCertificate) {
      certificateFile = uploadedCertificate.originFileObj as File;
    } else if (fileListcCertificate && fileListcCertificate.length > 0) {
      certificateFile = fileListcCertificate[0].originFileObj as File;
    }

    if (uploadedAvatar) {
      avatarFile = uploadedAvatar.originFileObj as File;
    } else if (fileListLevel && fileListLevel.length > 0) {
      avatarFile = fileListLevel[0].originFileObj as File;
    }

    if (certificateFile) {
      formdata.append(
        `image_certificate`,
        certificateFile,
        CryptoJS.AES.encrypt(certificateFile.name, randomKey).toString()
      );
    }

    if (avatarFile) {
      formdata.append(
        `avatar`,
        avatarFile,
        CryptoJS.AES.encrypt(avatarFile.name, randomKey).toString()
      );
    }
    console.log("formdata", formdata.getAll);
    updateMemberMutation.mutate(formdata);
  };

  return (
    <>
      {" "}
      <Spin spinning={isFetching}>
        {" "}
        <div className={styles.wrap}>
          <Header />
          <div className={styles.content}>
            <div className={styles.title}>THÔNG TIN HỒ SƠ</div>
            <div className={styles.contentCenter}>
              Mã định danh: {dataDetailF3?.data[0].code}
            </div>
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
                            valuePropName="fileListLevel"
                            getValueFromEvent={normFile}
                            // rules={[
                            //   { required: true, message: "Vui lòng tải ảnh" },
                            // ]}
                          >
                            {/* <ImgCrop showGrid showReset> */}
                            <Upload
                              listType="picture-card"
                              fileList={fileListcCertificate}
                              onChange={onChangeCertificate}
                              onPreview={onPreviewCertificate}
                            >
                              {fileListcCertificate.length >= 1 ? null : (
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
                            name="avatar"
                            valuePropName="fileListLevel"
                            getValueFromEvent={normFile}
                            // rules={[
                            //   { required: true, message: "Vui lòng tải ảnh" },
                            // ]}
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
                            message:
                              "Vui lòng điền đúng định dạng số điện thoại",
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
                          {
                            required: true,
                            message: "Vui lòng điền quốc tịch",
                          },
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
                                message: "Vui lòng điền ngày sinh",
                              },
                            ]}
                          >
                            <DatePicker
                              defaultValue={dayjs(birthdayPart)}
                              format={"DD/MM/YYYY"}
                            />
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
                        name="NameClb"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng điền câu lạc bộ",
                          },
                        ]}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={12} md={8}>
                      <Form.Item
                        label="Cấp/đai đẳng hiện tại"
                        name="level"
                        rules={[
                          { required: true, message: "Vui lòng chọn đai" },
                        ]}
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
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn tỉnh/thành",
                          },
                        ]}
                      >
                        <Select
                          filterOption={filterOption}
                          optionFilterProp="children"
                          showSearch
                        >
                          {OnlyProvince.map((option) => (
                            <Select.Option key={option} value={option}>
                              {option}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={12} md={8}>
                      <Form.Item
                        label="Quận/Huyện"
                        name="district"
                        rules={[
                          { required: true, message: "Vui lòng điền quê quán" },
                        ]}
                      >
                        <Input />
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
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8} xs={24} sm={12} md={8}>
                      {" "}
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
                  {/* {decryptedPermission == "0" ? (
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
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <Space></Space>
                  )} */}
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
                      Sửa
                    </Button>
                  </Form.Item>
                </Form>
              </>
            </div>
          </div>
        </div>
      </Spin>
      <Footer />
    </>
  );
};

export default UpdateProfiles;
