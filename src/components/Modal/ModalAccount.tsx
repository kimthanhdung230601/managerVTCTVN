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
  Spin,
} from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import { province } from "../../until/until";
import { useMutation, useQuery } from "react-query";
import { getDetailF2, getDetailF3, getListClub, updateUser } from "../../api/f0";
import CryptoJS from "crypto-js";
interface Club {
  id: string;
  name_club: string;
  club: number;
  NameClb: string;
}
interface ModalAccountProps {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
  id: any;
  setId: Function;
  refetchAccountTable: () => void;
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
  refetchAccountTable,
  id,
}: ModalAccountProps) => {
  const [form] = useForm();
  const [previewOpen1, setPreviewOpen1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  // const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [previewOpen2, setPreviewOpen2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  // const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const handleCancel1 = () => setPreviewOpen1(false);
  const handleCancel2 = () => setPreviewOpen2(false);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </button>
  );
  const [fileListCertificate, setFileListCertificate] = useState<any>([]);
  const [fileListRef, setFileListRef] = useState<any>([]);
  const [fileListCmnd, setFileListCmnd] = useState<any>([]);
  const { data: dataClub } = useQuery(["dataClub",id], getListClub);
  const listClub = dataClub?.data?.map((item: Club, index: number) => ({
    text: item.name_club,
    value: item.id,
  }));
  //image
  const {
    data: dataDetailF2,
    isFetching,
    refetch,
  } = useQuery(["getDetailF2", id], () => getDetailF2(id), {
    onSettled: (data) => {
      form.setFieldValue("name", data.data[0].name);
      form.setFieldValue("password", data.data[0].password);
      form.setFieldValue("location", data.data[0].location);
      form.setFieldValue("NameClb", data.data[0].NameClb);
      form.setFieldValue("manage", data.data[0].manage);
      form.setFieldValue("phone", data.data[0].phone);
      form.setFieldValue("email", data.data[0].email);
      form.setFieldValue("idcard", data?.data[0].idcard);
    },
  });
  //update
  const [loading, setLoading] = useState(false);
  const updateUserMutation = useMutation(
    async (payload: any) => await updateUser(payload),
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          message.success("Sửa hội viên thành công!");
          refetchAccountTable();
          setLoading(false);
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          setLoading(false);
          console.log("data2", data);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        }
      },
    }
  );
  const getSrcFromFile = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };
  const [uploadedCertificate, setUploadedCertificate] = useState<any>(null);
  const [uploadedRef, setUploadedARef] = useState<any>(null);
  const [uploadedCmnd, setUploadedACmnd] = useState<any>(null);
  //image ref
  const onChangeRef = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    // Nếu người dùng đã upload ảnh, lưu trạng thái ảnh đã upload
    if (newFileList.length > 0) {
      setUploadedARef(newFileList[0]);
    } else {
      setUploadedARef(null);
    }
    setFileListRef(newFileList);
  };
  //cmnd
  const onChangeCmnd = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    // Nếu người dùng đã upload ảnh, lưu trạng thái ảnh đã upload
    if (newFileList.length > 0) {
      setUploadedACmnd(newFileList[0]);
    } else {
      setUploadedACmnd(null);
    }
    setFileListCmnd(newFileList);
  };
  const onPreviewRef = async (file: any) => {
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
  const onPreviewCmnd = async (file: any) => {
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
  //image certificate
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
  const onFinish = async (value: any) => {
    setLoading(true);
    console.log("value", value);

    const randomKey = CryptoJS.lib.WordArray.random(16).toString();
    const formdata = new FormData();
    formdata.append("name", value.name);
    formdata.append("phone", value.phone);
    formdata.append("email", value.email);
    formdata.append("location", value.location);
    formdata.append("manage", value.manage);
    //
    formdata.append("club", dataDetailF2?.data[0].club);
    formdata.append("id", id);
    formdata.append("level", dataDetailF2?.data[0].level);
    formdata.append("idcard", dataDetailF2?.data[0].idcard);
    formdata.append("idday", dataDetailF2?.data[0].idday);
    formdata.append("idlocation", dataDetailF2?.data[0].idlocation);
    formdata.append("birthday", dataDetailF2?.data[0].birthday);
    formdata.append("permission", dataDetailF2?.data[0].permission);
    formdata.append("pending", dataDetailF2?.data[0].pending);
    let certificateFile = null;
    let refFile = null;
    let cmndFile = null;
    if (uploadedCertificate) {
      certificateFile = uploadedCertificate.originFileObj as File;
    } else if (fileListCertificate && fileListCertificate.length > 0) {
      certificateFile = fileListCertificate[0].originFileObj as File;
    }

    if (uploadedRef) {
      refFile = uploadedRef.originFileObj as File;
    } else if (fileListRef && fileListRef.length > 0) {
      refFile = fileListRef[0].originFileObj as File;
    }
    if (uploadedCmnd) {
      cmndFile = uploadedCmnd.originFileObj as File;
    } else if (fileListCmnd && fileListCmnd.length > 0) {
      cmndFile = fileListRef[0].originFileObj as File;
    }

    if (certificateFile) {
      formdata.append(
        `image_certificate`,
        certificateFile,
        CryptoJS.AES.encrypt(certificateFile.name, randomKey).toString()
      );
    }

    if (refFile) {
      formdata.append(
        `image_ref`,
        refFile,
        CryptoJS.AES.encrypt(refFile.name, randomKey).toString()
      );
    }
    if (cmndFile) {
      formdata.append(
        `image_cmnd`,
        cmndFile,
        CryptoJS.AES.encrypt(cmndFile.name, randomKey).toString()
      );
    }
    // const res = await updateUser(formdata);
    // console.log("res", res);
    // setLoading(true);

    updateUserMutation.mutate(formdata);
  };

  useEffect(() => {
    //reload img
    const imageCertificateFileName = dataDetailF2?.data[0].image_certificate;
    const refFileName = dataDetailF2?.data[0].image_ref;
    const CmndFileName = dataDetailF2?.data[0].image_cmnd;
    // Nếu tên file tồn tại, tạo đối tượng fileList từ tên file
    if (imageCertificateFileName && refFileName && CmndFileName) {
    }
    const CertificateFileList = [
      {
        uid: "-1",
        name: imageCertificateFileName,
        status: "done",
        url: `https://vocotruyen.id.vn/PHP_IMG/${imageCertificateFileName}`,
      },
    ];
    setFileListCertificate(CertificateFileList);
    const refFileList = [
      {
        uid: "-1",
        name: refFileName,
        status: "done",
        url: `https://vocotruyen.id.vn/PHP_IMG/${refFileName}`,
      },
    ];
    setFileListRef(refFileList);
    const CmndFileList = [
      {
        uid: "-1",
        name: CmndFileName,
        status: "done",
        url: `https://vocotruyen.id.vn/PHP_IMG/${CmndFileName}`,
      },
    ];
    setFileListCmnd(CmndFileList);
  }, [dataDetailF2?.data[0]]);

  //select
  const onChangeSelect = (value: string) => {
    // console.log(`selected ${value}`);
  };
  const onSearchSelect = (value: string) => {
    // console.log('search:', value);
  };
  return (
    <>
      <Modal
        title={`Chỉnh sửa tài khoản hội viên`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={990}
      >
        <Spin spinning={isFetching}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng điền tên quản lý" },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* CCCD */}{" "}
                <Form.Item label="Căn cước công dân" name="idcard">
                  <Input disabled />
                </Form.Item>{" "}
                <Form.Item
                  label="Tỉnh/Thành/Ngành"
                  name="location"
                  rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
                >
                  <Select
                    //  menuItemSelectedIcon={<CheckOutlined />}
                    showSearch
                    placeholder={"Tỉnh/Thành/Ngành"}
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    onSearch={onSearchSelect}
                    //  filterOption={filterOption}
                    className={styles.select}
                  >
                    {province.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                {" "}
                <Form.Item
                  label="Đơn vị quản lý "
                  name="manage"
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
                <Form.Item label="Câu lạc bộ" name="NameClb">
                  {/* <Input disabled={true} /> */}
                  <Select>
                    {listClub?.map((club: any) => (
                      <Select.Option key={club.value} value={club.value}>
                        {club.text}
                      </Select.Option>
                    ))}
                  </Select>
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
            </Row>
            <Row gutter={16}>
              <Col span={12}>
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
              <Col span={12}></Col>
            </Row>
            <Row>
              <Col span={8}>
                {" "}
                <Form.Item
                  name="image_certificate"
                  label="Ảnh bằng cấp hiện tại"
                  // rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileListCertificate}
                    onChange={onChangeCertificate}
                    onPreview={onPreviewCertificate}
                    className="ref-uploader"
                  >
                    {fileListCertificate.length >= 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="image_ref"
                  label="Ảnh giấy giới thiệu"
                  // rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
                >
                  <Upload
                    onChange={onChangeRef}
                    onPreview={onPreviewRef}
                    listType="picture-card"
                    fileList={fileListRef}
                    className="ref-uploader"
                  >
                    {fileListRef.length >= 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="image_cmnd"
                  label="Ảnh CCCD"
                  // rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
                >
                  <Upload
                    onChange={onChangeCmnd}
                    onPreview={onPreviewCmnd}
                    listType="picture-card"
                    fileList={fileListCmnd}
                    className="ref-uploader"
                  >
                    {fileListCmnd.length >= 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className={styles.btn}>
              <div className={styles.btnContainer}>
                <Button htmlType="submit" loading={loading}>
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
        </Spin>
      </Modal>
    </>
  );
};

export default ModalAccount;
