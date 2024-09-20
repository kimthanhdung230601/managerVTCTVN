import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Col,
  Row,
  Popconfirm,
  message,
  Pagination,
  Spin,
} from "antd";
import { province } from "../../until/until";
import styles from "./styles.module.scss";
import type { TableProps } from "antd";

import { useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import { deleteMemberF12, getListMemberF12 } from "../../api/f0";
import CryptoJS from "crypto-js";
import ModalF1 from "../../components/Modal/ModalF1";
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
}

const filterProivce = province.map((province) => ({
  text: province,
  value: province,
}));
const customLocale = {
  filterConfirm: "OK",
  filterReset: "Xoá",
  filterEmptyText: "No filters",
  selectAll: "Chọn tất cả",
  selectInvert: "Đảo ngược",
};
const ManagerF1 = () => {
  const location = useLocation();
  const searchParam = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const params =
    (searchParam.get("unit2") ? "&location=" + searchParam.get("unit2") : "") +
    (searchParam.get("club2") ? "&manage=" + searchParam.get("club2") : "");

  const [currentPageAccount, setCurrentPageAccount] = useState<any>(
    searchParam.get("pageAll") || "1"
  );

  const initialPayload = `page=${currentPageAccount}&permission=1`;
  const [payloadAccept, setPayloadAccept] = useState<any>(
    `page=${currentPageAccount}` + params
  );
  const {
    data: dataMemberF12Accept,
    refetch: refetchAccept,
    isFetching: isFetchingAccept,
  } = useQuery(["dataF12Accept", payloadAccept], () =>
    getListMemberF12(payloadAccept)
  );
  const onChange: TableProps<DataType>["onChange"] = (pagination, filters) => {
    const param =
      (filters?.location
        ? "&location=" + encodeURIComponent(filters?.location[0].toString())
        : "") +
      (filters?.club ? "$club=" + filters?.club[0] : "") +
      (filters?.manage
        ? "&manage=" + encodeURIComponent(filters?.manage[0].toString())
        : "");

    if (filters?.location)
      searchParam.set("unit2", filters?.location[0].toString());
    else searchParam.delete("unit2");
    if (filters?.manage)
      searchParam.set("club2", filters?.manage[0].toString());
    else searchParam.delete("club2");

    navigate(`${location.pathname}?${searchParam.toString()}`);
    const updatePayload = initialPayload + param;
    setPayloadAccept(updatePayload);
    // refetchAccept();
  };

  const onChangePageAccount = (value: any) => {
    searchParam.set("pageAll", value.toString());
    navigate(`${location.pathname}?${searchParam.toString()}`);
    setCurrentPageAccount(value);
    refetchAccept();
  };
  //tài khoản chưa được duyệt

  const naviagte = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [isModalF1, setIsModalF1] = useState(false);
  const [idF1, setId] = useState();
  const showModalMember = (value: any) => {
    setIsModalF1(true);
    setId(value);
  };

  const handleOkMember = () => {
    setIsModalF1(false);
  };

  const handleCancelMember = () => {
    setIsModalF1(false);
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
        return index + 1 + (currentPageAccount - 1) * 37;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      fixed: "left",
      width: 210,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },

    {
      title: "Tỉnh/Thành",
      dataIndex: "location",
      filters: filterProivce,
      onFilter: (value: any, record) => record.location.startsWith(value),
      filterSearch: true,
      filterMultiple: false,
      width: 120,
      defaultFilteredValue: searchParam.get("unit2")
        ? [decodeURIComponent(searchParam.get("unit2") as string)]
        : null,
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
          text: "Quân Đội",
          value: "Quân Đội",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Hội Võ Thuật Cổ Truyền",
          value: "Hội Võ Thuật Cổ Truyền",
        },
        {
          text: "Liên đoàn võ thuật",
          value: "Liên đoàn võ thuật",
        },
        {
          text: "Liên đoàn võ thuật cổ truyền",
          value: "Liên đoàn võ thuật cổ truyền",
        },

        {
          text: "Sở VHTT và Du lịch",
          value: "Sở VHTT và Du lịch",
        },
        {
          text: "Trung tâm huấn luyện thể thao",
          value: "Trung tâm huấn luyện thể thao",
        },
      ],
      onFilter: (value: any, record) => record.manage.indexOf(value) === 0,
      filterMultiple: false,
      defaultFilteredValue: searchParam.get("club2")
        ? [decodeURIComponent(searchParam.get("club2") as string)]
        : null,
      width: 200,
    },
    {
      title: "Chức danh",
      dataIndex: "level",
      width: 200,

      filterMultiple: false,
    },
    {
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <span>
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
        return index + 1 + (currentPageAccount - 1) * 37;
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",

      width: 210,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },

    {
      title: "Tỉnh/Thành",
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
          text: "Quân Đội",
          value: "Quân Đội",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Hội Võ Thuật Cổ Truyền",
          value: "Hội Võ Thuật Cổ Truyền",
        },
        {
          text: "Liên đoàn võ thuật",
          value: "Liên đoàn võ thuật",
        },
        {
          text: "Liên đoàn võ thuật cổ truyền",
          value: "Liên đoàn võ thuật cổ truyền",
        },

        {
          text: "Sở VHTT và Du lịch",
          value: "Sở VHTT và Du lịch",
        },
        {
          text: "Trung tâm huấn luyện thể thao",
          value: "Trung tâm huấn luyện thể thao",
        },
      ],
      onFilter: (value: any, record) => record.manage.indexOf(value) === 0,
      filterMultiple: false,

      width: 200,
    },
    {
      title: "Chức danh",
      dataIndex: "level",
      width: 200,

      filterMultiple: false,
    },
    {
      key: "action",
      width: 200,
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <span>
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
        <Row gutter={40} justify="end" className={styles.buttonGroup}>
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
                onClick={() => naviagte("/dang-ky-f1")}
              >
                <PlusOutlined className={styles.icon} />
                Đăng ký tài khoản mới
              </Button>
            </div>
          </Col>
        </Row>
        {dataMemberF12Accept && (
          <div className={styles.Text}>
            Tổng số tài khoản: {dataMemberF12Accept?.total_products}
          </div>
        )}
        <div className={styles.table}>
          <Spin spinning={isFetchingAccept}>
            <Table
              columns={isMobile ? columnsMobileAccount : columnsDesktopAccount}
              dataSource={
                dataMemberF12Accept?.status === "success"
                  ? dataMemberF12Accept?.data
                  : []
              }
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
              pageSize={37}
              style={{ margin: "1vh 0", float: "right" }}
            />
          </Spin>
        </div>
      </div>
      <ModalF1
        isModalOpen={isModalF1}
        handleCancel={handleCancelMember}
        handleOk={handleOkMember}
        id={idF1}
        setId={setId}
        refetchAccountTable={refetchAccept}
      />
    </div>
  );
};

export default ManagerF1;
