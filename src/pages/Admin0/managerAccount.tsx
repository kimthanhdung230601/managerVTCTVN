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
  getListMemberF12Accept,
  getListMemberF12UnAccept,
  updateAccount,
} from "../../api/f0";
import ListClub from "../../hook/listClub";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface ManagerAccountProps {}
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
const ManagerAccount = () => {
  //tài khoản đã được duyệt
  const [currentPageAccount, setCurrentPageAccount] = useState(1);
  const [payloadAccept, setPayloadAccept] = useState<any>(1);
  const {
    data: dataMemberF12Accept,
    refetch: refetchAccept,
    isFetching: isFetchingAccept,
  } = useQuery(["dataF12Accept", payloadAccept], () =>
    getListMemberF12Accept(payloadAccept)
  );
  const onChange: TableProps<DataType>["onChange"] = (pagination, filters) => {
    console.log("filter", filters);

    const param =
      currentPageAccount +
      (filters.location
        ? "&location=" + encodeURIComponent(filters.location[0].toString())
        : "") +
      (filters.club ? "$club=" + filters.club[0] : "") +
      (filters.manage
        ? "&manage=" + encodeURIComponent(filters.manage[0].toString())
        : "");
    setPayloadAccept(param);
    console.log("pr accept", param);
    refetchAccept();
  };

  const onChangePageAccount = (value: any) => {
    setCurrentPageAccount(value);
    refetchAccept();
  };
  //tài khoản chưa được duyệt
  const [currentPageUnAccept, setCurrentPageUnAccept] = useState(1);
  const [payloadUnAccept, setPayloadUnAccept] = useState<any>(1);
  const onChangeUnAccept: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    const param =
      currentPageUnAccept +
      (filters.location
        ? "&location=" + encodeURIComponent(filters.location[0].toString())
        : "") +
      (filters.manage
        ? "$manage=" + encodeURIComponent(filters.manage[0].toString())
        : "") +
      (filters.nameClub ? "$club=" + filters.nameClub[0] : "");
    setPayloadUnAccept(param);
    refetchUnAccept();
  };
  const {
    data: dataMemberF12UnAccept,
    refetch: refetchUnAccept,
    isFetching: isFetchingUnAccept,
  } = useQuery(["dataF12UnAccept", payloadUnAccept], () =>
    getListMemberF12UnAccept(payloadUnAccept)
  );
  const onChangePageAccept = (value: any) => {
    setCurrentPageUnAccept(value);
    refetchUnAccept();
  };
  const [unAccept, setUnAccept] = useState([]);
  const [accept, setAccept] = useState([]);

  useEffect(() => {
    if (dataMemberF12UnAccept && dataMemberF12UnAccept?.data) {
      const unAcceptMembers = dataMemberF12UnAccept?.data.filter(
        (member: any) => member.pending === "0"
      );
      const acceptMembers = dataMemberF12Accept?.data?.filter(
        (member: any) => member.pending === "1"
      );
      setUnAccept(unAcceptMembers);
      setAccept(acceptMembers);
    }
  }, [dataMemberF12Accept, dataMemberF12UnAccept]);
  const naviagte = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const confirm = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await deleteMemberF12(payload);
    refetchUnAccept();
    refetchAccept();
    message.success("Xóa thành công");
  };
  const confirmAccept = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await updateAccount(payload);
    res.status === "success"
      ? message.success("Cập nhật thành công")
      : message.error("Cập nhật thất bại");
    refetchUnAccept();
    refetchAccept();
  };
  const cancel = (value: any) => {
    // message.error("");
  };
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
  // useEffect(() => {
  //   refetch();
  // }, [currentPageAccount,currentPageAccept, dataMemberF12?.total_products]);

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
      title: "Mã định danh",
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
              // alt="no image"
              className={styles.img}
            />
          </div>
          <div className={styles.imgWrapItem}>
            <Image
              src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_certificate}`}
              preview={true}
              // alt="no image"
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
      render: (_, record) =>{
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString()
        const id = encodeURIComponent(idEncode)
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
            {/* <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <button className={styles.btnTbDanger}>Xóa</button>
            </Popconfirm> */}
          </span>
        )
      } 
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
      title: "Mã định danh",
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
      title: "Tỉnh",
      dataIndex: "location",
      filters: filterProivce,
      onFilter: (value: any, record) => record.location.startsWith(value),
      filterMultiple: false,

      filterSearch: true,
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
      dataIndex: "club",
      filters: ListClub(),

      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
      filterMultiple: false,
      width: 200,
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
      width: 200,
      render: (_, record) => (
        <span>
          <button
            className={styles.btnView}
            onClick={() => {
              const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString()
              const id = encodeURIComponent(idEncode)
              return naviagte(`/thong-tin-tai-khoan/${id}`)}
            } 
          >
            Xem
          </button>
          <button
            className={styles.btnTb}
            onClick={() => showModalMember(record.id)}
          >
            Sửa
          </button>
          {/* <Popconfirm
            title="Xóa"
            description={`Bạn có muốn xóa ${record.name} không`}
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            {" "}
            <button className={styles.btnTbDanger}>Xóa</button>
          </Popconfirm> */}
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
      render: (value, record, index) => {
        return index + 1 + (currentPageAccount - 1) * 10;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      fixed: "left",
      width: 250,
    },
    {
      title: "Mã định danh",
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
      title: "Tỉnh",
      dataIndex: "location",
      filters: filterProivce,
      onFilter: (value: any, record) => record.location.startsWith(value),
      filterMultiple: false,
      filterSearch: true,

      width: 120,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "manage",
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
      onFilter: (value: any, record) => record.manage.indexOf(value) === 0,
      filterMultiple: false,
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
          <Image
            src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_ref}`}
            preview={true}
            className={styles.img}
          />
          <Image
            src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_certificate}`}
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
          <Popconfirm
            title="Duyệt tài khoản"
            description={`Bạn có muốn duyệt tài khoản ${record.name} không`}
            onConfirm={() => confirmAccept(record.id)}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            {" "}
            <button className={styles.btnView}>Duyệt</button>
          </Popconfirm>

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
      title: "Tỉnh",
      dataIndex: "location",
      filters: filterProivce,
      onFilter: (value: any, record) => record.location.startsWith(value),
      filterMultiple: false,
      filterSearch: true,

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
          <Image
            src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_ref}`}
            preview={true}
            className={styles.img}
          />
          <Image
            src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_certificate}`}
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
          <Popconfirm
            title="Xóa"
            description={`Bạn có muốn duyệt tài khoản ${record.name} không`}
            onConfirm={() => confirmAccept(record.id)}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            {" "}
            <button className={styles.btnView}>Duyệt</button>
          </Popconfirm>

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
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
              total={accept?.length}
              pageSize={10}
              style={{ margin: "1vh 0", float: "right" }}
            />
          </Spin>
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
                  <Button className={styles.btn}>
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
            {/* {hasSelected ? `Đã chọn ${selectedRowKeys.length} hồ sơ` : ""} */}
          </span>
          <Spin spinning={isFetchingUnAccept}>
            {" "}
            <Table
              // rowSelection={rowSelection}
              locale={customLocale}
              columns={isMobile ? columnsMobileAccept : columnsDesktopAccept}
              dataSource={unAccept}
              onChange={onChangeUnAccept}
              pagination={false}
              scroll={{
                x: "max-content",
              }}
              style={{ overflowX: "auto" }}
            />
            <Pagination
              defaultCurrent={1}
              onChange={onChangePageAccept}
              total={unAccept.length}
              pageSize={30}
              style={{ margin: "1vh 0", float: "right" }}
            />
          </Spin>
        </div>
      </div>
      <ModalAccount
        isModalOpen={isModalOpenMember}
        handleCancel={handleCancelMember}
        handleOk={handleOkMember}
        id={id}
        setId={setId}
        refetchAccountTable={refetchAccept}
      />
    </div>
  );
};

export default ManagerAccount;
