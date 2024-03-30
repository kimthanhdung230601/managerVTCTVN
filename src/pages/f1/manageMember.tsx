import React, { useState } from 'react'
import Search, { SearchProps } from "antd/es/input/Search";
import styles from "./Style.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { message, Table, Spin } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useLocation, useNavigate } from 'react-router';
import { levelFilters } from '../../until/until';
import { useQuery } from 'react-query';
import { getClubs, getFilterTable, getListMember, searchInTable } from '../../api/f1';

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
    code: string;
    level: string;
    NameClb: string;
    note: string;
    status: string;
    achievements: string;
}

interface data {
  status: string,
  total_products: number,
  total_pages: number,
  index_page: number,
  data: DataType_CN[]
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
    const [param, setParam] = useState("")
    const [key, setKey] = useState("")
    const {data: clubs} = useQuery(["clubs"], () =>  getClubs())
    const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
    const [selectedRowKeysCN, setSelectedRowKeysCN] = useState<React.Key[]>([]);
    const [memberList, setMemberList] = useState<data>()
    const {data: memberListData, isFetching} = useQuery(['member'], () => getListMember(), {
      onSettled: (data) => {
        if(data.status === "failed"){
          message.warning(data.data)
          
        } else if(data.status === "success") {
      
          setMemberList(data)
        } else {
          message.error("Có lỗi xảy xa, vui lòng thử lại sau")
        }
      }
    })
    const {data: resultFilter} = useQuery(["filters", param], ()=> getFilterTable('/ManageGetMembers', param), {
      enabled: param !== "",
      onSettled: (data) => {
        if(data.status === "success") {
              setMemberList(data)
        } else if(data.status === "failed"){
          message.error("Không có dữ liệu.")
          setTimeout(()=> {
            window.location.reload()
          }, 2000)
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau")
          setTimeout(()=> {
            window.location.reload()
          }, 2000)
        }
      }
    })
    const {data: search} = useQuery(["search", key], ()=> searchInTable(key), {
      enabled: key !== "", 
      onSettled: (data) => {
        console.log("kết quả tìm kiếm", data)
        if(data.status === "success") {
          setMemberList(data)
        } else if(data.status === "failed"){
          message.error("Không có dữ liệu.")
          setTimeout(()=> {
            window.location.reload()
          }, 2000)
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau")
          setTimeout(()=> {
            window.location.reload()
          }, 2000)
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
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>{
      setKey(value)
    } 
    const columns_CN: ColumnsType<DataType_CN> = [
        {
          title: "STT",
          dataIndex: "id",
          render: (value, __, index) =><span key={value}>{(parseInt(currentPage1, 10) - 1) * 30 + index + 1}</span> ,
        },
        {
          title: "Họ tên",
          dataIndex: "name",
        },
        {
          title: "Ngày sinh",
          dataIndex: "birthday",
          render: (value,record) => <span>{value ? value.split(" ")[0] : value}</span>
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone",
        },
        {
          title: "Số định danh",
          dataIndex: "code",
        },
        {
          title: "Đẳng cấp",
          dataIndex: "level",
          filterMultiple: false,
          filters: levelFilters,
          onFilter: (value: any, record) => record.level.indexOf(value) === 0,
        },
        {
          title: "CLB trực thuộc",
          dataIndex: "NameClb",
          filterMultiple: false,
          filters: [
            {
              text: "CLB Hà Nội",
              value: "1",
            },
            {
              text: "CLB Hải Phòng",
              value: "2",
            },
            {
              text: "CLB TP HCM",
              value: "3",
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
          filterMultiple: false,
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
          onFilter: (value: any, record) => record.status.indexOf(value) === 0,
          render: (value, record) => {
            if (value === "Đã duyệt")
              return <span style={{ color: "#046C39" }}>Hoạt động</span>;
            if (value === "Nghỉ")
              return <span style={{ color: "#8D8D8D" }}>{value}</span>;
            if (value === "Chờ duyệt HS")
              return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
          },
        },
        {
          title: "Thành tích",
          dataIndex: "achievements",
          render: (value, record) => <span>{value === "Chưa xác định" ? "Không" :"Có"}</span>
        },
        {
          title: "Chi tiết",
          render: (value, record) => {
            return <button className={styles.btn} onClick={()=>navigate(`/thong-tin-ho-so/${record.id}`)}>Xem</button>;
          },
        },
      ];
      const onChange: TableProps<DataType_CN>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', filters);
        const param = '?page=' + currentPage1  + (filters.NameClb ? '&club=' + filters.NameClb[0] : "") + (filters.level ? '&level=' + encodeURIComponent(filters.level[0].toString())  : "") + (filters.status ? '&pending=' + filters.status[0] : "")
        console.log(param)
        setParam(param)
      };
  return (
    <>
      {
        isFetching ? <div className={styles.fetching}><Spin size='large'/></div>
        :
        <>
        {
          memberList?.status === "failed" ? <div className={styles.fetching}>Không có dữ liệu.</div>
          :
          <>
          <div className={styles.tableTop}>
          <div>
              {hasSelected
              ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
              : `Tổng số ${memberList?.total_products ? memberList?.total_products: "0"} hồ sơ`}
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
          onChange={onChange}
          pagination={{
              current: parseInt(currentPage1, 10),
              onChange: onPaginationChange1,
              pageSize: 30,
              defaultCurrent: 1,
              total: memberList?.status === "success"  ? memberList.total_products : 0,
          }}
          className={styles.table}
          />
          </>
        }
        </>
      }
    </>  
  )
}
