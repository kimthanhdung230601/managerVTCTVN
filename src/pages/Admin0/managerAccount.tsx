import { useEffect, useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
  CheckOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  Input,
  Table,
  Button,
  Form,
  Select,
  Col,
  Row,
  Image,
  Popconfirm,
  message,
  Pagination,
  Spin,
} from "antd";
import { admin, province } from "../../until/until";
import styles from "./styles.module.scss";
// import type { TableColumnsType, TableProps } from "antd/es/table";
import type { TableColumnsType, TableProps } from "antd";

import ModalAccount from "../../components/Modal/ModalAccount";
import ModalAccept from "../../components/Modal/ModalAccept";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { text } from "stream/consumers";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import {
  deleteMemberF12,
  // getListMemberF12,
  getListMemberF12,
  updateAccount,
} from "../../api/f0";
import ListClub from "../../hook/listClub";
import CryptoJS from "crypto-js";
import ManagerAccountUnDepended from "./managerAccountUnDepended";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface DataType {
  key: React.Key;
  id: string;
  name: string;
  birthday: string;
  phone: any;
  code: any;
  idcard: any;
  level: any;
  address: any;
  DonViQuanLy: any;
  NameClb: any;
  note: string;
  status: any;
  achievements: any;
  NameClub: string;
  location: string;
  manage: string;
  club: string;
  image_certificate: any;
  image_ref: any;
  image_cmnd: any;
}

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
const ManagerAccount = () => {
  //tài khoản đã được duyệt
  const [currentPageAccount, setCurrentPageAccount] = useState(1);
  const initialPayload = `page=${currentPageAccount}&pending=1&permission=2`;
  const [payload, setPayload] = useState<any>(initialPayload);
  const {
    data: dataMemberF12Accept,
    refetch: refetchAccept,
    isFetching: isFetchingAccept,
  } = useQuery(["dataF12Accept", payload], () => getListMemberF12(payload),);
  const onChange: TableProps<DataType>["onChange"] = (pagination, filters) => {
    const param =
      (filters.location
        ? "&location=" + encodeURIComponent(filters.location[0].toString())
        : "") +
      (filters.NameClub ? "&club=" + filters.NameClub[0] : "") +
      (filters.manage
        ? "&manage=" + encodeURIComponent(filters.manage[0].toString())
        : "");
    const updatePayload = initialPayload + param;
    setPayload(updatePayload);

    refetchAccept();
  };

  const onChangePageAccount = (value: any) => {
    setCurrentPageAccount(value);
    refetchAccept();
  };
  //tài khoản chưa được duyệt

  const naviagte = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  //modal quản lý thành viên
  const [isModalOpenMember, setIsModalOpenMember] = useState(false);
  const [id, setId] = useState();
  const showModalMember = (value: any) => {
    setIsModalOpenMember(true);
    setId(value);
  };

  const handleOkMember = () => {
    setIsModalOpenMember(false);
  };

  const handleCancelMember = () => {
    setIsModalOpenMember(false);
  };
  const confirm = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await deleteMemberF12(payload);
    refetchAccept();

    message.success("Xóa thành công");
  };
  const cancel = (value: any) => {
    // message.error("");
  };
  const columnsDesktopAccount: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      fixed: "left",
      width: 20,
      render: (value, record, index) => {
        return index + 1 + (currentPageAccount - 1) * 10;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      fixed: "left",
      width: 210,
    },
    {
      title: "Tài khoản",
      dataIndex: "level",
      width: 150,
    },
    {
      title: "CCCD",
      dataIndex: "idcard",
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
      title: "Tỉnh/Thành/Ngành",
      dataIndex: "location",
      filters: filterProivce,
      onFilter: (value: any, record) => record.location.indexOf(value) === 0,
      filterSearch: true,
      filterMultiple: false,
      width: 120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "manage",
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
      onFilter: (value: any, record) => record.manage.indexOf(value) === 0,
      filterMultiple: false,

      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "NameClub",
      width: 200,
      filters: ListClub(),
      filterMultiple: false,
      filterSearch: true,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    // {
    //   title: "Tài khoản",
    //   dataIndex: "account",
    //   width: 200,
    // },

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
          <div className={styles.imgWrapItem}>
            {" "}
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_ref}`}
              preview={true}
              // alt="Không có ảnh"
              className={styles.img}
            />
          </div>
          <div className={styles.imgWrapItem}>
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_certificate}`}
              preview={true}
              // alt="Không có ảnh"
              className={styles.img}
            />
          </div>
          <div className={styles.imgWrapItem}>
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_cmnd}`}
              preview={true}
              alt="Không có ảnh"
              className={styles.img}
            />
          </div>
        </div>
      ),
    },
    {
      // title: 'Action',
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <span>
            <button
              className={styles.btnView}
              onClick={() => naviagte(`/thong-tin-tai-khoan/${id}`)}
            >
              Xem
            </button>
            <button
              className={styles.btnTb}
              onClick={() => showModalMember(record.id)}
            >
              Sửa
            </button>
            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <button className={styles.btnTbDanger}>Xóa</button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const columnsMobileAccount: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",

      width: 20,
      render: (value, record, index) => {
        return index + 1 + (currentPageAccount - 1) * 10;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",

      width: 210,
    },
    {
      title: "CCCD",
      dataIndex: "idcard",
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
      title: "Tỉnh/Thành/Ngành",
      dataIndex: "location",
      filters: filterProivce,
      onFilter: (value: any, record) => record.location.startsWith(value),
      filterSearch: true,
      filterMultiple: false,
      width: 120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "manage",
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
      onFilter: (value: any, record) => record.manage.indexOf(value) === 0,
      filterMultiple: false,

      width: 200,
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "NameClub",
      width: 200,
      filters: ListClub(),
      filterMultiple: false,
      filterSearch: true,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    // {
    //   title: "Tài khoản",
    //   dataIndex: "account",
    //   width: 200,
    // },
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
          <div className={styles.imgWrapItem}>
            {" "}
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_ref}`}
              preview={true}
              // alt="Không có ảnh"
              className={styles.img}
            />
          </div>
          <div className={styles.imgWrapItem}>
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_certificate}`}
              preview={true}
              // alt="Không có ảnh"
              className={styles.img}
            />
          </div>
          <div className={styles.imgWrapItem}>
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_cmnd}`}
              preview={true}
              alt="Không có ảnh"
              className={styles.img}
            />
          </div>
        </div>
      ),
    },
    {
      // title: 'Action',
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <span>
            <button
              className={styles.btnView}
              onClick={() => naviagte(`/thong-tin-tai-khoan/${id}`)}
            >
              Xem
            </button>
            <button
              className={styles.btnTb}
              onClick={() => showModalMember(record.id)}
            >
              Sửa
            </button>
            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <button className={styles.btnTbDanger}>Xóa</button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

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
            onClick={() => showModalMember(undefined)}
            className="gutter-row"
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                className={styles.btn}
                style={{ paddingRight: "10px" }}
                onClick={() => naviagte("/dang-ky")}
              >
                <PlusOutlined className={styles.icon} />
                Đăng ký tài khoản mới
              </Button>
            </div>
          </Col>
        </Row>
        <div className={styles.table}>
          <Spin spinning={isFetchingAccept}>
            <Table
              columns={isMobile ? columnsMobileAccount : columnsDesktopAccount}
              dataSource={dataMemberF12Accept?.data}
              pagination={false}
              locale={customLocale}
              onChange={onChange}
              scroll={{
                x: "max-content",
              }}
              style={{ overflowX: "auto" }}
            />
            <Pagination
              defaultCurrent={1}
              onChange={onChangePageAccount}
              total={dataMemberF12Accept?.total_products}
              pageSize={30}
              style={{ margin: "1vh 0", float: "right" }}
            />
          </Spin>
        </div>
      </div>
      <div>
        <ModalAccount
          isModalOpen={isModalOpenMember}
          handleCancel={handleCancelMember}
          handleOk={handleOkMember}
          id={id}
          setId={setId}
          refetchAccountTable={refetchAccept}
        />
      </div>{" "}
      <ManagerAccountUnDepended refetch={refetchAccept} />
    </div>
  );
};

export default ManagerAccount;
