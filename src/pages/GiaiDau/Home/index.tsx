import { useQuery } from "react-query";
import bgImage from "../../../assets/image/bg.png";
import FightTable from "../Container/table";
import { getTournaments } from "../../../api/giaiDau";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const param = useParams();
  const arena = param.arena;
  const isPortrait = useMediaQuery({ query: "(max-width: 920px)" });

  const { data, refetch, isFetching } = useQuery(
    ["tournament"],
    () => getTournaments(arena),
    {
      refetchInterval: 500,
      refetchIntervalInBackground: true,
    }
  );

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "32px",
        height: "97vh",
        marginBottom: "30px",
      }}
    >
      {/* tiêu đề */}
      <div style={{ textTransform: "uppercase" }}>
        <h1 style={{ color: `var(--primary)` }}>
          Liên đoàn võ thuật cổ truyền việt nam
        </h1>
        <h2 style={{ paddingTop: "16px" }}>Giải vô địch toàn quốc năm 2024</h2>
      </div>
      <img
        src={require("../../../assets/image/logo.png")}
        alt="logo"
        style={{ width: "200px", height: "200px", marginTop: "3px" }}
      />
      {/* hạng cân */}

      {/*  Nội dung thi đấu*/}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: isPortrait ? "column" : "row",
            gap: isPortrait ? "22px" : "0",
          }}
        >
          <div style={{ color: "#DC143C", width: "350px" }}>
            <h3>Giáp Đỏ</h3>
            <p
              className="name"
              style={{
                fontWeight: "bold",
                paddingTop: "3px",
                paddingBottom: "16px",
              }}
            >
              {data?.data[0].fighter_red_name}
            </p>
            <span className="title">Đơn vị: </span>
            <span className="infor" style={{ fontWeight: "bold" }}>
              {data?.data[0].red_team}
            </span>
          </div>{" "}
          <div style={{ marginBottom: "38px" }} className="title">
            {" "}
            <div style={{ fontSize: "32px" }}>
              <span>Hạng cân: </span> {data?.data[0].weight_class}
            </div>{" "}
            <div style={{ fontSize: "32px" }}>
              <span>Giới tính: </span> <span>{data?.data[0].gender}</span>
            </div>{" "}
            <h1 style={{ color: `var(--primary)` }}>Võ Đài {arena}</h1>
          </div>
          <div style={{ color: "#0066FF", width: "350px" }}>
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
      {data && (
        <div
          className="title"
          style={{
            marginLeft: !isPortrait ? "120px" : "30px",
            marginRight: !isPortrait ? "120px" : "30px",
            marginTop: "3px",
            overflowX: "auto",
          }}
        >
          {" "}
          <div
            style={{
              width: isPortrait ? "1200px" : "100%",
            }}
          >
            {" "}
            <FightTable
              match_1={data.match_1}
              match_2={data.match_2}
              match_3={data.match_3}
              visible={data?.visible}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
