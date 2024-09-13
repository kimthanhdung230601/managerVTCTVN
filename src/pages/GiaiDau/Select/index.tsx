import { Button } from "antd";
import bgImage from "../../../assets/image/bg.png";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${bgImage})`,
        textAlign: "center",
        height: "105vh",
        justifyContent: "space-around",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Võ Đài 1 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          paddingTop: "90px",
        }}
      >
        <h1 style={{ paddingBottom: "40px", textTransform: "uppercase" }}>
          Vui lòng chọn vai trò
        </h1>
        <h2>Võ Đài 1</h2>
        <Button
          onClick={() => navigate("/nguoi-xem/1")}
          style={{ width: "290px", height: "50px" }}
        >
          NGƯỜI XEM
        </Button>
        <Button
          onClick={() => navigate("/cap-nhat/1")}
          style={{ width: "290px", height: "50px" }}
        >
          THƯ KÝ
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/1/1")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 1
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/2/1")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 2
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/3/1")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 3
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/4/1")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 4
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/5/1")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 5
        </Button>
      </div>
      {/* Võ Đài 2 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          paddingTop: "90px",
        }}
      >
        <h1 style={{ paddingBottom: "40px", textTransform: "uppercase" }}>
          Vui lòng chọn vai trò
        </h1>
        <h2>Võ Đài 2</h2>
        <Button
          onClick={() => navigate("/nguoi-xem/2")}
          style={{ width: "290px", height: "50px" }}
        >
          NGƯỜI XEM
        </Button>
        <Button
          onClick={() => navigate("/cap-nhat/2")}
          style={{ width: "290px", height: "50px" }}
        >
          THƯ KÝ
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/1/2")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 1
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/2/2")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 2
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/3/2")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 3
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/4/2")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 4
        </Button>
        <Button
          onClick={() => navigate("/giam-dinh/5/2")}
          style={{ width: "290px", height: "50px" }}
        >
          GIÁM ĐỊNH 5
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
