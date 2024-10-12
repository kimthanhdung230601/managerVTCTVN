import React, { useState } from "react";
import TableRow from "../Component/tableRow";
import { tableTheadAdmin } from "../Data";
import { useQuery } from "react-query";
import { getManagamentMember } from "../../../api/thiDau";

// Define thongTin interface

const CustomTableAdminOne: React.FC = () => {
  const payload = { mode: 2 };
  const { data: dataManagement } = useQuery(["data1"], () =>
    getManagamentMember(payload)
  );

  //lọc theo hình thức
  const filterNamType = dataManagement?.data.filter(
    (person: any) => person.type === "hinh_thuc_1"
  );
  console.log("filterNamType", filterNamType);

  //lọc theo giới tính bảng 1
  const filterNam = filterNamType?.filter(
    (person: any) => person.sex === "Nam"
  );
  const filterNu = filterNamType?.filter((person: any) => person.sex === "Nữ");
  return (
    <>
      <div style={{ margin: "20px 0" }}>
        <h1 style={{ marginTop: "48px", textAlign: "center" }}>
          QUẢN LÝ THU THẬP DỮ LIỆU ĐỐI KHÁNG I
        </h1>

        {/* Render header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            background: "#f2f2f2",
            fontWeight: "bold",
            borderTop: "1px solid #ddd",
            justifyItems: "center",
          }}
        >
          {tableTheadAdmin.map((item, index) => (
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

        {dataManagement?.data
          .filter((person: any) => person.sex === "Nam")
          .filter((person: any) => person.type === "hinh_thuc_1")
          .map((person: any, index: number) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
              }}
            >
              {index === filterNam.length / 2 - 1 ? (
                <div
                  style={{
                    padding: "10px",
                    gridColumn: "span 1",
                    textAlignLast: "center",
                    borderBottom:
                      index === filterNam.length - 1
                        ? "1px solid #ddd"
                        : "none",
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
                      index === filterNam.length - 1
                        ? "1px solid #ddd"
                        : "none",
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
              <div
                style={{
                  borderRight: "1px solid #ddd",
                  borderBottom: "1px solid #ddd",
                  padding: "12px 18px",
                }}
              >
                {person.name}
              </div>
              <div style={{ gridColumn: "span 4" }}>
                <TableRow isNamCLB data={person} sex="Nam" />
              </div>
            </div>
          ))}
        {dataManagement?.data
          .filter((person: any) => person.sex === "Nữ")
          .filter((person: any) => person.type === "hinh_thuc_1")
          .map((person: any, index: number) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
              }}
            >
              {index === Math.floor(filterNu.length / 2) ? (
                <div
                  style={{
                    padding: "10px",
                    gridColumn: "span 1",
                    textAlignLast: "center",
                    borderBottom:
                      index === filterNu.length - 1 ? "1px solid #ddd" : "none",
                    borderRight: "1px solid #ddd",
                  }}
                >
                  Nữ
                </div>
              ) : (
                <div
                  style={{
                    padding: "10px",
                    borderBottom:
                      index === filterNu.length - 1 ? "1px solid #ddd" : "none",
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
              <div
                style={{
                  borderRight: "1px solid #ddd",
                  borderBottom: "1px solid #ddd",
                  padding: "12px 18px",
                }}
              >
                {person.name}
              </div>
              <div style={{ gridColumn: "span 4" }}>
                <TableRow isNamCLB data={person} sex="Nữ" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CustomTableAdminOne;
