import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Modal, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation } from "react-query";
import { submitListmemberF2 } from "../../api/giaiVoDich";
import { useParams } from "react-router";
import { updateListSubcribe } from "../../api/giaiVoDich";
import useMemberGiaiVoDich from "../../hook/useMemberGiaiVoDich";
import { isAdmin } from "../../api/ApiUser";
import { getManagamentMember } from "../../api/giaiVoDich";
import { IResponseFight2024 } from "../../type";
import SubcribePageEditGiaiVoDich from "../SubcribeEditGiaiVoDich";

interface User {
  sex: string;
  id: string;
}

interface AgeGroup {
  "Lão Hổ Thượng Sơn": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Hùng Kê Quyền": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Ngọc Trản Quyền": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Lão Mai Quyền": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Phong Hoa Đao": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Thanh Long Độc Kiếm": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Song Tuyết Kiếm": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Thái Côn Sơn": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Siêu Xung Thiên": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Độc Lư Thương": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Quyền Tay Không": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Binh Khí Ngắn, Đôi": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Binh Khí Dài": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Các loại binh khí khác": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Tay không chống tay không"?: {};
  "Tay không chống binh khí"?: {};
  "Binh khí chống binh khí"?: {};
}

const listContents = [
  "Lão Hổ Thượng Sơn",
  "Hùng Kê Quyền",
  "Ngọc Trản Quyền",
  "Lão Mai Quyền",
  "Phong Hoa Đao",
  "Thanh Long Độc Kiếm",
  "Song Tuyết Kiếm",
  "Thái Côn Sơn",
  "Siêu Xung Thiên",
  "Độc Lư Thương",
];

