import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import { Input, Table, Button, TableProps } from "antd";
import styles from "./styles.module.scss";
import { level, managerf1, randomState, statess } from "../../until/until";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import Search from "antd/es/input/Search";
// import ModalMember from "../../components/Modal/ModalAccount";
import { useNavigate } from "react-router-dom";

interface ManagerMemberProps {}
interface DataType {
  stt:any;
  dateOfBirth:any;
  phoneNumber:string;
  id:any;
  city:string;
  key: React.Key;
  name: string;
  f1: string;
  f2: string;
  note: string;
  status: string;
  achie: string;
  level: string;
}

const data: DataType[] = [];
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    stt:`${i}`,
    dateOfBirth:"01/12/1991",
    phoneNumber:"0971123123",
    id:`${i}`,
    city:"Hà Nội",
    name: `Nguyễn Văn A`,
    f1: `f1 ${i}`,
    f2: `câu lạc bộ ${i}`,
    status: randomState(),
    note: `note content ${i}`,
    achie: `giải thưởng ${i}`,
    level: `${i}`,
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const onSearch: SearchProps["onSearch"] = (value:any, _e:any, info:any) =>
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
      title: "Cấp độ",
      dataIndex: "level",
      width: 100,
      filters: level.map((value: any) => ({ text: `${value}`, value })),
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
    },
    {
      title: "Tỉnh",
      dataIndex: "city",
      width: 150,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "f1",
      width: 300,
      filters: managerf1.map((value: any) => ({ text: `${value}`, value })),
      onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "f2",
      width: 300,
      filters: [
        {
          text: "JohnJohnyy",
          value: "Nguyen Van A",
        },
        {
          text: "Nguyễn Minh Châu",
          value: "Nguyen Van B",
        },
        {
          text: "Nguyen Van A",
          value: "Nguyen Van C",
        },
      ],
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
            className={styles.btnTb}
            onClick={() => navigate("/Profiles")}
          >
            Chỉnh sửa
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
      filters: level.map((value: any) => ({ text: `${value}`, value })),
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
    },
    {
      title: "Tỉnh",
      dataIndex: "city",
      width: 150,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "f1",
      width: 300,
      filters: managerf1.map((value: any) => ({ text: `${value}`, value })),
      onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "f2",
      width: 300,
      filters: [
        {
          text: "JohnJohnyy",
          value: "Nguyen Van A",
        },
        {
          text: "Nguyễn Minh Châu",
          value: "Nguyen Van B",
        },
        {
          text: "Nguyen Van A",
          value: "Nguyen Van C",
        },
      ],
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
      onFilter: (value: any, rec) => rec.achie.indexOf(value) === 0,
    },
    {
      // title: 'Action',
      key: "action",
      width: 200,
      render: (_, record) => (
        <span>
          <button
            className={styles.btnTb}
            onClick={() => navigate("./UpdateMember")}
          >
            Cập nhật
          </button>
          <button className={styles.btnTbDanger}>Xóa</button>
        </span>
      ),
    },
  ];
  return (
    <>
      {" "}
      <div className={styles.buttonGroup}>
        <div className={`${styles.rightContent} ${styles.responsiveContent}`}>
          <div className={styles.search}>
            <Search
              placeholder="Tìm kiếm tại đây"
              allowClear
              onSearch={onSearch}
              style={{}}
            />
          </div>
          <div className={styles.btn} onClick={() => navigate("/Profiles")}>
            <PlusOutlined className={styles.icon} />
            Thêm hội viên
          </div>
          <div className={styles.btn}>
            <DownloadOutlined className={styles.icon} />
            Xuất excel
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} bản ghi` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={isMobile ? columnsMobile : columnsDesktop}
          dataSource={data}
          scroll={{
            x: "max-content",
            y: "calc(100vh - 200px)",
          }}
          className={styles.responsiveTable}
        />
      </div>
    </>
  );
};

export default ManagerMember;
