import { useEffect, useState } from "react";
import {
  AudioOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";
import {
  Input,
  Table,
  Button,
  TableProps,
  Row,
  Col,
  Spin,
  Pagination,
  Popconfirm,
  message,
} from "antd";
import styles from "./styles.module.scss";
import {
  OnlyProvince,
  level,
  levelFilters,
  managerf1,
  province,
  randomState,
  statess,
} from "../../until/until";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import * as XLSX from "xlsx";

import Search from "antd/es/input/Search";
// import ModalMember from "../../components/Modal/ModalAccount";
import { useNavigate } from "react-router-dom";
import { Mutation, useMutation, useQuery } from "react-query";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import ManagerMemberAll from "./managerMemberAll";
import ManagerMemberUnAccept from "./managerMemberUnAccept";
import ManagerMemberDeleted from "./managerMemberDeteted";

const ManagerMember = () => {
  const [fetching,setFetching] = useState(true);
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className={styles.TitleText}>Quản lý hội viên</span>,
      children: (
        <>
          <ManagerMemberAll fetching={fetching} setFetching={setFetching}/>
        </>
      ),
    },
    {
      key: "2",
      label: <span className={styles.TitleText}>Xét duyệt hồ sơ thành viên</span>,
      children: <ManagerMemberUnAccept setFetching={setFetching}/>,
    },
    {
      key: "3",
      label: <span className={styles.TitleText}>Xét duyệt xóa thành viên</span>,
      children: <ManagerMemberDeleted setFetching={setFetching}/>,
    },
  ];
  return (
    <div className={styles.wrap}>
      <Collapse defaultActiveKey={["1"]} ghost items={items} />
    </div>
  );
};

export default ManagerMember;
