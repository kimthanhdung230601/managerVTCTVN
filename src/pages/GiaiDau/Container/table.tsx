import React from "react";
import { Table, TableProps } from "antd";

interface FightData {
  key: string;
  round: string;
  department: {
    redTeam: string;
    blueTeam: string;
  };
  judge1: { RedPoint: string; BluePoint: string };
  judge2: { RedPoint: string; BluePoint: string };
  judge3: { RedPoint: string; BluePoint: string };
  judge4: { RedPoint: string; BluePoint: string };
  judge5: { RedPoint: string; BluePoint: string };
}

const calculateTotalPoints = (record: FightData) => {
  const redTotal =
    parseInt(record.judge1.RedPoint) +
    parseInt(record.judge2.RedPoint) +
    parseInt(record.judge3.RedPoint) +
    parseInt(record.judge4.RedPoint) +
    parseInt(record.judge5.RedPoint);

  const blueTotal =
    parseInt(record.judge1.BluePoint) +
    parseInt(record.judge2.BluePoint) +
    parseInt(record.judge3.BluePoint) +
    parseInt(record.judge4.BluePoint) +
    parseInt(record.judge5.BluePoint);

  return { redTotal, blueTotal };
};
const data: FightData[] = [
  {
    key: "1",
    round: "Hiệp 1",
    department: {
      redTeam: "Đội A",
      blueTeam: "Đội B",
    },
    judge1: { RedPoint: "1", BluePoint: "2" },
    judge2: { RedPoint: "1", BluePoint: "2" },
    judge3: { RedPoint: "1", BluePoint: "2" },
    judge4: { RedPoint: "1", BluePoint: "2" },
    judge5: { RedPoint: "1", BluePoint: "2" },
  },
  {
    key: "2",
    round: "Hiệp 2",
    department: {
      redTeam: "Đội A",
      blueTeam: "Đội B",
    },
    judge1: { RedPoint: "9", BluePoint: "7" },
    judge2: { RedPoint: "9", BluePoint: "7" },
    judge3: { RedPoint: "9", BluePoint: "7" },
    judge4: { RedPoint: "9", BluePoint: "7" },
    judge5: { RedPoint: "9", BluePoint: "7" },
  },
  {
    key: "3",
    round: "Hiệp 3",
    department: {
      redTeam: "Đội A",
      blueTeam: "Đội B",
    },
    judge1: { RedPoint: "7", BluePoint: "9" },
    judge2: { RedPoint: "8", BluePoint: "8" },
    judge3: { RedPoint: "9", BluePoint: "9" },
    judge4: { RedPoint: "7", BluePoint: "9" },
    judge5: { RedPoint: "8", BluePoint: "8" },
  },
];
const baseColumns: TableProps<FightData>["columns"] = [
  {
    title: "Hiệp",
    dataIndex: "round",
    key: "round",
    fixed: "left" as const,
  },
  {
    title: "Góc đài",
    dataIndex: "department",
    key: "department",
    fixed: "left" as const,
    render: (text: any, record: FightData) => (
      <>
        <div
          style={{
            backgroundColor: "#DC143C",
            color: "white",
            padding: "5px",
            height: "30px",
          }}
        >
          {/* {record.department.redTeam} */}
        </div>
        <div
          style={{
            backgroundColor: "#0066FF",
            color: "white",
            padding: "5px",
            height: "30px",
          }}
        >
          {/* {record.department.blueTeam} */}
        </div>
      </>
    ),
  },
  {
    title: "Giám định 1",
    dataIndex: "judge1",
    key: "judge1",
    render: (text: any, record: FightData) => (
      <>
        <div> {record.judge1.RedPoint}</div>
        <div> {record.judge1.BluePoint}</div>
      </>
    ),
  },
  {
    title: "Giám định 2",
    dataIndex: "judge2",
    key: "judge2",
    render: (text: any, record: FightData) => (
      <>
        <div> {record.judge2.RedPoint}</div>
        <div> {record.judge2.BluePoint}</div>
      </>
    ),
  },
  {
    title: "Giám định 3",
    dataIndex: "judge3",
    key: "judge3",
    render: (text: any, record: FightData) => (
      <>
        <div> {record.judge3.RedPoint}</div>
        <div> {record.judge3.BluePoint}</div>
      </>
    ),
  },
  {
    title: "Giám định 4",
    dataIndex: "judge4",
    key: "judge4",
    render: (text: any, record: FightData) => (
      <>
        <div> {record.judge4.RedPoint}</div>
        <div> {record.judge4.BluePoint}</div>
      </>
    ),
  },
  {
    title: "Giám định 5",
    dataIndex: "judge5",
    key: "judge5",
    render: (text: any, record: FightData) => (
      <>
        <div> {record.judge5.RedPoint}</div>
        <div> {record.judge5.BluePoint}</div>
      </>
    ),
  },
  {
    title: "Thắng",
    key: "winner",
    render: (text: any, record: FightData) => {
      const { redTotal, blueTotal } = calculateTotalPoints(record);
      return redTotal > blueTotal ? (
        <div
          style={{
            backgroundColor: "#DC143C",
            color: "white",
            padding: "5px",
            height: "60px",
          }}
        >
          {/* {record.department.redTeam} */}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#0066FF",
            color: "white",
            padding: "5px",
            height: "60px",
          }}
        >
          {/* {record.department.blueTeam} */}
        </div>
      );
    },
  },
];

const FightTable: React.FC<{ isSelect?: boolean }> = ({ isSelect }) => {
  const columns = isSelect
    ? [
        ...baseColumns,
        {
          title: "Chọn",
          key: "select",
          render: (text: any, record: FightData) => (
            <input type="checkbox" name="fightSelect" />
          ),
        },
      ]
    : baseColumns;

  return (
    <Table<FightData>
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
    />
  );
};

export default FightTable;
