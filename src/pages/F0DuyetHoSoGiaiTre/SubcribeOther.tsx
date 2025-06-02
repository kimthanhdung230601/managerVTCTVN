import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMemberGiaiTre";
import { listContentsOther } from "../../constant/ContentYoungPrize";

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

export default function SubcribeOther({
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
        {listContentsOther.map((item, index) => (
          <div className={styles.tableRow} key={`${item}_${index}`}>
            <div className={styles.bodyIndex}>{++index}</div>
            <div className={styles.bodyItem}>{`${item.name} `}</div>
            <div className={styles.group}>
              {!item.name.includes("Quyền tập thể") ? (
                item.types.length > 0 ? (
                  item.types.map((type, index) => (
                    <div className={styles.bodyInfo} key={`${item}_${index}`}>
                      <div className={styles.ageGroup}>{type}</div>
                      <div className={styles.memberInfo}>
                        <SubscribeMember
                          idclub={idclub}
                          sex={"Nam"}
                          type={type}
                          name={item.name}
                          ageGroup="Khác"
                          onSelectMember={onSelectMember}
                          memberInfo={
                            listMemberSubscribe?.[item.name]?.[type]?.[0]
                              ?.sex === "Nam"
                              ? listMemberSubscribe?.[item.name]?.[type]?.[0]
                              : listMemberSubscribe?.[item.name]?.[type]?.[1] ||
                                null
                          }
                        />
                        <SubscribeMember
                          idclub={idclub}
                          sex={"Nữ"}
                          name={item.name}
                          type={type}
                          ageGroup="Khác"
                          isLastItem={true}
                          onSelectMember={onSelectMember}
                          memberInfo={
                            listMemberSubscribe?.[item.name]?.[type]?.[0]
                              ?.sex === "Nữ"
                              ? listMemberSubscribe?.[item.name]?.[type]?.[0]
                              : listMemberSubscribe?.[item.name]?.[type]?.[1] ||
                                null
                          }
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.bodyInfo} key={`${item}_${index}`}>
                    <div className={styles.ageGroup}> Khác</div>

                    <div className={styles.memberInfo}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SubscribeMember
                          key={`member-${index}`}
                          idclub={idclub}
                          name={item.name}
                          ageGroup="Khác"
                          table3={`Member${index + 1}`}
                          onSelectMember={onSelectMember}
                          memberInfo={
                            listMemberSubscribe?.[item.name]?.[index] || null
                          }
                          isLastItem={index === 4} // Đánh dấu item cuối cùng
                        />
                      ))}
                    </div>
                  </div>
                )
              ) : (
                item.name.includes("Quyền tập thể") && (
                  <div className={styles.bodyInfo}>
                    <div className={styles.ageGroup}> Khác</div>

                    <div className={styles.memberInfo}>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <SubscribeMember
                          key={`member-${index}`}
                          idclub={idclub}
                          name={item.name}
                          ageGroup="Khác"
                          table3={`Member${index + 1}`}
                          onSelectMember={onSelectMember}
                          memberInfo={
                            listMemberSubscribe?.[item.name]?.[index] || null
                          }
                          isLastItem={index === 9} // Đánh dấu item cuối cùng
                        />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
