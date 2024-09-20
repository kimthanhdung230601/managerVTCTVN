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
import { useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { text } from "stream/consumers";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import { deleteMemberF12, getListMemberF12, updateAccount } from "../../api/f0";
import ListClub from "../../hook/listClub";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface ManagerAccountProps {
  refetch: () => void;
}
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
const ManagerAccountUnDepended = ({ refetch }: ManagerAccountProps) => {
  const location = useLocation();
  const searchParam = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const params =
    (searchParam.get("unitUndepend")
      ? "&manage=" + searchParam.get("unitUndepend")
      : "") +
    (searchParam.get("addressUndepend")
      ? "&location=" + searchParam.get("addressUndepend")
      : "");

  //tài khoản chưa được duyệt
  const [currentPage, setCurrentPage] = useState<any>(
    searchParam.get("pageAllUndepend") || "1"
  );
  const initialPayload = `page=${currentPage}&pending=0&permission=2`;
  const [param, setParam] = useState("");

  const [payload, setPayload] = useState<any>(`page=${currentPage}` + params);

  const {
    data,
    refetch: refetchUnAccept,
    isFetching: isFetchingUnAccept,
  } = useQuery(["dataF12UnAccept", payload], () => getListMemberF12(payload));
  const onChangeUnAccept: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    const param =
      (filters.location
        ? "&location=" + encodeURIComponent(filters.location[0].toString())
        : "") +
      (filters.manage
        ? "$manage=" + encodeURIComponent(filters.manage[0].toString())
        : "");

    if (filters.location)
      searchParam.set("unitUndepend", filters.location[0].toString());
    else searchParam.delete("unitUndepend");
    if (filters.manage)
      searchParam.set(
        "addressUndepend",
        encodeURIComponent(filters.manage[0].toString())
      );
    else searchParam.delete("addressUndepend");

    navigate(`${location.pathname}?${searchParam.toString()}`);
    setParam(param);
    const updatePayload = initialPayload + param;
    setPayload(updatePayload);
  };

  const onChangePageAccept = (value: any) => {
    setCurrentPage(value);
    const updatedPayload = `page=${value}&pending=0&permission=2` + param;
    setPayload(updatedPayload);
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const confirm = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await deleteMemberF12(payload);
    refetchUnAccept();

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
    refetch();
  };
  const cancel = (value: any) => {
    // message.error("");
  };
  //modal quản lý thành viên
  const [isModalOpenMember, setIsModalOpenMember] = useState(false);
  const [id, setId] = useState();

  const handleOkMember = () => {
    setIsModalOpenMember(false);
  };

  const handleCancelMember = () => {
    setIsModalOpenMember(false);
  };

  const columnsDesktopAccept: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      fixed: "left",
      width: 70,
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 36;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      fixed: "left",
      width: 250,
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
    // {
    //   title: "Mật khẩu",
    //   dataIndex: "password",
    //   width: 150,
    // },
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
          <Image
            src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_cmnd}`}
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
      fixed: "left",
      width: 70,
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 36;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",

      width: 250,
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
    // {
    //   title: "Mật khẩu",
    //   dataIndex: "password",
    //   width: 150,
    // },
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
          <Image
            src={`https://vocotruyen.id.vn/PHP_IMG/${record.image_cmnd}`}
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

  return (
    <div className={styles.wraps}>
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
            <div style={{ display: "flex", justifyContent: "end" }}></div>
          </Col>
        </Row>
        <div className={styles.table}>
          <span style={{ marginLeft: 8 }}>
            {/* {hasSelected ? `Đã chọn ${selectedRowKeys.length} hồ sơ` : ""} */}
          </span>{" "}
          {data && (
            <div className={styles.Text}>
              Tổng số tài khoản: {data?.total_products}
            </div>
          )}
          <Spin spinning={isFetchingUnAccept}>
            {" "}
            <Table
              // rowSelection={rowSelection}
              locale={customLocale}
              columns={isMobile ? columnsMobileAccept : columnsDesktopAccept}
              dataSource={data?.status === "success" ? data?.data : []}
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
              total={data?.total_products}
              pageSize={36}
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
        refetchAccountTable={refetchUnAccept}
      />
    </div>
  );
};

export default ManagerAccountUnDepended;
