import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import { Input, Table, Button, TableProps, Row, Col } from "antd";
import styles from "./styles.module.scss";
import { level, levelFilters, managerf1, province, randomState, statess } from "../../until/until";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import Search from "antd/es/input/Search";
// import ModalMember from "../../components/Modal/ModalAccount";
import { useNavigate } from "react-router-dom";

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
  f2: string;
  note: string;
  status: string;
  achie: string;
  level: string;
}
const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};
const data: DataType[] = [];
for (let i = 1; i < 46; i++) {
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
  // var level2 = ["12", "13", "14", "15"];
  var randomLevel = level[Math.floor(Math.random() * level.length)];
  var note = ["note content 1", "note content 2", "note content 3"];
  var randomNote = note[Math.floor(Math.random() * note.length)];
  var randomProvince = province[Math.floor(Math.random() * 62)];
  data.push({
    key: i,
    stt: `${i}`,
    dateOfBirth: "01/12/1991",
    phoneNumber: "0971123123",
    id: `${i}`,
    city: randomProvince,
    name: `Nguyễn Văn A`,
    f1: randomManager,
    f2: randomClub,
    status: randomState(),
    note: randomNote,
    achie: `giải thưởng ${i}`,
    level: randomLevel,
  });
}
const ManagerMember = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const filterProivce = province.map((province) => ({
    text: province,
    value: province,
  }));
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
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
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      fixed: "left",
      width: 200,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      width: 130,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 170,
    },
    {
      title: "Số định danh",
      dataIndex: "id",
      width: 160,
    },
    {
      title: "Đằng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
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
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "f2",
      width: 300,
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
      onFilter: (value: any, rec) => rec.f2.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: [
        {
          text: "note content 1",
          value: "note content 1",
        },
        {
          text: "note content 2",
          value: "note content 2",
        },
        {
          text: "note content 3",
          value: "note content 3",
        },
      ],
      onFilter: (value: any, rec) => rec.note.indexOf(value) === 0,
      filterMode: 'tree',
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 300,
      filters: [
        {
          text: "Hoạt động",
          value: "Hoạt động",
        },
        {
          text: "Chưa duyệt HS",
          value: "Chưa duyệt HS",
        },
        {
          text: "Nghỉ",
          value: "Nghỉ",
        },
      ],
      
      render: (value, record) => {
        if (value === "Hoạt động")
          return <span style={{ color: "#046C39" }}>{value}</span>;
        if (value === "Nghỉ")
          return <span style={{ color: "#8D8D8D" }}>{value}</span>;
        if (value === "Chưa duyệt HS")
          return <span style={{ color: "#F6C404" }}>{value}</span>;
      },
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.status.indexOf(value) === 0,
    },
    {
      title: "Thành tích",
      dataIndex: "achie",
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
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.achie.indexOf(value) === 0,
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
          <button className={styles.btnTbDanger}>Xóa</button>
        </span>
      ),
    },
  ];
  const columnsMobile: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",

      width: 70,
    },
    {
      title: "Họ tên",
      dataIndex: "name",

      width: 200,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      width: 130,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 170,
    },
    {
      title: "Số định danh",
      dataIndex: "id",
      width: 160,
    },
    {
      title: "Cấp độ",
      dataIndex: "level",
      width: 100,
      filters: [
        {
          text: "12",
          value: "12",
        },
        {
          text: "13",
          value: "13",
        },
        {
          text: "14",
          value: "14",
        },
        {
          text: "15",
          value: "15",
        },
      ],
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
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
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "f2",
      width: 300,
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
      onFilter: (value: any, rec) => rec.f2.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: [
        {
          text: "note content 1",
          value: "note content 1",
        },
        {
          text: "note content 2",
          value: "note content 2",
        },
        {
          text: "note content 3",
          value: "note content 3",
        },
      ],
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.note.indexOf(value) === 0,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 300,
      filters: [
        {
          text: "Hoạt động",
          value: "Hoạt động",
        },
        {
          text: "Chưa duyệt HS",
          value: "Chưa duyệt HS",
        },
        {
          text: "Nghỉ",
          value: "Nghỉ",
        },
      ],
      render: (value, record) => {
        if (value === "Hoạt động")
          return <span style={{ color: "#046C39" }}>{value}</span>;
        if (value === "Nghỉ")
          return <span style={{ color: "#8D8D8D" }}>{value}</span>;
        if (value === "Chưa duyệt HS")
          return <span style={{ color: "#F6C404" }}>{value}</span>;
      },
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.status.indexOf(value) === 0,
    },
    {
      title: "Thành tích",
      dataIndex: "achie",
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
      filterMode: 'tree',
      onFilter: (value: any, rec) => rec.achie.indexOf(value) === 0,
    },
    {
      // title: 'Action',
      key: "action",
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
            onClick={() => navigate("/UpdateMember")}
          >
            Sửa
          </button>
          <button className={styles.btnTbDanger}>Xóa</button>
        </span>
      ),
    },
  ];
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
                <Button className={styles.btn}>
                  <DownloadOutlined className={styles.icon} />
                  Xuất excel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table
          rowSelection={rowSelection}
          columns={isMobile ? columnsMobile : columnsDesktop}
          dataSource={data}
          locale={customLocale}
          scroll={{
            x: "max-content",
            y: "calc(100vh - 200px)",
          }}
          className={styles.responsiveTable}
        />
      </div>
    </div>
  );
};

export default ManagerMember;
