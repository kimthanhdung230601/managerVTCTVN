import React, { useEffect, useState } from "react";
import TableRow from "../Component/tableRow";
import { data_weight_2, tableThead, thongTin, weight } from "../Data";

// Define thongTin interface
interface Props {
  setData: any;
}
const CustomTableWeightTwo = ({ setData }: Props) => {
  const [weight42to45, setWeight42to45] = useState<weight>({ nữ: "" });
  const [weight45to48, setWeight45to48] = useState<weight>({ nam: "", nữ: "" });
  const [weight48to51, setWeight48to51] = useState<weight>({ nam: "", nữ: "" });
  const [weight51to54, setWeight51to54] = useState<weight>({ nam: "", nữ: "" });
  const [weight54to57, setWeight54to57] = useState<weight>({ nam: "", nữ: "" });
  const [weight57to60, setWeight57to60] = useState<weight>({ nam: "", nữ: "" });
  const [weight60to64, setWeight60to64] = useState<weight>({ nam: "", nữ: "" });
  const [weight64to68, setWeight64to68] = useState<weight>({ nam: "", nữ: "" });
  const [weightTo68, setWeightTo68] = useState<weight>({
    nữ: "",
  });
  const [weight68to72, setWeight68to72] = useState<weight>({ nam: "" });
  const [weight72to76, setWeight72to76] = useState<weight>({ nam: "" });
  const [weight76to80, setWeight76to80] = useState<weight>({ nam: "" });
  const [weightTo80, setWeightTo80] = useState<weight>({
    nam: "",
  });

  const setWeightFunctionsNam = [
    setWeight45to48,
    setWeight48to51,
    setWeight51to54,
    setWeight54to57,
    setWeight57to60,
    setWeight60to64,
    setWeight64to68,
    setWeight68to72,
    setWeight72to76,
    setWeight76to80,
    setWeightTo80,
  ];

  const setWeightFunctionsNu = [
    setWeight42to45,
    setWeight45to48,
    setWeight48to51,
    setWeight51to54,
    setWeight54to57,
    setWeight57to60,
    setWeight60to64,
    setWeight64to68,
    setWeightTo68,
  ];

  useEffect(() => {
    const buildPayload = (genderData: thongTin[], weights: weight[]) => {
      return genderData.reduce((acc: any, curr, index) => {
        acc[curr.hangCan] = weights[index];
        return acc;
      }, {});
    };

    const payload = {
      hinh_thuc_2: {
        ...buildPayload(data_weight_2.nam, [
          weight45to48,
          weight48to51,
          weight51to54,
          weight54to57,
          weight57to60,
          weight60to64,
          weight64to68,
          weight68to72,
          weight72to76,
          weight76to80,
          weightTo80,
        ]),
        ...buildPayload(data_weight_2.nu, [
          weight42to45,
          weight45to48,
          weight48to51,
          weight51to54,
          weight54to57,
          weight57to60,
          weight60to64,
          weight64to68,
          weightTo68,
        ]),
      },
    };

    setData(payload);
  }, [
    weight42to45,
    weight45to48,
    weight48to51,
    weight51to54,
    weight54to57,
    weight57to60,
    weight60to64,
    weight64to68,
    weight68to72,
    weight72to76,
    weight76to80,
    weightTo80,
    weightTo68,
    setData,
  ]);

  return (
    <>
      <div style={{ margin: "20px 0" }}>
        <h1
          style={{
            marginTop: "48px",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          {" "}
          NHÓM TUỔI 2 TỪ 14 ĐẾN 15 TUỔI{" "}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "12px",
            marginTop: "12px",
            marginBottom: "12px",
          }}
        ></div>
        {/* Render header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            background: "#f2f2f2",
            fontWeight: "bold",
            borderTop: "1px solid #ddd",
            justifyItems: "center",
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

        {data_weight_2.nam.map((person, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
            }}
          >
            {index === 4 ? (
              <div
                style={{
                  padding: "10px",
                  gridColumn: "span 1",
                  textAlignLast: "center",
                  borderBottom:
                    index === data_weight_2.nam.length - 1
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
                    index === data_weight_2.nam.length - 1
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
              {person.hangCan}
            </div>
            <div style={{ gridColumn: "span 3" }}>
              <TableRow setWeight={setWeightFunctionsNam[index]} sex="Nam" />
            </div>
          </div>
        ))}

        {data_weight_2.nu.map((person, index) => (
          <div
            key={index + data_weight_2.nam.length}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              borderBottom:
                index === data_weight_2.nu.length ? "1px solid #ddd" : "none",
            }}
          >
            {index === 4 ? (
              <div
                style={{
                  padding: "10px",
                  gridColumn: "span 1",
                  textAlignLast: "center",
                  borderBottom:
                    index === data_weight_2.nam.length - 1
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
                  borderRight: "1px solid #ddd",
                  borderBottom:
                    index === data_weight_2.nu.length - 1
                      ? "1px solid #ddd"
                      : "none",
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
              {person.hangCan}
            </div>
            <div style={{ gridColumn: "span 3" }}>
              <TableRow setWeight={setWeightFunctionsNu[index]} sex="Nữ" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomTableWeightTwo;
