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
import { getInforAdmin, getListClub } from "../../api/f0";
import { getListClubs } from "../../api/f1";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface Club {
  id: string;
  name_club: string;
  club: number;
  NameClb: string;
}

interface ProfilesProps {}
const Profiles = () => {
  const param = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const { compressImage } = useImageCompression();
  // const {data:getInforManage} = useQuery("",()=>getInforAdmin(id))
  const addMemberMutation = useMutation(
    async (payload: any) => await addMember(payload),
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          {
            decryptedPermission == "0"
              ? message.success("Thêm hội viên thành công!")
              : message.success(
                  "Yêu cầu đã được gửi đến Liên đoàn Võ thuật Cổ truyền Việt Nam"
                );
          }

          setLoading(false);
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          setLoading(false);
        }
      },
      onError(error, variables, context) {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
    }
  );
  const { data: dataClub } = useQuery("dataClub", getListClub);
  const { data: dataClubF1 } = useQuery("dataClubs", getListClubs);
  const listClub = dataClub?.data.map((item: Club, index: number) => ({
    text: item.name_club,
    value: item.id,
  }));

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
  const NameClbState = useSelector((state: any) => state.NameClb);
  const clubState = useSelector((state: any) => state.club);
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
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {};

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
  const manage = CryptoJS.AES.decrypt(
    Cookies.get("manage") as string,
    secretKey
  );
  const decryptedPermission = permission.toString(CryptoJS.enc.Utf8);
  const club = CryptoJS.AES.decrypt(Cookies.get("club") as string, secretKey);
  const decryptedClub = club.toString(CryptoJS.enc.Utf8);
  const permissionManage = manage.toString(CryptoJS.enc.Utf8);
  const NameClb = CryptoJS.AES.decrypt(
    Cookies.get("NameClb") as string,
    secretKey
  );
  const decryptedNameClb = NameClb.toString(CryptoJS.enc.Utf8);
  // const permission = CryptoJS.AES.decrypt(
  //   Cookies.get("permission") as string,
  //   secretKey
  // );
  // const decryptedPermission = permission.toString(CryptoJS.enc.Utf8);
  //fill club
  // useEffect(() => {
  //   form.setFieldValue("club", decryptedNameClb);
  // }, [form]);
  console.log("decryptedClub", decryptedClub);
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    const formattedBirthday = moment(new Date(values.birthday)).format(
      "YYYY-MM-DD"
    );
    setLoading(true);
    console.log("form", values);
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
    formdata.append("detail", values.detail);
    formdata.append("achievements", values.achievements);
    if (decryptedPermission == "0") formdata.append("club", values.club);
    else if (decryptedPermission == "2") formdata.append("club", decryptedClub);
    else if (decryptedPermission == "1" && !param.key)
      formdata.append("club", values.club);
    else if (decryptedPermission == "1" && param.key)
      formdata.append("club", decryptedClub);
    formdata.append("hometown", values.hometown);

    // const address = `${values.city} - ${values.district}`;
    formdata.append("address", values.city);
    formdata.append("nationality", values.nationality);
    formdata.append("email", values.email);
    formdata.append(
      `image_certificate`,
      values.image_certificate[0].originFileObj as File,
      CryptoJS.AES.encrypt(
        values.image_certificate[0].name,
        randomKey
      ).toString()
    );
    formdata.append(
      `avatar`,
      values.avatar[0].originFileObj as File,
      CryptoJS.AES.encrypt(values.avatar[0].name, randomKey).toString()
    );
    // formdata.forEach((value, key) => {
    //   console.log(key, value);
    // });
    // setLoading(false);
    addMemberMutation.mutate(formdata);
  };
  const previousPageUrl = document.referrer;

  const location = useLocation();
  const previousPathname = location.state?.prevPathname;
  console.log(dataClubF1);
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
                  <Col span={8} xs={24} sm={24} md={8}>
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
                                  <div style={{ marginTop: 8 }}>
                                    Tải giấy CN bằng cấp
                                  </div>
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
                                    Tải ảnh chân dung lên
                                  </div>
                                </div>
                              </>
                            )}
                          </Upload>
                          {/* </ImgCrop> */}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8} xs={24} sm={24} md={8}>
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
                  <Col span={8} xs={24} sm={24} md={8}>
                    {" "}
                    <Form.Item
                      label="Quốc tịch"
                      name="nationality"
                      rules={[
                        { required: true, message: "Vui lòng điền quốc tịch" },
                      ]}
                    >
                      <Input style={{width:"100%"}}/>
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
                            format="DD/MM/YYYY"
                            style={{ width: "100%" }}
                          />
                          {/* <Input type="date" /> */}
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
                  <Col span={8} xs={24} sm={24} md={8}></Col>
                </Row>{" "}
                <Row gutter={16}>
                  <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                      label={
                        param.key
                          ? "Đơn vị quản lý"
                          : "Môn phái/Võ phái/Võ đường/Trung tâm/CLB"
                      }
                      name="club"
                      rules={[
                        param.key || decryptedPermission == "2"
                          ? { required: false }
                          : {
                              required: true,
                              message: param.key
                                ? "Đơn vị quản lý"
                                : "Vui lòng điền Môn phái/Võ phái/Võ đường/Trung tâm/CLB",
                            },
                      ]}
                    >
                      {decryptedPermission == "0" ? (
                        <Select>
                          {listClub?.map((club: any) => (
                            <Select.Option key={club.value} value={club.value}>
                              {club.text}
                            </Select.Option>
                          ))}
                        </Select>
                      ) : !param.key && decryptedPermission == "1" ? (
                        dataClubF1?.status === "success" && (
                          <Select defaultValue={null}>
                            {dataClubF1?.data.map((club: any) => (
                              <Select.Option key={club.value} value={club.club}>
                                {club.NameClb}
                              </Select.Option>
                            ))}
                          </Select>
                        )
                      ) : param.key && decryptedPermission == "1" ? (
                        <Input
                          disabled={true}
                          defaultValue={permissionManage}
                        />
                      ) : decryptedPermission === "2" ? (
                        <Input
                          disabled={true}
                          defaultValue={decryptedNameClb}
                        />
                      ) : null}
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} md={8}>
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
                  <Col span={8} xs={24} sm={24} md={8}>
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
                  <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Tỉnh/Thành"
                      name="city"
                      rules={[
                        { required: true, message: "Vui lòng chọn tỉnh/thành" },
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
                  <Col span={8} xs={24} sm={24} md={8}>
                    {/* <Form.Item
                      label="Quận/Huyện"
                      name="district"
                      rules={[
                        { required: true, message: "Vui lòng điền quận/huyện" },
                      ]}
                    >
                      <Input />
                    </Form.Item> */}{" "}
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
                  <Col span={8} xs={24} sm={24} md={8}>
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
                  <Col span={8} xs={24} sm={24} md={8}>
                    {" "}
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
                            <MinusCircleOutlined onClick={() => remove(name)} />
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
