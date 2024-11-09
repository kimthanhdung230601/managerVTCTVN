import React, { useState, useEffect } from "react";
import Search, { SearchProps } from "antd/es/input/Search";
import styles from "./Style.module.scss";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  message,
  Table,
  Spin,
  Popconfirm,
  Button,
  Modal,
  Pagination,
  Popover,
} from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useLocation, useNavigate } from "react-router";
import { levelFilters } from "../../until/until";
import { useMutation, useQuery } from "react-query";
import CryptoJS from "crypto-js";
import {
  deleteMember,
  getFilterTable,
  getListMember,
  searchInTable,
} from "../../api/f1";
import moment from "moment";

const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
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
  club: string;
}

interface data {
  status: string;
  total_products: number;
  total_pages: number;
  index_page: number;
  data: DataType_CN[];
}

const secretKey = process.env.REACT_APP_SECRET_KEY || "";

export default function ManageMember() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchURL = new URLSearchParams(useLocation().search);
  const params =
    (searchURL.get("level") ? "&level=" + searchURL.get("level") : "") +
    (searchURL.get("status") ? "&status=" + searchURL.get("status") : "");
  const [currentPage1, setCurrentPage1] = useState(
    searchURL.get("page") || "1"
  );
  const [param, setParam] = useState(params || "");
  const [key, setKey] = useState("");
  const [selectedRowKeysCN, setSelectedRowKeysCN] = useState<React.Key[]>([]);
  const [memberList, setMemberList] = useState<data>();
  const [open, setOpen] = useState(false);

  const { data: memberListData, isFetching } = useQuery(
    ["member", currentPage1, param],
    () => getListMember(currentPage1, param),
    {
      onSettled: (data) => {
        if (data) {
          if (data.status === "failed") {
            message.warning("Chưa có thành viên!");
            setMemberList({
              status: "",
              total_products: 0,
              total_pages: 0,
              index_page: 0,
              data: [],
            });
          } else if (data.status === "success") {
            const newData = data?.data?.map((item: any, index: number) => {
              return {
                ...item,
                key: item?.id,
              };
            });
            setMemberList({
              status: data?.status,
              total_products: data?.total_products,
              total_pages: data?.total_pages,
              index_page: data?.index_page,
              data: newData,
            });
          }
        } else {
          message.error("Có lỗi xảy xa, vui lòng thử lại sau");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
    }
  );

  const { data: search } = useQuery(["search", key], () => searchInTable(key), {
    enabled: key !== "",
    onSettled: (data) => {
      if (data?.status === "success") {
        setMemberList(data);
      } else if (data?.status === "failed") {
        message.error("Không có dữ liệu.");
        setMemberList({
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
  const deleteMemberMutation = useMutation(
    async (payload: any) => await deleteMember(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          message.success("Xoá thành công, hồ sơ đang chờ duyệt xoá!");
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        } else message.success("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
      onError: (data) => {
        message.success("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
    }
  );
  const handleDeleteMember = (id: string) => {
    deleteMemberMutation.mutate({
      data: [
        {
          id: id,
        },
      ],
    });
  };
  const handleDeleteMultiRecord = () => {
    deleteMemberMutation.mutate({
      data: selectedRowKeysCN.map((item: any, index: number) => {
        return {
          id: item,
        };
      }),
    });
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const onSelectChangeCN = (newSelectedRowKeysCN: React.Key[]) => {
    setSelectedRowKeysCN(newSelectedRowKeysCN);
  };
  const rowSelectionCN = {
    selectedRowKeysCN,
    onChange: onSelectChangeCN,
    getCheckboxProps: (record: DataType_CN) => ({
      disabled: record?.status != "Chờ duyệt",
      status: record?.status,
    }),
  };
  const hasSelected = selectedRowKeysCN.length > 0;
  const onPaginationChange1 = (page: number) => {
    searchURL.set("page", page.toString());
    navigate(`${location.pathname}?${searchURL.toString()}`);
    setCurrentPage1(page.toString());
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setKey(value);
  };
  const columns_CN: ColumnsType<DataType_CN> = [
    {
      title: "STT",
      dataIndex: "key",
      render: (value, __, index) => (
        <span key={index}>
          {(parseInt(currentPage1, 10) - 1) * 30 + index + 1}
        </span>
      ),
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
      title: "Mã định danh",
      dataIndex: "code",
      render: (value, record) => {
        if (value == null || value == "")
          return <span style={{ color: "#8D8D8D" }}>Chưa duyệt HS</span>;
        else {
          return (
            <span style={{ color: "#046C39", fontWeight: "bold" }}>
              {value}
            </span>
          );
        }
      },
    },
    {
      title: "Đẳng cấp",
      dataIndex: "level",
      filterMultiple: false,
      filters: levelFilters,
      defaultFilteredValue: searchURL.get("level")
        ? [decodeURIComponent(searchURL.get("level") as string)]
        : null,
      onFilter: (value: any, record) => record?.level.indexOf(value) === 0,
    },
    {
      title: "Đơn vị quản lý",
      dataIndex: "NameClb",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      render: (value, record, index) => {
        const displayText =
          value && value.length > 15 ? `${value.slice(0, 15)}...` : value;
        return (
          <Popover content={value} trigger="hover">
            {displayText}
          </Popover>
        );
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      filterMultiple: false,
      filters: [
        {
          text: "Hoạt động",
          value: "Đã duyệt",
        },
        {
          text: "Chờ duyệt",
          value: "Chờ duyệt",
        },
        {
          text: "Chờ duyệt xoá",
          value: "Chờ duyệt xoá",
        },
      ],
      defaultFilteredValue: searchURL.get("status")
        ? [decodeURIComponent(searchURL.get("status") as string)]
        : null,
      onFilter: (value: any, record) => record?.status.indexOf(value) === 0,
      render: (value, record) => {
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xoá</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
    },
    {
      title: "Thành tích",
      dataIndex: "achievements",
      render: (value, record) => (
        <span>{value === "Chưa xác định" ? "Không" : "Có"}</span>
      ),
    },
    {
      title: "Chi tiết",
      render: (value, record) => {
        const idEncode = CryptoJS.AES.encrypt(record?.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <>
            <Button
              className={styles.btn}
              onClick={() => navigate(`/thong-tin-ho-so/${id}`)}
            >
              Xem
            </Button>

            {record.status == "Chờ duyệt" ? (
              <Popconfirm
                title="Xác nhận xoá thành viên"
                description={`Bạn có chắc chắn muốn xoá thành viên ${record.name} không ? `}
                onConfirm={() => handleDeleteMember(record.id)}
                okText="Có"
                cancelText="Huỷ"
              >
                <Button className={`${styles.btn} ${styles.deteleBtn}`}>
                  Xoá
                </Button>
              </Popconfirm>
            ) : (
              <> </>
            )}
          </>
        );
      },
      width: 200,
    },
  ];
  const onChange: TableProps<DataType_CN>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const param =
      (filters?.NameClb && filters?.NameClb !== undefined
        ? "&club=" + filters.NameClb[0]
        : "") +
      (filters?.level
        ? "&level=" + encodeURIComponent(filters?.level[0].toString())
        : "") +
      (filters?.status
        ? "&status=" + encodeURIComponent(filters?.status[0].toString())
        : "");
    if (filters?.NameClb && filters?.NameClb !== undefined)
      searchURL.set("club", filters?.NameClb[0].toString());
    else searchURL.delete("club");
    if (filters?.level)
      searchURL.set("level", encodeURIComponent(filters?.level[0].toString()));
    else searchURL.delete("level");
    if (filters?.status)
      searchURL.set(
        "status",
        encodeURIComponent(filters?.status[0].toString())
      );
    else searchURL.delete("status");
    navigate(`${location.pathname}?${searchURL.toString()}`);
    setParam(param);
  };

  useEffect(() => {
    const keyTab = searchURL.get("tab");
    const page = searchURL.get("page");
    if (!keyTab) {
      searchURL.set("tab", "Member");
    }
    if (!page) searchURL.set("page", "1");
    navigate(`${location.pathname}?${searchURL.toString()}`);
  }, []);

  return (
    <>
      {memberList?.status === "failed" ? (
        <div className={styles.fetching}>Không có dữ liệu.</div>
      ) : (
        <>
          <div className={styles.tableTop}>
            <div>
              {hasSelected
                ? `Đã chọn ${selectedRowKeysCN.length} hồ sơ`
                : `Tổng số ${
                    memberList?.total_products
                      ? memberList?.total_products
                      : "0"
                  } hồ sơ`}
            </div>
            <div className={styles.filter}>
              <Search
                placeholder="Tìm kiếm tại đây"
                allowClear
                onSearch={onSearch}
                size="large"
                className={styles.search}
              />
              <div className={styles.btnWrap}>
                <Button
                  className={styles.addBtn}
                  onClick={() => {
                    return navigate(`/them-hoi-vien/f1`);
                  }}
                >
                  <PlusOutlined className={styles.icon} />
                  <span style={{ color: "#fff" }}>Thêm hội viên</span>
                </Button>
                <Button
                  className={`${styles.addBtn} ${styles.deleteBtn}`}
                  icon={<DeleteOutlined className={styles.icon} />}
                  onClick={showModal}
                  disabled={selectedRowKeysCN.length === 0 ? true : false}
                >
                  <span style={{ color: "#fff" }}>Xóa</span>
                </Button>
              </div>
            </div>
          </div>
          <Spin size="large" spinning={isFetching}>
            <Table
              rowSelection={rowSelectionCN}
              columns={columns_CN}
              dataSource={memberList?.data}
              locale={customLocale}
              onChange={onChange}
              pagination={false}
              className={styles.table}
            />
            <Pagination
              current={parseInt(currentPage1, 10)}
              defaultCurrent={1}
              onChange={onPaginationChange1}
              pageSize={30}
              total={
                memberList?.status === "success" ? memberList.total_products : 0
              }
            />
          </Spin>
          <Modal
            title="Xác nhận"
            open={open}
            onOk={handleDeleteMultiRecord}
            onCancel={hideModal}
            okText="Đồng ý"
            cancelText="Huỷ"
          >
            <p>Bạn có chắc chắn muốn xoá các thành viên đã chọn không?</p>
          </Modal>
        </>
      )}
    </>
  );
}
