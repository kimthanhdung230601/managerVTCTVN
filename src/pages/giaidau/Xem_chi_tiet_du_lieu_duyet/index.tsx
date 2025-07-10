import { Tabs, TabsProps } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useLocation, useNavigate, useParams } from "react-router";
import TabAnagonism from "./TabAnagonism";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import SubcribePageEdit from "../../SubcribeEdit";
import Header from "../../../components/Header";

const AcceptListMemberDetail = () => {
  const param = useParams();
  const idClub = Number(param.id);

  // const navigate = useNavigate();
  // const paramURL = new URLSearchParams(useLocation().search);
  // const location = useLocation();
  // const onChange = (key: string) => {
  //   paramURL.set("tab", key);
  //   navigate(`${location.pathname}?${paramURL.toString()}`);
  // };
  // const items: TabsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "THI ĐẤU QUYỀN THUẬT",
  //     children: <SubcribePageEdit />,
  //   },
  //   {
  //     key: "2",
  //     label: "THI ĐẤU ĐỐI KHÁNG",
  //     children: <TabAnagonism idClub={idClub} />,
  //   },
  // ];
  return (
    <>
      {/* <Header /> */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "120px",
          flexDirection: "column",
          marginBottom: "36px",
        }}
      >
        <Logo />
      </div> */}
      {/* <Tabs
        defaultActiveKey={paramURL.get("tab") || "0"}
        items={items}
        onChange={onChange}
        centered
      /> */}
      <TabAnagonism idClub={idClub} />
    </>
  );
};

export default AcceptListMemberDetail;
