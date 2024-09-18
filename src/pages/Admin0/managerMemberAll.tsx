import { useEffect, useState } from "react";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import {
  Table,
  Button,
  TableProps,
  Row,
  Col,
  Spin,
  Pagination,
  Popconfirm,
  message,
} from "antd";
import styles from "./styles.module.scss";
import { OnlyProvince, levelFilters } from "../../until/until";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import * as XLSX from "xlsx";

import Search from "antd/es/input/Search";
// import ModalMember from "../../components/Modal/ModalAccount";
import { useLocation, useNavigate } from "react-router-dom";
import { Mutation, useMutation, useQuery } from "react-query";
import {
  deleteMemberF3,
  findMember,
  getListMember,
  updateMemberF3,
} from "../../api/f0";
import moment from "moment";
import ListClub from "../../hook/listClub";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface ManagerMemberProps {}
interface DataType {
  stt: any;
  birthday: any;
  phone: string;
  id: any;
  idCard: number;
  address: string;
  key: React.Key;
  name: string;
  DonViQuanLy: string;
  NameClb: string;
  club: string;
  note: string;
  status: string;
  achie: string;
  level: string;
  achievements: string;
}

interface fetchingProp {
  fetching: any;
  setFetching: (value: boolean) => void;
}
const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};
const ManagerMemberAll = ({ fetching, setFetching }: fetchingProp) => {
  //filter
  const location = useLocation();
  const searchParam = new URLSearchParams(useLocation().search);

  const params =
    (searchParam.get("unit1")
      ? "&DonViQuanLy=" + searchParam.get("unit1")
      : "") +
    (searchParam.get("club1") ? "&club=" + searchParam.get("club1") : "") +
    (searchParam.get("address1")
      ? "&address=" + searchParam.get("address1")
      : "") +
    (searchParam.get("level1") ? "&level=" + searchParam.get("level1") : "") +
    (searchParam.get("note1") ? "&note=" + searchParam.get("note1") : "") +
    (searchParam.get("status1") ? "&status=" + searchParam.get("status1") : "");

  const [currentPage, setCurrentPage] = useState<any>(
    searchParam.get("pageAll") || "1"
  );
  const initialPayload = `page=${currentPage}`;
  const [param, setParam] = useState("");
  const [payload, setPayload] = useState<any>(`page=${currentPage}` + params);
  const {
    data: allMember,
    refetch,
    isFetching,
  } = useQuery(["allMember", payload], () => getListMember(payload));

  const onChange: TableProps<DataType>["onChange"] = (pagination, filters) => {
    const param =
      (filters.DonViQuanLy ? "&DonViQuanLy=" + filters.DonViQuanLy[0] : "") +
      (filters.NameClub ? "&club=" + filters.NameClub[0] : "") +
      (filters.address
        ? "&address=" + encodeURIComponent(filters.address[0].toString())
        : "") +
      (filters.level
        ? "&level=" + encodeURIComponent(filters.level[0].toString())
        : "") +
      (filters.note
        ? "&note=" + encodeURIComponent(filters.note[0].toString())
        : "") +
      (filters.status
        ? "&status=" + encodeURIComponent(filters.status[0].toString())
        : "");

    if (filters.DonViQuanLy)
      searchParam.set("unit1", filters.DonViQuanLy[0].toString());
    else searchParam.delete("unit1");
    if (filters.NameClub)
      searchParam.set("club1", filters.NameClub[0].toString());
    else searchParam.delete("club1");
    if (filters.address)
      searchParam.set(
        "address1",
        encodeURIComponent(filters.address[0].toString())
      );
    else searchParam.delete("address1");
    if (filters.level)
      searchParam.set(
        "level1",
        encodeURIComponent(filters.level[0].toString())
      );
    else searchParam.delete("level1");
    if (filters.note)
      searchParam.set("note1", encodeURIComponent(filters.note[0].toString()));
    else searchParam.delete("note1");
    if (filters.status)
      searchParam.set(
        "status1",
        encodeURIComponent(filters.status[0].toString())
      );
    else searchParam.delete("status1");
    navigate(`${location.pathname}?${searchParam.toString()}`);
    setParam(param);
    const updatedPayload = initialPayload + param;
    setPayload(updatedPayload);
  };

  const filtersListNote = Array.from(
    new Set(allMember?.list_note?.map((item: any) => item.note))
  ).map((note) => ({
    text: note,
    value: note,
  }));

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const filterProivce = OnlyProvince.map((province) => ({
    text: province,
    value: province,
  }));
  useEffect(() => {
    refetch();
    setFetching(true);
  }, [fetching]);

  const onChangePage = (value: any) => {
    searchParam.set("pageAll", value.toString());
    navigate(`${location.pathname}?${searchParam.toString()}`);
    setCurrentPage(value);
    const updatedPayload = `page=${value}` + param;
    setPayload(updatedPayload);
  };
  //btn xóa
  const confirm = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await deleteMemberF3(payload);
    refetch();
    message.success("Xóa thành công");
  };
  const confirmUpdate = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await updateMemberF3(payload);
    res.status === "success"
      ? message.success("Cập nhật thông tin thành công")
      : message.error(res?.data);
    refetch();
  };
  const cancel = (value: any) => {
    // message.error("");
  };

  //tìm kiếm
  const [dataFind, setDataFind] = useState<DataType[]>([]);
  const onSearch: SearchProps["onSearch"] = async (
    value: any,
    _e: any,
    info: any
  ) => {
    const res = await findMember(value);
    if (res.status === "success") {
      setDataFind(res.data); // Cập nhật dataFind nếu tìm thấy kết quả
    } else {
      setDataFind([]); // Đặt dataFind về rỗng nếu không tìm thấy kết quả
      message.error("Không tìm thấy kết quả");
    }
  };

  //modal
  //modal quản lý thành viên
  const columnsDesktop: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      fixed: "left",
      width: 70,
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 10;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      fixed: "left",
      width: 200,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      render: (value, record) => {
        return moment(value).format("DD/MM/YYYY");
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 170,
    },
    {
      title: "Mã định danh",
      dataIndex: "code",
      width: 160,
      render: (value, record) => {
        if (value == "null" || value == undefined || value == "")
          return <span style={{ color: "#8D8D8D" }}>Chưa duyệt HS</span>;
        else {
          return (
            <span style={{ color: "#046C39", fontWeight: "bold" }}>
              {value}
            </span>
          );
        }
      },
    },
    {
      title: "Căn cước công dân",
      dataIndex: "idcard",
      width: 170,
    },
    {
      title: "Đẳng cấp",
      dataIndex: "level",
      width: 270,
      filters: levelFilters,
      filterMultiple: false,
      onFilter: (value: any, record) => record.level.indexOf(value) === 0,
      // render(value, record, index) {
      //   return <span> {value.split('-').parts}</span>
      // },
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      filters: filterProivce,
      filterMultiple: false,
      onFilter: (value: any, record) => record.address.indexOf(value) === 0,
      filterSearch: true,
      width: 120,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "DonViQuanLy",
      width: 300,
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

      filterMultiple: false,
      onFilter: (value: any, record) => record.DonViQuanLy.indexOf(value) === 0,
    },

    {
      title: "CLB trực thuộc F2",
      dataIndex: "NameClb",
      width: 300,
      filters: ListClub(),
      filterMultiple: false,
      filterSearch: true,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,
      filterSearch: true,
      filterMultiple: false,
      onFilter: (value: any, record) => record.note.indexOf(value) === 0,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 140,
      filters: [
        {
          text: "Hoạt động",
          value: "Đã duyệt",
        },
        {
          text: "Chờ duyệt xóa",
          value: "Chờ duyệt xoá",
        },
        {
          text: "Chờ duyệt HS",
          value: "Chờ duyệt",
        },
        {
          text: "Nghỉ",
          value: "Nghỉ",
        },
      ],

      filterMultiple: false,
      render: (value, record) => {
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xóa</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
      onFilter: (value: any, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Thành tích",
      dataIndex: "achievements",
      width: 130,
      filters: [
        {
          text: "Có",
          value: "Có",
        },
        {
          text: "Không",
          value: "Không",
        },
      ],

      filterMultiple: false,
      onFilter: (value: any, record) => {
        if (
          value === "Có" &&
          record.achievements &&
          record.achievements?.length > 0
        ) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (
          value === "Không" &&
          (!record.achievements || record.achievements?.length === 0)
        ) {
          return true;
        }
        return false;
      },
      render: (value, record) => {
        if (record.achievements && record.achievements?.length > 0) {
          return <>Có</>;
        } else {
          return <>Không</>;
        }
      },
    },
    {
      // title: 'Action',
      key: "action",
      fixed: "right",
      width: 200,
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <span>
            <button
              className={styles.btnView}
              onClick={() => navigate(`/thong-tin-ho-so/${id}`)}
            >
              Xem
            </button>

            <button
              className={styles.btnTb}
              onClick={() => navigate(`/chinh-sua-ho-so/${record.id}`)}
            >
              Sửa
            </button>
            {record.status === "Chờ duyệt" ? (
              <Popconfirm
                title="Duyệt"
                description={`Bạn có muốn cập nhật ${record.name} không`}
                onConfirm={() => confirmUpdate(record.id)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                {" "}
                <button className={styles.btnView}>Duyệt</button>
              </Popconfirm>
            ) : (
              <></>
            )}

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
  const columnsMobile: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value, record, index) => {
        return index + 1 + (Number(currentPage) - 1) * 10;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",

      width: 200,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      render: (value, record) => {
        return moment(value).format("DD/MM/YYYY");
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 170,
    },
    {
      title: "Số định danh",
      dataIndex: "idcard",
      width: 160,
    },
    {
      title: "Đẳng cấp",
      dataIndex: "level",
      width: 270,
      filters: levelFilters,

      filterMultiple: false,
      onFilter: (value: any, record) => record.level.indexOf(value) === 0,
      render(value, record, index) {
        return <span> {value.split(" - ").parts}</span>;
      },
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      filters: filterProivce,
      onFilter: (value: any, record) => record.address.indexOf(value) === 0,
      filterSearch: true,
      width: 120,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "DonViQuanLy",
      width: 300,
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

      filterMultiple: false,
      onFilter: (value: any, record) => record.DonViQuanLy.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "NameClb",
      width: 300,
      filters: ListClub(),

      filterMultiple: false,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,

      filterMultiple: false,
      onFilter: (value: any, record) => record.note.indexOf(value) === 0,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 140,
      filters: [
        {
          text: "Hoạt động",
          value: "Đã duyệt",
        },
        {
          text: "Chờ duyệt xóa",
          value: "Chờ duyệt xoá",
        },
        {
          text: "Chờ duyệt HS",
          value: "Chờ duyệt",
        },
      ],

      filterMultiple: false,
      render: (value, record) => {
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xóa</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
      onFilter: (value: any, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Thành tích",
      dataIndex: "achievements",
      width: 130,
      filters: [
        {
          text: "Có",
          value: "Có",
        },
        {
          text: "Không",
          value: "Không",
        },
      ],

      filterMultiple: false,
      onFilter: (value: any, record) => {
        if (value === "Có" && record.achievements?.length > 0) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (value === "Không" && record.achievements?.length === 0) {
          return true; // Trả về true nếu giá trị là "Không" và không có thành tích
        }
        return false; // Trả về false nếu không khớp với bất kỳ điều kiện nào
      },
      render: (value, record) => {
        if (record.achievements?.length > 0) {
          return <>Có</>;
        } else {
          return <>Không</>;
        }
      },
    },
    {
      // title: 'Action',
      key: "action",
      width: 200,
      render: (_, record) => (
        <span>
          <Button
            className={styles.btnView}
            onClick={() => {
              const idEncode = CryptoJS.AES.encrypt(
                record.id,
                secretKey
              ).toString();
              const id = encodeURIComponent(idEncode);
              return navigate(`/thong-tin-ho-so/${id}`);
            }}
          >
            Xem
          </Button>
          <Button
            className={styles.btnTb}
            onClick={() => navigate("/UpdateMember")}
          >
            Sửa
          </Button>
          {record.status === "Chờ duyệt xoá" ? (
            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <Button className={styles.btnTbDanger}>Xóa</Button>
            </Popconfirm>
          ) : (
            <></>
          )}
        </span>
      ),
    },
  ];
  const exportToExcel = () => {
    // Dữ liệu cần xuất
    const dataToExport = allMember?.data || [];

    // Tạo một mảng dữ liệu chứa thông tin cần xuất
    let exportData: any[] = [{ "": "DANH SÁCH HỘI VIÊN" }];
    exportData = dataToExport.map((item: any, index: number) => ({
      STT: index + 1 + (Number(currentPage) - 1) * 10,
      "Họ tên": item.name,
      "Ngày sinh": moment(item.birthday).format("DD/MM/YYYY"),
      "Số điện thoại": item.phone,
      CCCD: item.idcard,
      "Đẳng cấp": item.level,
      "Địa chỉ": item.address,
      CLB: item.NameClb,
      "Ghi chú": item.note,
      "Tình trạng": item.status,
      "Thành tích": item.achievements,
    }));

    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();
    // Tạo một worksheet từ dữ liệu
    const ws = XLSX.utils.json_to_sheet(exportData);
    // Thêm worksheet vào workbook với tên "Danh sách hội viên"
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách hội viên");
    // Tạo một file Excel từ workbook
    XLSX.writeFile(wb, "Danh sách hội viên.xlsx");
  };

  return (
    <div className={styles.wrapComponent}>
      {" "}
      <div className={styles.table}>
        <Row
          gutter={16}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Col span={6} xs={24} sm={24} md={12} className={styles.search}></Col>
          <Col
            span={18}
            xs={24}
            sm={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Row gutter={20}>
              <Col
                xxl={12}
                lg={12}
                md={12}
                xs={24}
                className="gutter-row"
                style={{ marginBottom: "8px" }}
              >
                <Search
                  className={styles.btn}
                  placeholder="Tìm kiếm tại đây"
                  allowClear
                  onSearch={onSearch}
                  size="large"
                  style={{
                    maxWidth: "300px",
                    marginBottom: "4px",
                    // marginRight: "4px",
                  }}
                />
              </Col>
              <Col
                xxl={12}
                lg={12}
                md={12}
                xs={24}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
                className="gutter-row"
              >
                <Button
                  className={styles.btn}
                  onClick={() => navigate("/them-hoi-vien")}
                  style={{ marginRight: "16px" }}
                  icon={<PlusOutlined className={styles.icon} />}
                >
                  Thêm hội viên
                </Button>
                <Button
                  className={styles.btn}
                  onClick={exportToExcel}
                  icon={<DownloadOutlined className={styles.icon} />}
                >
                  Xuất excel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spin spinning={isFetching}>
          <Table
            // rowSelection={rowSelection}
            columns={isMobile ? columnsMobile : columnsDesktop}
            dataSource={
              allMember?.status === "failed"
                ? []
                : dataFind?.length > 0
                ? dataFind
                : allMember?.data
            }
            locale={customLocale}
            onChange={onChange}
            scroll={{
              x: "max-content",
            }}
            className={styles.responsiveTable}
            pagination={false}
          />
          <Pagination
            defaultCurrent={Number(currentPage)}
            onChange={onChangePage}
            total={allMember?.total_products}
            pageSize={50}
            style={{ margin: "1vh 0", float: "right" }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default ManagerMemberAll;
