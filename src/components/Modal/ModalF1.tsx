import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Select,
  message,
  Spin,
} from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { province } from "../../until/until";
import { useMutation, useQuery } from "react-query";
import { getDetailF2, updateUser } from "../../api/f0";

interface ModalAccountProps {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
  id: any;
  setId: Function;
  refetchAccountTable: () => void;
}
const ModalF1 = ({
  isModalOpen,
  handleCancel,
  handleOk,
  refetchAccountTable,
  id,
}: ModalAccountProps) => {
  const [form] = useForm();

  //image
  const { data: dataDetailF2, isFetching } = useQuery(
    ["getDetailF2", id],
    () => getDetailF2(id),
    {
      enabled: id !== undefined,
      onSettled: (data) => {
        form.setFieldValue("name", data.data[0].name);
        form.setFieldValue("code", data.data[0].code);
        form.setFieldValue("location", data.data[0].location);
        form.setFieldValue("manage", data.data[0].manage);
        form.setFieldValue("phone", data.data[0].phone);
        form.setFieldValue("email", data.data[0].email);
        form.setFieldValue("idcard", data?.data[0].idcard);
        form.setFieldValue("level", data.data[0].level);
        form.setFieldValue("password", data.data[0].password);
        form.setFieldValue("username", data.data[0].username);
      },
    }
  );
  //update
  const [loading, setLoading] = useState(false);
  const updateUserMutation = useMutation(
    async (payload: any) => await updateUser(payload),
    {
      onSuccess: (data) => {
        message.success("Cập nhật thành công");
        setLoading(false);
        refetchAccountTable();
      },
    }
  );

  const onFinish = async (value: any) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("id", dataDetailF2?.data[0].id);
    formdata.append("birthday", dataDetailF2?.data[0].birthday);
    formdata.append("club", dataDetailF2?.data[0].club);
    formdata.append("idcard", dataDetailF2?.data[0].idcard);
    formdata.append("idday", dataDetailF2?.data[0].idday);
    formdata.append("idlocation", dataDetailF2?.data[0].idlocation);
    formdata.append("email", value.email);
    formdata.append("permission", dataDetailF2?.data[0].permission);
    formdata.append("pending", dataDetailF2?.data[0].pending);
    formdata.append("name", value.name);
    formdata.append("phone", value.phone);
    formdata.append("location", value.location);
    formdata.append("manage", value.manage);
    formdata.append("password", value.password);
    formdata.append("level", value.level);
    formdata.append("username", value.username);
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
        title={`Chỉnh sửa tài khoản đơn vị quản lý`}
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
                    showSearch
                    placeholder={"Tỉnh/Thành"}
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    onSearch={onSearchSelect}
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
                    <Select.Option value="Liên đoàn võ thuật">
                      Liên đoàn võ thuật
                    </Select.Option>
                    <Select.Option value="Liên đoàn võ thuật cổ truyền">
                      Liên đoàn võ thuật cổ truyền
                    </Select.Option>
                    <Select.Option value="Hội Võ Thuật">
                      Hội Võ Thuật
                    </Select.Option>
                    <Select.Option value="Hội Võ Thuật Cổ Truyền">
                      Hội Võ Thuật Cổ Truyền
                    </Select.Option>
                    <Select.Option value="Công An">Công An</Select.Option>
                    <Select.Option value="Quân Đội">Quân Đội</Select.Option>
                    <Select.Option value="Giáo Dục">Giáo Dục</Select.Option>
                    <Select.Option value="Sở VHTT và Du lịch">
                      Sở VHTT và Du lịch
                    </Select.Option>
                    <Select.Option value="Trung tâm huấn luyện thể thao">
                      Trung tâm huấn luyện thể thao
                    </Select.Option>
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
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng điền email" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng điền password" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tài khoản"
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng điền tên tài khoản" },
                  ]}
                >
                  <Input />
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
