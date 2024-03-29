import { useEffect, useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import {
  Input,
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
import {
  level,
  levelFilters,
  managerf1,
  province,
  randomState,
  statess,
} from "../../until/until";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import * as XLSX from "xlsx";

import Search from "antd/es/input/Search";
// import ModalMember from "../../components/Modal/ModalAccount";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deleteMemberF3, getListMember, updateMemberF3 } from "../../api/f0";
import moment from "moment";
import ListClub from "../../hook/listClub";

interface ManagerMemberProps {}
interface DataType {
  stt: any;
  dateOfBirth: any;
  phoneNumber: string;
  id: any;
  city: string;
  key: React.Key;
  name: string;
  f1: string;
  NameClb: string;
  note: string;
  status: string;
  achie: string;
  level: string;
  achievements: string;
}
const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};
const ManagerMember = () => {
  const {
    data: allMember,
    refetch,
    isFetching,
  } = useQuery("allMember", () => getListMember());
  const filtersListNote = allMember?.list_note.map((item: any, index: any) => ({
    text: item.note,
    value: item.note,
  }));
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;

  const filterProivce = province.map((province) => ({
    text: province,
    value: province,
  }));
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //page

  useEffect(() => {
    refetch();
  }, [currentPage, allMember?.total_products]);
  const onChangePage = (value: any) => {
    setCurrentPage(value);
    refetch();
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
    console.log(value);
    // message.error("");
  };
  const onSearch: SearchProps["onSearch"] = (value: any, _e: any, info: any) =>
    console.log(info?.source, value);
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
      title: "Số định danh",
      dataIndex: "idcard",
      width: 160,
    },
    {
      title: "Đằng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      filters: filterProivce,
      onFilter: (value: any, record) => record.city.startsWith(value),
      filterSearch: true,
      width: 120,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "f1",
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
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "NameClb",
      width: 300,
      filters: ListClub(),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, rec) => rec.NameClb.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, rec) => rec.note.indexOf(value) === 0,
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
      filterMode: "tree",
      render: (value, record) => {
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xóa</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
      onFilter: (value: any, rec) => rec.status.indexOf(value) === 0,
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
      filterMode: "tree",
      onFilter: (value: any, record) => {
        if (
          value === "Có" &&
          record.achievements &&
          record.achievements.length > 0
        ) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (
          value === "Không" &&
          (!record.achievements || record.achievements.length === 0)
        ) {
          return true;
        }
        return false;
      },
      render: (value, record) => {
        if (record.achievements && record.achievements.length > 0) {
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
      render: (_, record) => (
        <span>
          <button
            className={styles.btnView}
            onClick={() => navigate("/thong-tin-ho-so")}
          >
            Xem
          </button>

          <button
            className={styles.btnTb}
            onClick={() => navigate("/them-hoi-vien")}
          >
            Sửa
          </button>
          {record.status === "Chờ duyệt" ? (
            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
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
              <button className={styles.btnTbDanger}>Xóa</button>
            </Popconfirm>
          ) : (
            <></>
          )}
        </span>
      ),
    },
  ];
  const columnsMobile: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 10;
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
      title: "Đằng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      filters: filterProivce,
      onFilter: (value: any, record) => record.city.startsWith(value),
      filterSearch: true,
      width: 120,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "f1",
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
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "name_club",
      width: 300,
      filters: ListClub(),
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.NameClb.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.note.indexOf(value) === 0,
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
      filterMode: "tree",
      render: (value, record) => {
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xóa</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
      onFilter: (value: any, rec) => rec.status.indexOf(value) === 0,
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
      filterMode: "tree",
      onFilter: (value: any, record) => {
        if (value === "Có" && record.achievements.length > 0) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (value === "Không" && record.achievements.length === 0) {
          return true; // Trả về true nếu giá trị là "Không" và không có thành tích
        }
        return false; // Trả về false nếu không khớp với bất kỳ điều kiện nào
      },
      render: (value, record) => {
        if (record.achievements.length > 0) {
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
            onClick={() => navigate("/thong-tin-ho-so")}
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
      STT: index + 1 + (currentPage - 1) * 10,
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
    <div className={styles.wrap}>
      {" "}
      <div className={styles.table}>
        <Row
          gutter={16}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Col span={6} xs={24} sm={24} md={12} className={styles.search}>
            <span>
              {hasSelected
                ? `Đã chọn ${selectedRowKeys.length} bản ghi`
                : "Tổng số 10 hồ sơ"}
            </span>
          </Col>
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
                    marginRight: "8px",
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
                  style={{ marginRight: "8px", minWidth: "148px" }}
                >
                  <PlusOutlined className={styles.icon} />
                  Thêm hội viên
                </Button>
                <Button className={styles.btn} onClick={exportToExcel}>
                  <DownloadOutlined className={styles.icon} />
                  Xuất excel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spin spinning={isFetching}>
          <Table
            rowSelection={rowSelection}
            columns={isMobile ? columnsMobile : columnsDesktop}
            dataSource={allMember?.data}
            locale={customLocale}
            scroll={{
              x: "max-content",
            }}
            className={styles.responsiveTable}
            pagination={false}
          />
          <Pagination
            defaultCurrent={1}
            onChange={onChangePage}
            total={allMember?.total_products}
            pageSize={10}
            style={{ margin: "1vh 0", float: "right" }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default ManagerMember;
