import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMember";

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

export default function Subcribe1({
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
                <div className={styles.bodyInfo}>
                  <div className={styles.ageGroup}>
                    Nhóm tuổi 1
                    <br />
                    (từ 17 đến 40 tuổi)
                  </div>
                  <div className={styles.memberInfo}>
                    <SubscribeMember
                      idclub={idclub}
                      sex={"Nam"}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[0]
                          ?.sex === "Nam"
                          ? listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[0]
                          : listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[1] ||
                            null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      sex={"Nữ"}
                      name={item}
                      ageGroup="Nhóm tuổi 1"
                      isLastItem={true}
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[0]
                          ?.sex === "Nữ"
                          ? listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[0]
                          : listMemberSubscribe?.[item]?.["Nhóm tuổi 1"]?.[1] ||
                            null
                      }
                    />
                  </div>
                </div>
                <div className={styles.bodyInfo}>
                  <div className={styles.ageGroup}>
                    Nhóm tuổi 2
                    <br />
                    (từ 41 đến 50 tuổi)
                  </div>
                  <div className={styles.memberInfo}>
                    <SubscribeMember
                      idclub={idclub}
                      sex={"Nam"}
                      name={item}
                      ageGroup="Nhóm tuổi 2"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 2"]?.[0]
                          ?.sex === "Nam"
                          ? listMemberSubscribe?.[item]?.["Nhóm tuổi 2"]?.[0]
                          : listMemberSubscribe?.[item]?.["Nhóm tuổi 2"]?.[1] ||
                            null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      sex={"Nữ"}
                      name={item}
                      ageGroup="Nhóm tuổi 2"
                      isLastItem={true}
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 2"]?.[0]
                          ?.sex === "Nữ"
                          ? listMemberSubscribe?.[item]?.["Nhóm tuổi 2"]?.[0]
                          : listMemberSubscribe?.[item]?.["Nhóm tuổi 2"]?.[1] ||
                            null
                      }
                    />
                  </div>
                </div>
                <div className={`${styles.bodyInfo} ${styles.lastItem}`}>
                  <div className={styles.ageGroup}>
                    Nhóm tuổi 3
                    <br />
                    (từ 51 đến 60 tuổi)
                  </div>
                  <div className={styles.memberInfo}>
                    <SubscribeMember
                      idclub={idclub}
                      sex={"Nam"}
                      name={item}
                      ageGroup="Nhóm tuổi 3"
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 3"]?.[0]
                          ?.sex === "Nam"
                          ? listMemberSubscribe?.[item]?.["Nhóm tuổi 3"]?.[0]
                          : listMemberSubscribe?.[item]?.["Nhóm tuổi 3"]?.[1] ||
                            null
                      }
                    />
                    <SubscribeMember
                      idclub={idclub}
                      sex={"Nữ"}
                      name={item}
                      ageGroup="Nhóm tuổi 3"
                      isLastItem={true}
                      onSelectMember={onSelectMember}
                      memberInfo={
                        listMemberSubscribe?.[item]?.["Nhóm tuổi 3"]?.[0]
                          ?.sex === "Nữ"
                          ? listMemberSubscribe?.[item]?.["Nhóm tuổi 3"]?.[0]
                          : listMemberSubscribe?.[item]?.["Nhóm tuổi 3"]?.[1] ||
                            null
                      }
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
