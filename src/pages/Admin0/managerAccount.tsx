import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Input, Table, Button, Form, Select, Col, Row } from "antd";
import { admin } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import ModalAccount from "../../components/Modal/ModalAccount";
import ModalAccept from "../../components/Modal/ModalAccept";

interface ManagerAccountProps {}
interface DataType {
  key: React.Key;
  account?: string;
  password?: string;
  manager?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  club?: string;
  city?: string;
  managerF1?: string;
  amount?: number;
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
    name: "Nguyễn Văn A",
    club: "Câu lạc bộ A",
    managerF1: "Hội võ thuật",
    city: "Hà Nội",
    amount: 1,
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
  //modal xét duyệt hồ sơ
  const [isModalOpenAccept, setIsModalOpenAccept] = useState(false);
  const showModalAccept = () => {
    setIsModalOpenAccept(true);
  };

  const handleOkAccept = () => {
    setIsModalOpenAccept(false);
    console.log("đã duyệt");
    
  };

  const handleCancelAccept = () => {
    setIsModalOpenAccept(false);
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
      width: 200,
      render: (_, record) => (
        <span>
          <button className={styles.btnTb} onClick={() => showModalMember()}>
            Chỉnh sửa
          </button>
        </span>
      ),
    },
  ];
  const columnsAccept: ColumnsType<DataType> = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 350,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      width: 350,
    },
    {
      title: "Tỉnh",
      dataIndex: "city",
      width: 350,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      width: 350,
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      width: 250,
    },

    {
      // title: 'Action',
      key: "action",
      width: 200,
      render: (_, record) => (
        <span>
          <button className={styles.btnTb} onClick={()=>showModalAccept()}>Duyệt</button>
          <button className={styles.btnTbDanger}>Xóa</button>
        </span>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div className={styles.managerAccount}>
        <div className={styles.postLabel}>
          <FileTextOutlined style={{ marginRight: "10px" }} />
          Quản lý tài khoản
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.rightContent}>
            <Form
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{ display: "flex" }}
              className={styles.form}
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
            <div className={styles.btn} onClick={() => showModalMember()}>
              <PlusOutlined className={styles.icon} />
              Thêm tài khoản
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{}}
            style={{ overflowX: "auto" }}
          />
        </div>
      </div>
      <div className={styles.managerAccountAccept}>
        <div className={styles.postLabel}>
          <FileTextOutlined style={{ marginRight: "10px" }} />
          Xét duyệt hồ sơ đăng ký tài khoản
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.rightContent}>
            {/* <Form
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{ display: "flex" }}
              className={styles.form}
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
            </Form> */}
            <div className={styles.btn} onClick={()=>showModalAccept()}>
              <PlusOutlined className={styles.icon} />
              Duyệt toàn bộ
            </div>
          </div>
        </div>
        <div className={styles.table}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} hồ sơ` : ''}
        </span>
          <Table
          rowSelection={rowSelection}
            columns={columnsAccept}
            dataSource={data}
            pagination={{}}
            style={{ overflowX: "auto" }}
          />
        </div>
      </div>
      <ModalAccount
        isModalOpen={isModalOpenMember}
        handleCancel={handleCancelMember}
        handleOk={handleOkMember}
      />
       <ModalAccept
       selectedRowKeys ={selectedRowKeys}
        isModalOpen={isModalOpenAccept}
        handleCancel={handleCancelAccept}
        handleOk={handleOkAccept}
      />
    </>
  );
};

export default ManagerAccount;
