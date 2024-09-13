import React, { useState } from "react";
import { Checkbox } from "antd";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { useParams } from "react-router";

interface Match {
  name: string;
  blue_score: string;
  red_score: string;
}
interface Title {
  title: string;
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

const calculateTotalScore = (match: Match[]) => {
  const totalRedScore = match?.reduce(
    (total, match) => total + Number(match.red_score),
    0
  );
  const totalBlueScore = match?.reduce(
    (total, match) => total + Number(match.blue_score),
    0
  );
  return { totalRedScore, totalBlueScore };
};

// Function to determine the winner of a round
const determineWinner = (redScore: number, blueScore: number) => {
  if (blueScore > redScore) return "Blue";
  if (redScore > blueScore) return "Red";
  return "Draw";
};

const FightTable: React.FC<{
  isSelect?: boolean;
  match_1: Match[];
  match_2: Match[];
  match_3: Match[];
  isVisitMatch1: boolean | string;
  isVisitMatch2: boolean | string;
  isVisitMatch3: boolean | string;
  selected?: any;
  setSelected?: any;
}> = ({
  isSelect,
  match_1,
  match_2,
  match_3,
  isVisitMatch1,
  isVisitMatch2,
  isVisitMatch3,
  selected,
  setSelected,
}) => {
  const match1Scores = calculateTotalScore(match_1);
  const match2Scores = calculateTotalScore(match_2);
  const match3Scores = calculateTotalScore(match_3);

  // Determine winners for each round
  const winnerMatch1 = determineWinner(
    match1Scores.totalRedScore,
    match1Scores.totalBlueScore
  );
  const winnerMatch2 = determineWinner(
    match2Scores.totalRedScore,
    match2Scores.totalBlueScore
  );
  const winnerMatch3 = determineWinner(
    match3Scores.totalRedScore,
    match3Scores.totalBlueScore
  );
  const param = useParams();
  const stadium = param.arena;

  // const [selected, setSelected] = useState<{ [key: string]: boolean }>({
  //   match1: false,
  //   match2: false,
  //   match3: false,
  // });

  const handleCheckboxChange = (match: string) => {
    setSelected((prev: any) => {
      const newSelected = { ...prev, [match]: !prev[match] };
      return newSelected;
    });
    console.log("select", selected);
  };

  return (
    <>
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
      {isVisitMatch1 === true || isVisitMatch1 === "true" ? (
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
          {match_1.map((item, index) => (
            <div key={index}>{item.red_score}</div>
          ))}
          <div
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: winnerMatch1 === "Blue" ? "#0099FF" : "#FF0000",
            }}
          ></div>{" "}
          {isSelect && <div></div>}
          <div></div>
          <div
            style={{
              height: "35px",
              width: "100%",
              backgroundColor: "#0099FF",
            }}
          ></div>
          {match_1.map((item, index) => (
            <div key={index}>{item.blue_score}</div>
          ))}
          <div
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: winnerMatch1 === "Blue" ? "#0099FF" : "#FF0000",
            }}
          >
            {/* {winnerMatch1} */}
          </div>{" "}
          {isSelect && (
            <Checkbox
              style={{ paddingLeft: "40px" }}
              checked={selected.match1}
              onChange={() => handleCheckboxChange("match1")}
            />
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Hiệp 2 */}
      {isVisitMatch2 === true || isVisitMatch2 === "true" ? (
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
          {match_2.map((item, index) => (
            <div key={index}>{item.red_score}</div>
          ))}
          <div
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: winnerMatch2 === "Blue" ? "#0099FF" : "#FF0000",
            }}
          ></div>{" "}
          {isSelect && <div></div>}
          <div></div>
          <div
            style={{
              height: "35px",
              width: "100%",
              backgroundColor: "#0099FF",
            }}
          ></div>
          {match_2.map((item, index) => (
            <div key={index}>{item.blue_score}</div>
          ))}
          <div
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: winnerMatch2 === "Blue" ? "#0099FF" : "#FF0000",
            }}
          >
            {/* {winnerMatch1} */}
          </div>{" "}
          {isSelect && (
            <Checkbox
              style={{ paddingLeft: "40px" }}
              checked={selected.match2}
              onChange={() => handleCheckboxChange("match2")}
            />
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Hiệp 3 */}
      {isVisitMatch3 === true || isVisitMatch3 === "true" ? (
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
          {match_3.map((item, index) => (
            <div key={index}>{item.red_score}</div>
          ))}
          <div
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: winnerMatch3 === "Blue" ? "#0099FF" : "#FF0000",
            }}
          ></div>{" "}
          {isSelect && <div></div>}
          <div></div>
          <div
            style={{
              height: "35px",
              width: "100%",
              backgroundColor: "#0099FF",
            }}
          ></div>
          {match_3.map((item, index) => (
            <div key={index}>{item.blue_score}</div>
          ))}
          <div
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: winnerMatch3 === "Blue" ? "#0099FF" : "#FF0000",
            }}
          >
            {/* {winnerMatch1} */}
          </div>{" "}
          {isSelect && (
            <Checkbox
              style={{ paddingLeft: "40px" }}
              checked={selected.match3}
              onChange={() => handleCheckboxChange("match3")}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FightTable;
