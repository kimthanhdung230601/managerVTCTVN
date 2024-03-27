import React, { useState } from 'react'
import Search, { SearchProps } from "antd/es/input/Search";
import styles from "./Style.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { message, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useLocation, useNavigate } from 'react-router';
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
    NameClb: string;
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
    const location = useLocation()
    const searchURL = new URLSearchParams(useLocation().search)
    const [currentPage1, setCurrentPage1] = useState(searchURL.get("page") || "1");
    const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
    const [selectedRowKeysCN, setSelectedRowKeysCN] = useState<React.Key[]>([]);
    const [memberList, setMemberList] = useState<DataType_CN[]>([])
    const {data: memberListData} = useQuery(['member'], () => getListMember(), {
      onSettled: (data) => {
        if(data.status === "failed"){
          message.warning(data.data)
          setTimeout(()=> {
            window.location.replace("/dang-nhap")
          }, 2000)
        } else {
          const newData = data.data.map((item: DataType_CN, index:number)=> {
              return {...item, key: index}
          })
          console.log(data)
          setMemberList(newData)
        } 
      }
    })
    const onSelectChangeCN = (newSelectedRowKeysCN: React.Key[]) => {
        setSelectedRowKeysCLB(newSelectedRowKeysCN);
    };
    const rowSelectionCN = {
    selectedRowKeysCN,
    onChange: onSelectChangeCN,
    };
    const hasSelected = selectedRowKeysCLB.length > 0;
    const onPaginationChange1 = (page: number) => {
      const newPage = searchURL.get("page")
      searchURL.set("page", page.toString());
      navigate(location.pathname + "?tab=Member"+(newPage ? `&page=${page}` : `&page=${page}`))
      setCurrentPage1(page.toString());
    };
    const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);
    const columns_CN: ColumnsType<DataType_CN> = [
        {
          title: "STT",
          dataIndex: "id",
          render: (_, __, index) => (parseInt(currentPage1, 10) - 1) * 10 + index + 1,
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
          dataIndex: "NameClb",
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
          onFilter: (value: any, record) => record.NameClb.indexOf(value) === 0,
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
              value: "Hoạt động",
            },
            {
              text: "Nghỉ",
              value: "Nghỉ",
            },
            {
              text: "Chưa duyệt hồ sơ",
              value: "Chưa duyệt hồ sơ",
            },
          ],
          onFilter: (value: any, record) => record.status.indexOf(value) === 0,
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
 console.log(memberList)
  return (
    <>
        <div className={styles.tableTop}>
        <div>
            {hasSelected
            ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
            : `Tổng số ${memberListData?.status === "success" ? memberListData?.total_products: "0"} hồ sơ`}
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
        dataSource={memberList}
        locale={customLocale}
        pagination={{
            current: parseInt(currentPage1, 10),
            onChange: onPaginationChange1,
            pageSize: 10,
            defaultCurrent: 1,
            total:memberListData?.status === "success" ? memberListData?.total_products : null,
        }}
        className={styles.table}
        />
    </>
  )
}
