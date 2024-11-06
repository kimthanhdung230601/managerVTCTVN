import React, { useState } from "react";
import TableRow from "../Component/tableRow";
import { tableTheadAdmin } from "../Data";
import { useQuery } from "react-query";
import { getManagamentMember } from "../../../api/thiDau";
import { isAdmin } from "../../../api/ApiUser";

// Define thongTin interface
interface Props {
  idClub?: number;
  title: string;
  typeFilter: string;
  isEditTable?: boolean;
  dataManagement?: any;
}
const CustomTableAdminOne = ({
  idClub,
  title,
  typeFilter,
  isEditTable = true,
  dataManagement,
}: Props) => {
  // const payload = { mode: 2, ...(idClub && { idclub: idClub as number }) };
  // const { data: dataManagement1 } = useQuery(
  //   ["data1"],
  //   () => getManagamentMember(payload),
  //   {
  //     enabled: isAdmin() === "0",
  //   }
  // );

  //lọc theo hình thức
  const filterNamType = dataManagement?.data
    ? dataManagement.data.filter((person: any) => person.type === typeFilter)
    : [];

  //lọc theo giới tính bảng 1
  const filterNam = filterNamType?.filter(
    (person: any) => person.sex === "Nam"
  );
  const filterNu = filterNamType?.filter((person: any) => person.sex === "Nữ");
  return (
    <>
      <div
        style={{ margin: "20px 0", paddingLeft: "48px", paddingRight: "48px" }}
      >
        <h1
          style={{
            marginTop: "48px",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          {title}
        </h1>

        {/* Render header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            background: "#f2f2f2",
            fontWeight: "bold",
            border: "1px solid #ddd",
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

        {dataManagement?.data &&
          dataManagement?.data
            .filter((person: any) => person.sex === "Nam")
            .filter((person: any) => person.type === typeFilter)
            .map((person: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  borderLeft: "1px solid #ddd",
                }}
              >
                {index === 0 ? (
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
                  <TableRow
                    isNamCLB
                    data={person}
                    sex="Nam"
                    isEditable={isEditTable}
                  />
                </div>
              </div>
            ))}
        {dataManagement?.data &&
          dataManagement?.data
            .filter((person: any) => person.sex === "Nữ")
            .filter((person: any) => person.type === typeFilter)
            .map((person: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                }}
              >
                {index === 0 ? (
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
                    Nữ
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "10px",
                      borderBottom:
                        index === filterNu.length - 1
                          ? "1px solid #ddd"
                          : "none",
                      borderRight: "1px solid #ddd",
                    }}
                  ></div>
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
                  <TableRow
                    isNamCLB
                    data={person}
                    sex="Nữ"
                    isEditable={isEditTable}
                  />
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default CustomTableAdminOne;
