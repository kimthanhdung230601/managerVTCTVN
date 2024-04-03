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
const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface ManagerMemberProps {}
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

const ManagerMember = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className={styles.TitleText}>Quản lý hội viên</span>,
      children: (
        <>
          <ManagerMemberAll />
        </>
      ),
    },
    {
      key: "2",
      label: <span className={styles.TitleText}>Xét duyệt hồ sơ thành viên</span>,
      children: <ManagerMemberUnAccept />,
    },
    {
      key: "3",
      label: <span className={styles.TitleText}>Xét duyệt xóa thành viên</span>,
      children: <ManagerMemberDeleted />,
    },
  ];
  return (
    <div className={styles.wrap}>
      <Collapse defaultActiveKey={["1"]} ghost items={items} />
    </div>
  );
};

export default ManagerMember;
