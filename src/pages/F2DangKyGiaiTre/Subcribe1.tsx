import React, { useState } from "react";
import styles from "./styles.module.scss";
import SubscribeMember from "../../components/SubcribeMemberGiaiTre";

const listContents = [
  {
    name: "Quyền Quy Định",
    types: [
      "Căn bản công pháp số 1",
      "Thần Đồng quyền",
      "Tứ Linh Đao",
      "Lão Hổ Thượng Sơn",
      "Thái Sơn Côn",
    ],
  },
  {
    name: "Quyền tự chọn",
    types: [
      "Quyền tay không",
      "Binh khí ngắn, đơn đối",
      "Binh khí dài",
      "Binh khí khác",
    ],
  },
  {
    name: "Đối luyện tay không (3 đến 5vđv)",
    types: [],
  },
  {
    name: "Tay không chống binh khí(3 đến 5 vđv)",
    types: [],
  },
  {
    name: "Binh khí chống binh khí(3 đến 5 vđv)",
    types: [],
  },
  {
    name: "Quyền tập thể ( 5 đến 10 vđv)",
    types: [],
  },
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
          <div className={styles.colItem}>Loại (nội dung thi)</div>
          <div className={styles.colItem}>Bài thi</div>
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
            <div className={styles.bodyItem}>{item.name}</div>
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
                          ageGroup="Nhóm tuổi 1"
                          onSelectMember={onSelectMember}
                          memberInfo={
                            listMemberSubscribe?.[item.name]?.[
                              "Nhóm tuổi 1"
                            ]?.[0]?.sex === "Nam"
                              ? listMemberSubscribe?.[item.name]?.[
                                  "Nhóm tuổi 1"
                                ]?.[0]
                              : listMemberSubscribe?.[item.name]?.[
                                  "Nhóm tuổi 1"
                                ]?.[1] || null
                          }
                        />
                        <SubscribeMember
                          idclub={idclub}
                          sex={"Nữ"}
                          name={item.name}
                          type={type}
                          ageGroup="Nhóm tuổi 1"
                          isLastItem={true}
                          onSelectMember={onSelectMember}
                          memberInfo={
                            listMemberSubscribe?.[item.name]?.[
                              "Nhóm tuổi 1"
                            ]?.[0]?.sex === "Nữ"
                              ? listMemberSubscribe?.[item.name]?.[
                                  "Nhóm tuổi 1"
                                ]?.[0]
                              : listMemberSubscribe?.[item.name]?.[
                                  "Nhóm tuổi 1"
                                ]?.[1] || null
                          }
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.bodyInfo} key={`${item}_${index}`}>
                    <div className={styles.ageGroup}> </div>

                    <div className={styles.memberInfo}>
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        onSelectMember={onSelectMember}
                        table3="Member1"
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[0] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member2"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[1] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member3"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[2] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member4"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[3] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member5"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[4] || null
                        }
                        isLastItem={true}
                      />
                    </div>
                  </div>
                )
              ) : (
                item.name.includes("Quyền tập thể") && (
                  <div className={styles.bodyInfo}>
                    <div className={styles.ageGroup}> </div>

                    <div className={styles.memberInfo}>
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        onSelectMember={onSelectMember}
                        table3="Member1"
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[0] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member2"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[1] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member3"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[2] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member4"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[3] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member5"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[4] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        onSelectMember={onSelectMember}
                        table3="Member6"
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[5] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member7"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[6] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member8"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[7] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member9"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[8] || null
                        }
                      />
                      <SubscribeMember
                        idclub={idclub}
                        name={item.name}
                        ageGroup="Nhóm tuổi 1"
                        table3="Member10"
                        onSelectMember={onSelectMember}
                        memberInfo={
                          listMemberSubscribe?.[item.name]?.[
                            "Nhóm tuổi 1"
                          ]?.[9] || null
                        }
                        isLastItem={true}
                      />
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
