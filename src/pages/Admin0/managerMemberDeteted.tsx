import { useState } from "react";

import type { SearchProps } from "antd/es/input";
import {
  Table,
  Button,
  TableProps,
  Spin,
  Pagination,
  Popconfirm,
  message,
} from "antd";
import styles from "./styles.module.scss";
import { OnlyProvince, levelFilters } from "../../until/until";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import * as XLSX from "xlsx";

// import ModalMember from "../../components/Modal/ModalAccount";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  deleteMemberF3,
  findMember,
  getListMember,
  updateMemberF3,
} from "../../api/f0";
import moment from "moment";
import ListClub from "../../hook/listClub";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface DataType {
  stt: any;
  birthday: any;
  phone: string;
  id: any;
  idCard: number;
  address: string;
  key: React.Key;
  name: string;
  DonViQuanLy: string;
  NameClb: string;
  club: string;
  note: string;
  status: string;
  achie: string;
  level: string;
  achievements: string;
}
const customLocale = {
  filterConfirm: "OK", // Thay đổi nút xác nhận
  filterReset: "Xoá", // Thay đổi nút reset
  filterEmptyText: "No filters", // Thay đổi văn bản khi không có bộ lọc
  selectAll: "Chọn tất cả", // Thay đổi văn bản "Select All Items" ở đây
  selectInvert: "Đảo ngược", // Thay đổi văn bản khi chọn ngược
};
interface fetchingProp {
  // fetching: any;
  setFetching: (value: boolean) => void;
}
const ManagerMemberDeleted = ({ setFetching }: fetchingProp) => {
  const location = useLocation();
  const searchParam = new URLSearchParams(useLocation().search);
  const params =
    (searchParam.get("unit3")
      ? "&DonViQuanLy=" + searchParam.get("unit3")
      : "") +
    (searchParam.get("club3") ? "&club=" + searchParam.get("club3") : "") +
    (searchParam.get("address3")
      ? "&address=" + searchParam.get("address3")
      : "") +
    (searchParam.get("level3") ? "&level=" + searchParam.get("level3") : "") +
    (searchParam.get("note3") ? "&note=" + searchParam.get("note3") : "") +
    (searchParam.get("achievements3")
      ? "&achievements=" + searchParam.get("achievements3")
      : "") +
    (searchParam.get("status3") ? "&status=" + searchParam.get("status3") : "");
  //filter
  const [currentPage, setCurrentPage] = useState<any>(
    searchParam.get("pageAll3") || "1"
  );
  const status = "Chờ duyệt xóa";
  const initialPayload =
    `page=${currentPage}&status=` + encodeURIComponent(status.toString());

  const [payload, setPayload] = useState<any>(
    `page=${currentPage}&status=` +
      encodeURIComponent(status.toString()) +
      params
  );

  const [param, setParam] = useState("");

  const {
    data: allMember,
    refetch,
    isFetching,
  } = useQuery(["allMember", payload], () => getListMember(payload));
  const onChange: TableProps<DataType>["onChange"] = (pagination, filters) => {
    const param: any =
      (filters?.DonViQuanLy ? "&DonViQuanLy=" + filters?.DonViQuanLy[0] : "") +
      (filters?.club ? "$club=" + filters?.club[0] : "") +
      (filters?.address
        ? "&address=" + encodeURIComponent(filters?.address[0].toString())
        : "") +
      (filters?.level
        ? "&level=" + encodeURIComponent(filters?.level[0].toString())
        : "") +
      (filters?.note && filters?.note !== undefined
        ? "&note=" + encodeURIComponent(filters?.note[0].toString())
        : "") +
      (filters?.achievements && filters?.achievements !== undefined
        ? "&achievements=" +
          encodeURIComponent(filters?.achievements[0].toString())
        : "") +
      (filters?.status
        ? "&status=" + encodeURIComponent(filters?.status[0].toString())
        : "");
    if (filters?.DonViQuanLy)
      searchParam.set("unit3", filters?.DonViQuanLy[0].toString());
    else searchParam.delete("unit3");
    if (filters?.NameClub)
      searchParam.set("club3", filters?.NameClub[0].toString());
    else searchParam.delete("club3");
    if (filters?.address)
      searchParam.set(
        "address3",
        encodeURIComponent(filters?.address[0].toString())
      );
    else searchParam.delete("address3");
    if (filters?.level)
      searchParam.set(
        "level3",
        encodeURIComponent(filters?.level[0].toString())
      );
    else searchParam.delete("level3");
    if (filters?.note)
      searchParam.set("note3", encodeURIComponent(filters?.note[0].toString()));
    else searchParam.delete("note3");
    if (filters?.status)
      searchParam.set(
        "status3",
        encodeURIComponent(filters?.status[0].toString())
      );
    else searchParam.delete("status3");
    if (filters?.achievements)
      searchParam.set(
        "achievements3",
        encodeURIComponent(filters?.achievements[0].toString())
      );
    else searchParam.delete("achievements3");
    navigate(`${location.pathname}?${searchParam.toString()}`);
    setParam(param);
    const updatedPayload = initialPayload + param;
    setPayload(updatedPayload);
  };
  const filtersListNote = allMember?.list_note?.map(
    (item: any, index: any) => ({
      text: item.note,
      value: item.note,
    })
  );

  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const filterProivce = OnlyProvince.map((province) => ({
    text: province,
    value: province,
  }));

  const onChangePage = (value: any) => {
    searchParam.set("pageAll3", value.toString());
    setCurrentPage(value);
    const updatedPayload =
      `page=${value}&status=` + encodeURIComponent(status.toString()) + param;
    setPayload(updatedPayload);
  };
  //btn xóa
  const confirm = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await deleteMemberF3(payload);
    refetch();
    message.success("Xóa thành công");
    setFetching(false);
  };
  const confirmUpdate = async (value: any) => {
    const payload = {
      id: value,
    };
    const res = await updateMemberF3(payload);
    res.status === "success"
      ? message.success("Cập nhật thông tin thành công")
      : message.error(res?.data);
    refetch();
  };
  const cancel = (value: any) => {
    // message.error("");
  };

  //tìm kiếm
  const [dataFind, setDataFind] = useState<DataType[]>([]);
  const onSearch: SearchProps["onSearch"] = async (
    value: any,
    _e: any,
    info: any
  ) => {
    const res = await findMember(value);
    if (res.status === "success") {
      setDataFind(res.data); // Cập nhật dataFind nếu tìm thấy kết quả
    } else {
      setDataFind([]); // Đặt dataFind về rỗng nếu không tìm thấy kết quả
      message.error("Không tìm thấy kết quả");
    }
  };

  //modal
  //modal quản lý thành viên
  const columnsDesktop: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      fixed: "left",
      width: 70,
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 50;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      fixed: "left",
      width: 200,
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
      width: 170,
    },
    {
      title: "Mã định danh",
      dataIndex: "code",
      width: 160,
      render: (value, record) => {
        if (value == "null")
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
      title: "Căn cước công dân",
      dataIndex: "idcard",
      width: 170,
    },
    {
      title: "Đằng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      defaultFilteredValue: searchParam.get("level3")
        ? [decodeURIComponent(searchParam.get("level3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => record.level.indexOf(value) === 0,
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      filters: filterProivce,
      filterMultiple: false,
      defaultFilteredValue: searchParam.get("address3")
        ? [decodeURIComponent(searchParam.get("address3") as string)]
        : null,
      onFilter: (value: any, record) => record.address.indexOf(value) === 0,
      filterSearch: true,
      width: 120,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "DonViQuanLy",
      width: 300,
      filters: [
        {
          text: "Công An",
          value: "Công An",
        },
        {
          text: "Quân Đội",
          value: "Quân Đội",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Hội Võ Thuật Cổ Truyền",
          value: "Hội Võ Thuật Cổ Truyền",
        },
        {
          text: "Liên đoàn võ thuật",
          value: "Liên đoàn võ thuật",
        },
        {
          text: "Liên đoàn võ thuật cổ truyền",
          value: "Liên đoàn võ thuật cổ truyền",
        },

        {
          text: "Sở VHTT và Du lịch",
          value: "Sở VHTT và Du lịch",
        },
        {
          text: "Trung tâm huấn luyện thể thao",
          value: "Trung tâm huấn luyện thể thao",
        },
      ],
      defaultFilteredValue: searchParam.get("unit3")
        ? [decodeURIComponent(searchParam.get("unit3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => record.DonViQuanLy.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "NameClb",
      width: 300,
      filters: ListClub(),
      defaultFilteredValue: searchParam.get("NameClb3")
        ? [decodeURIComponent(searchParam.get("NameClb3") as string)]
        : null,
      filterMultiple: false,
      filterSearch: true,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,
      defaultFilteredValue: searchParam.get("note3")
        ? [decodeURIComponent(searchParam.get("note3") as string)]
        : null,
      filterSearch: true,
      filterMultiple: false,
      onFilter: (value: any, record) => record.note.indexOf(value) === 0,
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
        {
          text: "Nghỉ",
          value: "Nghỉ",
        },
      ],
      defaultFilteredValue: searchParam.get("status3")
        ? [decodeURIComponent(searchParam.get("status3") as string)]
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
      onFilter: (value: any, record) => record.status.indexOf(value) === 0,
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
      defaultFilteredValue: searchParam.get("achievements3")
        ? [decodeURIComponent(searchParam.get("achievements3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => {
        if (
          value === "Có" &&
          record.achievements &&
          record.achievements?.length > 0
        ) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (
          value === "Không" &&
          (!record.achievements || record.achievements?.length === 0)
        ) {
          return true;
        }
        return false;
      },
      render: (value, record) => {
        if (record.achievements && record.achievements?.length > 0) {
          return <>Có</>;
        } else {
          return <>Không</>;
        }
      },
    },
    {
      // title: 'Action',
      key: "action",
      fixed: "right",
      width: 200,
      render: (_, record) => {
        const idEncode = CryptoJS.AES.encrypt(record.id, secretKey).toString();
        const id = encodeURIComponent(idEncode);
        return (
          <span>
            <button
              className={styles.btnView}
              onClick={() => navigate(`/thong-tin-ho-so/${id}`)}
            >
              Xem
            </button>

            <button
              className={styles.btnTb}
              onClick={() => navigate(`/chinh-sua-ho-so/${record.id}`)}
            >
              Sửa
            </button>
            {record.status === "Chờ duyệt" ? (
              <Popconfirm
                title="Duyệt"
                description={`Bạn có muốn cập nhật ${record.name} không`}
                onConfirm={() => confirmUpdate(record.id)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                {" "}
                <button className={styles.btnView}>Duyệt</button>
              </Popconfirm>
            ) : (
              <></>
            )}

            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <button className={styles.btnTbDanger}>Xóa</button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const columnsMobile: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 70,
      render: (value, record, index) => {
        return index + 1 + (currentPage - 1) * 50;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",

      width: 200,
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
      width: 170,
    },
    {
      title: "Số định danh",
      dataIndex: "idcard",
      width: 160,
    },
    {
      title: "Đằng cấp",
      dataIndex: "level",
      width: 130,
      filters: levelFilters,
      defaultFilteredValue: searchParam.get("level3")
        ? [decodeURIComponent(searchParam.get("level3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => record.level.indexOf(value) === 0,
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      filters: filterProivce,
      onFilter: (value: any, record) => record.address.indexOf(value) === 0,
      filterSearch: true,
      width: 120,
      defaultFilteredValue: searchParam.get("address3")
        ? [decodeURIComponent(searchParam.get("address3") as string)]
        : null,
    },
    {
      title: "Đơn vị quản lý F1",
      dataIndex: "DonViQuanLy",
      width: 300,
      filters: [
        {
          text: "Công An",
          value: "Công An",
        },
        {
          text: "Quân Đội",
          value: "Quân Đội",
        },
        {
          text: "Giáo Dục",
          value: "Giáo Dục",
        },
        {
          text: "Hội Võ Thuật",
          value: "Hội Võ Thuật",
        },
        {
          text: "Hội Võ Thuật Cổ Truyền",
          value: "Hội Võ Thuật Cổ Truyền",
        },
        {
          text: "Liên đoàn võ thuật",
          value: "Liên đoàn võ thuật",
        },
        {
          text: "Liên đoàn võ thuật cổ truyền",
          value: "Liên đoàn võ thuật cổ truyền",
        },

        {
          text: "Sở VHTT và Du lịch",
          value: "Sở VHTT và Du lịch",
        },
        {
          text: "Trung tâm huấn luyện thể thao",
          value: "Trung tâm huấn luyện thể thao",
        },
      ],
      defaultFilteredValue: searchParam.get("unit3")
        ? [decodeURIComponent(searchParam.get("unit3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => record.DonViQuanLy.indexOf(value) === 0,
    },
    {
      title: "CLB trực thuộc F2",
      dataIndex: "NameClb",
      width: 300,
      filters: ListClub(),
      defaultFilteredValue: searchParam.get("NameClb3")
        ? [decodeURIComponent(searchParam.get("NameClb3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => record.club.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      filters: filtersListNote,
      defaultFilteredValue: searchParam.get("note3")
        ? [decodeURIComponent(searchParam.get("note3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => record.note.indexOf(value) === 0,
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
      defaultFilteredValue: searchParam.get("status3")
        ? [decodeURIComponent(searchParam.get("status3") as string)]
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
      onFilter: (value: any, record) => record.status.indexOf(value) === 0,
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
      defaultFilteredValue: searchParam.get("achievements3")
        ? [decodeURIComponent(searchParam.get("achievements3") as string)]
        : null,
      filterMultiple: false,
      onFilter: (value: any, record) => {
        if (value === "Có" && record.achievements?.length > 0) {
          return true; // Trả về true nếu giá trị là "Có" và có thành tích
        } else if (value === "Không" && record.achievements?.length === 0) {
          return true; // Trả về true nếu giá trị là "Không" và không có thành tích
        }
        return false; // Trả về false nếu không khớp với bất kỳ điều kiện nào
      },
      render: (value, record) => {
        if (record.achievements?.length > 0) {
          return <>Có</>;
        } else {
          return <>Không</>;
        }
      },
    },
    {
      // title: 'Action',
      key: "action",
      width: 200,
      render: (_, record) => (
        <span>
          <Button
            className={styles.btnView}
            onClick={() => {
              const idEncode = CryptoJS.AES.encrypt(
                record.id,
                secretKey
              ).toString();
              const id = encodeURIComponent(idEncode);
              return navigate(`/thong-tin-ho-so/${id}`);
            }}
          >
            Xem
          </Button>
          <Button
            className={styles.btnTb}
            onClick={() => navigate("/UpdateMember")}
          >
            Sửa
          </Button>
          {record.status === "Chờ duyệt xoá" ? (
            <Popconfirm
              title="Xóa"
              description={`Bạn có muốn xóa ${record.name} không`}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <Button className={styles.btnTbDanger}>Xóa</Button>
            </Popconfirm>
          ) : (
            <></>
          )}
        </span>
      ),
    },
  ];
  const exportToExcel = () => {
    // Dữ liệu cần xuất
    const dataToExport = allMember?.data || [];

    // Tạo một mảng dữ liệu chứa thông tin cần xuất
    let exportData: any[] = [{ "": "DANH SÁCH HỘI VIÊN" }];
    exportData = dataToExport.map((item: any, index: number) => ({
      STT: index + 1 + (currentPage - 1) * 10,
      "Họ tên": item.name,
      "Ngày sinh": moment(item.birthday).format("DD/MM/YYYY"),
      "Số điện thoại": item.phone,
      CCCD: item.idcard,
      "Đẳng cấp": item.level,
      "Địa chỉ": item.address,
      CLB: item.NameClb,
      "Ghi chú": item.note,
      "Tình trạng": item.status,
      "Thành tích": item.achievements,
    }));

    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();
    // Tạo một worksheet từ dữ liệu
    const ws = XLSX.utils.json_to_sheet(exportData);
    // Thêm worksheet vào workbook với tên "Danh sách hội viên"
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách hội viên");
    // Tạo một file Excel từ workbook
    XLSX.writeFile(wb, "Danh sách hội viên.xlsx");
  };
  return (
    <div className={styles.wrapComponent}>
      {" "}
      <div className={styles.table}>
        <div className={styles.styleRight}>
          {/* <Search
            className={styles.btn}
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

          <Button className={styles.btn} onClick={exportToExcel}>
            <DownloadOutlined className={styles.icon} />
            Xuất excel
          </Button> */}
        </div>

        <div className={styles.Text}>
          Tổng số thành viên: {allMember?.total_products}
        </div>

        <Spin spinning={isFetching}>
          <Table
            // rowSelection={rowSelection}
            columns={isMobile ? columnsMobile : columnsDesktop}
            dataSource={
              allMember?.status === "failed"
                ? []
                : dataFind?.length > 0
                ? dataFind
                : allMember?.data
            }
            locale={customLocale}
            onChange={onChange}
            scroll={{
              x: "max-content",
            }}
            className={styles.responsiveTable}
            pagination={false}
          />
          <Pagination
            defaultCurrent={1}
            onChange={onChangePage}
            total={allMember?.total_products}
            pageSize={50}
            style={{ margin: "1vh 0", float: "right" }}
            current={currentPage}
          />
        </Spin>
      </div>
    </div>
  );
};

export default ManagerMemberDeleted;
