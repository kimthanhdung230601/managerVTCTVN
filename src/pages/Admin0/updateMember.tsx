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
import { F0findF3ForCode, updateMultiAchie } from "../../api/f0";
import moment from "moment";
import { levelMapping } from "../../until/until";

interface DataType {
  key: any;
  code: any;
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
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (value: any, record) => {
      if (value === "Không xác định")
        return <span style={{ color: "#ff0000" }}>{value}</span>;
      else {
        return <span style={{ color: "#046C39" }}>{value}</span>;
      }
    },
  },
  {
    title: "Mã đẳng cấp",
    dataIndex: "level_id",
    key: "level_id",
  },
  {
    title: "Đẳng cấp",
    dataIndex: "level",
    key: "level",
    render: (value: any, record) => {
      if (value === "Không xác định")
        return <span style={{ color: "#ff0000" }}>{value}</span>;
      else {
        return <span style={{ color: "#046C39" }}>{value}</span>;
      }
    },
  },
  {
    title: "Ngày cấp",
    dataIndex: "time",
    key: "time",
    render(value, record, index) {
      return <>{moment(value).format("DD/MM/YYYY")}</>;
    },
  },
];
const columnsAchie: TableProps<DataType>["columns"] = [
  {
    title: "Mã định danh",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (value: any, record) => {
      if (value === "Không xác định")
        return <span style={{ color: "#ff0000" }}>{value}</span>;
      else {
        return <span style={{ color: "#046C39" }}>{value}</span>;
      }
    },
  },
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
    render(value, record, index) {
      return <>{moment(value).format("DD/MM/YYYY")}</>;
    },
  },
];
const UpdateMember = () => {
  const [form] = Form.useForm();
  const [formAchie] = Form.useForm();
  const [dataLevel, setDataLevel] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [disableLevel, setDisableLevel] = useState(true);
  const [disableAchie, setDisableAchie] = useState(true);
  //level
  const onFinish = async (values: any) => {
    setLoading(true);
    const inputData = values.dataLevel;
    const separatedData = inputData
      .split("\n")
      .map((item: any, index: number) => {
        const [code, level_id, time] = item
          .split("|")
          .map((str: string) => str.trim());
        const normalizedLevelId = parseInt(level_id, 10).toString();
        const level = levelMapping[normalizedLevelId] || "Không xác định";

        return {
          level_id,
          code,
          level,
          time: moment(time, "DD/MM/YYYY").format("YYYY/MM/DD"),
          name: "Không xác định",
        };
      });
    const payload = {
      data: separatedData.map((item: any) => ({
        code: item.code,
      })),
    };

    try {
      const res = await F0findF3ForCode(payload);

      res &&
        res.data &&
        res.data.forEach((item: any, index: number) => {
          separatedData.forEach((dataItem: any) => {
            if (dataItem.code === item.code) {
              dataItem.name = item.name;
            }
          });
        });

      setDataLevel([...separatedData]); // Cập nhật dữ liệu trên bảng
      setLoading(false);
      setDisableLevel(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleConfirmLevel = async () => {
    const payload = {
      type: "members",
      data: dataLevel?.map((item: any) => ({
        code: item.code,
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
      const [code, name_achievements, prize, time] = item
        .split("|")
        .map((str: string) => str.trim());
      return {
        code,
        name_achievements,
        prize,
        time: moment(time, "DD/MM/YYYY").format("YYYY/MM/DD"),
        name: "Không xác định",
      };
    });

    try {
      const payload = {
        data: separatedData.map((item: any) => ({
          code: item.code,
        })),
      };

      const res = await F0findF3ForCode(payload);

      res &&
        res.data &&
        res.data.forEach((item: any, index: number) => {
          separatedData.forEach((dataItem: any) => {
            if (dataItem.code === item.code) {
              dataItem.name = item.name;
            }
          });
        });

      setDataAchie([...separatedData]); // Cập nhật dữ liệu trên bảng
      setDisableAchie(false);
      setLoadingAchie(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingAchie(false);
    }
  };

  const handleConfirm = async () => {
    const payload = {
      type: "achievements",
      data: dataAchie?.map((item: any) => ({
        name_achievements: item.name_achievements,
        prize: item.prize,
        time: item.time,
        code: item.code,
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
              <br></br> Ví dụ:<br></br> VCT00000001|12|24/12/2024 <br></br>{" "}
              VCT00000001|9|03/07/2024
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
                disabled={disableLevel}
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
              <br></br> Ví dụ: <br></br> VCT00000001|Giải trẻ|Vàng|30/12/2023{" "}
              <br></br> VCT00000001|Giải trẻ|Vàng|01/04/2024
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
                disabled={disableAchie}
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
