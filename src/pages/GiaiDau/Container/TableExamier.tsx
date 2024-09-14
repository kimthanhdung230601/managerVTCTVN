import React, { useState } from "react";
import { Table, Input, Button, message } from "antd";
import { useParams } from "react-router";
import { updateTournaments } from "../../../api/giaiDau";
import { useMediaQuery } from "react-responsive";

interface DataItem {
  key: string;
  redScore: string;
  greenScore: string;
}

interface CustomTableProp {
  number: string | undefined | number;
}

const CustomTable = ({ number }: CustomTableProp) => {
  const isPortrait = useMediaQuery({ query: "(max-width: 668px)" });

  const [dataSource, setDataSource] = useState<DataItem[]>([
    {
      key: "1",
      redScore: "",
      greenScore: "",
    },
  ]);

  const param = useParams();
  const id = param.id;
  const arena = param.arena;

  const handleScoreChange = (
    value: string,
    key: string,
    type: "red" | "green"
  ) => {
    setDataSource(
      dataSource.map((item) =>
        item.key === key ? { ...item, [`${type}Score`]: value } : item
      )
    );
  };

  const handleUndo = () => {
    setDataSource(
      dataSource.map((item) => ({
        ...item,
        redScore: "",
        greenScore: "",
      }))
    );
  };

  const handleUpdate = async () => {
    if (dataSource[0].redScore === "" || dataSource[0].greenScore === "") {
      message.warning("Vui lòng nhập điểm");
      return;
    }

    const payload = {
      stadium: arena,
      judge: id,
      blueScore: dataSource[0].greenScore,
      redScore: dataSource[0].redScore,
    };

    const result = await updateTournaments(
      payload.stadium,
      payload.judge,
      payload.blueScore,
      payload.redScore
    );
    if (result.status === "success")
      message.success("Cập nhập điểm thành công");
  };

  const columns = [
    {
      title: "Giáp Đỏ",
      dataIndex: "redScore",
      key: "redScore",
      render: (text: string, record: DataItem) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handleScoreChange(e.target.value, record.key, "red")}
          style={{ width: !isPortrait ? "170px" : "100%" }}
        />
      ),
    },
    {
      title: "Giáp Xanh",
      dataIndex: "greenScore",
      key: "greenScore",
      render: (text: string, record: DataItem) => (
        <Input
          type="number"
          value={text}
          onChange={(e) =>
            handleScoreChange(e.target.value, record.key, "green")
          }
          style={{ width: !isPortrait ? "170px" : "100%" }}
        />
      ),
    },
  ];

  return (
    <>
      {/* header */}
      <div
        style={{
          backgroundColor: `var(--primary)`,
          paddingTop: "16px",
          paddingBottom: "12px",
          color: "white",
          fontSize: "18px",
        }}
      >
        Giám định {number}
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "24px",
        }}
      >
        <Button onClick={handleUndo}>Hoàn tác</Button>
        <Button onClick={handleUpdate}>Cập nhật</Button>
      </div>
    </>
  );
};

export default CustomTable;
