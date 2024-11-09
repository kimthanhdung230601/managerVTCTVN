import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import {
  Table,
  Button,
  TableProps,
  Spin,
  Popconfirm,
  message,
  Pagination,
  Popover,
} from "antd";
import * as XLSX from "xlsx";

import { levelFilters } from "../../until/until";
import styles from "./styles.module.scss";
import type { ColumnsType } from "antd/es/table";

import Search from "antd/es/input/Search";
import ModalUpdateNote from "../../components/Modal/ModalUpdateNote";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  deleteMemberF3,
  getListMemberF3,
  getListMemberF3All,
  searchInTable,
} from "../../api/f2";
import moment from "moment";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secretKey = process.env.REACT_APP_SECRET_KEY as string;

interface ManagerMemberProps {}
interface DataType {
  key: React.Key;
  name: string;
  detail: string;
  f2: string;
  note: string;
  state: string;
  achievements: string;
  isAchie: any;
}

interface DataType {
  isAchie: any;
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
  achievements: string;
  total_products: any;
}

interface data {
  status: string;
  total_products: number;
  total_pages: number;
  index_page: number;
  data: DataType[];
}

const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};

const ManagerMemberTwo = () => {
  const searchURL = new URLSearchParams(useLocation().search);
  const location = useLocation();
  const params =
    (searchURL.get("level") ? "&level=" + searchURL.get("level") : "") +
    (searchURL.get("note") ? "&note=" + searchURL.get("note") : "") +
    (searchURL.get("status") ? "&status=" + searchURL.get("status") : "") +
    (searchURL.get("detail") ? "&detail=" + searchURL.get("detail") : "") +
    (searchURL.get("achievements")
      ? "&achievements=" + searchURL.get("achievements")
      : "");

  const club = CryptoJS.AES.decrypt(Cookies.get("club") as string, secretKey);
  const decryptedClub = club.toString(CryptoJS.enc.Utf8);
  const permission = CryptoJS.AES.decrypt(
    Cookies.get("permission") as string,
    secretKey
  );
  const decryptedPerrmission = permission.toString(CryptoJS.enc.Utf8);
  const currentURL = window.location.href;
  var urlParams = new URLSearchParams(currentURL.split("?")[1]);
  var clubValue = urlParams.get("club");
  const initialClubName =
    decryptedPerrmission == "2" ? decryptedClub : clubValue;
  const [clubName, setClubName] = useState<any>(initialClubName);
  useEffect(() => {
    if (decryptedPerrmission !== "2") {
      setClubName(clubValue);
    }
  }, [decryptedPerrmission, clubValue]);
  const [param, setParam] = useState(params || "");
  const [key, setKey] = useState("");

  const [currentPage, setCurrentPage] = useState(
    Number(searchURL.get("page")) || 1
  );

  const initialPayload = `club=${clubName}&page=${currentPage}`;
  const [payload, setPayload] = useState<any>(
    `club=${clubName}&page=${currentPage}` + param
  );

  const {
    data: listF3,
    refetch: refetchListF3,
    isFetching,
  } = useQuery(["listF3", payload], () => getListMemberF3(payload), {
    onSettled: (data) => {
      if (data.status === "success") {
        // setMemberList(data);
      } else if (data.status === "failed") {
        message.warning(data.data);
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    },
  });
  let filtersListNote: { text: any; value: any }[] = [];

  if (listF3?.status === "success") {
    const uniqueNotes = Array.from(
      new Set(listF3?.list_note.map((item: any) => item.note))
    );

    filtersListNote = uniqueNotes.map((note) => ({
      text: note,
      value: note,
    }));
  }

  const [id, setID] = useState();
  const [note, setNote] = useState("");
  const confirmDelete = async (value: any) => {
    const payload = {
      data: [{ id: value }],
    };
    const res = await deleteMemberF3(payload);
    message.success("Yêu cầu đã được gửi đến LDVTCT Việt Nam");
    refetchListF3();
  };

  const cancel = (value: any) => {};
  //tìm kiếm

  const [dataFind, setDataFind] = useState<DataType[]>([]);
  const onSearch: SearchProps["onSearch"] = async (
    value: any,
    _e: any,
    info: any
  ) => {
    const res = await searchInTable(value);
    if (res.status === "success") {
      setDataFind(res.data); // Cập nhật dataFind nếu tìm thấy kết quả
    } else {
      setDataFind([]); // Đặt dataFind về rỗng nếu không tìm thấy kết quả
      message.error("Không tìm thấy kết quả");
    }
  };

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
      width: 30,
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 30;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 230,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      width: 120,
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
      title: "Mã định danh",
      dataIndex: "code",
      width: 130,
      render: (value, record) => {
        if (value == null || value == undefined || value == "")
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
      width: 130,
      filters: levelFilters,
      filterMultiple: false,
      defaultFilteredValue: searchURL.get("level")
        ? [decodeURIComponent(searchURL.get("level") as string)]
        : null,
      onFilter: (value: any, rec) => rec.level.indexOf(value) === 0,
    },

    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,
      defaultFilteredValue: searchURL.get("note")
        ? [decodeURIComponent(searchURL.get("note") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, rec) => rec.note.indexOf(value) === 0,
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
      width: 140,
      filters: [
        {
          text: "Hoạt động",
          value: "Đã duyệt",
        },
        {
          text: "Chờ duyệt xóa",
          value: "Chờ duyệt xoá",
        },
        {
          text: "Chờ duyệt HS",
          value: "Chờ duyệt",
        },
      ],
      defaultFilteredValue: searchURL.get("status")
        ? [decodeURIComponent(searchURL.get("status") as string)]
        : null,
      filterMultiple: false,
      render: (value, record) => {
        if (value === "Đã duyệt")
          return <span style={{ color: "#046C39" }}>Hoạt động</span>;
        if (value === "Chờ duyệt xoá")
          return <span style={{ color: "#8D8D8D" }}>Chờ duyệt xóa</span>;
        if (value === "Chờ duyệt")
          return <span style={{ color: "#F6C404" }}>Chờ duyệt HS</span>;
      },
      onFilter: (value: any, rec) => rec.status.indexOf(value) === 0,
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
      filterMultiple: false,
      defaultFilteredValue: searchURL.get("achievements")
        ? [decodeURIComponent(searchURL.get("achievements") as string)]
        : null,

      onFilter: (value: any, record) => {
        if (value === "Có" && record.achievements.length > 0) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (value === "Không" && record.achievements.length === 0) {
          return true; // Trả về true nếu giá trị là "Không" và không có thành tích
        }
        return false; // Trả về false nếu không khớp với bất kỳ điều kiện nào
      },
      render: (value, record) => {
        if (value === "Có" && record.achievements.length > 0) {
          return <>Có</>;
        } else {
          return <>Không</>;
        }
      },
    },
    {
      key: "action",
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <div style={{ display: "flex" }}>
            <Button
              className={styles.btnView}
              onClick={() => navigate(`/thong-tin-ho-so/${id}`)}
            >
              Xem{" "}
            </Button>
            {decryptedPerrmission == "2" ? (
              <>
                {" "}
                <Button
                  className={styles.btnTb}
                  onClick={() => showModalUpdateNote(record?.id, record?.note)}
                >
                  Sửa{" "}
                </Button>
                {record.status == "Chờ duyệt" && (
                  <Popconfirm
                    title="Xóa"
                    description={`Bạn có muốn xóa thành viên ${record.name}`}
                    onConfirm={() => confirmDelete(record?.id)}
                    onCancel={cancel}
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button danger className={styles.btnTbDanger}>
                      Xóa
                    </Button>
                  </Popconfirm>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
      width: 170,
    },
  ];

  const onChangePage = (value: any) => {
    searchURL.set("page", value.toString());
    navigate(`${location.pathname}?${searchURL.toString()}`);
    setCurrentPage(value);
    const updatedPayload = `club=${clubName}&page=${value}` + param;
    setPayload(updatedPayload);
  };
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const param =
      // "?club" +
      // (decryptedPerrmission == "2" ? clubName : clubName) +
      (filters?.level
        ? "&level=" + encodeURIComponent(filters?.level[0].toString())
        : "") +
      (filters?.note && filters?.note !== undefined
        ? "&note=" + encodeURIComponent(filters?.note[0].toString())
        : "") +
      (filters?.detail
        ? "&detail=" + encodeURIComponent(filters?.detail[0].toString())
        : "") +
      (filters?.status
        ? "&status=" + encodeURIComponent(filters?.status[0].toString())
        : "") +
      (filters?.achievements
        ? "&achievements=" +
          encodeURIComponent(filters?.achievements[0].toString())
        : "");
    if (filters?.level)
      searchURL.set("level", encodeURIComponent(filters?.level[0].toString()));
    else searchURL.delete("level");
    if (filters?.note && filters?.note !== undefined)
      searchURL.set("note", encodeURIComponent(filters?.note[0].toString()));
    else searchURL.delete("note");
    if (filters?.detail !== undefined && filters?.detail)
      searchURL.set(
        "detail",
        encodeURIComponent(filters?.detail[0].toString())
      );
    else searchURL.delete("detail");
    if (filters?.status)
      searchURL.set(
        "status",
        encodeURIComponent(filters?.status[0].toString())
      );
    else searchURL.delete("status");
    if (filters?.achievements)
      searchURL.set("achievements", filters?.achievements[0].toString());
    else searchURL.delete("achievements");
    navigate(`${location.pathname}?${searchURL.toString()}`);
    setParam(param);
    const updatedPayload = initialPayload + param;
    setPayload(updatedPayload);
  };
  const handleExportExcel = async () => {
    const res = await getListMemberF3All();
    // Dữ liệu cần xuất
    const dataToExport = res?.data || [];
    console.log("res", res);

    // Tạo một mảng dữ liệu chứa thông tin cần xuất
    let exportData: any[] = [{ "": "DANH SÁCH HỘI VIÊN" }];
    exportData = dataToExport.map((item: any, index: number) => ({
      STT: index + 1 + (Number(currentPage) - 1) * 10,
      "Họ tên": item.name,
      "Ngày sinh": moment(item.birthday).format("DD/MM/YYYY"),
      "Số điện thoại": item.phone,
      CCCD: item.idcard,
      "Đẳng cấp": item.level,
      "": "",
      "Mã định danh": item.code,
      CLB: item.NameClb,
      "Ghi chú": item.note,
      "Tình trạng": item.status,
      "Thành tích": item.achievements,
      "Địa chỉ": item.address,
    }));

    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();
    // Tạo một worksheet từ dữ liệu
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Thiết lập độ rộng cho mỗi cột
    ws["!cols"] = [
      { wpx: 50 }, // STT
      { wpx: 200 }, // Họ tên
      { wpx: 150 }, // Ngày sinh
      { wpx: 150 }, // Số điện thoại
      { wpx: 150 }, // CCCD
      { wpx: 100 }, // Đẳng cấp
      { wpx: 150 }, // Địa chỉ
      { wpx: 350 }, // CLB
      { wpx: 150 }, // Mã định danh
      { wpx: 150 }, // Ghi chú
      { wpx: 150 }, // Tình trạng
      { wpx: 150 }, // Thành tích
    ];

    // Thêm worksheet vào workbook với tên "Danh sách hội viên"
    XLSX.utils.book_append_sheet(wb, ws, "DanhSachHoiVien");
    // Tạo một file Excel từ workbook
    XLSX.writeFile(wb, "DanhSachHoiVien.xlsx");
  };

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
          <Button className={styles.btn} onClick={handleExportExcel}>
            Xuất file excel
          </Button>
        </div>
      </div>
      <div className={styles.table}>
        <div style={{ marginBottom: 16 }}></div>
        <Spin spinning={isFetching}>
          <Table
            columns={columns}
            dataSource={
              listF3?.status === "failed"
                ? []
                : dataFind?.length > 0
                ? dataFind
                : listF3?.data
            }
            locale={customLocale}
            scroll={{ x: 1300 }}
            style={{ overflowX: "auto" }}
            pagination={false}
            onChange={onChange}
          />
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            onChange={onChangePage}
            total={listF3?.total_products}
            pageSize={30}
            style={{ margin: "1vh 0", float: "right" }}
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
    </div>
  );
};

export default ManagerMemberTwo;
