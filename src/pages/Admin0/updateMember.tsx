import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Spin, Table } from "antd";
import type { GetRef } from "antd";
import styles from "./styles.module.scss";
import UpdateMemberTableAchie from "./updateMemberTableAchie";
import UpdateMemberTableLevel from "./updateMemberTableLevel";
import useDebounce from "../../hook/useDebounce"; // Adjust the path accordingly
import type { TableProps } from "antd";
import TextArea from "antd/es/input/TextArea";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

interface DataType {
  key: any;
  id?: string;
  level?: string;
  name?: string;
  achie?: string;
  timeAchie?: string;
  timeLevel?: string;
  prize?: string;
}
const columnsLevel: TableProps<DataType>["columns"] = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mã định danh",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Đẳng cấp",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Ngày cấp",
    dataIndex: "timeLevel",
    key: "timeLevel",
  },
];
const columnsAchie: TableProps<DataType>["columns"] = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
  {
    title: "Giải thưởng",
    dataIndex: "prize",
    key: "prize",
  },
  {
    title: "Thời gian",
    dataIndex: "timeAchie",
    key: "timeAchie",
  },
];
const UpdateMember = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        {" "}
        <Form.Item name="dataAchie" label="Cập nhật cấp đai">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateMember;
