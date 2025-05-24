import React, { useState, useEffect } from "react";
import TableRow from "../Component/tableRow";
import { data_weight_1, tableThead, thongTin, weight } from "../Data";

// Define thongTin interface
interface Props {
  setData: any;
}
const CustomTableWeightOne = ({ setData }: Props) => {
  const [weight34to36, setWeight34to36] = useState<weight>({ nữ: "" });
  const [weight36to38, setWeight36to38] = useState<weight>({ nam: "", nữ: "" });
  const [weight38to40, setWeight38to40] = useState<weight>({ nam: "", nữ: "" });
  const [weight40to42, setWeight40to42] = useState<weight>({ nam: "", nữ: "" });
  const [weight42to45, setWeight42to45] = useState<weight>({ nam: "", nữ: "" });
  const [weight45to48, setWeight45to48] = useState<weight>({ nam: "", nữ: "" });
  const [weight48to51, setWeight48to51] = useState<weight>({ nam: "", nữ: "" });
  const [weight41to54, setWeight51to54] = useState<weight>({ nam: "", nữ: "" });
  const [weightTo54, setWeighTo54] = useState<weight>({ nữ: "" });
  const [weight54to57, setWeight54to57] = useState<weight>({ nam: "" });
  const [weight57to60, setWeight57to60] = useState<weight>({ nam: "" });
  const [weightTo60, setWeightTo60] = useState<weight>({ nam: "" });

  const setWeightFunctionsNam = [
    setWeight36to38,
    setWeight38to40,
    setWeight40to42,
    setWeight42to45,
    setWeight45to48,
    setWeight48to51,
    setWeight51to54,
    setWeight54to57,
    setWeight57to60,
    setWeightTo60,
  ];

  const setWeightFunctionsNu = [
    setWeight34to36,
    setWeight36to38,
    setWeight38to40,
    setWeight40to42,
    setWeight42to45,
    setWeight45to48,
    setWeight48to51,
    setWeight51to54,
    setWeighTo54,
  ];

  useEffect(() => {
    const buildPayload = (genderData: thongTin[], weights: weight[]) => {
      return genderData.reduce((acc: any, curr, index) => {
        acc[curr.hangCan] = weights[index];
        return acc;
      }, {});
    };

    const payload = {
      hinh_thuc_1: {
        ...buildPayload(data_weight_1.nam, [
          weight36to38,
          weight38to40,
          weight40to42,
          weight42to45,
          weight45to48,
          weight48to51,
          weight41to54,
          weight54to57,
          weight57to60,
          weightTo60,
        ]),
        ...buildPayload(data_weight_1.nu, [
          weight34to36,
          weight36to38,
          weight38to40,
          weight40to42,
          weight42to45,
          weight45to48,
          weight48to51,
          weight41to54,
          weightTo54,
        ]),
      },
    };
    setData(payload);
  }, [
    weight34to36,
    weight36to38,
    weight38to40,
    weight40to42,
    weight42to45,
    weight45to48,
    weight48to51,
    weight41to54,
    weightTo54,
    weight54to57,
    weight57to60,
    weightTo60,
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
          NHÓM TUỔI 1 TỪ 12 ĐẾN 13 TUỔI
        </h1>

        {/* Render header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
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

        {data_weight_1.nam.map((person, index) => (
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
                    index === data_weight_1.nam.length - 1
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
                    index === data_weight_1.nam.length - 1
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

        {data_weight_1.nu.map((person, index) => (
          <div
            key={index + data_weight_1.nam.length}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              borderBottom:
                index === data_weight_1.nu.length ? "1px solid #ddd" : "none",
            }}
          >
            {index === 1 ? (
              <div
                style={{
                  padding: "10px",
                  gridColumn: "span 1",
                  textAlignLast: "center",
                  borderBottom:
                    index === data_weight_1.nam.length - 1
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
                    index === data_weight_1.nu.length - 1
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

export default CustomTableWeightOne;
