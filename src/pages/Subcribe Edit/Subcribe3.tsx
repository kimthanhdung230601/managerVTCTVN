import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMember";
import SubscribeMemberEdit from "../../components/SubscribeMemberEdit";

const listContents = [
  "Tay không chống tay không",
  "Tay không chống binh khí",
  "Binh khí chống binh khí",
];

interface IProps {
  listMembers: any;
  sex: string;
  onSelectMember: (idFight: number, idUser: number) => void;
}

export default function Subcribe3({
  listMembers,
  onSelectMember,
  sex,
}: IProps) {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.colIndex}>STT</div>
          <div className={styles.colItem}>Nội dung</div>
          <div className={styles.colItem}>Nhóm tuổi</div>
          <div className={styles.colContent}>Họ tên</div>
          <div className={styles.colSex}>Giới tính</div>
          <div className={styles.colRight}>Ngày sinh</div>
          <div className={`${styles.colRight} ${styles.lastItem}`}>
            Mã định danh
          </div>
        </div>
        {listContents.map((item, index) => (
          <div className={styles.tableRow} key={`${item}_${index}`}>
            <div className={styles.bodyIndex}>{++index}</div>
            <div className={styles.bodyItem}>{item}</div>
            <div className={styles.group}>
              <div className={`${styles.bodyInfo} ${styles.lastItem}`}>
                <div className={styles.ageGroup}>
                  Nhóm tuổi 1
                  <br />
                  (từ 17 đến 40 tuổi)
                </div>
                <div className={styles.memberInfo}>
                  {listMembers?.[item]?.["Nhóm tuổi 1"].map(
                    (member: any, index: number) => (
                      <SubscribeMemberEdit
                        sex={sex}
                        memberInfo={member}
                        name={item}
                        ageGroup="Nhóm tuổi 1"
                        onSelectMember={onSelectMember}
                        isLastItem={
                          index ===
                          listMembers?.[item]?.["Nhóm tuổi 1"].length - 1
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
