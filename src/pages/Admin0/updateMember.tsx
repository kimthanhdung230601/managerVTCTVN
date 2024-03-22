import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Spin, Table } from "antd";
import styles from "./styles.module.scss";
//  Adjust the path accordingly
import type { TableProps } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

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
    title: "Mã định danh",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
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
    title: "Mã định danh",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
  const [formAchie] = Form.useForm();
  const [dataLevel, setDataLevel] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  //level
  const onFinish = (values: any) => {
    setLoading(true);
    const inputData = values.dataLevel;
    const separatedData = inputData.split(",").map((item: any) => {
      const [id, level, timeLevel] = item
        .split("|")
        .map((str: string) => str.trim());
      return { key: id, id, level, timeLevel };
    });
    setTimeout(() => {
      setDataLevel(separatedData);
      setLoading(false);
    }, 500);
  };
  //achie
  const [dataAchie, setDataAchie] = useState<any[]>();
  const [loadingAchie, setLoadingAchie] = useState(false);
  const onFinishAchie = (values: any) => {
    setLoadingAchie(true);

    const inputData = values.dataAchie;
    const separatedData = inputData.split(",").map((item: any) => {
      const [id, achie, prize, timeAchie] = item
        .split("|")
        .map((str: string) => str.trim());
      return { key: id, id, achie, prize, timeAchie };
    });
    setTimeout(() => {
      setDataAchie(separatedData);
      setLoadingAchie(false);
    }, 500);
  };
  return (
    <>
      {" "}
      <div className={styles.wrap}>
        <Row gutter={24}>
          <Col span={12} xs={24} sm={12} lg={12} xl={12}>
            {" "}
            <div style={{ display: "inline-block", margin: "2vh 0" }}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Cập nhật đẳng cấp
              </div>
            </div>
            <p className={styles.note}>
              Lưu ý: Nhập đúng định dạng. Các thành viên viết cách nhau bởi dấu
              "," <br></br> Ví dụ :H123|HLV 1 đẳng|2023, H46|Võ sinh cấp 1|2024
            </p>
            <Form
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              layout="vertical"
            >
              {" "}
              <Form.Item name="dataLevel" label="Cập nhật đẳng cấp">
                <TextArea style={{ minHeight: "16vh" }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.btnUpdate}
                >
                  Cập nhật cấp đai
                </Button>
              </Form.Item>
            </Form>
            <div>
              <Table
                dataSource={dataLevel}
                columns={columnsLevel}
                loading={loading}
              />
              <Button
                disabled={dataLevel === undefined}
                className={styles.btnUpdate}
              >
                Xác nhận cập nhật
              </Button>
            </div>
          </Col>
          <Col span={12} xs={24} sm={12} lg={12} xl={12}>
            {" "}
            <div style={{ display:"inline-block" ,margin: "2vh 0" }}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Cập nhật giải thưởng
              </div>
            </div>
            <p className={styles.note}>
              Lưu ý: Nhập đúng định dạng. Các thành viên viết cách nhau bởi dấu
              "," <br></br> Ví dụ :H123|Đai đen|Giải trẻ|Vàng|2023, H46|Giải
              trẻ|Vàng|2024
            </p>
            <Form
              form={formAchie}
              name="control-hooks"
              onFinish={onFinishAchie}
              layout="vertical"
            >
              {" "}
              <Form.Item name="dataAchie" label="Cập nhật giải thưởng">
                <TextArea style={{ minHeight: "16vh" }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.btnUpdate}
                >
                  Cập nhật giải thưởng
                </Button>
              </Form.Item>
            </Form>
            <div>
              <Table
                dataSource={dataAchie}
                columns={columnsAchie}
                loading={loadingAchie}
              />
              <Button
                disabled={dataAchie === undefined || dataAchie.length === 0}
                className={styles.btnUpdate}
              >
                Xác nhận cập nhật
              </Button>
            </div>
          </Col>
        </Row>{" "}
      </div>
    </>
  );
};

export default UpdateMember;
