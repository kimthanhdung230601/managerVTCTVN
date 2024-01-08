import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import { Input, Table, Button, TableProps } from "antd";
import styles from "./styles.module.scss";
import { level,managerf1 } from "../../until/until";

import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import Search from "antd/es/input/Search";

interface ManagerMemberProps {}
interface DataType {
  key: React.Key;
  name: string;
  f1: string;
  f2: string;
  note: string;
  state: string;
  achie: string;
  level:string
}
const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "STT",
    fixed: "left",
    width:100,
    
    
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    fixed: "left",
    width:200,
  },
  {
    title: "Ngày sinh",
    dataIndex: "Date",
    width:130,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    width:170,
  },
  {
    title: "Số định danh",
    dataIndex: "id",
    width:160,
  },
  {
    title: "Cấp độ",
    dataIndex: "level",
    width:100,
    filters: level.map((value:any) => ({ text: `${value}`, value })),
    onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
  },
  {
    title: "Tỉnh",
    dataIndex: "city",
    width:150,
  },
  {
    title: "Đơn vị quản lý F1",
    dataIndex: "f1",
    width:300,
    filters: managerf1.map((value:any)=>({text:`${value}`,value})),
    onFilter: (value: any, rec) => rec.f1.indexOf(value) === 0,
  },
  {
    title: "CLB trực thuộc F2",
    dataIndex: "f2",
    width:300,
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
    width:130,
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
    dataIndex: "state",
    width:130,
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
    onFilter: (value: any, rec) => rec.state.indexOf(value) === 0,
  },
  {
    title: "Thành tích",
    dataIndex: "achie",
    width:130,
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
    onFilter: (value: any, rec) => rec.achie.indexOf(value) === 0,
  },
  {
    // title: 'Action',
    key: "action",
    fixed: "right",
    width:160,
    render: (_, record) => (
      <span>
        <button className={styles.btnTb}>Sửa</button>
        <button className={styles.btnTbDanger}>Xóa</button>
      </span>
    ),
  },
];
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    f1: `f1 ${i}`,
    f2: `câu lạc bộ ${i}`,
    state: `trạng thái`,
    note: `note content ${i}`,
    achie: `giải thưởng ${i}`,
    level:`${i}`,
  });
}
const ManagerMember = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
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
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

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
              style={{ }}
            />
          </div>
          <div className={styles.btn}>
            <PlusOutlined className={styles.icon} />
            Thêm mới
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
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
          style={{ overflowWrap: "initial" }}
        />
      </div>
    </>
  );
};

export default ManagerMember;
