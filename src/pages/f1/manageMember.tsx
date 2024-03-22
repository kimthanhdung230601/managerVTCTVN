import React, { useState } from 'react'
import Search, { SearchProps } from "antd/es/input/Search";
import styles from "./Style.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { levelFilters } from '../../until/until';

const customLocale = {
    filterConfirm: 'OK',  // Thay đổi nút xác nhận
    filterReset: 'Xoá', // Thay đổi nút reset
    filterEmptyText: 'No filters', // Thay đổi văn bản khi không có bộ lọc
    selectAll: 'Chọn tất cả', // Thay đổi văn bản "Select All Items" ở đây
    selectInvert: 'Đảo ngược', // Thay đổi văn bản khi chọn ngược
};

interface DataType_CN {
    key: React.Key;
    name: string;
    birth: string;
    phone: string;
    identity: string;
    level: string;
    club: string;
    note: string;
    status: string;
    awards: string;
}

const dataCN: DataType_CN[] = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 8",
      club: "CLB Hà Nội",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
    {
      key: "2",
      name: "Nguyễn Văn B",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 11",
      club: "CLB Hải Phòng",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
    {
      key: "3",
      name: "Nguyễn Văn C",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 12",
      club: "HLV 1 đẳng",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
    {
      key: "4",
      name: "Nguyễn Văn D",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "HLV 3 đẳng",
      club: "CLB TP HCM",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
    {
      key: "5",
      name: "Nguyễn Văn E",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 10",
      club: "CLB Hà Nội",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
    {
      key: "6",
      name: "Nguyễn Văn G",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 1",
      club: "CLB Hải Phòng",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
    {
      key: "7",
      name: "Nguyễn Văn H",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 12",
      club: "CLB TP HCM",
      note: "Thành viên tiềm năng",
      status: "Hoạt động",
      awards: "1 giải vô địch quốc gia",
    },
];

const onChange: TableProps<DataType_CN>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
) => {};
  
export default function ManageMember() {
    const navigate = useNavigate();
    const [currentPage1, setCurrentPage1] = useState(1);
    const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
    const [selectedRowKeysCN, setSelectedRowKeysCN] = useState<React.Key[]>([]);
    const onSelectChangeCN = (newSelectedRowKeysCN: React.Key[]) => {
        setSelectedRowKeysCLB(newSelectedRowKeysCN);
    };
    const onSelectChangeCLB = (newSelectedRowKeysCLB: React.Key[]) => {
    setSelectedRowKeysCLB(newSelectedRowKeysCLB);
    };
    const rowSelectionCN = {
    selectedRowKeysCN,
    onChange: onSelectChangeCN,
    };
    const rowSelectionCLB = {
    selectedRowKeysCLB,
    onChange: onSelectChangeCLB,
    };
    const hasSelected = selectedRowKeysCLB.length > 0;
    const onPaginationChange1 = (page: number) => {
        setCurrentPage1(page);
    };
    const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);
    const columns_CN: ColumnsType<DataType_CN> = [
        {
          title: "STT",
          dataIndex: "key",
          render: (_, __, index) => (currentPage1 - 1) * 5 + index + 1,
        },
        {
          title: "Họ tên",
          dataIndex: "name",
        },
        {
          title: "Ngày sinh",
          dataIndex: "birth",
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone",
        },
        {
          title: "Số định danh",
          dataIndex: "identity",
        },
        {
          title: "Đẳng cấp",
          dataIndex: "level",
          filterMode: 'tree',
          filters: levelFilters,
          onFilter: (value: any, record) => record.level.indexOf(value) === 0,
        },
        {
          title: "CLB trực thuộc",
          dataIndex: "club",
          filters: [
            {
              text: "CLB Hà Nội",
              value: "CLB Hà Nội",
            },
            {
              text: "CLB Hải Phòng",
              value: "CLB Hải Phòng",
            },
            {
              text: "CLB TP HCM",
              value: "CLB TP HCM",
            },
          ],
          onFilter: (value: any, record) => record.club.indexOf(value) === 0,
        },
        {
          title: "Ghi chú",
          dataIndex: "note",
        },
        {
          title: "Tình trạng",
          dataIndex: "status",
          filters: [
            {
              text: "Hoạt động",
              value: "active",
            },
            {
              text: "Nghỉ",
              value: "off",
            },
            {
              text: "Chưa duyệt hồ sơ",
              value: "notApproved",
            },
          ],
          //  onFilter: (value: string, record) => record.status.indexOf(value) === 0,
          render: (value, record) => {
            if (value === "Hoạt động")
              return <span style={{ color: "#046C39" }}>{value}</span>;
            if (value === "Nghỉ")
              return <span style={{ color: "#8D8D8D" }}>{value}</span>;
            if (value === "Chưa duyệt hồ sơ")
              return <span style={{ color: "#F6C404" }}>{value}</span>;
          },
        },
        {
          title: "Thành tích",
          dataIndex: "awards",
        },
        {
          title: "Chi tiết",
          render: (value, record) => {
            return <button className={styles.btn} onClick={()=>navigate("/thong-tin-ho-so")}>Xem</button>;
          },
        },
      ];
  return (
    <>
        <div className={styles.tableTop}>
        <div>
            {hasSelected
            ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
            : "Tổng số 7 hồ sơ"}
        </div>
        <div className={styles.filter}>
        <Search
            placeholder="Tìm kiếm tại đây"
            allowClear
            onSearch={onSearch}
            size="large"
            style={{maxWidth: "300px", marginBottom: "4px", marginRight: "8px"}}
        />
            <div className={styles.addBtn} onClick={() => navigate("/them-hoi-vien")}>
            <PlusOutlined className={styles.icon} />
            Thêm hội viên
            </div>
        </div>
        </div>
        <Table
        rowSelection={rowSelectionCN}
        columns={columns_CN}
        dataSource={dataCN}
        locale={customLocale}
        pagination={{
            current: currentPage1,
            onChange: onPaginationChange1,
            pageSize: 5,
            defaultCurrent: 1,
            total: 7,
        }}
        className={styles.table}
        />
    </>
  )
}
