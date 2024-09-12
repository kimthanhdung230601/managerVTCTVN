import { useState } from "react";
import { Button, Input } from "antd";
import bgImage from "../../../assets/image/bg.png";
import FightTable from "../Container/table";

const Update = () => {
  const resetCategories = { weight: "", sex: "" };
  const resetInfor = [
    { name: "", unit: "" },
    { name: "", unit: "" },
  ];
  const initialCategoriesDefault = { weight: "12", sex: "Nữ" };
  const initialInforDefault = [
    { name: "Kim Dung", unit: "Hà Đông" },
    { name: "Xuân Ninh", unit: "Hà Nội" },
  ];
  // State for input values
  const [categories, setCategories] = useState(initialCategoriesDefault);
  const [infor, setInfor] = useState(initialInforDefault);

  // Handlers for button clicks
  const handleUndo = () => {
    setCategories(resetCategories);
    setInfor(resetInfor);
  };

  const handleUpdate = () => {
    console.log("Categories:", categories);
    console.log("Infor:", infor);
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "32px",
        height: "110vh",
      }}
    >
      <div>
        <div style={{ textTransform: "uppercase" }}>
          <h1 style={{ color: `var(--primary)` }}>
            Liên đoàn võ thuật cổ truyền việt nam
          </h1>
          <h3 style={{ paddingTop: "16px" }}>
            Giải vô địch toàn quốc năm 2024
          </h3>
        </div>
        {/* hạng cân */}
        <div style={{ marginTop: "8px" }}>
          <div>
            <span>Hạng cân: </span>{" "}
            <Input
              type="text"
              value={categories.weight}
              onChange={(e) =>
                setCategories({
                  ...categories,
                  weight: e.target.value as string,
                })
              }
              style={{ width: "70px", marginLeft: "8px" }}
            />
          </div>
          <div style={{ paddingTop: "3px" }}>
            <span>Giới tính: </span>{" "}
            <Input
              type="text"
              value={categories.sex}
              onChange={(e) =>
                setCategories({ ...categories, sex: e.target.value })
              }
              style={{ width: "70px", marginLeft: "8px" }} // Adjust margin as needed
            />
          </div>
        </div>
        {/* Nội dung thi đấu*/}
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
                <Input
                  type="text"
                  value={infor[0].name}
                  onChange={(e) =>
                    setInfor([{ ...infor[0], name: e.target.value }, infor[1]])
                  }
                />
              </p>
              <span>Đơn vị: </span>
              <Input
                type="text"
                value={infor[0].unit}
                onChange={(e) =>
                  setInfor([{ ...infor[0], unit: e.target.value }, infor[1]])
                }
              />
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
                <Input
                  type="text"
                  value={infor[1].name}
                  onChange={(e) =>
                    setInfor([infor[0], { ...infor[1], name: e.target.value }])
                  }
                />
              </p>
              <span>Đơn vị: </span>
              <Input
                type="text"
                value={infor[1].unit}
                onChange={(e) =>
                  setInfor([infor[0], { ...infor[1], unit: e.target.value }])
                }
              />
            </div>
          </div>
        </div>
        {/* Bảng điểm */}
        <div
          style={{
            paddingLeft: "32px",
            paddingRight: "32px",
            marginTop: "32px",
          }}
        >
          <FightTable isSelect />
        </div>
        {/* Nút bấm */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "24px",
          }}
        >
          <Button onClick={handleUndo}>Hoàn tác</Button>
          <Button onClick={handleUpdate}>Cập nhật</Button>
        </div>
      </div>
    </div>
  );
};

export default Update;
