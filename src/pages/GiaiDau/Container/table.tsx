import React, { useEffect, useState } from "react";
import { message, Radio } from "antd";
import { useParams } from "react-router";
import { updateRound, updateWinner } from "../../../api/giaiDau";

interface Match {
  name: string;
  blue_score: string;
  red_score: string;
}
interface Title {
  title: string;
}

interface VisitableEnity {
  round_number: string;
  visible: boolean | string;
  win: string;
}
const titles: Title[] = [
  { title: "Hiệp" },
  { title: "Góc đài" },
  { title: "Giám định 1" },
  { title: "Giám định 2" },
  { title: "Giám định 3" },
  { title: "Giám định 4" },
  { title: "Giám định 5" },
  { title: "Thắng" },
];

const FightTable: React.FC<{
  isSelect?: boolean;
  match_1: Match[];
  match_2: Match[];
  match_3: Match[];
  visible?: VisitableEnity[];
  setRound?: any;
  row?: any;
}> = ({ isSelect, match_1, match_2, match_3, visible, setRound, row }) => {
  // console.log("win", visible);

  const param = useParams();
  const arena = param.arena;

  const [selected, setSelected] = useState<number>(0);
  const [winSelected1, setWinSelectd1] = useState<string>(
    visible ? visible[0].win : ""
  );
  const [winSelected2, setWinSelectd2] = useState<string>(
    visible ? visible[1].win : ""
  );
  const [winSelected3, setWinSelectd3] = useState<string>(
    visible ? visible[2].win : ""
  );
  useEffect(() => {
    if (row === 0) setSelected(0);
  }, [row]);

  const handleRadioChange = async (e: any) => {
    setSelected(e.target.value);
    setRound(e.target.value);
    const resultRound = await updateRound(arena, e.target.value);

    if (resultRound?.status === "success")
      message.success(`Đang ở hiệp ${e.target.value}`);
  };

  const handleSetselectedWinRound1 = async (value: string) => {
    setWinSelectd1(value);
    const result = await updateWinner(arena, 1, value);

    if (result?.status === "success")
      message.success("Cập nhật đội chiến thắng thành công");
  };
  const handleSetselectedWinRound2 = async (value: string) => {
    setWinSelectd2(value);
    const result = await updateWinner(arena, 2, value);
    if (result?.status === "success")
      message.success("Cập nhật đội chiến thắng thành công");
  };

  const handleSetselectedWinRound3 = async (value: string) => {
    setWinSelectd3(value);

    const result = await updateWinner(arena, 3, value);
    if (result?.status === "success")
      message.success("Cập nhật đội chiến thắng thành công");
  };
  return (
    <>
      {" "}
      {/* Header Titles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSelect ? "repeat(9, 1fr)" : "repeat(8, 1fr)",
          backgroundColor: `var(--primary)`,
          color: "#FFF",
          paddingTop: "24px",
          paddingBottom: "24px",
          textAlign: "center",
        }}
      >
        {titles.map((item, index) => (
          <div key={index}>{item.title}</div>
        ))}
      </div>
      {/* Hiệp 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSelect ? "repeat(9, 1fr)" : "repeat(8, 1fr)",
          backgroundColor: `#FFF`,
          padding: "12px 12px 12px 0",
          borderBottom: "1px solid #CCCCCC",
          textAlign: "center",
        }}
      >
        <div>Hiệp 1</div>
        <div
          style={{
            height: "35px",
            width: "100%",
            backgroundColor: "#FF0000",
          }}
        ></div>
        {match_1.map((item, index) =>
          isSelect || (visible && visible[0].visible === "true") ? (
            <div key={index}>{item.red_score}</div>
          ) : (
            <div key={index}>0</div>
          )
        )}
        {isSelect ? (
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#0099FF",
                border: winSelected1 === "blue" ? "3px solid #000" : "none",
                borderRadius: "8px",
              }}
              onClick={() => handleSetselectedWinRound1("blue")}
            ></div>
            <div
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#FF0000",
                borderRadius: "8px",
                border: winSelected1 === "red" ? "3px solid #000" : "none",
              }}
              onClick={() => handleSetselectedWinRound1("red")}
            ></div>
          </div>
        ) : (
          <div
            style={{
              height: "35px",
              width: "100%",

              backgroundColor: visible
                ? visible[0]?.visible === "false"
                  ? "transparent"
                  : visible[0]?.win === "red"
                  ? "#FF0000"
                  : "#0099FF"
                : "transparent",
            }}
          ></div>
        )}
        {isSelect && (
          <Radio
            style={{ paddingLeft: "80px" }}
            value={1}
            checked={selected === 1}
            onChange={handleRadioChange}
          />
        )}
        <div></div>
        <div
          style={{
            height: "35px",
            width: "100%",
            backgroundColor: "#0099FF",
          }}
        ></div>

        {match_1.map((item, index) =>
          isSelect || (visible && visible[0].visible === "true") ? (
            <div key={index}>{item.blue_score}</div>
          ) : (
            <div key={index}>0</div>
          )
        )}

        {isSelect ? (
          <div
            style={{
              height: "40px",
              width: "100%",
            }}
          ></div>
        ) : (
          <div
            style={{
              height: "35px",
              width: "100%",

              backgroundColor: visible
                ? visible[0]?.visible === "false"
                  ? "transparent"
                  : visible[0]?.win === "red"
                  ? "#FF0000"
                  : "#0099FF"
                : "transparent",
            }}
          ></div>
        )}

        {isSelect && <div></div>}
        <div></div>
      </div>
      {/* Hiệp 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSelect ? "repeat(9, 1fr)" : "repeat(8, 1fr)",
          backgroundColor: `#FFF`,
          padding: "12px 12px 12px 0",
          borderBottom: "1px solid #CCCCCC",
          textAlign: "center",
        }}
      >
        <div>Hiệp 2</div>
        <div
          style={{
            height: "35px",
            width: "100%",
            backgroundColor: "#FF0000",
          }}
        ></div>
        {match_2.map((item, index) =>
          isSelect || (visible && visible[1].visible === "true") ? (
            <div key={index}>{item.red_score}</div>
          ) : (
            <div key={index}>0</div>
          )
        )}
        {isSelect ? (
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#0099FF",
                border: winSelected2 === "blue" ? "3px solid #000" : "none",
                borderRadius: "8px",
              }}
              onClick={() => handleSetselectedWinRound2("blue")}
            ></div>
            <div
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#FF0000",
                borderRadius: "8px",
                border: winSelected2 === "red" ? "3px solid #000" : "none",
              }}
              onClick={() => handleSetselectedWinRound2("red")}
            ></div>
          </div>
        ) : (
          <div
            style={{
              height: "35px",
              width: "100%",

              backgroundColor: visible
                ? visible[1]?.visible === "false"
                  ? "transparent"
                  : visible[1]?.win === "red"
                  ? "#FF0000"
                  : "#0099FF"
                : "transparent",
            }}
          ></div>
        )}
        {isSelect && (
          <Radio
            style={{ paddingLeft: "80px" }}
            value={2}
            checked={selected === 2}
            onChange={handleRadioChange}
          />
        )}
        <div></div>
        <div
          style={{
            height: "35px",
            width: "100%",
            backgroundColor: "#0099FF",
          }}
        ></div>
        {match_2.map((item, index) =>
          isSelect || (visible && visible[1].visible === "true") ? (
            <div key={index}>{item.blue_score}</div>
          ) : (
            <div key={index}>0</div>
          )
        )}
        {isSelect ? (
          <div
            style={{
              height: "40px",
              width: "100%",
            }}
          ></div>
        ) : (
          <div
            style={{
              height: "35px",
              width: "100%",

              backgroundColor: visible
                ? visible[1]?.visible === "false"
                  ? "transparent"
                  : visible[1]?.win === "red"
                  ? "#FF0000"
                  : "#0099FF"
                : "transparent",
            }}
          ></div>
        )}

        {isSelect && <div></div>}
      </div>
      {/* Hiệp 3 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSelect ? "repeat(9, 1fr)" : "repeat(8, 1fr)",
          backgroundColor: `#FFF`,
          padding: "12px 12px 12px 0",
          borderBottom: "1px solid #CCCCCC",
          textAlign: "center",
        }}
      >
        <div>Hiệp 3</div>
        <div
          style={{
            height: "35px",
            width: "100%",
            backgroundColor: "#FF0000",
          }}
        ></div>
        {match_3.map((item, index) =>
          isSelect || (visible && visible[2].visible === "true") ? (
            <div key={index}>{item.red_score}</div>
          ) : (
            <div key={index}>0</div>
          )
        )}
        {isSelect ? (
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#0099FF",
                border: winSelected3 === "blue" ? "3px solid #000" : "none",
                borderRadius: "8px",
              }}
              onClick={() => handleSetselectedWinRound3("blue")}
            ></div>
            <div
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#FF0000",
                borderRadius: "8px",
                border: winSelected3 === "red" ? "3px solid #000" : "none",
              }}
              onClick={() => handleSetselectedWinRound3("red")}
            ></div>
          </div>
        ) : (
          <div
            style={{
              height: "35px",
              width: "100%",

              backgroundColor: visible
                ? visible[2]?.visible === "false"
                  ? "transparent"
                  : visible[2]?.win === "red"
                  ? "#FF0000"
                  : "#0099FF"
                : "transparent",
            }}
          ></div>
        )}
        {isSelect && (
          <Radio
            style={{ paddingLeft: "80px" }}
            value={3}
            checked={selected === 3}
            onChange={handleRadioChange}
          />
        )}
        <div></div>
        <div
          style={{
            height: "35px",
            width: "100%",
            backgroundColor: "#0099FF",
          }}
        ></div>
        {match_3.map((item, index) =>
          isSelect || (visible && visible[2].visible === "true") ? (
            <div key={index}>{item.blue_score}</div>
          ) : (
            <div key={index}>0</div>
          )
        )}
        {isSelect ? (
          <div
            style={{
              height: "40px",
              width: "100%",
            }}
          ></div>
        ) : (
          <div
            style={{
              height: "35px",
              width: "100%",

              backgroundColor: visible
                ? visible[2]?.visible === "false"
                  ? "transparent"
                  : visible[2]?.win === "red"
                  ? "#FF0000"
                  : "#0099FF"
                : "transparent",
            }}
          ></div>
        )}

        {isSelect && <div></div>}
      </div>
    </>
  );
};

export default FightTable;
