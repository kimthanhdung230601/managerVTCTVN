import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
  CheckOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Input, Table, Button, Form, Select, Col, Row, Image } from "antd";
import { admin, province } from "../../until/until";
import styles from "./styles.module.scss";
// import type { TableColumnsType, TableProps } from "antd/es/table";
import type { TableColumnsType, TableProps } from 'antd';

import ModalAccount from "../../components/Modal/ModalAccount";
import ModalAccept from "../../components/Modal/ModalAccept";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { text } from "stream/consumers";

interface ManagerAccountProps {}
interface DataType {
  key: React.Key;
  account: string;
  password: string;
  manager: string;
  phoneNumber: string;
  email: string;
  name: string;
  club: string;
  city: string;
  managerF1: string;
  id: string;
  phone: string;
}

const { Option } = Select;
const filterProivce = province.map((province) => ({
  text: province,
  value: province,
}));
const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  var locations = ["Hà Nội", "Hà Nam", "Kiên Giang"];
  var randomLocation = locations[Math.floor(Math.random() * locations.length)];
  var manager = [
    "Quân Đội",
    "Liên Đoàn",
    "Công An",
    "Giáo Dục",
    "Sở VHTT",
    "Hội Võ Thuật",
  ];
  var randomManager = manager[Math.floor(Math.random() * manager.length)];
  var club = ["Câu lạc bộ B", "Câu lạc bộ A", "Câu lạc bộ C", "Câu lạc bộ D"];
  var randomClub = club[Math.floor(Math.random() * club.length)];
  data.push({
    key: ++i,
    account: `account ${i}`,
    password: `pass ${i}`,
    manager: `manager ${i}`,
    phoneNumber: `phone ${i}`,
    email: `email ${i}`,
    name: "Nguyễn Văn A",
    club: randomClub,
    managerF1: randomManager,
    city: randomLocation,
    id: "VCT010203050066",
    phone: "0988674868",
  });
}
const ManagerAccount = () => {
  const [form] = Form.useForm();
  const naviagte = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
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
  const columnsDesktopAccount: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      fixed: "left",
      width: 70,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      fixed: "left",
      width: 250,
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: 'Tỉnh',
      dataIndex: 'city',
      filters: filterProivce,
      onFilter: (value:any, record) => record.city.startsWith(value),
      filterSearch: true,
      width:120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      filters: [
        {
          text: "Công An",
          value: "Công An",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Liên Đoàn",
          value: "Liên Đoàn",
        },
        {
          text: "Sở VHTT",
          value: "Sở VHTT",
        },
        {
          text: "Quân Đội",
          value: "Quân Đội",
        },
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      filterMode: 'tree',
      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      filters: [
        {
          text: "Câu lạc bộ A",
          value: "Câu lạc bộ A",
        },
        {
          text: "Câu lạc bộ B",
          value: "Câu lạc bộ B",
        },
        {
          text: "Câu lạc bộ C",
          value: "Câu lạc bộ C",
        },
        {
          text: "Câu lạc bộ D",
          value: "Câu lạc bộ D",
        },
      ],
      onFilter: (value: any, rec) => rec.club.indexOf(value) === 0,
      filterMode: 'tree',
      width: 200,
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      width: 200,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 150,
      render: (_, record) => (
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/degree.jpg")}
            preview={true}
            className={styles.img}
          />
          <Image
            src={require("../../assets/image/referral.jpg")}
            preview={true}
            className={styles.img}
          />
        </div>
      ),
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <span>
          <button
            className={styles.btnView}
            onClick={() => naviagte("/thong-tin-tai-khoan")}
          >
            Xem
          </button>
          <button className={styles.btnTb} onClick={() => showModalMember()}>
            Sửa
          </button>
        </span>
      ),
    },
  ];
  const columnsMobileAccount: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: 70,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 250,
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: 'Tỉnh',
      dataIndex: 'city',
      filters: filterProivce,
      onFilter: (value:any, record) => record.city.startsWith(value),
      filterMode: 'tree',
      filterSearch: true,
      width:120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      filters: [
        {
          text: "Công An",
          value: "Công An",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Liên Đoàn",
          value: "Liên Đoàn",
        },
        {
          text: "Sở VHTT",
          value: "Sở VHTT",
        },
        {
          text: "Quân Đội",
          value: "Quân Đội",
        },
      ],
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      width: 200,
      
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      filters: [
        {
          text: "Câu lạc bộ A",
          value: "Câu lạc bộ A",
        },
        {
          text: "Câu lạc bộ B",
          value: "Câu lạc bộ B",
        },
        {
          text: "Câu lạc bộ C",
          value: "Câu lạc bộ C",
        },
        {
          text: "Câu lạc bộ D",
          value: "Câu lạc bộ D",
        },
      ],
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.club.indexOf(value) === 0,
      width: 200,
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      width: 200,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 150,
      render: (_, record) => (
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/degree.jpg")}
            preview={true}
            className={styles.img}
          />
          <Image
            src={require("../../assets/image/referral.jpg")}
            preview={true}
            className={styles.img}
          />
        </div>
      ),
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
      render: (_, record) => (
        <span>
          <button
            className={styles.btnView}
            onClick={() => naviagte("/thong-tin-tai-khoan")}
          >
            Xem
          </button>
          <button className={styles.btnTb} onClick={() => showModalMember()}>
            Sửa
          </button>
        </span>
      ),
    },
  ];
  const columnsDesktopAccept: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      fixed: "left",
      width: 70,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      fixed: "left",
      width: 250,
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: 'Tỉnh',
      dataIndex: 'city',
      filters: filterProivce,
      filterMode: 'tree',
      onFilter: (value:any, record) => record.city.startsWith(value),
      filterSearch: true,
    
      width:120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      width: 200,
      filters: [
        {
          text: "Công An",
          value: "Công An",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Liên Đoàn",
          value: "Liên Đoàn",
        },
        {
          text: "Sở VHTT",
          value: "Sở VHTT",
        },
        {
          text: "Quân Đội",
          value: "Quân Đội",
        },
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      filterMode: 'tree',
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      width: 200,
      filters: [
        {
          text: "Câu lạc bộ A",
          value: "Câu lạc bộ A",
        },
        {
          text: "Câu lạc bộ B",
          value: "Câu lạc bộ B",
        },
        {
          text: "Câu lạc bộ C",
          value: "Câu lạc bộ C",
        },
        {
          text: "Câu lạc bộ D",
          value: "Câu lạc bộ D",
        },
      ],
      onFilter: (value: any, rec) => rec.club.indexOf(value) === 0,
      filterMode: 'tree',
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      width: 200,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 150,
      render: (_, record) => (
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/degree.jpg")}
            preview={true}
            className={styles.img}
          />
          <Image
            src={require("../../assets/image/referral.jpg")}
            preview={true}
            className={styles.img}
          />
        </div>
      ),
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <span>
          <button className={styles.btnView} onClick={() => showModalAccept()}>
            Duyệt
          </button>
          <button className={styles.btnTbDanger}>Xóa</button>
        </span>
      ),
    },
  ];
  const columnsMobileAccept: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",

      width: 70,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",

      width: 250,
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: 'Tỉnh',
      dataIndex: 'city',
      filters: filterProivce,
      onFilter: (value:any, record) => record.city.startsWith(value),
      filterSearch: true,
      filterMode: 'tree',
      width:120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      filters: [
        {
          text: "Công An",
          value: "Công An",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Liên Đoàn",
          value: "Liên Đoàn",
        },
        {
          text: "Sở VHTT",
          value: "Sở VHTT",
        },
        {
          text: "Quân Đội",
          value: "Quân Đội",
        },
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      filterMode: 'tree',
      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      width: 200,
      filters: [
        {
          text: "Câu lạc bộ A",
          value: "Câu lạc bộ A",
        },
        {
          text: "Câu lạc bộ B",
          value: "Câu lạc bộ B",
        },
        {
          text: "Câu lạc bộ C",
          value: "Câu lạc bộ C",
        },
        {
          text: "Câu lạc bộ D",
          value: "Câu lạc bộ D",
        },
      ],
      onFilter: (value: any, rec) => rec.club.indexOf(value) === 0,
      filterMode: 'tree',
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      width: 200,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 150,
      render: (_, record) => (
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/degree.jpg")}
            preview={true}
            className={styles.img}
          />
          <Image
            src={require("../../assets/image/referral.jpg")}
            preview={true}
            className={styles.img}
          />
        </div>
      ),
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,

      render: (_, record) => (
        <span>
          <Button className={styles.btnView} onClick={() => showModalAccept()}>
            Duyệt
          </Button>
          <Button className={styles.btnTbDanger}>Xóa</Button>
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
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { children: React.ReactNode }
  ) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
  return (
    <div className={styles.wrap}>
      <div className={styles.managerAccount}>
        <Row gutter={40} justify="space-between" className={styles.buttonGroup}>
          <Col xxl={12} md={24} className="gutter-row">
            <div style={{ width: "180px" }}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Quản lý tài khoản
              </div>
            </div>
          </Col>
          <Col
            xxl={12}
            md={24}
            onClick={() => showModalMember()}
            className="gutter-row"
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button className={styles.btn} style={{ paddingRight: "10px" }}>
                <PlusOutlined className={styles.icon} />
                Thêm tài khoản
              </Button>
            </div>
          </Col>
        </Row>
        <div className={styles.table}>
          <Table
            columns={isMobile ? columnsMobileAccount : columnsDesktopAccount}
            dataSource={data}
            pagination={{}}
            locale={customLocale}
            scroll={{
              x: "max-content",
              y: "calc(100vh - 200px)",
            }}
            style={{ overflowX: "auto" }}
          />
        </div>
      </div>
      <div className={styles.managerAccountAccept}>
        <Row gutter={40} justify="space-between" className={styles.buttonGroup}>
          <Col xxl={12} md={24} className="gutter-row">
            <div style={{ width: "240px" }}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Xét duyệt hồ sơ đăng ký
              </div>
            </div>
          </Col>
          <Col xxl={12} md={24} className="gutter-row">
            <div style={{ display: "flex", justifyContent: "end" }}>
              {selectedRowKeys.length > 1 ? (
                <>
                  {" "}
                  <Button
                    className={styles.btn}
                    onClick={() => showModalAccept()}
                  >
                    <CheckOutlined className={styles.icon} />
                    Duyệt toàn bộ
                  </Button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </Col>
        </Row>
        <div className={styles.table}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} hồ sơ` : ""}
          </span>
          <Table
            rowSelection={rowSelection}
            locale={customLocale}
            columns={isMobile ? columnsMobileAccept : columnsDesktopAccept}
            dataSource={data}
            onChange={onChange}
            pagination={{}}
            scroll={{
              x: "max-content",
              y: "calc(100vh - 200px)",
            }}
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
        selectedRowKeys={selectedRowKeys}
        isModalOpen={isModalOpenAccept}
        handleCancel={handleCancelAccept}
        handleOk={handleOkAccept}
      />
    </div>
  );
};

export default ManagerAccount;
