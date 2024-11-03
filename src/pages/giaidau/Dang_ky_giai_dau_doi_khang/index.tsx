import { useQuery } from "react-query";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import CustomTableWeightOne from "./tableWeightOne";
import CustomTableWeightTwo from "./tableWeighTwo";
import { addNewMember, getManagamentMember } from "../../../api/thiDau";
import { useEffect, useState } from "react";
import { isAdmin } from "../../../api/ApiUser";
import { Button, message, Popconfirm } from "antd";
import { IResponseFight2024 } from "../../../type";
import CustomTableAdminOne from "../Thu_thap_du_lieu_doi_khang/tableWeightOne";

const TournamentRegistration = () => {
  const [dataType1, setDataType1] = useState();
  const [dataType2, setDataType2] = useState();
  const [data, setData] = useState<IResponseFight2024>();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // const { data: inforMemberClub } = useQuery(["info"], () =>
  //   getManagamentMember({ mode: 2 })
  // );
  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    handleSubmit();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const payload = { ...(dataType1 ?? {}), ...(dataType2 ?? {}) };
    const response = await addNewMember(payload);
    if (response.status === "success") {
      message.success("Thêm thông tin thành công");
      window.location.reload();
    } else {
      message.error("Hồ sơ đã được nộp, không thể tiếp tục nộp hồ sơ");
    }
  };

  useEffect(() => {
    const fetchManagementMember = async () => {
      const res = await getManagamentMember({ mode: 2 });
      setData(res);
    };
    fetchManagementMember();
  }, []);

  return (
    <>
      <div>
        {" "}
        {isAdmin() === "2" && data?.pending && Array.isArray(data.pending) ? (
          data.pending[0].pending === "1" ? (
            <img
              alt="Đã duyệt"
              src={require("../../../assets/image/accept.png")}
              width="170px"
              style={{ position: "absolute", right: "18px" }}
            />
          ) : (
            <img
              alt="Chưa duyệt"
              src={require("../../../assets/image/notAccept.png")}
              width="170px"
              style={{ position: "absolute", right: "18px" }}
            />
          )
        ) : (
          <span></span>
        )}
        {isAdmin() === "2" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "12px",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            <Popconfirm
              title="Cảnh báo"
              description="Lưu ý: khi hồ sơ đã gửi thì sẽ không sửa được nữa, bạn chắc chắn muốn gửi? "
              open={open}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button
                type="primary"
                onClick={showPopconfirm}
                disabled={data?.pending !== false}
              >
                Gửi hồ sơ
              </Button>
            </Popconfirm>
          </div>
        )}
        {!data?.pending ? (
          <>
            <CustomTableWeightOne setData={setDataType1} />
            <CustomTableWeightTwo setData={setDataType2} />
          </>
        ) : (
          <>
            <CustomTableAdminOne
              idClub={-1}
              title="BẢNG DỮ LIỆU ĐỐI KHÁNG HÌNH THỨC 1"
              typeFilter="hinh_thuc_1"
              isEditTable={false}
            />
            <CustomTableAdminOne
              idClub={-1}
              title="BẢNG DỮ LIỆU ĐỐI KHÁNG HÌNH THỨC 2"
              typeFilter="hinh_thuc_2"
              isEditTable={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TournamentRegistration;
