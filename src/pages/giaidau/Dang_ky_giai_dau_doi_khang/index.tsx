import { useQuery } from "react-query";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import CustomTableWeightOne from "./tableWeightOne";
import CustomTableWeightTwo from "./tableWeighTwo";
import { addNewMember, getManagamentMember } from "../../../api/thiDau";
import { useEffect, useState } from "react";
import { isAdmin } from "../../../api/ApiUser";
import { Button, message, Modal, Popconfirm } from "antd";
import { IData, IResponseFight2024 } from "../../../type";
import CustomTableAdminOne from "../Thu_thap_du_lieu_doi_khang/tableWeightOne";
import { exampleData } from "../Data";

const TournamentRegistration = () => {
  const [dataType1, setDataType1] = useState();
  const [dataType2, setDataType2] = useState();
  const [data, setData] = useState<IResponseFight2024>();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // const check = data?.pending && data?.pending === true;
  const check =
    data?.pending &&
    Array.isArray(data.pending) &&
    (data.pending[0]?.mode === "2" || data.pending[1]?.mode === "2");

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
  const updateExampleData = (exampleData: IData[], responseData: IData[]) => {
    return exampleData.map((item) => {
      // Tìm phần tử trong `responseData` dựa trên điều kiện, ví dụ so khớp `id` và `type`
      const updatedItem = responseData.find(
        (data) =>
          data.name === item.name &&
          data.type === item.type &&
          data.sex === item.sex
      );

      // Nếu tìm thấy phần tử tương ứng, cập nhật các trường còn thiếu
      if (updatedItem) {
        return {
          ...item,
          id: updatedItem.id || item.id,
          idclub: updatedItem.idclub || item.idclub,
          iduser: updatedItem.iduser || item.iduser,
          hoTen: updatedItem.hoTen || item.hoTen,
          tenClb: updatedItem.tenClb || item.tenClb,
          birthday: updatedItem.birthday || item.birthday,
          code: updatedItem.code || item.code,
          image: updatedItem.image || item.image,
        };
      }

      // Nếu không tìm thấy phần tử tương ứng, giữ nguyên item ban đầu
      return item;
    });
  };

  // Cập nhật dữ liệu
  // const updatedData = updateExampleData(exampleData, responseData);

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
      if (res?.data) {
        const updatedData: IData[] = updateExampleData(exampleData, res?.data);
        console.log("updatedData", updatedData);

        setData({ ...res, data: updatedData });
      }
    };
    if (isAdmin() === "2") fetchManagementMember();
  }, []);

  return (
    <>
      <div>
        {" "}
        {isAdmin() === "2" && check ? (
          data?.pending &&
          Array.isArray(data.pending) &&
          (data.pending[0]?.pending === "1" ||
            data.pending[1]?.pending === "1") ? (
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
            {/* <Popconfirm
              title="Cảnh báo"
              description="Lưu ý: THÔNG TIN DƯ, bạn chắc chắn muốn gửi? "
              open={open}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            > */}
            <Button type="primary" onClick={showPopconfirm} disabled={check}>
              Gửi hồ sơ
            </Button>
            {/* </Popconfirm> */}
          </div>
        )}
        {!check ? (
          <>
            <CustomTableWeightOne setData={setDataType1} />
            <CustomTableWeightTwo setData={setDataType2} />
          </>
        ) : (
          <>
            <CustomTableAdminOne
              idClub={undefined}
              title="BẢNG DỮ LIỆU ĐỐI KHÁNG HÌNH THỨC 1"
              typeFilter="hinh_thuc_1"
              isEditTable={false}
              dataManagement={data}
            />
            <CustomTableAdminOne
              idClub={undefined}
              title="BẢNG DỮ LIỆU ĐỐI KHÁNG HÌNH THỨC 2"
              typeFilter="hinh_thuc_2"
              isEditTable={false}
              dataManagement={data}
            />
          </>
        )}
      </div>
      <Modal
        title="GỬI THÔNG TIN DỮ LIỆU ĐỐI KHÁNG"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Lưu ý:</h3>
        Khi ấn nộp hồ sơ, chỉ có dữ liệu
        <span
          style={{
            color: "red",
            fontWeight: "bold",
            marginLeft: "3px",
            marginRight: "3px",
          }}
        >
          THI ĐẤU ĐỐI KHÁNG HÌNH THỨC
        </span>
        được gửi lên.
        <br></br>Dữ liệu gửi lên không thể sửa được nữa, vui lòng kiểm tra kỹ
        thông tin trước khi nộp hồ sơ
      </Modal>
    </>
  );
};

export default TournamentRegistration;
