import React, { useState } from 'react'
import Search, { SearchProps } from "antd/es/input/Search";
import styles from "./Style.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { levelFilters } from '../../until/until';
import { useQuery } from 'react-query';
import { getListMember } from '../../api/f1';

const customLocale = {
    filterConfirm: 'OK',  // Thay đổi nút xác nhận
    filterReset: 'Xoá', // Thay đổi nút reset
    filterEmptyText: 'No filters', // Thay đổi văn bản khi không có bộ lọc
    selectAll: 'Chọn tất cả', // Thay đổi văn bản "Select All Items" ở đây
    selectInvert: 'Đảo ngược', // Thay đổi văn bản khi chọn ngược
};

interface DataType_CN {
    key: React.Key;
    id: string;
    name: string;
    birthday: string;
    phone: string;
    idcard: string;
    level: string;
    club: string;
    note: string;
    status: string;
    achievements: string;
}


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
    const {data: memberList} = useQuery(['member'], () => getListMember())
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
          dataIndex: "birthday",
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone",
        },
        {
          title: "Số định danh",
          dataIndex: "idcard",
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
          dataIndex: "achievements",
        },
        {
          title: "Chi tiết",
          render: (value, record) => {
            return <button className={styles.btn} onClick={()=>navigate(`/thong-tin-ho-so/${record.id}`)}>Xem</button>;
          },
        },
      ];
  return (
    <>
        <div className={styles.tableTop}>
        <div>
            {hasSelected
            ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
            : `Tổng số ${memberList?.total_products} hồ sơ`}
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
        dataSource={memberList?.data}
        locale={customLocale}
        pagination={{
            current: currentPage1,
            onChange: onPaginationChange1,
            pageSize: 12,
            defaultCurrent: 1,
            total: memberList?.total_products,
        }}
        className={styles.table}
        />
    </>
  )
}
