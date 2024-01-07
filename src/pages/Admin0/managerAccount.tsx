import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Input, Table, Button, Form, Select } from "antd";
import { admin } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
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

const columns: ColumnsType<DataType> = [
  {
    title: "Account",
    dataIndex: "account",
    width:350
  },
  {
    title: "Mật khẩu",
    dataIndex: "password",
     width:350
  },
  {
    title: "Người quản lý",
    dataIndex: "manager",
     width:350
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
     width:350
  },
  {
    title: "Email",
    dataIndex: "email",
    width:250
  },

  {
    // title: 'Action',
    key: "action",
    render: (_, record) => (
      <span>
        <button className={styles.btnTb}>Sửa</button>
      
      </span>
    ),
  },
];
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
  return (
    <>
      <div className={styles.buttonGroup}>
        <div className={styles.rightContent}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ display:"flex" }}
         
          >
            {" "}
            <Form.Item name="City" label="Tỉnh" style={{ width: 320, marginLeft:"2vh"}}>
              <Select placeholder="Tỉnh" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="City" label="Liên đoàn" style={{ width: 320, marginLeft:"2vh" }}>
              <Select placeholder="Liên đoàn,sở ngành" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="City" label="CLB" style={{ width: 320, marginLeft:"2vh" }}>
              <Select placeholder="CLB" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            // style: { backgroundColor: '#046C39', border: '1px solid #046C39' },
            itemRender: (current, type, originalElement) => {
              if (type === "page") {
                return (
                  <span
                    className="custom-pagination-item"
                    style={{ color: "#046C39", borderColor: "#046C39" }}
                  >
                    {originalElement}
                  </span>
                );
              }
              return originalElement;
            },
          }}
        />
      </div>
    </>
  );
};

export default ManagerAccount;
