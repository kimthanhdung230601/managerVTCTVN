import { Image, Pagination } from "antd";
import type { PaginationProps } from "antd";
import React, { Key, useState } from "react";
import styles from "./Style.module.scss";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface DataType_CN {
  key: React.Key;
  name: string;
  birth: string;
  phone: string;
  identity: string;
  level: string;
  club: string;
  note: string;
  status: string;
  awards: string;
}

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

const onChange: TableProps<DataType_CN>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {};
const dataCN: DataType_CN[] = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "12",
    club: "CLB Hà Nội",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
  {
    key: "2",
    name: "Nguyễn Văn B",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "11",
    club: "CLB Hải Phòng",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
  {
    key: "3",
    name: "Nguyễn Văn C",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "45",
    club: "CLB Hà Nội",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
  {
    key: "4",
    name: "Nguyễn Văn D",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "67",
    club: "CLB TP HCM",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
  {
    key: "5",
    name: "Nguyễn Văn E",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "45",
    club: "CLB Hà Nội",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
  {
    key: "6",
    name: "Nguyễn Văn G",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "24",
    club: "CLB Hải Phòng",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
  {
    key: "7",
    name: "Nguyễn Văn H",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "12",
    club: "CLB TP HCM",
    note: "Thành viên tiềm năng",
    status: "Hoạt động",
    awards: "1 giải vô địch quốc gia",
  },
];
const dataCLB: DataType_CLB[] = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    birth: "24/12/2001",
    phone: "0987838929",
    identity: "009387466534",
    level: "12",
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
    level: "12",
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
    level: "14",
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
    level: "17",
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
    level: "65",
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
    level: "23",
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
    level: "12",
    club: "CLB Hải Phòng",
    quantity_records: "12",
    status: "Hoạt động",
  },
];

export default function LevelOne() {
  document.title = "Quản lý Liên đoàn, Sở, Ngành";
  const [selectedRowKeysCLB, setSelectedRowKeysCLB] = useState<React.Key[]>([]);
  const [selectedRowKeysCN, setSelectedRowKeysCN] = useState<React.Key[]>([]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
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
      title: "Cấp độ",
      dataIndex: "level",
      filters: [
        {
          text: "12",
          value: "12",
        },
        {
          text: "13",
          value: "13",
        },
        {
          text: "14",
          value: "14",
        },
      ],
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
      dataIndex: "awards",
    },
  ];
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
      title: "Cấp độ",
      dataIndex: "level",
      filters: [
        {
          text: "12",
          value: "12",
        },
        {
          text: "13",
          value: "13",
        },
        {
          text: "14",
          value: "14",
        },
      ],
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
        return <button className={styles.btn}>Xem</button>;
      },
    },
  ];
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
  const onPaginationChange2 = (page: number) => {
    setCurrentPage2(page);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Hội viên CLB",
      children: (
        <>
          <div className={styles.tableTop}>
            <div>
              {hasSelected
                ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
                : "Tổng số 7 hồ sơ"}
            </div>
            <div className={styles.filter}>
              <span>Tìm kiếm</span>
              <input className={styles.searchInput} type="text" />
            </div>
          </div>
          <Table
            rowSelection={rowSelectionCLB}
            columns={columns_CLB}
            dataSource={dataCLB}
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
      ),
    },
    {
      key: "2",
      label: "Hội viên cá nhân",
      children: (
        <>
          <div className={styles.tableTop}>
            <div>
              {hasSelected
                ? `Đã chọn ${selectedRowKeysCLB.length} hồ sơ`
                : "Tổng số 7 hồ sơ"}
            </div>
            <div className={styles.filter}>
              <span>Tìm kiếm</span>
              <input className={styles.searchInput} type="text" />
            </div>
          </div>
          <Table
            rowSelection={rowSelectionCN}
            columns={columns_CN}
            dataSource={dataCN}
            pagination={{
              current: currentPage1,
              onChange: onPaginationChange1,
              pageSize: 5,
              defaultCurrent: 1,
              total: 7,
            }}
            className={styles.table}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/logo.png")}
            preview={false}
            className={styles.img}
          />
          <div className={styles.title}>
            Đơn vị quản lý: Liên đoàn, Sở, Ngành
          </div>
        </div>
        <div className={styles.tableWrap}>
          <Tabs defaultActiveKey="1" items={items} className={styles.tab} />
        </div>
      </div>
      <Footer />
    </>
  );
}
