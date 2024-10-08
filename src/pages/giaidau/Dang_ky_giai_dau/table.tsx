import React from "react";
import TableRow from "./tableRow";

// Define thongTin interface
interface thongTin {
  hangCan: any;
}

// Define interface Person
interface Person {
  nam: thongTin[];
  nu: thongTin[];
}
const CustomTable: React.FC = () => {
  // Sample data
  const data: Person = {
    nam: [
      { hangCan: "Trên 51kg đến 54kg" },
      { hangCan: "Trên 54kg đến 57kg" },
      { hangCan: "Trên 57kg đến 60kg" },
      { hangCan: "Trên 60kg đến 64kg" },
      { hangCan: "Trên 64kg đến 68kg" },
    ],
    nu: [
      { hangCan: "Trên 51kg đến 54kg" },
      { hangCan: "Trên 54kg đến 57kg" },
      { hangCan: "Trên 57kg đến 60kg" },
    ],
  };

  const tableThead: string[] = [
    "Giới Tính",
    "STT",
    "Hạng Cân",
    "Họ Tên",
    "Ngày Sinh",
    "ID",
  ];

  return (
    <div style={{ border: "1px solid #ddd", margin: "20px 0" }}>
      {/* Render header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          background: "#f2f2f2",
          fontWeight: "bold",
        }}
      >
        {tableThead.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* body */}
      {data.nam.map((person, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
          }}
        >
          {index === 2 ? (
            <div
              style={{
                padding: "10px",
                gridColumn: "span 1",
                textAlignLast: "center",
                borderBottom:
                  index === data.nam.length - 1 ? "1px solid #ddd" : "none",
                borderRight: "1px solid #ddd",
              }}
            >
              Nam
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
                borderBottom:
                  index === data.nam.length - 1 ? "1px solid #ddd" : "none",
                borderRight: "1px solid #ddd",
              }}
            />
          )}
          <div
            style={{
              borderBottom: "1px solid #ddd",
              borderRight: "1px solid #ddd",
              textAlignLast: "center",
              alignContent: "center",
            }}
          >
            {index + 1}
          </div>

          {/* Adjust the TableRow to span 4 columns */}
          <div style={{ gridColumn: "span 4" }}>
            <TableRow hangCan={person.hangCan} />
          </div>
        </div>
      ))}

      {/* Render female data rows */}
      {data.nu.map((person, index) => (
        <div
          key={index + data.nam.length}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            borderBottom: index === data.nu.length ? "1px solid #ddd" : "none",
          }}
        >
          {/* Only show "Nữ" for the first item */}
          {index === 1 ? (
            <div
              style={{
                padding: "10px",
                gridColumn: "span 1",
                textAlignLast: "center",
                borderBottom:
                  index === data.nam.length - 1 ? "1px solid #ddd" : "none",
                borderRight: "1px solid #ddd",
              }}
            >
              Nữ
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
                borderRight: "1px solid #ddd",
                borderBottom:
                  index === data.nu.length - 1 ? "1px solid #ddd" : "none",
              }}
            />
          )}
          <div
            style={{
              borderBottom: "1px solid #ddd",
              borderRight: "1px solid #ddd",
              textAlignLast: "center",
              alignContent: "center",
            }}
          >
            {index + 1}
          </div>

          {/* Adjust the TableRow to span 4 columns */}
          <div style={{ gridColumn: "span 4" }}>
            <TableRow hangCan={person.hangCan} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomTable;
