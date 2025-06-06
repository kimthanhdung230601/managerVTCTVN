import Search, { SearchProps } from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import { message, Table, Spin, Pagination } from "antd";
import React, { useState } from "react";
import styles from "./Style.module.scss";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useEffect } from "react";

import {
  getClubs,
  getFilterTable,
  getListClub,
  getListMember,
  searchInTable,
} from "../../api/f1";
import type { TableColumnsType, TableProps } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
interface DataType_CLB {
  key: React.Key;
  name: string;
  birthday: string;
  phone: string;
  code: string;
  level: string;
  member_count: string;
  pending: string;
  NameClb: string;
  club: string;
  id: string;
}

interface data {
  status: string;
  total_products: number;
  total_pages: number;
  index_page: number;
  data: DataType_CLB[];
}

const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};

export default function ManageClub() {
  const searchURL = new URLSearchParams(useLocation().search);
  const params =
    (searchURL.get("club") ? "&club=" + searchURL.get("club") : "") +
    (searchURL.get("pending") ? "&pending=" + searchURL.get("pending") : "");
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState("");
  const [currentPage2, setCurrentPage2] = useState(
    searchURL.get("page") || "1"
  );
  const [param, setParam] = useState(params || "");
  const { data: clubs } = useQuery(["clubs"], () => getClubs());
  const [clubList, setClubList] = useState<data>();
  const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
  const { data: clubListData, isFetching } = useQuery(
    ["club", currentPage2, param],
    () => getListClub(currentPage2, param),
    {
      onSettled: (data) => {
        if (data?.status === "failed") {
          message.warning("Chưa có thành viên!");
          setClubList({
            status: "",
            total_products: 0,
            total_pages: 0,
            index_page: 0,
            data: [],
          });
        } else if (data?.status === "success") {
          setClubList(data);
        } else {
          message.error("Có lỗi xảy xa, vui lòng thử lại sau");
        }
      },
    }
  );
  const { data: search } = useQuery(["search", key], () => searchInTable(key), {
    enabled: key !== "",
    onSettled: (data) => {
      if (data?.status === "success") {
        setClubList(data);
      } else if (data?.status === "failed") {
        message.error("Không có dữ liệu.");
        setClubList({
          status: "",
          total_products: 0,
          total_pages: 0,
          index_page: 0,
          data: [],
        });
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
  });
  const onSelectChangeCLB = (newSelectedRowKeysCLB: React.Key[]) => {
    setSelectedRowKeysCLB(newSelectedRowKeysCLB);
  };
  const rowSelectionCLB = {
    selectedRowKeysCLB,
    onChange: onSelectChangeCLB,
  };
  const hasSelected = selectedRowKeysCLB.length > 0;
  const onPaginationChange2 = (page: number) => {
    searchURL.set("page", page.toString());
    navigate(`${location.pathname}?${searchURL.toString()}`);
    setCurrentPage2(page.toString());
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setKey(value);
    // setCurrentPage2("1")
  };
  const columns_CLB: ColumnsType<DataType_CLB> = [
    {
      title: "STT",
      dataIndex: "key",
      render: (_, __, index) =>
        (parseInt(currentPage2, 10) - 1) * 30 + index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      render: (value, record) => (
        <span>{moment(value).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "CCCD",
      dataIndex: "idcard",
    },
    {
      title: "CLB trực thuộc",
      dataIndex: "NameClb",
      filterMultiple: false,
      defaultFilteredValue: searchURL.get("club")
        ? [decodeURIComponent(searchURL.get("club") as string)]
        : null,
      filters:
        clubs?.status === "success"
          ? clubs?.data.map((item: any, index: number) => {
              return {
                text: item?.NameClb,
                value: item?.club,
              };
            })
          : null,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    {
      title: "Số lượng hồ sơ",
      dataIndex: "member_count",
    },
    {
      title: "Tình trạng",
      dataIndex: "pending",
      filterMultiple: false,
      defaultFilteredValue: searchURL.get("pending")
        ? [decodeURIComponent(searchURL.get("pending") as string)]
        : null,
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
        return (
          record.pending != "0" && (
            <button
              className={styles.btn}
              onClick={() =>
                navigate(
                  `/quan-ly-don-vi?club=${record.club}&id=${record.club}`
                )
              }
            >
              Xem
            </button>
          )
        );
      },
    },
  ];
  const onChange: TableProps<DataType_CLB>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const param =
      (filters?.NameClb && filters?.NameClb !== undefined
        ? "&club=" + filters?.NameClb[0]
        : "") + (filters?.pending ? "&pending=" + filters?.pending[0] : "");

    if (filters?.NameClb && filters?.NameClb !== undefined)
      searchURL.set("club", filters?.NameClb[0].toString());
    else searchURL.delete("club");
    if (filters?.pending)
      searchURL.set("pending", filters?.pending[0].toString());
    else searchURL.delete("pending");
    navigate(`${location.pathname}?${searchURL.toString()}`);
    setParam(param);
  };

  useEffect(() => {
    const keyTab = searchURL.get("tab");
    const page = searchURL.get("page");
    if (!keyTab) {
      searchURL.set("tab", "CLB");
    }
    if (!page) searchURL.set("page", "1");
    navigate(`${location.pathname}?${searchURL.toString()}`);
  }, []);

  return (
    <>
      {clubList?.status === "failed" ? (
        <div className={styles.fetching}>Không có dữ liệu.</div>
      ) : (
        <>
          <div className={styles.tableTop}>
            <div>
              Tổng số{" "}
              {clubList?.total_products ? clubList?.total_products : "0"} hồ sơ
            </div>
            <div className={styles.filter}>
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
          </div>
          <Spin size="large" spinning={isFetching}>
            <Table
              // rowSelection={rowSelectionCLB}
              columns={columns_CLB}
              dataSource={clubList?.data}
              locale={customLocale}
              onChange={onChange}
              className={styles.table}
              pagination={false}
            />
            <Pagination
              current={parseInt(currentPage2, 10)}
              onChange={onPaginationChange2}
              pageSize={30}
              defaultCurrent={1}
              total={clubList?.total_products ? clubList?.total_products : 0}
            />
          </Spin>
        </>
      )}
    </>
  );
}
