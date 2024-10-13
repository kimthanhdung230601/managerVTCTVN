import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Select } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { getListMemberClub } from "../../api/f0";
import { useQuery } from "react-query";
import moment from "moment";

interface IProps {
  memberInfo: any;
  name: string;
  ageGroup: string;
  isLastItem?: boolean;
  sex?: string;
  onSelectMember: (idFight: number, idUser: number) => void;
}
export default function SubscribeMemberEdit({
  memberInfo,
  name,
  sex,
  ageGroup,
  isLastItem,
  onSelectMember,
}: IProps) {
  const { data: memberClubs } = useQuery(["listMemberAll"], () =>
    getListMemberClub(memberInfo?.idclub)
  );
  const [userSelected, setUserSelected] = useState<any>({});
  const filterOption = (
    input: string,
    option?: { children: React.ReactNode }
  ) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
  const onChange = (value: string) => {
    const userInfo = JSON.parse(value);

    setUserSelected(userInfo);
    onSelectMember(memberInfo?.id, userInfo?.id);
  };
  const onSearch = (value: string) => {
    // console.log('search:', value);
  };
  return (
    <div
      className={`${styles.memberItemWrap} ${isLastItem && styles.lastItem}`}
    >
      <div className={styles.memberItem}>
        <div>{memberInfo?.hoTen}</div>
        {/* <Select
          menuItemSelectedIcon={<CheckOutlined />}
          showSearch
          placeholder={"Chọn hồ sơ thành viên"}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          className={styles.select}
          value={userSelected?.name || memberInfo?.hoTen}
        >
          {Array.isArray(memberClubs?.data) && (
            <>
              {memberClubs?.data.map((option: any) => {
                if (option?.sex.includes(sex)) {
                  return (
                    <Select.Option
                      key={option.id}
                      value={JSON.stringify(option)}
                    >
                      {option?.name}
                    </Select.Option>
                  );
                } else if (!sex) {
                  return (
                    <Select.Option
                      key={option.id}
                      value={JSON.stringify(option)}
                    >
                      {option?.name}
                    </Select.Option>
                  );
                }
              })}
            </>
          )}
        </Select> */}
      </div>

      <>
        {" "}
        <div className={styles.bodyItem}>
          {/* {moment(userSelected?.birthday).format("DD/MM/YYYY") ||
              moment(memberInfo?.birthday).format("DD/MM/YYYY")} */}
          {moment(memberInfo?.birthday).format("DD/MM/YYYY")}
        </div>
        <div className={styles.bodySex}>
          {/* {userSelected?.tenClb || memberInfo?.tenClb} */}
          {memberInfo?.tenClb}
        </div>
        <div className={`${styles.bodyItem} ${styles.lastItem}`}>
          {/* {userSelected?.code || memberInfo?.code} */}
          {memberInfo?.code}
        </div>
      </>
    </div>
  );
}
