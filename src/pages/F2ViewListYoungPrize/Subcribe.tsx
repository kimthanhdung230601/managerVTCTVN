import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation, useQuery } from "react-query";
import { submitListmemberF2 } from "../../api/youngPrize";
import { getListSubcribe, updateListSubcribe } from "../../api/youngPrize";
import useMemberSubscribe from "../../hook/useMemberSubscribe";
import useMemberYoungPrize from "../../hook/useMemberYoungPrize";
import SubcribeOther from "./SubcribeOther";
import SubcribeDL from "./SubcribeDL";

export default function F2ViewListYoungPrize() {
  const updateMutation = useMutation(
    (payload: any) => updateListSubcribe(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") message.success("Cập nhật thành công.");
        else message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
      onError: (data) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
    }
  );

  const onSelectMember = (idFight: number, idUser: number) => {
    updateMutation.mutate({
      id: idFight,
      iduser: idUser,
    });
  };
  const { groupByName, isLoading } = useMemberYoungPrize({});

  return (
    <div className={styles.tableWrap}>
      <div className={styles.btnWrap}></div>

      {groupByName !== undefined &&
      Object.keys(groupByName).length > 0 &&
      groupByName !== undefined &&
      Object.keys(groupByName).length > 0 ? (
        <>
          <p className={styles.title}>NHÓM 1 TỪ 6 ĐẾN 10 TUỔI</p>
          <Subcribe1
            listMembers={groupByName?.["Nhóm tuổi 1"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>NHÓM 2 TỪ 11 ĐẾN 14 TUỔI</p>
          <Subcribe2
            listMembers={groupByName?.["Nhóm tuổi 2"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>NHÓM 3 TỪ 15 ĐẾN 17 TUỔI</p>
          <Subcribe3
            listMembers={groupByName?.["Nhóm tuổi 3"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>QUYỀN TỰ CHỌN (từ 6 đến 17 tuổi)</p>
          <SubcribeOther
            listMembers={groupByName?.["Khác"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>ĐỐI LUYỆN (từ 6 đến 17 tuổi)</p>
          <SubcribeDL
            listMembers={groupByName?.["Đối luyện"]}
            onSelectMember={onSelectMember}
          />
        </>
      ) : (
        <div className={styles.noti}>Chưa có dữ liệu</div>
      )}
    </div>
  );
}
