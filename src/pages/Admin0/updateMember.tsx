import { Col, Form, Input, Menu, Row, Select, Space, Table } from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { admin } from "../../until/until";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
// import { debounce } from 'lodash';
import useDebounce from "../../hook/useDebounce";
interface UpdateMemberProps {}
interface DataType {
  id: string;
  level: string;
  achievement: string;
  time: string;
}
const { Option } = Select;

// const UpdateMember = () => {
//     const [selectedOption, setSelectedOption] = useState('');

//     const columns: ColumnsType<any> = [
//       {
//         title: 'Mã định danh',
//         dataIndex: 'id',
//         fixed: 'left',
//         width: 100,
//       },
//       {
//         title: 'Chọn',
//         dataIndex: 'Choose',
//         fixed: 'left',
//         width: 200,
//         render: (_, record) => (
//           <Space>
//             <span
//               onClick={() => handleSelectOption('level')}
//               style={{ cursor: 'pointer', color: selectedOption === 'level' ? 'blue' : 'black' }}
//             >
//               Level
//             </span>
//             <span
//               onClick={() => handleSelectOption('achievement')}
//               style={{ cursor: 'pointer', color: selectedOption === 'achievement' ? 'blue' : 'black' }}
//             >
//               Achievement
//             </span>
//           </Space>
//         ),
//       },
//       {
//         title: 'Thành tích',
//         dataIndex: 'achievement',
//         width: 130,
//         render: (_, record) => (selectedOption === 'achievement' ? record.achievement : null),
//       },
//       {
//         title: 'Cấp đai',
//         dataIndex: 'level',
//         width: 130,
//         render: (_, record) => (selectedOption === 'level' ? record.level : null),
//       },
//       {
//         title: 'Thời gian',
//         dataIndex: 'time',
//         width: 170,
//       },
//     ];

//     const handleSelectOption = (option:any) => {
//       setSelectedOption(option);
//     };

//   const navigate = useNavigate();
//   const [selectedMenuItem, setSelectedMenuItem] = useState("member"); // State to track selected menu item

//   const handleMenuItemClick = (menuItem: any) => {
//     navigate("/Admin0");
//   };
//   const items: MenuProps["items"] = [
//     {
//       label: admin,
//       key: "SubMenu",

//       icon: <CaretDownOutlined />,
//       children: [
//         {
//           type: "group",
//           style: { cursor: "pointer" },
//           label: "Đăng xuất",
//         },
//         {
//           type: "group",
//           label: "Đổi mật khẩu",
//           style: { cursor: "pointer" },
//         },
//       ],
//     },
//   ];
//   const onClick: MenuProps["onClick"] = (e) => {
//     console.log("click ", e);
//   };
//   const data: DataType[] = [
//     { id: "VCT123", level: "1", achievement: "vàng", time: "2012/12/12" },
//   ];
//   return (
//     <>
//       <div className={styles.header}>
//         <div className={styles.logo}>
//           <div>
//             <img
//               className={styles.logoImg}
//               src={require("../../assets/image/logo.png")}
//             />
//           </div>
//           <div className={styles.title}>
//             LIÊN ĐOÀN VÕ THUẬT CỔ TRUYỀN VIỆT NAM
//           </div>
//         </div>
//         <div className={styles.menu}>
//           <ul className={styles.menuContent}>
//             <li onClick={() => handleMenuItemClick("member")}>
//               Quản lý hội viên
//             </li>
//             <li onClick={() => handleMenuItemClick("account")}>
//               Quản lý tài khoản
//             </li>
//             <li>
//               <div>
//                 <Menu
//                   className={styles.subMenu}
//                   onClick={onClick}
//                   mode="horizontal"
//                   items={items}
//                 />
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className={styles.logoWrap}>
//         <div className={styles.title}>
//           <div className={styles.logoContainer}>
//             <img
//               className={styles.logoImg}
//               src={require("../../assets/image/logo.png")}
//               alt="Logo"
//             />
//           </div>
//           <div className={styles.titleText}>Cập nhật hội viên</div>
//         </div>
//       </div>
//       <div className={styles.contentWrap}>
//         {" "}
//         <Table
//           //   rowSelection={rowSelection}
//           columns={columns}
//           dataSource={data}
//           scroll={{ x: 1300 }}
//           style={{ overflowWrap: "initial" }}
//         />
//         <div className={styles.buttonWrap}>
//           <button className={styles.button}>Cập nhật</button>
//         </div>
//       </div>
//     </>
//   );
// };
const UpdateMember = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("member"); // State to track selected menu item

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

  const [choosen, setChoosen] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<any>({});
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  const handleSelectChange = (value: string) => {
    setChoosen(value);
  };

  const handleChange = () => {
    console.log("Searching for:", debouncedSearchTerm);
    // Gọi hàm hoặc thực hiện các thao tác khác sau khi nhập tất cả các trường
  };

  useEffect(() => {
    handleChange(); // Gọi hàm handleChange khi debouncedSearchTerm thay đổi
  }, [debouncedSearchTerm]);
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
        <Row gutter={16}>
          <Col span={6}>
            <Input
              placeholder="Số định danh"
              onChange={(e) => setSearchTerm({...searchTerm,id: e.target.value})}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Chọn"
              onChange={handleSelectChange}
              className={styles.input}
            >
              <Option value="level">Cấp đai</Option>
              <Option value="achie">Thành tích</Option>
            </Select>
          </Col>
          {choosen === "level" && (
            <Col span={6}>
              <Input
                placeholder="Cấp đai"
                onChange={(e) => setSearchTerm({...searchTerm,level: e.target.value})}
              />
            </Col>
          )}
          {choosen === "achie" && (
            <Col span={6}>
              <Input
                placeholder="Thành tích"
                onChange={(e) => setSearchTerm({...searchTerm,achie: e.target.value})}
              />
            </Col>
          )}
          <Col span={6}>
            <Input
              placeholder="Thời gian"
              // value={searchTerm}
              onChange={(e) => setSearchTerm({...searchTerm,time: e.target.value})}
            />
          </Col>
        </Row>
        <div className={styles.buttonWrap}>
          <button className={styles.button}>Cập nhật</button>
        </div>
      </div>
    </>
  );
};

export default UpdateMember;
