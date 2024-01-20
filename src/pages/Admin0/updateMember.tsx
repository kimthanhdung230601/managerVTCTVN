import {
  Col,
  DatePicker,
  Form,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import type { MenuProps, TableProps } from "antd";
import { admin } from "../../until/until";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
// import { debounce } from 'lodash';
import useDebounce from "../../hook/useDebounce";
import Column from "antd/es/table/Column";
interface UpdateMemberProps {}
interface DataType {
  id?: string;
  level?: string;
  name?: string;
  achie?: string;
  time?: string;
  prize?: string;
}
const { Option } = Select;
const UpdateMember = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("member");
  const handleMenuItemClick = (menuItem: any) => {
    navigate("/Admin0");
  };

  const items = [
    {
      label: "admin",
      key: "SubMenu",
      icon: <CaretDownOutlined />,
      children: [
        { type: "group", style: { cursor: "pointer" }, label: "Đăng xuất" },
        { type: "group", label: "Đổi mật khẩu", style: { cursor: "pointer" } },
      ],
    },
  ];

  const onClick = (e: any) => {
    console.log("click ", e);
  };
  const [choosen, setChoosen] = useState<string>("level");
  const [searchTerm, setSearchTerm] = useState<any>({});
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const handleSelectChange = (value: string) => {
    setChoosen(value);
  };
  const [table, setTable] = useState<boolean>(false);
  const [displayDivA, setDisplayDivA] = useState<boolean>(false);
  const [displayDivB, setDisplayDivB] = useState<boolean>(false);
  const handleChange = () => {
    console.log("Searching for:", debouncedSearchTerm);
    const newData: DataType[] = [];
    // Kiểm tra xem debouncedSearchTerm có chứa thuộc tính level không
    setDisplayDivA(debouncedSearchTerm.hasOwnProperty("level"));
    // Kiểm tra xem debouncedSearchTerm có chứa thuộc tính achie không
    setDisplayDivB(debouncedSearchTerm.hasOwnProperty("achie"));
    // Kiểm tra nếu debouncedSearchTerm không phải là một đối tượng rỗng
    setTable(Object.keys(debouncedSearchTerm).length !== 0);

    newData.push({
      id: debouncedSearchTerm.id || "",
      name: debouncedSearchTerm.name || "",
      level: debouncedSearchTerm.level || "",
      achie: debouncedSearchTerm.achie || "",
      prize: debouncedSearchTerm.prize || "",
      time: debouncedSearchTerm.time || "",
    });

    setTableData(newData);
    console.log("table", table);
  };
  useEffect(() => {
    handleChange(); // Gọi hàm handleChange khi debouncedSearchTerm thay đổi
  }, [debouncedSearchTerm]);
  //table level
  const columnsLevel: TableProps<DataType>["columns"] = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Cấp đai",
      dataIndex: "level",
      key: "level",
    },
    { title: "Thời gian", dataIndex: "time", key: "time" },
  ];
  //table achie
  const columnsAchie: TableProps<DataType>["columns"] = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thành tích",
      dataIndex: "achie",
      key: "achie",
    },
    { title: "Giải", dataIndex: "prize", key: "prize" },
    { title: "Thời gian", dataIndex: "time", key: "time" },
  ];
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div>
            <img
              className={styles.logoImg}
              src={require("../../assets/image/logo.png")}
            />
          </div>
          <div className={styles.title}>
            LIÊN ĐOÀN VÕ THUẬT CỔ TRUYỀN VIỆT NAM
          </div>
        </div>
        <div className={styles.menu}>
          <ul className={styles.menuContent}>
            <li onClick={() => handleMenuItemClick("member")}>
              Quản lý hội viên
            </li>
            <li onClick={() => handleMenuItemClick("account")}>
              Quản lý tài khoản
            </li>
            <li>
              <div>
                <Menu
                  className={styles.subMenu}
                  onClick={onClick}
                  mode="horizontal"
                  items={items}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImg}
              src={require("../../assets/image/logo.png")}
              alt="Logo"
            />
          </div>
          <div className={styles.titleText}>Cập nhật hội viên</div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={6} xs={24} sm={12} md={6}>
              {" "}
              <Form.Item label="Số định danh">
                <Input
                  placeholder="Số định danh"
                  disabled={true}
                  onChange={(e) =>
                    setSearchTerm({ ...searchTerm, id: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6} xs={24} sm={12} md={6}>
              <Form.Item label="Lựa chọn">
                <Select
                  // placeholder="Lựa chọn"
                  onChange={handleSelectChange}
                  className={styles.input}
                  value={choosen}
                  style={{ width: "100%" }}
                >
                  <Option value="level">Cấp đai</Option>
                  <Option value="achie">Thành tích</Option>
                </Select>
              </Form.Item>
            </Col>
            {choosen === "level" && (
              <Col span={6} xs={24} sm={12} md={6}>
                <Form.Item label="Cấp đai">
                  <Input
                    placeholder="Cấp đai"
                    onChange={(e) =>
                      setSearchTerm({ ...searchTerm, level: e.target.value })
                    }
                  />
                </Form.Item>
              </Col>
            )}
            {choosen === "achie" && (
              <Col span={6} xs={24} sm={12} md={6}>
                <Form.Item label="Thành tích">
                  <Input
                    placeholder="Thành tích"
                    onChange={(e) =>
                      setSearchTerm({ ...searchTerm, achie: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Giải">
                  <Select
                    // placeholder="Lựa chọn"
                    onChange={(value) =>
                      setSearchTerm({ ...searchTerm, prize: value })
                    }
                    className={styles.input}
                    // value={choosen}
                    style={{ width: "100%" }}
                  >
                    <Option value="Giải trẻ">Giải trẻ</Option>
                    <Option value="Vô địch">Vô Địch</Option>
                    <Option value="Giải cúp">Giải cup</Option>
                    <Option value="Đại hội TDTT toàn quốc">
                      Đại Hội TDTT toàn quốc
                    </Option>
                  </Select>
                  {/* <Input
                    placeholder="prize"
                    onChange={(e) =>
                      setSearchTerm({ ...searchTerm, prize: e.target.value })
                    }
                  /> */}
                </Form.Item>
              </Col>
            )}
            <Col span={6} xs={24} sm={12} md={6}>
              <Form.Item label="Thời gian">
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setSearchTerm({
                      ...searchTerm,
                      time: value?.format("DD/MM/YYYY"),
                    })
                  }
                />
                {/* <Input
                  placeholder="Thời gian"
                  // value={searchTerm}
                  
                /> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div>
          <Row gutter={16}>
            <Col span={12} sm={24} md={24}  >
              {displayDivA && (
                <div>
                  xxxx|{debouncedSearchTerm.level}|{debouncedSearchTerm.time}
                  <Table columns={columnsLevel} dataSource={tableData} />
                </div>
              )}
            </Col>
            <Col span={12}  sm={24} md={24} >
              {displayDivB && (
                <div>
                  xxxx|{debouncedSearchTerm.achie}|{debouncedSearchTerm.time}
                  <Table columns={columnsAchie} dataSource={tableData} />
                </div>
              )}
            </Col>
          </Row>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.button}>Xác nhận</button>
        </div>
      </div>
    </>
  );
};

export default UpdateMember;
