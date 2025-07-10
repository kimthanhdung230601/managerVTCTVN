import styles from "./styles.module.scss";
import Subcribe from "./Subcribe";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router";

export default function SubcribePageEditGiaiVoDich() {
  const navigate = useNavigate();
  const paramURL = new URLSearchParams(useLocation().search);
  const location = useLocation();
  const onChange = (key: string) => {
    paramURL.set("tab", key);
    navigate(`${location.pathname}?${paramURL.toString()}`);
  };

  const items: TabsProps["items"] = [
    {
      key: "Male",
      label: "Bảng Nam",
      children: <Subcribe sex="Nam" />,
    },
    {
      key: "Female",
      label: "Bảng Nữ",
      children: <Subcribe sex="Nữ" />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Tabs
        defaultActiveKey={paramURL.get("tab") || "Male"}
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
