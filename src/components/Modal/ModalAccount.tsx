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

interface ModalAccountProps {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
}
const { TextArea } = Input;

const ModalAccount = ({
  isModalOpen,
  handleCancel,
  handleOk,
}: ModalAccountProps) => {
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
        title="Quản lý tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={990}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Account"
                name="name"
                rules={[{ required: true, message: "Vui lòng điền account" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Người quản lý"
                name="Manager"
                rules={[{ required: true, message: "Vui lòng điền tên quản lý" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Mật khẩu"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mật khẩu",
                  },
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
                  {
                    required: true,
                    message: "Vui lòng điền email",
                  },
                  {
                    type: "email",
                    message: "Vui lòng điền đúng định dạng email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

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

export default ModalAccount;
