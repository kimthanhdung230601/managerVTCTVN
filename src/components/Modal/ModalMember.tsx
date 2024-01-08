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
} from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ModalMemberProps {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
}
const { TextArea } = Input;

const ModalMember = ({
  isModalOpen,
  handleCancel,
  handleOk,
}: ModalMemberProps) => {
  const [form] = useForm();
  const onFinish = (value: any) => {
    console.log("value:", value);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Modal
        title="Quản lý"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={990}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng điền họ tên" }]}
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
            <Col span={8}>
              {" "}
              <Form.Item
                label="Quốc tịch"
                name="countries"
                rules={[{ required: true, message: "Vui lòng điền quốc tịch" }]}
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
                        message: "Vui lòng điền thành tích cá nhân",
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
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                label="Cấp/đai đẳng hiện tại"
                name="level"
                rules={[{ required: true, message: "Vui lòng chọn đai" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền thành tích cá nhân",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Tỉnh/Thành ">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Quận/Huyện">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số CCCD "
                name="CCCD"
                rules={[{ required: true, message: "Vui lòng điền CCCD" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Quê quán"
                name="contry"
                rules={[{ required: true, message: "Vui lòng điền quê quán" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
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
            rules={[
              { required: true, message: "Vui lòng điền thành tích cá nhân" },
            ]}
          >
            <Input.TextArea showCount maxLength={1000} />
          </Form.Item>
          <Form.Item
            name="Ghi chú hiển thị với người dùng"
            label="Ghi chú hiển thị với người dùng"
            rules={[
              { required: true, message: "Vui lòng điển thông tin người dùng" },
            ]}
            style={{ width: "100%" }}
          >
            <Input.TextArea showCount maxLength={1000} />
          </Form.Item>
          <Form.Item className={styles.btn}>
            <div className={styles.btnContainer}>
              <Button className="btn" htmlType="submit">
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
      </Modal>
    </>
  );
};

export default ModalMember;
