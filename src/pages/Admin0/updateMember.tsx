import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Spin,
  Table,
  message,
} from "antd";
import styles from "./styles.module.scss";
//  Adjust the path accordingly
import type { TableProps } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { updateMultiAchie } from "../../api/f0";
import moment from "moment";

interface DataType {
  key: any;
  member_id: number;
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
  // {
  //   title: "Họ tên",
  //   dataIndex: "name",
  //   key: "name",
  // },
  {
    title: "Đẳng cấp",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Ngày cấp",
    dataIndex: "time",
    key: "time",
  },
];
const columnsAchie: TableProps<DataType>["columns"] = [
  {
    title: "Mã định danh",
    dataIndex: "member_id",
    key: "member_id",
  },
  // {
  //   title: "Họ tên",
  //   dataIndex: "name",
  //   key: "name",
  //   render: (text) => <a>{text}</a>,
  // },
  {
    title: "Thành tích",
    dataIndex: "name_achievements",
    key: "name_achievements",
  },
  {
    title: "Giải thưởng",
    dataIndex: "prize",
    key: "prize",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
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
    const separatedData = inputData.split("\n").map((item: any) => {
      const [id, level, time] = item
        .split("|")
        .map((str: string) => str.trim());
      return {
        // key: member_id,
        id,
        level,
        time: moment(time, "DD/MM/YYYY").format("YYYY/MM/DD"),
      };
    });
    setTimeout(() => {
      setDataLevel(separatedData);
      setLoading(false);
    }, 500);
  };
  const handleConfirmLevel = async () => {
    const payload = {
      type: "members",
      data: dataLevel?.map((item: any) => ({
        id: item.id,
        level: item.level,
        time: item.time,
      })),
    };
    const res = await updateMultiAchie(payload);
    res?.status === "success"
      ? message.success("Cập nhật thành công")
      : message.error(res?.status);
  };
  //achie
  const [dataAchie, setDataAchie] = useState<any[]>();
  const [loadingAchie, setLoadingAchie] = useState(false);
  const onFinishAchie = async (values: any) => {
    setLoadingAchie(true);
    const inputData = values.dataAchie;
    const separatedData = inputData?.split("\n").map((item: any) => {
      const [member_id, name_achievements, prize, time] = item
        .split("|")
        .map((str: string) => str.trim());
      return {
        member_id,
        name_achievements,
        prize,
        time: moment(time, "DD/MM/YYYY").format("YYYY/MM/DD"),
      };
    });
    setTimeout(() => {
      setDataAchie(separatedData);
      setLoadingAchie(false);
    }, 500);
  };
  const handleConfirm = async () => {
    const payload = {
      type: "achievements",
      data: dataAchie?.map((item: any) => ({
        name_achievements: item.name_achievements,
        prize: item.prize,
        time: item.time,
        member_id: item.member_id,
      })),
    };
    const res = await updateMultiAchie(payload);
    res?.status === "success"
      ? message.success("Cập nhật thành công")
      : message.error(res?.status);
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
              Lưu ý: Nhập đúng định dạng. Các thành viên viết xuống dòng.{" "}
              <br></br> Ví dụ:<br></br> 1|HLV 1 đẳng|24/12/2024 <br></br> 5|Võ
              sinh cấp 1|03/07/2024
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
                  Cập nhật đẳng cấp
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
                onClick={() => handleConfirmLevel()}
              >
                Xác nhận cập nhật
              </Button>
            </div>
          </Col>
          <Col span={12} xs={24} sm={12} lg={12} xl={12}>
            {" "}
            <div style={{ display: "inline-block", margin: "2vh 0" }}>
              <div className={styles.postLabel}>
                <FileTextOutlined style={{ marginRight: "10px" }} />
                Cập nhật giải thưởng
              </div>
            </div>
            <p className={styles.note}>
              Lưu ý: Nhập đúng định dạng. Các thành viên viết xuống dòng.{" "}
              <br></br> Ví dụ: <br></br> 1|Giải trẻ|Vàng|30/12/2023 <br></br>{" "}
              2|Giải trẻ|Vàng|01/04/2024
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
                  // onLoad={loadingAchie}
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
                pagination={{ pageSize: 10 }}
              />
              <Button
                disabled={dataAchie === undefined || dataAchie.length === 0}
                onClick={() => {
                  handleConfirm();
                }}
                className={styles.btnUpdate}
                // onLoad={loadingAchie}
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
