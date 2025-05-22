import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation, useQuery } from "react-query";
import { submitListmember } from "../../api/f2";
import { getListSubcribe, updateListSubcribe } from "../../api/f0";
import useMemberSubscribe from "../../hook/useMemberSubscribe";

interface IProps {
  sex: string;
}
export default function Subcribe({ sex }: IProps) {
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
  const { multiAgeGroup, singleAgeGroup, isLoading } = useMemberSubscribe({});
  console.log("multiAgeGroup", multiAgeGroup);
  console.log("singleAgeGroup", singleAgeGroup);
  return (
    <div className={styles.tableWrap}>
      <div className={styles.btnWrap}></div>

      {multiAgeGroup !== undefined &&
      Object.keys(multiAgeGroup).length > 0 &&
      singleAgeGroup !== undefined &&
      Object.keys(singleAgeGroup).length > 0 ? (
        <>
          <p className={styles.title}>NỘI DUNG QUYỀN QUY ĐỊNH</p>
          <Subcribe1
            sex={sex}
            listMembers={multiAgeGroup}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>NỘI DUNG QUYỀN TỰ CHỌN</p>
          <Subcribe2
            sex={sex}
            listMembers={multiAgeGroup}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>NỘI DUNG ĐỐI LUYỆN</p>
          <Subcribe3
            sex={sex}
            listMembers={singleAgeGroup}
            onSelectMember={onSelectMember}
          />
        </>
      ) : (
        <div className={styles.noti}>Chưa có dữ liệu</div>
      )}
    </div>
  );
}
