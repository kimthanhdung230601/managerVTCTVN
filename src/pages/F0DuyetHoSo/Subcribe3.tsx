import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMember";

const listContents = [
  "Tay không chống tay không",
  "Tay không chống binh khí",
  "Binh khí chống binh khí",
];

interface IProps {
  idclub?: string;
  listMemberSubscribe?: any;
  onSelectMember: (
    name: string,
    sex: string,
    ageGroup: string,
    userInfo: any,
    idFight?: string
  ) => void;
}

export default function Subcribe3({
  idclub,
  listMemberSubscribe,
  onSelectMember,
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
        {listMemberSubscribe !== undefined &&
          listContents.map((item, index) => (
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
                    <SubscribeMember
                      idclub={idclub}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[0] ||
                        null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[1] ||
                        null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[2] ||
                        null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[3] ||
                        null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[4] ||
                        null
                      }
                      isLastItem={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
