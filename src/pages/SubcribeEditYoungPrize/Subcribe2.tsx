import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMemberGiaiTre";
import { listContents2 } from "../../constant/ContentYoungPrize";
import SubscribeMemberEditYoungPrize from "../../components/SubscribeMemberEditGiaiTre";

interface IProps {
  listMembers: any;
  sex: string;
  onSelectMember: (idFight: number, idUser: number) => void;
}

export default function Subcribe2({
  listMembers,
  onSelectMember,
  sex,
}: IProps) {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.colIndex}>STT</div>
          <div className={styles.colItem}>Loại (nội dung thi)</div>
          <div className={styles.colItem}>Bài thi</div>
          <div className={styles.colContent}>Họ tên</div>
          <div className={styles.colSex}>Giới tính</div>
          <div className={styles.colRight}>Ngày sinh</div>
          <div className={`${styles.colRight} ${styles.lastItem}`}>
            Mã định danh
          </div>
        </div>
        {listContents2.map((item, index) => (
          <div className={styles.tableRow} key={`${item}_${index}`}>
            <div className={styles.bodyIndex}>{++index}</div>
            <div className={styles.bodyItem}>{`${item.name} ${
              item?.count ? item?.count : ""
            }`}</div>
            <div className={styles.group}>
              {item.types.length > 0 ? (
                item.types.map((type, index) => (
                  <div className={styles.bodyInfo} key={`${item}_${index}`}>
                    <div className={styles.ageGroup}>{type}</div>
                    <div className={styles.memberInfo}>
                      {listMembers?.[sex]?.[item.name]?.[type]?.[
                        "Nhóm tuổi 2"
                      ] &&
                        listMembers?.[sex]?.[item.name]?.["Nhóm tuổi 2"].map(
                          (member: any, index: number) => (
                            <SubscribeMemberEditYoungPrize
                              sex={sex}
                              memberInfo={member}
                              name={item.name}
                              ageGroup="Nhóm tuổi 2"
                              onSelectMember={onSelectMember}
                              isLastItem={
                                index ===
                                listMembers?.[sex]?.[item.name]?.["Nhóm tuổi 2"]
                                  .length -
                                  1
                              }
                            />
                          )
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.bodyInfo} key={`${item}_${index}`}>
                  <div className={styles.ageGroup}> </div>

                  <div className={styles.memberInfo}>
                    <div className={styles.memberInfo}>
                      {listMembers?.[sex]?.[item.name]?.["Nhóm tuổi 2"] &&
                        listMembers?.[sex]?.[item.name]?.["Nhóm tuổi 2"].map(
                          (member: any, index: number) => (
                            <SubscribeMemberEditYoungPrize
                              sex={sex}
                              memberInfo={member}
                              name={item.name}
                              ageGroup="Nhóm tuổi 2"
                              onSelectMember={onSelectMember}
                              isLastItem={
                                index ===
                                listMembers?.[sex]?.[item.name]?.["Nhóm tuổi 2"]
                                  .length -
                                  1
                              }
                            />
                          )
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
