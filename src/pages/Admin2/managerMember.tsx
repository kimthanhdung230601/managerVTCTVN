import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import { Input, Table, Button, TableProps } from "antd";
import { admin, level, levelFilters, randomState } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import Search from "antd/es/input/Search";
import ModalUpdateNote from "../../components/Modal/ModalUpdateNote";
import ModalMember from "../../components/Modal/ModalAccount";
import { useNavigate } from "react-router-dom";

interface ManagerMemberProps {}
interface DataType {
  key: React.Key;
  name: string;
  detail: string;
  f2: string;
  note: string;
  state: string;
  achie: string;
}

interface DataType {
  key: React.Key;
  name: string;
  STT: number;
  date: string;
  phoneNumber: string;
  id: string;
  level: string;
  detail: string;
  f2: string;
  note: string;
  state: string;
  achie: string;
}
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  var detail = ["detail 1", "detail 2", "detail 3"];
  var randomDetail = detail[Math.floor(Math.random() * detail.length)];
  // var level2 = ["12", "13", "14", "15"];
  var randomLevel = level[Math.floor(Math.random() * level.length)];
  var note = ["note content 1", "note content 2", "note content 3"];
  var randomNote = note[Math.floor(Math.random() * note.length)];
  data.push({
    key: i,
    STT: i + 1,
    name: "Nguyễn Văn A",
    date: "20/11/1990",
    phoneNumber: "0971056112",
    id: "VCT00123",
    level: randomLevel,
    detail: randomDetail,
    f2: `câu lạc bộ ${i}`,
    state: randomState(),
    note: randomNote,
    achie: Math.random() < 0.5 ? "có" : "không",
  });
}

const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};

const ManagerMemberTwo = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalUpdateNote = () => {
    setIsModalOpen(true);
  };

  const handleOkUpdateNote = () => {
    setIsModalOpen(false);
  };

  const handleCancelUpdateNote = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 130,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 130,
    },
    {
      title: "Số định danh",
      dataIndex: "id",
      width: 130,
    },
    {
      title: "Đẳng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
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
      title: "Chi tiết",
      dataIndex: "detail",
      width: 130,
      filters: [
        {
          text: "detail 1",
          value: "detail 1",
        },
        {
          text: "detail 2",
          value: "detail 2",
        },
        {
          text: "detail 3",
          value: "detail 3",
        },
      ],
      onFilter: (value: any, rec) => rec.detail.indexOf(value) === 0,
    },
    {
      title: "Tình trạng",
      dataIndex: "state",
      width: 140,
      filters: [
        {
          text: "Hoạt động",
          value: "Hoạt động",
        },
        {
          text: "Nghỉ",
          value: "Nghỉ",
        },
        {
          text: "Chưa duyệt HS",
          value: "Chưa duyệt HS",
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
      onFilter: (value: any, rec) => rec.state.indexOf(value) === 0,
    },
    {
      title: "Thành tích",
      dataIndex: "achie",
      width: 130,
      filters: [
        {
          text: "có",
          value: "có",
        },
        {
          text: "không",
          value: "không",
        },
      ],
      onFilter: (value: any, rec) => rec.achie.indexOf(value) === 0,
    },
    {
      // title: 'Action',

      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <button
            className={styles.btnView}
            onClick={() => navigate("/thong-tin-ho-so")}
          >
            Xem{" "}
          </button>
          <button
            className={styles.btnTb}
            onClick={() => showModalUpdateNote()}
          >
            Sửa{" "}
          </button>
          <button className={styles.btnHide}>Ẩn</button>
          {record.state == "Chưa duyệt HS" && (
            <button className={styles.btnTbDanger}>Xóa</button>
          )}
        </div>
      ),
      width: 230,
    },
  ];
  return (
    <div className={styles.wrap}>
      {" "}
      <div className={styles.buttonGroup}>
        <div className={styles.rightContent}>
          <div className={styles.search}>
            <Search
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
          </div>
          <Button
            className={styles.btn}
            onClick={() => navigate("/them-hoi-vien")}
          >
            <PlusOutlined className={styles.icon} />
            Thêm hội viên
          </Button>
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
          columns={columns}
          dataSource={data}
          locale={customLocale}
          scroll={{ x: 1300 }}
          style={{ overflowX: "auto" }}
        />
      </div>
      <ModalUpdateNote
        isModalOpen={isModalOpen}
        handleCancel={handleCancelUpdateNote}
        handleOk={handleOkUpdateNote}
      />
      {/* <ModalMember
        isModalOpen={isModalOpenMember}
        handleCancel={handleCancelMember}
        handleOk={handleOkMember}
      /> */}
    </div>
  );
};

export default ManagerMemberTwo;
