import React, { useState } from "react";
import { Select } from "antd";

interface Person {
  id: number;
  name: string;
  dateOfBirth: string; // Ngày sinh ở định dạng 'YYYY-MM-DD'
}

interface TableRowProps {
  hangCan: string;
}

// Dữ liệu mẫu
const options: Person[] = [
  { id: 1, name: "Nguyễn Văn A", dateOfBirth: "1990-01-01" },
  { id: 2, name: "Trần Thị B", dateOfBirth: "1992-02-02" },
  { id: 3, name: "Lê Văn C", dateOfBirth: "1989-03-03" },
];

const { Option } = Select;

const TableRow = ({ hangCan }: TableRowProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleChange = (value: number) => {
    const person = options.find((option) => option.id === value) || null;
    setSelectedPerson(person);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "10px",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
        padding: "10px",
      }}
    >
      <div>{hangCan}</div>
      <Select
        style={{ width: "100%" }}
        placeholder="Chọn tên"
        onChange={handleChange}
        allowClear
      >
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
      {selectedPerson && (
        <>
          <div>{selectedPerson.id}</div>
          <div> {selectedPerson.dateOfBirth}</div>
        </>
      )}
    </div>
  );
};

export default TableRow;
