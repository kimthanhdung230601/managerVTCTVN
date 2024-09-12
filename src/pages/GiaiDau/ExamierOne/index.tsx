import bgImage from "../../../assets/image/bg.png";
import ExamierTable from "../Container/TableExamier";

const ExamierOne = () => {
  const categories = { weight: 12, sex: "Nữ" };
  const infor = [
    { name: "Kim Dung", unit: "Tỉnh Hà Nội" },
    { name: "Xuân Ninh", unit: "Quận Hà Đông" },
  ];
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
          <span>Hạng cân: </span> {categories.weight}
        </div>
        <div style={{ paddingTop: "3px" }}>
          <span>Giới tính: </span> {categories.sex}
        </div>
      </div>
      {/*  Nội dung thi đấu*/}
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
              style={{
                fontSize: 32,
                fontWeight: "bold",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              {infor[0].name}
            </p>
            <span>Đơn vị: </span>
            <span>{infor[0].unit}</span>
          </div>
          <div style={{ color: "#0066FF" }}>
            <h3>Giáp Xanh</h3>
            <p
              style={{
                fontSize: 32,
                fontWeight: "bold",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              {infor[1].name}
            </p>
            <span>Đơn vị: </span>
            <span>{infor[1].unit}</span>
          </div>
        </div>
      </div>
      {/* Bảng điểm */}
      <div
        style={{
          paddingLeft: "170px",
          paddingRight: "170px",
          marginTop: "32px",
        }}
      >
        <ExamierTable number={1} />
      </div>
    </div>
  );
};

export default ExamierOne;
