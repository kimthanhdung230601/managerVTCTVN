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
  import { getDetailF2, getDetailF3, updateUser } from "../../api/f0";
  import CryptoJS from "crypto-js";
  
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
  const ModalF1 = ({
    isModalOpen,
    handleCancel,
    handleOk,
    refetchAccountTable,
    id,
  }: ModalAccountProps) => {
    const [form] = useForm();
   
    //image
    const {
      data: dataDetailF2,
      isFetching,
      refetch,
    } = useQuery("getDetailF2", () => getDetailF2(id), {
      onSettled: (data) => {
        form.setFieldValue("name", data.data[0].name);
        form.setFieldValue("code", data.data[0].code);
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
  

    const onFinish = async (value: any) => {
      setLoading(true);
      console.log("value", value);
  
     
      const formdata = new FormData();
      formdata.append("name", value.name);
      formdata.append("phone", value.phone);
      formdata.append("location", value.location);
      formdata.append("manage", value.manage);
      // formdata.append("id", id);
      formdata.append("level", value.level);
      formdata.append("password", value.password);
      updateUserMutation.mutate(formdata);
    };
  
 
  
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
          title={`Quản lý tài khoản F1`}
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
                  <Form.Item
                    label="Tỉnh/Thành"
                    name="location"
                    rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
                  >
                    <Select
                      //  menuItemSelectedIcon={<CheckOutlined />}
                      showSearch
                      placeholder={"Tỉnh/Thành"}
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
                  <Form.Item
                    label="Đơn vị quản lý "
                    name="manage"
                    rules={[{ required: true, message: "Vui lòng chọn đơn vị " }]}
                  >
                    <Select>
                    <Select.Option value="Liên đoàn võ thuật">Liên đoàn võ thuật</Select.Option>
                        <Select.Option value="Liên đoàn võ thuật cổ truyền">Liên đoàn võ thuật cổ truyền</Select.Option>
                        <Select.Option value="Hội Võ Thuật">Hội Võ Thuật</Select.Option>
                        <Select.Option value="Hội Võ Thuật Cổ Truyền">Hội Võ Thuật Cổ Truyền</Select.Option>
                        <Select.Option value="Công An">Công An</Select.Option>
                        <Select.Option value="Quân Đội">Quân Đội</Select.Option>
                        <Select.Option value="Giáo Dục">Giáo Dục</Select.Option>
                        <Select.Option value="Sở VHTT và Du lịch">Sở VHTT và Du lịch</Select.Option>
                        <Select.Option value="Trung tâm huấn luyện thể thao">Trung tâm huấn luyện thể thao</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Chức danh"
                    name="level"
                    rules={[
                      { required: true, message: "Vui lòng điền chức danh" },
                      
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng điền mật khẩu" },
                      
                    ]}
                  >
                    <Input.Password />
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
  
  export default ModalF1;
  