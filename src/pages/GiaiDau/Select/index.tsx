import { Button } from "antd";
import bgImage from "../../../assets/image/bg.png";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        paddingTop: "90px",
        textAlign: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ paddingBottom: "40px" }}>Vui lòng chọn vai trò</h1>
      <Button
        onClick={() => navigate("/nguoi-xem")}
        style={{ width: "290px", height: "50px" }}
      >
        NGƯỜI XEM
      </Button>
      <Button
        onClick={() => navigate("/cap-nhat")}
        style={{ width: "290px", height: "50px" }}
      >
        THƯ KÝ
      </Button>
      <Button
        onClick={() => navigate("/giam-dinh-1")}
        style={{ width: "290px", height: "50px" }}
      >
        GIÁM ĐỊNH 1
      </Button>
      <Button
        onClick={() => navigate("/giam-dinh-2")}
        style={{ width: "290px", height: "50px" }}
      >
        GIÁM ĐỊNH 2
      </Button>
      <Button
        onClick={() => navigate("/giam-dinh-3")}
        style={{ width: "290px", height: "50px" }}
      >
        GIÁM ĐỊNH 3
      </Button>
      <Button
        onClick={() => navigate("/giam-dinh-4")}
        style={{ width: "290px", height: "50px" }}
      >
        GIÁM ĐỊNH 4
      </Button>
      <Button
        onClick={() => navigate("/giam-dinh-5")}
        style={{ width: "290px", height: "50px" }}
      >
        GIÁM ĐỊNH 5
      </Button>
    </div>
  );
};

export default Dashboard;
