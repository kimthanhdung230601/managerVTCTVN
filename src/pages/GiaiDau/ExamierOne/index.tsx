import React, { useState } from "react";
import { useParams } from "react-router";
import bgImage from "../../../assets/image/bg.png";
import ExamierTable from "../Container/TableExamier";
import { useQuery } from "react-query";
import { getTournaments } from "../../../api/giaiDau";

const ExamierOne = () => {
  const param = useParams();
  const id = param.id;
  const arena = param.arena;
  const [selectedMatch, setSelectedMatch] = useState("1");

  const handleMatchChange = (event: any) => {
    setSelectedMatch(event.target.value);
  };
  console.log("selectedMatch", selectedMatch);
  const { data } = useQuery(["tournament1"], () => getTournaments(arena));

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "32px",
        height: "100vh",
      }}
    >
      {/* tiêu đề */}
      <div style={{ textTransform: "uppercase" }}>
        <h1 style={{ color: `var(--primary)` }}>
          Liên đoàn võ thuật cổ truyền việt nam
        </h1>
        <h3 style={{ paddingTop: "16px" }}>Giải vô địch toàn quốc năm 2024</h3>
      </div>
      {/* hạng cân */}
      <div style={{ marginTop: "8px" }}>
        <div>
          <span>Hạng cân: </span> {data?.data[0].weight_class}
        </div>
        <div style={{ paddingTop: "3px" }}>
          <span>Giới tính: </span> <span>{data?.data[0].gender}</span>
        </div>
      </div>
      {/*  Nội dung thi đấu */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "32px",
          }}
        >
          <div style={{ color: "#DC143C" }}>
            <h3>Giáp Đỏ</h3>
            <p
              className="name"
              style={{
                fontWeight: "bold",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              {data?.data[0].fighter_red_name}
            </p>
            <span className="title">Đơn vị: </span>
            <span className="infor" style={{ fontWeight: "bold" }}>
              {data?.data[0].red_team}
            </span>
          </div>
          <div style={{ color: "#0066FF" }}>
            <h3>Giáp Xanh</h3>
            <p
              className="name"
              style={{
                fontWeight: "bold",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              {data?.data[0].fighter_blue_name}
            </p>
            <span className="title">Đơn vị: </span>
            <span className="infor" style={{ fontWeight: "bold" }}>
              {" "}
              {data?.data[0].blue_team}
            </span>
          </div>
        </div>
      </div>
      {/* Select hiệp đấu */}
      <div style={{ marginTop: "32px" }}>
        <label htmlFor="match-select" style={{ marginRight: "8px" }}>
          Chọn hiệp đấu:
        </label>
        <select
          id="match-select"
          value={selectedMatch}
          onChange={handleMatchChange}
          style={{ padding: "8px", fontSize: "16px" }}
        >
          <option value="1">Hiệp đấu 1</option>
          <option value="2">Hiệp đấu 2</option>
          <option value="3">Hiệp đấu 3</option>
        </select>
      </div>
      {/* Bảng điểm */}
      <h1 style={{ color: `var(--primary)` }}>Võ Đài {arena}</h1>
      <div
        style={{
          paddingLeft: "170px",
          paddingRight: "170px",
          marginTop: "32px",
        }}
      >
        <ExamierTable number={id} selectedMatch={selectedMatch} />
      </div>
    </div>
  );
};

export default ExamierOne;
