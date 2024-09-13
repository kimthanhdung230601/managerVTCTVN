import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { useParams } from "react-router";
import { updateTournaments } from "../../../api/giaiDau";

interface DataItem {
  key: string;
  redScore: string;
  greenScore: string;
}

interface CustomTableProp {
  number: string | undefined | number;
  selectedMatch: string;
}

const CustomTable = ({ number, selectedMatch }: CustomTableProp) => {
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
        redScore: "", // Reset redScore to empty string
        greenScore: "", // Reset greenScore to empty string
      }))
    );
  };

  const handleUpdate = async () => {
    const payload = {
      stadium: arena,
      judge: id,
      match: selectedMatch,
      blueScore: dataSource[0].greenScore,
      redScore: dataSource[0].redScore,
    };

    const result = await updateTournaments(
      payload.stadium,
      payload.judge,
      payload.match,
      payload.blueScore,
      payload.redScore
    );
    if (result.status === "success") alert("Cập nhật thành công");
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
          style={{ width: "170px" }}
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
          style={{ width: "170px" }}
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
