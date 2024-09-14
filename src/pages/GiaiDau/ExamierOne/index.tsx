import React, { useState } from "react";
import { useParams } from "react-router";
import bgImage from "../../../assets/image/bg.png";
import ExamierTable from "../Container/TableExamier";
import { useQuery } from "react-query";
import { getTournaments } from "../../../api/giaiDau";
import { useMediaQuery } from "react-responsive";

const ExamierOne = () => {
  const param = useParams();
  const id = param.id;
  const arena = param.arena;

  const isPortrait = useMediaQuery({ query: "(max-width: 668px)" });

  const { data } = useQuery(["tournament5"], () => getTournaments(arena), {
    refetchInterval: 500,
    refetchIntervalInBackground: true,
  });

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "32px",
        height: !isPortrait ? "100vh" : "120vh",
      }}
    >
      {/* tiêu đề */}
      <div style={{ textTransform: "uppercase" }}>
        {!isPortrait ? (
          <h1 style={{ color: `var(--primary)` }}>
            Liên đoàn võ thuật cổ truyền việt nam
          </h1>
        ) : (
          <h2 style={{ color: `var(--primary)` }}>
            Liên đoàn võ thuật cổ truyền việt nam
          </h2>
        )}
        {!isPortrait ? (
          <h3 style={{ paddingTop: "16px" }}>
            Giải vô địch toàn quốc năm 2024
          </h3>
        ) : (
          <h4 style={{ paddingTop: "16px", fontSize: "22px" }}>
            Giải vô địch toàn quốc năm 2024
          </h4>
        )}
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
            display: !isPortrait ? "flex" : "block",
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
          <div
            style={{ color: "#0066FF", marginTop: !isPortrait ? 0 : "32px" }}
          >
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

      {/* Bảng điểm */}
      {!isPortrait ? (
        <h1 style={{ color: `var(--primary)`, marginTop: "12px" }}>
          Võ Đài {arena}
        </h1>
      ) : (
        <h2 style={{ color: `var(--primary)`, marginTop: "12px" }}>
          Võ Đài {arena}
        </h2>
      )}
      <div
        style={{
          paddingLeft: !isPortrait ? "170px" : "30px",
          paddingRight: !isPortrait ? "170px" : "30px",
          marginTop: "32px",
        }}
      >
        <ExamierTable number={id} />
      </div>
    </div>
  );
};

export default ExamierOne;