export default function Subcribe() {
  const { id } = useParams();
  const [data, setData] = useState<IResponseFight2024>();
  const [open, setIsOpen] = useState<boolean>(false);
  const check =
    data?.pending &&
    Array.isArray(data.pending) &&
    (data.pending[0]?.mode === "1" || data.pending[1]?.mode === "1");

  const [userSelected, setUserSelected] = useState<{
    "Nhóm tuổi 1": AgeGroup;
    "Nhóm tuổi 2": AgeGroup;
    "Nhóm tuổi 3": AgeGroup;
  }>({
    "Nhóm tuổi 1": {
      "Lão Hổ Thượng Sơn": {},
      "Hùng Kê Quyền": {},
      "Ngọc Trản Quyền": {},
      "Lão Mai Quyền": {},
      "Phong Hoa Đao": {},
      "Thanh Long Độc Kiếm": {},
      "Song Tuyết Kiếm": {},
      "Thái Côn Sơn": {},
      "Siêu Xung Thiên": {},
      "Độc Lư Thương": {},
      "Quyền Tay Không": {},
      "Binh Khí Ngắn, Đôi": {},
      "Binh Khí Dài": {},
      "Các loại binh khí khác": {},
      "Tay không chống tay không": {},
      "Tay không chống binh khí": {},
      "Binh khí chống binh khí": {},
    },
    "Nhóm tuổi 2": {
      "Lão Hổ Thượng Sơn": {},
      "Hùng Kê Quyền": {},
      "Ngọc Trản Quyền": {},
      "Lão Mai Quyền": {},
      "Phong Hoa Đao": {},
      "Thanh Long Độc Kiếm": {},
      "Song Tuyết Kiếm": {},
      "Thái Côn Sơn": {},
      "Siêu Xung Thiên": {},
      "Độc Lư Thương": {},
      "Quyền Tay Không": {},
      "Binh Khí Ngắn, Đôi": {},
      "Binh Khí Dài": {},
      "Các loại binh khí khác": {},
    },
    "Nhóm tuổi 3": {
      "Lão Hổ Thượng Sơn": {},
      "Hùng Kê Quyền": {},
      "Ngọc Trản Quyền": {},
      "Lão Mai Quyền": {},
      "Phong Hoa Đao": {},
      "Thanh Long Độc Kiếm": {},
      "Song Tuyết Kiếm": {},
      "Thái Côn Sơn": {},
      "Siêu Xung Thiên": {},
      "Độc Lư Thương": {},
      "Quyền Tay Không": {},
      "Binh Khí Ngắn, Đôi": {},
      "Binh Khí Dài": {},
      "Các loại binh khí khác": {},
    },
  });
  console.log("userSelected", userSelected);
  const submitMutation = useMutation(
    (payload: any) => submitListmemberF2(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          message.success("Cập nhật thành công.");
          window.location.reload();
        } else message.error("Hồ sơ đã được nộp, không thể tiếp tục nộp hồ sơ");
      },
      onError: (data) => {
        message.error("Hồ sơ đã được nộp, không thể tiếp tục nộp hồ sơ");
      },
    }
  );
  const updateMutation = useMutation(
    (payload: any) => updateListSubcribe(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          message.success("Cập nhật thành công.");
          window.location.reload();
        } else message.error("Hồ sơ đã được nộp, không thể tiếp tục nộp hồ sơ");
      },
      onError: (data) => {
        message.error("Hồ sơ đã được nộp, không thể tiếp tục nộp hồ sơ");
      },
    }
  );

  const { groupByName } = useMemberGiaiVoDich({ id: id });

  const confirm: PopconfirmProps["onConfirm"] = (e) => {};

  const handleOk = () => {
    submitMutation.mutate(userSelected);
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const onSelectMember = (
    name: string,
    sex: string,
    ageGroup: string,
    memberSelected: any,
    idFight?: string
  ) => {
    if (!!id) {
      updateMutation.mutate({
        id: idFight,
        iduser: memberSelected?.id,
      });
    } else {
      setUserSelected((prevState) => ({
        ...prevState,
        [ageGroup as keyof typeof prevState]: {
          ...prevState[ageGroup as keyof typeof prevState],
          [name as keyof AgeGroup]: {
            ...prevState[ageGroup as keyof typeof prevState][
              name as keyof AgeGroup
            ],
            [sex]: memberSelected?.id,
          },
        },
      }));
    }
  };

  useEffect(() => {
    const fetchManagementMember = async () => {
      const res = await getManagamentMember({ mode: 1 });
      setData(res);
    };
    fetchManagementMember();
  }, []);
  return (
    <>
      {isAdmin() === "2" && check ? (
        data?.pending &&
        Array.isArray(data.pending) &&
        (data.pending[0]?.pending === "1" ||
          data.pending[1]?.pending === "1") ? (
          <img
            alt="Đã duyệt"
            src={require("../../assets/image/accept.png")}
            width="170px"
            style={{ position: "absolute", right: "18px" }}
          />
        ) : (
          <img
            alt="Chưa duyệt"
            src={require("../../assets/image/notAccept.png")}
            width="170px"
            style={{ position: "absolute", right: "18px" }}
          />
        )
      ) : (
        <span></span>
      )}

      <div className={styles.tableWrap}>
        <div className={styles.btnWrap}>
          {isAdmin() === "2" && (
            <Button onClick={() => setIsOpen(true)} disabled={check}>
              Gửi hồ sơ
            </Button>
          )}
        </div>
        {!check ? (
          <>
            <p className={styles.title}>NỘI DUNG QUYỀN QUY ĐỊNH</p>
            <Subcribe1
              idclub={id}
              listMemberSubscribe={groupByName}
              onSelectMember={onSelectMember}
            />
            <p className={styles.title}>NỘI DUNG QUYỀN TỰ CHỌN</p>
            <Subcribe2
              idclub={id}
              listMemberSubscribe={groupByName}
              onSelectMember={onSelectMember}
            />
            <p className={styles.title}>NỘI DUNG ĐỐI LUYỆN</p>
            <Subcribe3
              idclub={id}
              listMemberSubscribe={groupByName}
              onSelectMember={onSelectMember}
            />
          </>
        ) : (
          <>
            <SubcribePageEditGiaiVoDich />
          </>
        )}
      </div>
      <Modal
        title="GỬI THÔNG TIN DỮ LIỆU QUYỀN THUẬT"
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
          THI ĐẤU QUYỀN THUẬT
        </span>
        được gửi lên.
        <br></br>Dữ liệu gửi lên không thể sửa được nữa, vui lòng kiểm tra kỹ
        thông tin trước khi nộp hồ sơ
      </Modal>
    </>
  );
}
