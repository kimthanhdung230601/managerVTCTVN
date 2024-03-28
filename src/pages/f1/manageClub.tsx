import Search, { SearchProps } from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { message, Table, Spin } from "antd";
import React, { useState } from 'react'
import styles from "./Style.module.scss";
import { useLocation, useNavigate } from 'react-router';
import { levelFilters } from '../../until/until';
import { useQuery } from 'react-query';
import { getListClub, getListMember } from '../../api/f1';
interface DataType_CLB {
    key: React.Key;
    name: string;
    birth: string;
    phone: string;
    idcard: string;
    level: string;
    member_count: string;
    pending: string;
    NameClb: string;
    club: string;
}

const customLocale = {
    filterConfirm: 'OK',  // Thay đổi nút xác nhận
    filterReset: 'Xoá', // Thay đổi nút reset
    filterEmptyText: 'No filters', // Thay đổi văn bản khi không có bộ lọc
    selectAll: 'Chọn tất cả', // Thay đổi văn bản "Select All Items" ở đây
    selectInvert: 'Đảo ngược', // Thay đổi văn bản khi chọn ngược
};

 
export default function ManageClub() {
    const navigate = useNavigate();
    const location = useLocation()
    const searchURL = new URLSearchParams(useLocation().search)
    const [currentPage2, setCurrentPage2] = useState(searchURL.get("page") || "1");
    const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
    const [clubList, setClubList] = useState<DataType_CLB[]>([])
    const {data: clubListData, isFetching} = useQuery(['club'], () => getListClub(), {
      onSettled: (data) => {
        if(data.status === "failed"){
          message.warning(data.data)
          setTimeout(()=> {
            window.location.replace("/dang-nhap")
          }, 2000)
        } else {
          const newData = data.data.map((item: DataType_CLB, index:number)=> {
              return {...item, key: index}
          })
          setClubList(newData)
        } 
      }
    })
    const onSelectChangeCLB = (newSelectedRowKeysCLB: React.Key[]) => {
        setSelectedRowKeysCLB(newSelectedRowKeysCLB);
    };
    const rowSelectionCLB = {
        selectedRowKeysCLB,
        onChange: onSelectChangeCLB,
    };
    const hasSelected = selectedRowKeysCLB.length > 0;
    const onPaginationChange2 = (page: number) => {
      const newPage = searchURL.get("page")
      searchURL.set("page", page.toString());
      navigate(location.pathname + "?tab=CLB"+(newPage ? `&page=${page}` : `&page=${page}`))
      setCurrentPage2(page.toString());

    };
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>console.log(info?.source, value);
    const columns_CLB: ColumnsType<DataType_CLB> = [
        {
          title: "STT",
          dataIndex: "key",
          render: (_, __, index) => (parseInt(currentPage2, 10) - 1) * 10 + index + 1,
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
          dataIndex: "idcard",
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
          title: "Số lượng hồ sơ",
          dataIndex: "member_count",
        },
        {
          title: "Tình trạng",
          dataIndex: "pending",
          filters: [
            {
              text: "Hoạt động",
              value: "1",
            },
            
            {
              text: "Chờ duyệt HS",
              value: "0",
            },
          ],
          onFilter: (value: any, record) => record.pending.indexOf(value) === 0,
          render: (value, record) => {
            if (value === "1")
              return <span style={{ color: "#046C39" }}>Hoạt động</span>;
            // if (value === "Nghỉ")
            //   return <span style={{ color: "#8D8D8D" }}>{value}</span>;
            if (value === "0")
              return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
          },
        },
        {
          title: "Chi tiết",
          render: (value, record) => {
            return <button className={styles.btn} onClick={()=>navigate(`/Admin2?club=${record.club}`)}>Xem</button>;
          },
        },
      ];
    
  return (
    <>
    {
        isFetching ? <div className={styles.fetching}><Spin size='large' /></div>
        :
        <>
        <div className={styles.tableTop}>
        <div>
            {hasSelected
            ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
            : `Tổng số ${clubListData?.status === "success" ? clubListData?.total_products: "0"} hồ sơ`}
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
        dataSource={clubList}
        locale={customLocale}
        pagination={{
            current: parseInt(currentPage2, 10),
            onChange: onPaginationChange2,
            pageSize: 10,
            defaultCurrent: 1,
            total:clubListData?.status === "success" ? clubListData?.total_products : null,
        }}
        className={styles.table}
        />{" "}
         </>
      }
    </>
  )
}
