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
  Tabs,
} from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import type { MenuProps, TableProps, TabsProps } from "antd";
import { admin } from "../../until/until";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
// import { debounce } from 'lodash';
import useDebounce from "../../hook/useDebounce";
import Column from "antd/es/table/Column";
import { useQuery } from "react-query";
import { addNewData, getList } from "../../api/example";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ManagerMember from "./managerMember";
import ManagerAccount from "./managerAccount";
import Cookies from "js-cookie";
interface UpdateMemberProps {}
interface DataType {
  id?: string;
  level?: string;
  name?: string;
  achie?: string;
  timeAchie?: string;
  timeLevel?: string;
  prize?: string;
}
const { Option } = Select;
const UpdateMember = () => {
  const navigate = useNavigate();
  // const handleMenuItemClick = (menuItem: any) => {
  //   navigate("/Admin0");
  // };

  const onClick = (e: any) => {
    // console.log("click ", e);
  };
  const [choosen, setChoosen] = useState<string>("level");
  const [searchTerm, setSearchTerm] = useState<any>({});
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [tableData, setTableData] = useState<any>();
  const handleSelectChange = (value: string) => {
    setChoosen(value);
  };
  //tab
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Quản lý hội viên",
      children: <></>,
    },
    {
      key: "2",
      label: "Quản lý tài khoản",
      children: <></>,
    },
  ];
  const handleClick = (key: string) => {
    navigate(`/Admin0/${key}`);
  };
  // const [table, setTable] = useState<boolean>(false);
  const [newData, setNewData] = useState<any>([]);
  const [displayDivA, setDisplayDivA] = useState<boolean>(false);
  const [displayDivB, setDisplayDivB] = useState<boolean>(false);
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(true);

  const {
    data: members,
    isLoading,
    refetch,
    isFetching,
  } = useQuery(["listProduct"], () => getList());
  const newData1: DataType[] = [];
  const handleChange = () => {
    //data

    // Kiểm tra xem debouncedSearchTerm có chứa thuộc tính level không
    setDisplayDivA(debouncedSearchTerm.hasOwnProperty("level"));
    // Kiểm tra xem debouncedSearchTerm có chứa thuộc tính achie không
    setDisplayDivB(debouncedSearchTerm.hasOwnProperty("achie"));
    // Kiểm tra nếu debouncedSearchTerm không phải là một đối tượng rỗng
    // setTable(Object.keys(debouncedSearchTerm).length !== 0);
    newData1.push({
      id: debouncedSearchTerm.id || "",
      name: debouncedSearchTerm.name || "",
      level: debouncedSearchTerm.level || "",
      achie: debouncedSearchTerm.achie || "",
      prize: debouncedSearchTerm.prize || "",
      timeAchie: debouncedSearchTerm.timeAchie || "",
      timeLevel: debouncedSearchTerm.timeLevel || "",
    });
    // console.log(newData1);
    setNewData(newData1);
    if (Object.keys(debouncedSearchTerm).length !== 0)
      setIsConfirmButtonEnabled(false);
    // console.log("setIsConfirmButtonEnabled: ", isConfirmButtonEnabled);
  };
  const deleteData = () => {
    newData1.pop();
    setNewData(newData1);
    setIsConfirmButtonEnabled(true);
  };
  const update = async () => {
    try {
      // console.log("newData:", newData);
      // console.log("setIsConfirmButtonEnabled: ", isConfirmButtonEnabled);
      alert("Thêm thành công");
      // const res = addNewData(newData);
    } catch (error) {
      console.log(error);
    }
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
    { title: "Thời gian", dataIndex: "timeLevel", key: "timeLevel" },
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
    { title: "Thời gian", dataIndex: "timeAchie", key: "timeAchie" },
  ];

  return (
    <>

      <div className={styles.contentWrapMemner} style={{margin:"3vh"}}>
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
              <>
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
                <Col span={6} xs={24} sm={12} md={6}>
                  <Form.Item label="Thời gian">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        setSearchTerm({
                          ...searchTerm,
                          timeLevel: value?.format("DD/MM/YYYY"),
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            {choosen === "achie" && (
              <>
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
                  </Form.Item>
                </Col>
                <Col span={6} xs={24} sm={12} md={6}>
                  <Form.Item label="Thời gian">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        setSearchTerm({
                          ...searchTerm,
                          timeAchie: value?.format("DD/MM/YYYY"),
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </Form>
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={12}>
              {/* <Table columns={columnsLevel} dataSource={tableData} /> */}
              {displayDivA && (
                <div>
                  xxxx|{debouncedSearchTerm.level}|
                  {debouncedSearchTerm.timeLevel}
                  <Table
                    columns={columnsLevel}
                    // loading={isLoading}
                    dataSource={[...members, ...newData]}
                    style={{overflowX:"auto"}}
                  />
                </div>
              )}
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              {/* <Table columns={columnsAchie} dataSource={members} /> */}
              {displayDivB && (
                <div>
                  xxxx|{debouncedSearchTerm.achie}|
                  {debouncedSearchTerm.timeAchie}
                  <Table
                    columns={columnsAchie}
                    loading={isLoading}
                    dataSource={[...members, ...newData]}
                    style={{overflowX:"auto"}}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={`${styles.button} ${
              isConfirmButtonEnabled ? styles.disabledButton : ""
            }`}
            onClick={() => update()}
            disabled={isConfirmButtonEnabled}
          >
            Xác nhận
          </button>
          <button
            className={`${styles.deleteBtn}`}
            onClick={() => deleteData()}
          >
            Hoàn tác
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateMember;
