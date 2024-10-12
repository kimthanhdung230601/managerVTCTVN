import { Tabs, TabsProps } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useLocation, useNavigate, useParams } from "react-router";
// import TabAnagonism from "./TabAnagonism";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import SubcribePageEdit from "../../Subcribe Edit";
import Header from "../../../components/Header";
import TabAnagonism from "../Xem_chi_tiet_du_lieu_duyet/TabAnagonism";
import TournamentRegistration from "../Dang_ky_giai_dau_doi_khang";

const ListClubsRes = () => {
  const param = useParams();
  const idClub = Number(param.id);

  const navigate = useNavigate();
  const paramURL = new URLSearchParams(useLocation().search);
  const location = useLocation();
  const onChange = (key: string) => {
    paramURL.set("tab", key);
    navigate(`${location.pathname}?${paramURL.toString()}`);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "THI ĐẤU QUYỀN THUẬT",
      children: <SubcribePageEdit />,
    },
    {
      key: "2",
      label: "THI ĐẤU ĐỐI KHÁNG",
      children: <TournamentRegistration />,
    },
  ];
  return (
    <>
      <Header />
      <div
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
      </div>
      <Tabs
        defaultActiveKey={paramURL.get("tab") || "0"}
        items={items}
        onChange={onChange}
        centered
      />
    </>
  );
};

export default ListClubsRes;
