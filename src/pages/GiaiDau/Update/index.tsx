import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import bgImage from "../../../assets/image/bg.png";
import FightTable from "../Container/table";
import { useQuery, useQueryClient } from "react-query";
import {
  getTournaments,
  reset,
  updateInfor,
  updateVisitable,
} from "../../../api/giaiDau";
import { useParams } from "react-router";

const Update = () => {
  const param = useParams();
  const arena = param.arena;
  const resetCategories = { weight: "", sex: "" };
  const resetInfor = [
    { name: "", unit: "" },
    { name: "", unit: "" },
  ];
  const initialCategoriesDefault = { weight: "", sex: "" };

  const initialInforDefault = [
    { name: "", unit: "" },
    { name: "", unit: "" },
  ];
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({
    match1: false,
    match2: false,
    match3: false,
  });

  // State for input values
  const [categories, setCategories] = useState(initialCategoriesDefault);
  const [infor, setInfor] = useState(initialInforDefault);
  const queryClient = useQueryClient();
  // Handlers for button clicks
  const handleUndo = async () => {
    setSelected({
      match1: false,
      match2: false,
      match3: false,
    });
    setCategories(resetCategories);
    setInfor(resetInfor);
    const result = await reset(arena);
    console.log("result: " + result);

    if (result.status === "success") {
      alert("Hoàn tác thành công");
    }
  };

  const handleUpdate = async () => {
    const payload = {
      stadium: arena,
      blueName: infor[1].name,
      redName: infor[0].name,
      blueTeam: infor[1].unit,
      redTeam: infor[0].unit,
      weightClass: categories.weight,
      gender: categories.sex,
    };
    const result = await updateInfor(
      payload.stadium,
      payload.blueName,
      payload.redName,
      payload.blueTeam,
      payload.redTeam,
      payload.weightClass,
      payload.gender
    );
    if (result.status === "success") alert("Cập nhật thành công");
    for (let i = 1; i < 3; i++) {
      const matchKey = `match${i}`;

      const result1 = await updateVisitable(arena, i, selected[matchKey]);
      // if (result.status === "success") alert("Cập nhật thành công");
    }
    console.log("select", selected);
  };

  const { data } = useQuery(["tournament4"], () => getTournaments(arena));

  useEffect(() => {
    if (data) {
      setCategories({
        weight: data?.data[0].weight_class,
        sex: data?.data[0].gender,
      });
      setInfor([
        {
          name: data?.data[0].fighter_red_name,
          unit: data?.data[0].red_team,
        },
        {
          name: data?.data[0].fighter_blue_name,
          unit: data?.data[0].blue_team,
        },
      ]);
    }
  }, [data]);
  const [apiCount, setApiCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      queryClient.fetchQuery(["tournament4"], () => getTournaments(arena));

      setApiCount((prevCount) => prevCount + 1);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [arena, queryClient]);

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
        {data && (
          <div
            style={{
              paddingLeft: "32px",
              paddingRight: "32px",
              marginTop: "32px",
            }}
          >
            <FightTable
              isSelect
              match_1={data.match_1}
              match_2={data.match_2}
              match_3={data.match_3}
              isVisitMatch1={true}
              isVisitMatch2={true}
              isVisitMatch3={true}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        )}
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
