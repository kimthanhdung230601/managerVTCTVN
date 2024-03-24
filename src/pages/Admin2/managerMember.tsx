import { useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import {
  Input,
  Table,
  Button,
  TableProps,
  Spin,
  Popconfirm,
  message,
} from "antd";
import { admin, level, levelFilters, randomState } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import Search from "antd/es/input/Search";
import ModalUpdateNote from "../../components/Modal/ModalUpdateNote";
import ModalMember from "../../components/Modal/ModalAccount";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deleteMemberF3, getListMemberF3 } from "../../api/f2";
import moment from "moment";

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

interface DataType {
  key: React.Key;
  name: string;
  STT: number;
  date: string;
  phoneNumber: string;
  id: string;
  level: string;
  detail: string;
  f2: string;
  note: string;
  status: string;
  achie: string;
  total_products: any;
}

const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};

const ManagerMemberTwo = () => {
  const {
    data: listF3,
    refetch: refetchListF3,
    isFetching,
  } = useQuery("listF3", () => getListMemberF3());
  const [id, setID] = useState();
  const [note, setNote] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const deleteMember = async (id: any) => {};
  const confirm = async (value: any) => {
    // console.log(e);
    const payload = {
      id: id,
    };
    const res = await deleteMemberF3(payload);
    message.success("Yêu câù đã được gửi đến LDVTCT Việt Nam");
    refetchListF3();
  };

  const cancel = (value: any) => {};
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalUpdateNote = (id: any, note: string) => {
    setID(id);
    setNote(note);
    setIsModalOpen(true);
  };

  const handleOkUpdateNote = () => {
    setIsModalOpen(false);
  };

  const handleCancelUpdateNote = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "STT",
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 10;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 130,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      render: (value, record) => {
        return moment(value).format("DD/MM/YYYY");
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 130,
    },
    {
      title: "Số định danh",
      dataIndex: "idcard",
      width: 130,
    },
    {
      title: "Đẳng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      filterMode: "tree",
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
    },

    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
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
      width: 130,
      filters: [
        {
          text: "detail 1",
          value: "detail 1",
        },
        {
          text: "detail 2",
          value: "detail 2",
        },
        {
          text: "detail 3",
          value: "detail 3",
        },
      ],
      onFilter: (value: any, rec) => rec.detail.indexOf(value) === 0,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 140,
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
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xóa</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
      onFilter: (value: any, rec) => rec.state.indexOf(value) === 0,
    },
    {
      title: "Thành tích",
      dataIndex: "achievements",
      width: 130,
      filters: [
        {
          text: "Có",
          value: "Có",
        },
        {
          text: "Không",
          value: "Không",
        },
      ],
      onFilter: (value: any, rec) => rec.achie.indexOf(value) === 0,
      render: (value, record) => {
        if (value.length > 0) return <>Có</>;
        else return <>Không</>;
      },
    },
    {
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <button
            className={styles.btnView}
            onClick={() => navigate("/thong-tin-ho-so")}
          >
            Xem{" "}
          </button>
          <button
            className={styles.btnTb}
            onClick={() => showModalUpdateNote(record?.id, record?.note)}
          >
            Sửa{" "}
          </button>
          {/* <button className={styles.btnHide}>Ẩn</button> */}
          {record.status == "Chờ duyệt" && (
            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa thành viên ${record.name}`}
              onConfirm={() => confirm(record?.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              <Button danger className={styles.btnTbDanger}>
                Xóa
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
      width: 230,
    },
  ];
  return (
    <div className={styles.wrap}>
      {" "}
      <div className={styles.buttonGroup}>
        <div className={styles.rightContent}>
          <div className={styles.search}>
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
          <Button
            className={styles.btn}
            onClick={() => navigate("/them-hoi-vien")}
          >
            <PlusOutlined className={styles.icon} />
            Thêm hội viên
          </Button>
        </div>
      </div>
      <div className={styles.table}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} bản ghi` : ""}
          </span>
        </div>
        <Spin spinning={isFetching}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={listF3?.data}
            locale={customLocale}
            scroll={{ x: 1300 }}
            style={{ overflowX: "auto" }}
            pagination={{
              total: listF3?.total_products,
              defaultPageSize: 10,
              defaultCurrent: 1,
            }}
          />
        </Spin>
      </div>
      <ModalUpdateNote
        isModalOpen={isModalOpen}
        handleCancel={handleCancelUpdateNote}
        handleOk={handleOkUpdateNote}
        id={id}
        note={note}
        refetch={refetchListF3}
      />
      {/* <ModalMember
        isModalOpen={isModalOpenMember}
        handleCancel={handleCancelMember}
        handleOk={handleOkMember}
      /> */}
    </div>
  );
};

export default ManagerMemberTwo;
