import { Tabs, TabsProps } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useParams } from "react-router";
import TabAnagonism from "./TabAnagonism";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";

const AcceptListMemberDetail = () => {
  const param = useParams();
  const idClub = Number(param.id);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
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
      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng">
          <TabAnagonism idClub={idClub} />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <TabAnagonism idClub={idClub} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default AcceptListMemberDetail;
