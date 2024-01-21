import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Input, Table, Button, Form, Select, Col, Row } from "antd";
import { admin } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import ModalAccount from "../../components/Modal/ModalAccount";

interface ManagerAccountProps {}
interface DataType {
  key: React.Key;
  account: string;
  password: string;
  manager: string;
  phoneNumber: string;
  email: string;
}
const { Option } = Select;

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    account: `account ${i}`,
    password: `pass ${i}`,
    manager: `manager ${i}`,
    phoneNumber: `phone ${i}`,
    email: `email ${i}`,
  });
}
const ManagerAccount = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  //modal quản lý thành viên
  const [isModalOpenMember, setIsModalOpenMember] = useState(false);

  const showModalMember = () => {
    setIsModalOpenMember(true);
  };

  const handleOkMember = () => {
    setIsModalOpenMember(false);
  };

  const handleCancelMember = () => {
    setIsModalOpenMember(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Account",
      dataIndex: "account",
      width: 350,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      width: 350,
    },
    {
      title: "Người quản lý",
      dataIndex: "manager",
      width: 350,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 350,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 250,
    },

    {
      // title: 'Action',
      key: "action",
      render: (_, record) => (
        <span>
          <button className={styles.btnTb} onClick={() => showModalMember()}>
            Sửa
          </button>
        </span>
      ),
    },
  ];
  return (
    <>
      <div className={styles.buttonGroup}>
        <div className={styles.rightContent}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ display: "flex" }}
          >
            {" "}
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <Form.Item name="City" label="Tỉnh" style={{ width: "100%" }}>
                  <Select placeholder="Tỉnh" allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <Form.Item
                  name="City"
                  label="Liên đoàn"
                  style={{ width: "100%" }}
                >
                  <Select placeholder="Liên đoàn, sở ngành" allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <Form.Item name="City" label="CLB" style={{ width: "100%" }}>
                  <Select placeholder="CLB" allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{}}
        />
      </div>
      <ModalAccount
        isModalOpen={isModalOpenMember}
        handleCancel={handleCancelMember}
        handleOk={handleOkMember}
      />
    </>
  );
};

export default ManagerAccount;
