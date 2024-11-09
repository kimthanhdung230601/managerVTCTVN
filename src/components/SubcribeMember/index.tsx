import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Select } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { getListMemberClubF2 } from "../../api/f2";
import { useQuery } from "react-query";
import moment from "moment";
import { getListMemberClub } from "../../api/f0";
import { isAdmin } from "../../api/ApiUser";
interface IProps {
  idclub?: any;
  memberInfo?: any;
  name: string;
  ageGroup: string;
  isLastItem?: boolean;
  sex?: string;
  table3?: string;
  onSelectMember: (
    name: string,
    sex: string,
    ageGroup: string,
    userInfo: any,
    idFight?: string
  ) => void;
}
export default function SubscribeMember({
  idclub,
  memberInfo,
  name,
  sex,
  ageGroup,
  isLastItem,
  table3,
  onSelectMember,
}: IProps) {
  const { data: memberClubs } = useQuery(
    ["listMembers"],
    () => getListMemberClubF2(),
    {
      enabled: !idclub,
    }
  );
  const { data: memberClubsF0 } = useQuery(
    ["listMembersF2", idclub],
    () => getListMemberClub(idclub),
    {
      enabled: !!idclub,
    }
  );
  const [userSelected, setUserSelected] = useState<any>(memberInfo);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const filterOption = (
    input: string,
    option?: { children: React.ReactNode }
  ) => (option?.children as string).toLowerCase().includes(input.toLowerCase());
  const onChange = (value: string) => {
    if (value) {
      const userInfo = JSON.parse(value);
      setUserSelected(userInfo);
      if (!table3) {
        onSelectMember(
          name,
          `${userInfo?.sex}`,
          ageGroup,
          userInfo,
          memberInfo?.id
        );
      } else {
        onSelectMember(name, `${table3}`, ageGroup, userInfo, memberInfo?.id);
      }
    } else {
      const userInfo = { id: 0, sex: 0, name: null };
      if (isAdmin() === "0") {
        setUserSelected(undefined);
        onSelectMember(
          name,
          `${userInfo?.sex}`,
          ageGroup,
          { ...userInfo, id: 0 },
          memberInfo?.id
        );
      } else {
        setUserSelected(undefined);
        if (!table3) {
          onSelectMember(name, sex || "", ageGroup, undefined, undefined);
        } else {
          onSelectMember(name, table3, ageGroup, undefined, undefined);
        }
      }
    }
  };

  const onSearch = (value: string) => {};
  useEffect(() => {
    if (isAdmin() === "2") {
      setDisabled(false);
    } else {
      if (!memberInfo) {
        setDisabled(true);
      }
    }
  }, []);
  return (
    <div
      className={`${styles.memberItemWrap} ${isLastItem && styles.lastItem}`}
    >
      <div className={styles.memberItem}>
        <Select
          menuItemSelectedIcon={<CheckOutlined />}
          allowClear
          showSearch
          placeholder={"Chọn hồ sơ thành viên"}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          className={styles.select}
          value={userSelected ? userSelected?.hoTen : undefined}
        >
          {!idclub && Array.isArray(memberClubs?.data) && (
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
          {!!idclub && Array.isArray(memberClubsF0?.data) && (
            <>
              {memberClubsF0?.data.map((option: any) => {
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
        </Select>
      </div>
      {userSelected && (
        <>
          <div className={styles.bodySex}>
            {sex || userSelected?.sex || memberInfo?.sex}
          </div>
          <div className={styles.bodyItem}>
            {(userSelected?.birthday &&
              moment(userSelected?.birthday).format("DD/MM/YYYY")) ||
              (memberInfo?.birthday &&
                moment(memberInfo?.birthday).format("DD/MM/YYYY")) ||
              ""}
          </div>
          <div className={`${styles.bodyItem} ${styles.lastItem}`}>
            {userSelected?.code || memberInfo?.code}
          </div>
        </>
      )}
    </div>
  );
}
