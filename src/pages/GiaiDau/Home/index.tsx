import { useQuery } from "react-query";
import bgImage from "../../../assets/image/bg.png";
import FightTable from "../Container/table";
import { getTournaments } from "../../../api/giaiDau";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const Home = () => {
  const param = useParams();
  const arena = param.arena;
  const { data, refetch, isFetching } = useQuery(
    ["tournament"],
    () => getTournaments(arena),
    {
      refetchInterval: 100, // Gọi lại API mỗi 100ms
      refetchIntervalInBackground: true, // Tự động gọi khi ứng dụng ở background
    }
  );
  const [isVisitMatch1, setIsVisitMatch1] = useState(false);
  const [isVisitMatch2, setIsVisitMatch2] = useState(false);
  const [isVisitMatch3, setIsVisitMatch3] = useState(false);
  console.log("data", data);

  useEffect(() => {
    if (data) {
      setIsVisitMatch1(data?.visible[0].visible);
      setIsVisitMatch2(data.visible[1].visible);
      setIsVisitMatch3(data.visible[2].visible);
    }
  }, [data]);

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
        <h2 style={{ paddingTop: "16px" }}>Giải vô địch toàn quốc năm 2024</h2>
      </div>
      <img
        src={require("../../../assets/image/logo.png")}
        alt="logo"
        style={{ width: "270px", height: "270px", marginTop: "32px" }}
      />
      {/* hạng cân */}
      <div
        style={{ marginTop: "38px", marginBottom: "38px" }}
        className="title"
      >
        <div style={{ paddingTop: "3px" }}>
          <span>Giới tính: </span> <span>{data?.data[0].gender}</span>
        </div>
      </div>
      {/*  Nội dung thi đấu*/}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
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
          </div>{" "}
          <div style={{ fontSize: "32px" }}>
            <span>Hạng cân: </span> {data?.data[0].weight_class}
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
      <h1 style={{ color: `var(--primary)` }}>Võ Đài {arena}</h1>
      {/* Bảng điểm */}
      {data && (
        <div
          className="title"
          style={{
            paddingLeft: "120px",
            paddingRight: "120px",
            marginTop: "32px",
          }}
        >
          <FightTable
            match_1={data.match_1}
            match_2={data.match_2}
            match_3={data.match_3}
            isVisitMatch1={isVisitMatch1}
            isVisitMatch2={isVisitMatch2}
            isVisitMatch3={isVisitMatch3}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
