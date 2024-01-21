import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import { Input, Table, Button, TableProps } from "antd";
import { admin, randomState } from "../../until/until";
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

const data: DataType[] = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    detail: `detail ${i}`,
    f2: `câu lạc bộ ${i}`,
    state: randomState(),
    note: `note content ${i}`,
    achie: Math.random() < 0.5 ? "có" : "không",
  });
}
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

  //modal quản lý thành viên
  // const [isModalOpenMember, setIsModalOpenMember] = useState(false);

  // const showModalMember = () => {
  //   setIsModalOpenMember(true);
  // };

  // const handleOkMember = () => {
  //   setIsModalOpenMember(false);
  // };

  // const handleCancelMember = () => {
  //   setIsModalOpenMember(false);
  // };
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "Date",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Số định danh",
      dataIndex: "id",
    },
    {
      title: "Cấp độ",
      dataIndex: "level",
    },

    {
      title: "Ghi chú",
      dataIndex: "note",
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
      onFilter: (value: any, rec) => rec.detail.indexOf(value) === 0,
    },
    {
      title: "Tình trạng",
      dataIndex: "state",
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
    { title: "Thành tích", dataIndex: "achie" },
    {
      // title: 'Action',
      key: "action",
      render: (_, record) => (
        <div  style={{textAlign:"start"}}>
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
    },
  ];
  return (
    <>
      {" "}
      <div className={styles.buttonGroup}>
        <div className={styles.rightContent}>
          <div className={styles.search}>
            <Search
              placeholder="Tìm kiếm tại đây"
              allowClear
              onSearch={onSearch}
              style={{ width: 320 }}
            />
          </div>
          <div className={styles.btn} onClick={() => navigate("/Profiles")}>
            <PlusOutlined className={styles.icon} />
            Thêm hội viên
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
          columns={columns}
          dataSource={data}
          pagination={{
            // style: { backgroundColor: '#046C39', border: '1px solid #046C39' },
            itemRender: (current, type, originalElement) => {
              if (type === "page") {
                return (
                  <span
                    className="custom-pagination-item"
                    style={{ color: "#046C39", borderColor: "#046C39" }}
                  >
                    {originalElement}
                  </span>
                );
              }
              return originalElement;
            },
          }}
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
    </>
  );
};

export default ManagerMemberTwo;
