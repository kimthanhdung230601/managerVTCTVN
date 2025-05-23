import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Modal, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation } from "react-query";
import { submitListmemberF2 } from "../../api/youngPrize";
import { useParams } from "react-router";
import { updateListSubcribe } from "../../api/youngPrize";
import useMemberSubscribe from "../../hook/useMemberSubscribe";
import { isAdmin } from "../../api/ApiUser";
import { getManagamentMember } from "../../api/youngPrize";
import { IResponseFight2024 } from "../../type";
import SubcribePageEdit from "../Subcribe Edit";
import { ageGroups } from "../../constant/ContentYoungPrize";
import SubcribePageEditYoungPrize from "../SubcribeEditYoungPrize";
import useMemberYoungPrize from "../../hook/useMemberYoungPrize";

interface User {
  sex: string;
  id: string;
}

interface TechniqueGroup {
  [techniqueName: string]: {
    [sex: string]: string | undefined;
  };
}

interface AgeGroup {
  "Quyền Quy Định": TechniqueGroup;
  "Quyền Tự Chọn": TechniqueGroup;
  "Đối luyện tay không tay không": {
    [sex: string]: string | undefined;
  };
  "Tay không chống binh khí": {
    [sex: string]: string | undefined;
  };
  "Binh khí chống binh khí": {
    [sex: string]: string | undefined;
  };
  "Quyền tập thể": {
    [sex: string]: string | undefined;
  };
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
  const [userSelected, setUserSelected] = useState(ageGroups);
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

  const { groupByName } = useMemberYoungPrize({ id: id });

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
      setUserSelected((prevState) => {
        const prevAgeGroup = prevState[ageGroup as keyof typeof prevState];

        const isNestedGroup =
          name === "Quyền Quy Định" || name === "Quyền Tự Chọn";

        const prevNameGroup = prevAgeGroup[name as keyof AgeGroup];

        const updatedGroup = isNestedGroup
          ? {
              [name]: {
                ...(prevNameGroup as Record<string, Record<string, string>>),
                [type as string]: {
                  ...((prevNameGroup as any)?.[type as string] || {}),
                  [sex]: memberSelected?.id,
                },
              },
            }
          : {
              [name]: {
                ...(prevNameGroup || {}),
                [sex]: memberSelected?.id,
              },
            };

        return {
          ...prevState,
          [ageGroup]: {
            ...prevAgeGroup,
            ...updatedGroup,
          },
        };
      });
    }
  };
  console.log("userSelected", check);
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
            <p className={styles.title}>NHÓM 1 TỪ 6 ĐẾN 10 TUỔI</p>
            <Subcribe1
              idclub={id}
              listMemberSubscribe={groupByName}
              onSelectMember={onSelectMember}
            />
            <p className={styles.title}>NHÓM 2 TỪ 11 ĐẾN 14 TUỔI</p>
            <Subcribe2
              idclub={id}
              listMemberSubscribe={groupByName}
              onSelectMember={onSelectMember}
            />
            <p className={styles.title}>NHÓM 3 TỪ 15 ĐẾN 17 TUỔI</p>
            <Subcribe3
              idclub={id}
              listMemberSubscribe={groupByName}
              onSelectMember={onSelectMember}
            />
          </>
        ) : (
          <>
            <SubcribePageEditYoungPrize />
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
