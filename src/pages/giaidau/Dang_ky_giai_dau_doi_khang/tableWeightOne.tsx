import React, { useState } from "react";
import TableRow from "../Component/tableRow";
import { Button, message, Popconfirm } from "antd";
import { addNewMember } from "../../../api/thiDau";
import { data_weight_1, tableThead, thongTin, weight } from "../Data";
import { isAdmin } from "../../../api/ApiUser";

// Define thongTin interface

const CustomTableWeightOne: React.FC = () => {
  const [weight51to54, setWeight51to54] = useState<weight>({ nam: "", nữ: "" });
  const [weight54to57, setWeight54to57] = useState<weight>({ nam: "", nữ: "" });
  const [weight57to60, setWeight57to60] = useState<weight>({ nam: "", nữ: "" });
  const [weight60to64, setWeight60to64] = useState<weight>({ nam: "" });
  const [weight64to68, setWeight64to68] = useState<weight>({ nam: "" });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const setWeightFunctionsNam = [
    setWeight51to54,
    setWeight54to57,
    setWeight57to60,
    setWeight60to64,
    setWeight64to68,
  ];

  const setWeightFunctionsNu = [
    setWeight51to54,
    setWeight54to57,
    setWeight57to60,
  ];
  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    handleSubmit();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const buildPayload = (genderData: thongTin[], weights: weight[]) => {
      return genderData.reduce((acc: any, curr, index) => {
        acc[curr.hangCan] = weights[index];
        return acc;
      }, {});
    };

    const payload = {
      hinh_thuc_1: {
        ...buildPayload(data_weight_1.nam, [
          weight51to54,
          weight54to57,
          weight57to60,
          weight60to64,
          weight64to68,
        ]),
        ...buildPayload(data_weight_1.nu, [
          weight51to54,
          weight54to57,
          weight57to60,
        ]),
      },
    };
    const response = await addNewMember(payload);
    if (response.status === "success") {
      message.success("Thêm thông tin thành công");
    } else {
      message.error("Thêm thông tin thất bại");
    }
  };

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
          THI ĐẤU ĐỐI KHÁNG HÌNH THỨC I
        </h1>
        {isAdmin() === "2" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "12px",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            <Popconfirm
              title="Cảnh báo"
              description="Lưu ý: khi hồ sơ đã gửi thì sẽ ko sửa được nữa, bạn chắc chắn muốn gửi? "
              open={open}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button type="primary" onClick={showPopconfirm}>
                Gửi hồ sơ
              </Button>
            </Popconfirm>
          </div>
        )}

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
