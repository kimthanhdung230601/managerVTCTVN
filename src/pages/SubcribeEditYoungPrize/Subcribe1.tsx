import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMemberGiaiTre";
import { listContents1 } from "../../constant/ContentYoungPrize";
import SubscribeMemberEditYoungPrize from "../../components/SubscribeMemberEditGiaiTre";

interface IProps {
  listMembers: any;

  onSelectMember: (idFight: number, idUser: number) => void;
}

export default function Subcribe1({ listMembers, onSelectMember }: IProps) {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.colIndex}>STT</div>
          <div className={styles.colItem}>Loại (nội dung thi)</div>
          <div className={styles.colItem}>Bài thi</div>
          <div className={styles.colContent}>Họ tên</div>
          <div className={styles.colSex}>Ngày sinh</div>
          <div className={styles.colRight}>Clb</div>
          <div className={`${styles.colRight} ${styles.lastItem}`}>
            Mã định danh
          </div>
        </div>
        {listContents1.map((item, index) => (
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
                      {listMembers?.[item.name]?.[type] &&
                        listMembers?.[item.name]?.[type].map(
                          (member: any, index: number) => (
                            <SubscribeMemberEditYoungPrize
                              memberInfo={member}
                              name={item.name}
                              ageGroup="Nhóm tuổi 1"
                              onSelectMember={onSelectMember}
                              isLastItem={
                                index ===
                                listMembers?.[item.name]?.[type].length - 1
                              }
                            />
                          )
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.bodyInfo} key={`${item}_${index}`}>
                  <div className={styles.ageGroup}> Nhóm tuổi 1</div>

                  <div className={styles.memberInfo}>
                    {listMembers?.[item.name] &&
                      listMembers?.[item.name]?.map(
                        (member: any, index: number) => (
                          <SubscribeMemberEditYoungPrize
                            memberInfo={member}
                            name={item.name}
                            ageGroup="Nhóm tuổi 1"
                            onSelectMember={onSelectMember}
                            isLastItem={
                              index === listMembers?.[item.name].length - 1
                            }
                          />
                        )
                      )}
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
