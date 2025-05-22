import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Modal, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation } from "react-query";
import { submitListmember } from "../../api/f2";
import { useParams } from "react-router";
import { updateListSubcribe } from "../../api/f0";
import useMemberSubscribe from "../../hook/useMemberSubscribe";
import { isAdmin } from "../../api/ApiUser";
import { getManagamentMember } from "../../api/thiDau";
import { IResponseFight2024 } from "../../type";
import SubcribePageEdit from "../Subcribe Edit";

interface User {
  sex: string;
  id: string;
}

interface AgeGroup {
  "Quyền Quy Định": {
    [key: string]: {};
  };
  "Quyền Tự Chọn": {
    [key: string]: {};
  };
  "Đối luyện tay không tay không": {};
  "Tay không chống binh khí": {};
  "Binh khí chống binh khí": {};
  "Quyền tập thể": {};
}

export default function Subcribe() {
  const { id } = useParams();
  const [data, setData] = useState<IResponseFight2024>();
  const [open, setIsOpen] = useState<boolean>(false);
  const check =
    data?.pending &&
    Array.isArray(data.pending) &&
    (data.pending[0]?.mode === "1" || data.pending[1]?.mode === "1");
  // console.log("check", check);
  // const check = data?.pending && data?.pending === true;
  const [userSelected, setUserSelected] = useState<{
    "Nhóm tuổi 1": AgeGroup;
    "Nhóm tuổi 2": AgeGroup;
    "Nhóm tuổi 3": AgeGroup;
  }>({
    "Nhóm tuổi 1": {
      "Quyền Quy Định": {
        "Căn bản công pháp số 1": {},
        "Thần Đồng quyền": {},
        "Tứ Linh Đao": {},
        "Lão Hổ Thượng Sơn": {},
        "Thái Sơn Côn": {},
      },
      "Quyền Tự Chọn": {
        "Quyền tay không": {},
        "Binh khi ngắn, đơn đối": {},
        "Binh khí dài": {},
        "Binh khí khác": {},
      },
      "Đối luyện tay không tay không": {},
      "Tay không chống binh khí": {},
      "Binh khí chống binh khí": {},
      "Quyền tập thể": {},
    },
    "Nhóm tuổi 2": {
      "Quyền Quy Định": {
        "Căn bản công pháp số 2": {},
        "Ngọc Trản Quyền": {},
        "Thanh Long Độc Kiếm": {},
        "Phong Hoa Đao": {},
        "Bát Quái Côn": {},
      },
      "Quyền Tự Chọn": {
        "Quyền tay không": {},
        "Binh khi ngắn, đơn đối": {},
        "Binh khí dài": {},
        "Binh khí khác": {},
      },
      "Đối luyện tay không tay không": {},
      "Tay không chống binh khí": {},
      "Binh khí chống binh khí": {},
      "Quyền tập thể": {},
    },
    "Nhóm tuổi 3": {
      "Quyền Quy Định": {
        "Căn bản công pháp số 3": {},
        "Lão Mai Quyền": {},
        "Siêu Xung Thiên": {},
        "Độc Lư Thương": {},
        "Song Tuyết Kiếm": {},
      },
      "Quyền Tự Chọn": {
        "Quyền tay không": {},
        "Binh khi ngắn, đơn đối": {},
        "Binh khí dài": {},
        "Binh khí khác": {},
      },
      "Đối luyện tay không tay không": {},
      "Tay không chống binh khí": {},
      "Binh khí chống binh khí": {},
      "Quyền tập thể": {},
    },
  });
  const submitMutation = useMutation(
    (payload: any) => submitListmember(payload),
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

  const { groupByName } = useMemberSubscribe({ id: id });

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
    idFight?: string,
    type?: string
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
            ...(prevState[ageGroup as keyof typeof prevState][
              name as keyof AgeGroup
            ] || {}),
            ...(name === "Quyền Quy Định" || name === "Quyền Tự Chọn"
              ? {
                  [type as string]: {
                    ...(prevState[ageGroup as keyof typeof prevState][
                      name as keyof AgeGroup
                    ]?.[type as string] || {}),
                    [sex]: memberSelected?.id,
                  },
                }
              : {
                  [sex]: memberSelected?.id,
                }),
          },
        },
      }));
    }
  };
  console.log("userSelected", userSelected);
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
            <SubcribePageEdit />
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
