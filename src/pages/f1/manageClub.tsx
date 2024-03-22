import Search, { SearchProps } from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { Table } from "antd";
import React, { useState } from 'react'
import styles from "./Style.module.scss";
import { useNavigate } from 'react-router';
import { levelFilters } from '../../until/until';
interface DataType_CLB {
    key: React.Key;
    name: string;
    birth: string;
    phone: string;
    identity: string;
    level: string;
    club: string;
    quantity_records: string;
    status: string;
}

const customLocale = {
    filterConfirm: 'OK',  // Thay đổi nút xác nhận
    filterReset: 'Xoá', // Thay đổi nút reset
    filterEmptyText: 'No filters', // Thay đổi văn bản khi không có bộ lọc
    selectAll: 'Chọn tất cả', // Thay đổi văn bản "Select All Items" ở đây
    selectInvert: 'Đảo ngược', // Thay đổi văn bản khi chọn ngược
};

const dataCLB: DataType_CLB[] = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "HLV 4 đẳng",
      club: "CLB Hà Nội",
      quantity_records: "12",
      status: "Hoạt động",
    },
    {
      key: "2",
      name: "Nguyễn Văn B",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "HLV 4 đẳng",
      club: "CLB Hải Phòng",
      quantity_records: "12",
      status: "Hoạt động",
    },
    {
      key: "3",
      name: "Nguyễn Văn C",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 12",
      club: "CLB TP HCM",
      quantity_records: "12",
      status: "Hoạt động",
    },
    {
      key: "4",
      name: "Nguyễn Văn D",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 4",
      club: "CLB Hải Phòng",
      quantity_records: "12",
      status: "Hoạt động",
    },
    {
      key: "5",
      name: "Nguyễn Văn E",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 8",
      club: "CLB Hà Nội",
      quantity_records: "12",
      status: "Hoạt động",
    },
    {
      key: "6",
      name: "Nguyễn Văn G",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "Võ sinh cấp 7",
      club: "CLB Hà Nội",
      quantity_records: "12",
      status: "Hoạt động",
    },
    {
      key: "7",
      name: "Nguyễn Văn H",
      birth: "24/12/2001",
      phone: "0987838929",
      identity: "009387466534",
      level: "HLV 2 đẳng",
      club: "CLB Hải Phòng",
      quantity_records: "12",
      status: "Hoạt động",
    },
  ];
  
export default function ManageClub() {
    const navigate = useNavigate();
    const [currentPage2, setCurrentPage2] = useState(1);
    const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
    const onSelectChangeCN = (newSelectedRowKeysCN: React.Key[]) => {
        setSelectedRowKeysCLB(newSelectedRowKeysCN);
    };
    const onSelectChangeCLB = (newSelectedRowKeysCLB: React.Key[]) => {
        setSelectedRowKeysCLB(newSelectedRowKeysCLB);
    };
    const rowSelectionCLB = {
        selectedRowKeysCLB,
        onChange: onSelectChangeCLB,
    };
    const hasSelected = selectedRowKeysCLB.length > 0;
    const onPaginationChange2 = (page: number) => {
        setCurrentPage2(page);
    };
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>console.log(info?.source, value);
    const columns_CLB: ColumnsType<DataType_CLB> = [
        {
          title: "STT",
          dataIndex: "key",
          render: (_, __, index) => (currentPage2 - 1) * 5 + index + 1,
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
          filters: levelFilters,
          filterMode: 'tree',
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
          title: "Số lượng hồ sơ",
          dataIndex: "quantity_records",
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
          title: "Chi tiết",
          render: (value, record) => {
            return <button className={styles.btn} onClick={()=>navigate("/Admin2")}>Xem</button>;
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
        
        </div>
        </div>
        <Table
        rowSelection={rowSelectionCLB}
        columns={columns_CLB}
        dataSource={dataCLB}
        locale={customLocale}
        pagination={{
            current: currentPage2,
            onChange: onPaginationChange2,
            pageSize: 5,
            defaultCurrent: 1,
            total: 7,
        }}
        className={styles.table}
        />{" "}
    </>
  )
}
