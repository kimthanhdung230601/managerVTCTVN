import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
  CheckOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Input, Table, Button, Form, Select, Col, Row, Image } from "antd";
import { admin } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import ModalAccount from "../../components/Modal/ModalAccount";
import ModalAccept from "../../components/Modal/ModalAccept";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";

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
  id: string,
  phone: string
}

const { Option } = Select;
const province = [
  'Hà Giang', 'Cao Bằng', 'Lào Cai', 'Sơn La', 'Lai Châu', 'Bắc Kạn', 'Lạng Sơn', 'Tuyên Quang', 'Yên Bái',
  'Thái Nguyên', 'Điện Biên', 'Phú Thọ', 'Vĩnh Phúc', 'Bắc Giang', 'Bắc Ninh', 'Hà Nội', 'Quảng Ninh', 'Hải Dương',
  'Hải Phòng', 'Hòa Bình', 'Hưng Yên', 'Hà Nam', 'Thái Bình', 'Nam Định', 'Ninh Bình', 'Thanh Hóa', 'Nghệ An',
  'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Kon Tum', 'Gia Lai',
  'Bình Định', 'Phú Yên', 'Đắk Lắk', 'Khánh Hòa', 'Đắk Nông', 'Lâm Đồng', 'Ninh Thuận', 'Bình Phước', 'Tây Ninh',
  'Bình Dương', 'Đồng Nai', 'Bình Thuận', 'Thành phố Hồ Chí Minh', 'Long An', 'Bà Rịa – Vũng Tàu', 'Đồng Tháp',
  'An Giang', 'Tiền Giang', 'Vĩnh Long', 'Bến Tre', 'Cần Thơ', 'Kiên Giang', 'Trà Vinh', 'Hậu Giang', 'Sóc Trăng',
  'Bạc Liêu', 'Cà Mau',
];
const customLocale = {
  filterConfirm: 'OK',  // Thay đổi nút xác nhận
  filterReset: 'Xoá', // Thay đổi nút reset
  filterEmptyText: 'No filters', // Thay đổi văn bản khi không có bộ lọc
  selectAll: 'Chọn tất cả', // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: 'Đảo ngược', // Thay đổi văn bản khi chọn ngược
};
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  var locations = ["Hà Nội", "Hà Nam", "Kiên Giang"];
  var randomLocation = locations[Math.floor(Math.random() * locations.length)];
  var manager = ["Quân Đội", "Liên Đoàn", "Công An", "Giáo Dục", "Sở VHTT", "Hội Võ Thuật"];
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
    phone: "0988674868"
  });
}
const ManagerAccount = () => {
  const [form] = Form.useForm();
  const naviagte = useNavigate()
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
  const columnsDesktopAccount: ColumnsType<DataType> = [
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
      title: "Tỉnh",
      dataIndex: "city",
      width: 120,
      filters: [
        {
          text: 'Hà Nội',
          value: 'Hà Nội',
        },
        {
          text: 'Hà Nam',
          value: 'Hà Nam',
        },
        {
          text: 'Kiên Giang',
          value: 'Kiên Giang',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, rec) => rec.city.startsWith(value) ,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      filters: [
        {
          text: 'Công An',
          value: 'Công An',
        },
        {
          text: 'Hội Võ Thuật',
          value: 'Hội Võ Thuật',
        },
        {
          text: 'Giáo Dục',
          value: 'Giáo Dục',
        },
        {
          text: 'Liên Đoàn',
          value: 'Liên Đoàn',
        },
        {
          text: 'Sở VHTT',
          value: 'Sở VHTT',
        },
        {
          text: 'Quân Đội',
          value: 'Quân Đội',
        },
        
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      filters: [
        {
          text: 'Câu lạc bộ A',
          value: 'Câu lạc bộ A',
        },
        {
          text: 'Câu lạc bộ B',
          value: 'Câu lạc bộ B',
        },
        {
          text: 'Câu lạc bộ C',
          value: 'Câu lạc bộ C',
        },
        {
          text: 'Câu lạc bộ D',
          value: 'Câu lạc bộ D',
        },
      ],
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
          <Image src={require("../../assets/image/degree.jpg")} preview={true} className={styles.img} />
          <Image src={require("../../assets/image/referral.jpg")} preview={true} className={styles.img} />
        </div>
      )
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <span>
          <button className={styles.btnView} onClick={() => naviagte("/thong-tin-tai-khoan")}>
            Xem
          </button>
          <button className={styles.btnTb} onClick={() => showModalMember()}>
            Sửa
          </button>
        </span>
      ),
    },
  ];
  const columnsMobileAccount: ColumnsType<DataType> = [
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
      title: "Tỉnh",
      dataIndex: "city",
      width: 120,
      filters: [
        {
          text: 'Hà Nội',
          value: 'Hà Nội',
        },
        {
          text: 'Hà Nam',
          value: 'Hà Nam',
        },
        {
          text: 'Kiên Giang',
          value: 'Kiên Giang',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, rec) => rec.city.startsWith(value) ,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      filters: [
        {
          text: 'Công An',
          value: 'Công An',
        },
        {
          text: 'Hội Võ Thuật',
          value: 'Hội Võ Thuật',
        },
        {
          text: 'Giáo Dục',
          value: 'Giáo Dục',
        },
        {
          text: 'Liên Đoàn',
          value: 'Liên Đoàn',
        },
        {
          text: 'Sở VHTT',
          value: 'Sở VHTT',
        },
        {
          text: 'Quân Đội',
          value: 'Quân Đội',
        },
        
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      filters: [
        {
          text: 'Câu lạc bộ A',
          value: 'Câu lạc bộ A',
        },
        {
          text: 'Câu lạc bộ B',
          value: 'Câu lạc bộ B',
        },
        {
          text: 'Câu lạc bộ C',
          value: 'Câu lạc bộ C',
        },
        {
          text: 'Câu lạc bộ D',
          value: 'Câu lạc bộ D',
        },
      ],
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
          <Image src={require("../../assets/image/degree.jpg")} preview={true} className={styles.img} />
          <Image src={require("../../assets/image/referral.jpg")} preview={true} className={styles.img} />
        </div>
      )
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
      render: (_, record) => (
        <span>
          <button className={styles.btnView} onClick={() => naviagte("/thong-tin-tai-khoan")}>
            Xem
          </button>
          <button className={styles.btnTb} onClick={() => showModalMember()}>
            Sửa
          </button>
        </span>
      ),
    },
  ];
  const columnsDesktopAccept: ColumnsType<DataType> = [
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
      title: "Tỉnh",
      dataIndex: "city",
      width: 120,
      filters: [
        {
          text: 'Hà Nội',
          value: 'Hà Nội',
        },
        {
          text: 'Hà Nam',
          value: 'Hà Nam',
        },
        {
          text: 'Kiên Giang',
          value: 'Kiên Giang',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, rec) => rec.city.startsWith(value) ,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      width: 200,
      filters: [
        {
          text: 'Công An',
          value: 'Công An',
        },
        {
          text: 'Hội Võ Thuật',
          value: 'Hội Võ Thuật',
        },
        {
          text: 'Giáo Dục',
          value: 'Giáo Dục',
        },
        {
          text: 'Liên Đoàn',
          value: 'Liên Đoàn',
        },
        {
          text: 'Sở VHTT',
          value: 'Sở VHTT',
        },
        {
          text: 'Quân Đội',
          value: 'Quân Đội',
        },
        
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      width: 200,
      filters: [
        {
          text: 'Câu lạc bộ A',
          value: 'Câu lạc bộ A',
        },
        {
          text: 'Câu lạc bộ B',
          value: 'Câu lạc bộ B',
        },
        {
          text: 'Câu lạc bộ C',
          value: 'Câu lạc bộ C',
        },
        {
          text: 'Câu lạc bộ D',
          value: 'Câu lạc bộ D',
        },
      ],
      onFilter: (value: any, rec) => rec.club.indexOf(value) === 0,
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
          <Image src={require("../../assets/image/degree.jpg")} preview={true} className={styles.img} />
          <Image src={require("../../assets/image/referral.jpg")} preview={true} className={styles.img} />
        </div>
      )
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <span>

          <button className={styles.btnView} onClick={()=>showModalAccept()}>Duyệt</button>
          <button className={styles.btnTbDanger}>Xóa</button>
        </span>
      ),
    },
  ];
  const columnsMobileAccept: ColumnsType<DataType> = [
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
      title: "Tỉnh",
      dataIndex: "city",
      width: 120,
      filters: [
        {
          text: 'Hà Nội',
          value: 'Hà Nội',
        },
        {
          text: 'Hà Nam',
          value: 'Hà Nam',
        },
        {
          text: 'Kiên Giang',
          value: 'Kiên Giang',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, rec) => rec.city.startsWith(value) ,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "managerF1",
      filters: [
        {
          text: 'Công An',
          value: 'Công An',
        },
        {
          text: 'Hội Võ Thuật',
          value: 'Hội Võ Thuật',
        },
        {
          text: 'Giáo Dục',
          value: 'Giáo Dục',
        },
        {
          text: 'Liên Đoàn',
          value: 'Liên Đoàn',
        },
        {
          text: 'Sở VHTT',
          value: 'Sở VHTT',
        },
        {
          text: 'Quân Đội',
          value: 'Quân Đội',
        },
        
      ],
      onFilter: (value: any, rec) => rec.managerF1.indexOf(value) === 0,
      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "club",
      width: 200,
      filters: [
        {
          text: 'Câu lạc bộ A',
          value: 'Câu lạc bộ A',
        },
        {
          text: 'Câu lạc bộ B',
          value: 'Câu lạc bộ B',
        },
        {
          text: 'Câu lạc bộ C',
          value: 'Câu lạc bộ C',
        },
        {
          text: 'Câu lạc bộ D',
          value: 'Câu lạc bộ D',
        },
      ],
      onFilter: (value: any, rec) => rec.club.indexOf(value) === 0,
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
          <Image src={require("../../assets/image/degree.jpg")} preview={true} className={styles.img} />
          <Image src={require("../../assets/image/referral.jpg")} preview={true} className={styles.img} />
        </div>
      )
    },
    {
      // title: 'Action',
      key: "action",
      width: 150,
   
      render: (_, record) => (
        <span>

          <button className={styles.btnView} onClick={()=>showModalAccept()}>Duyệt</button>
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
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value: string) => {
      console.log('search:', value);
  };
  const filterOption = (input: string, option?: { children: React.ReactNode }) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
  return (
    <div className={styles.wrap}>
      <div className={styles.managerAccount}>
        <Row gutter={40} justify="space-between" className={styles.buttonGroup}>
          <Col xxl={12} md={24}  className="gutter-row">
            <div style={{width: "180px"}}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Quản lý tài khoản
              </div>
            </div>
            
            
          </Col>
            <Col xxl={12} md={24}   onClick={() => showModalMember()} className="gutter-row" >
              <div style={{display: "flex", justifyContent: "end"}}>
                <div className={styles.btn}>
                  <PlusOutlined className={styles.icon} />
                  Thêm tài khoản
                </div>
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
          <Col xxl={12} md={24}  className="gutter-row">
            <div style={{width: "240px"}}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Xét duyệt hồ sơ đăng ký 
              </div>
            </div>
            
            
          </Col>
            <Col xxl={12} md={24} className="gutter-row" >
              <div style={{display: "flex", justifyContent: "end"}}>
                <div className={styles.btn} onClick={()=>showModalAccept()}>
                  <CheckOutlined className={styles.icon} />
                    Duyệt toàn bộ
                </div>
              </div>
          </Col>
        </Row>
        <div className={styles.table}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} hồ sơ` : ''}
        </span>
          <Table
          rowSelection={rowSelection}
          locale={customLocale}
          columns={isMobile ? columnsMobileAccept : columnsDesktopAccept}
            dataSource={data}
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
       selectedRowKeys ={selectedRowKeys}
        isModalOpen={isModalOpenAccept}
        handleCancel={handleCancelAccept}
        handleOk={handleOkAccept}
      />
    </div>
  );
};

export default ManagerAccount;
