import React, { useState, useEffect } from "react";
import { message, Select } from "antd";
import { useQuery } from "react-query";
import {
  getListInfor,
  getListInforAdmin,
  postFixF0,
} from "../../../api/thiDau";
import moment from "moment";
import { adminManagement, weight } from "../Data";

interface Person {
  code: string;
  name: string;
  birthday: string;
  sex: string;
  NameClb?: string;
  id?: string;
}

interface TableRowProps {
  setWeight?: React.Dispatch<React.SetStateAction<weight>>;
  isNamCLB?: boolean;
  data?: adminManagement;
  sex: string;
  isEditable?: boolean;
}

const { Option } = Select;

const TableRow = ({
  setWeight,
  isNamCLB,
  data,
  sex,
  isEditable = true,
}: TableRowProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { data: dataFight } = useQuery(["data"], () => getListInfor(), {
    enabled: !data,
  }); //select cuar 1 CLB

  //select cua admin chon CLB
  const { data: dataManagement1 } = useQuery(
    ["dataManagement"],
    () => getListInforAdmin(data?.idclub),
    { enabled: !!data }
  );

  const dataFilter = !data
    ? dataFight?.data.filter((item: adminManagement) => item.sex === sex) || []
    : dataManagement1?.data.filter(
        (item: adminManagement) => item.sex === sex
      ) || [];

  useEffect(() => {
    if (data) {
      setSelectedPerson({
        code: data.code,
        name: data.hoTen,
        birthday: data.birthday,
        sex: data.sex,
        NameClb: data.tenClb,
        id: data.id,
      });
    }
  }, [data]);

  const handleChange = (value: string) => {
    if (setWeight) {
      const person =
        dataFight?.data.find((option: any) => option.code === value) || null;

      if (person) {
        if (person.sex === "Nam" || person.sex === "nam") {
          setWeight((prevWeight) => ({
            ...prevWeight,
            nam: person.id,
          }));
        } else {
          setWeight((prevWeight) => ({
            ...prevWeight,
            nữ: person.id,
          }));
        }

        setSelectedPerson(person);
      }
    }
  };

  const handleFixMember = async (value: string) => {
    const person =
      dataManagement1?.data.find((option: any) => option.code === value) ||
      null;

    const payload = {
      iduser: person.id,
      id: data?.id,
    };
    const res = await postFixF0(payload);
    setSelectedPerson(person);
    if (res?.status === "success") {
      message.success("Sửa đổi thông tin thành công");
    } else {
      message.error("Lỗi khi sửa đổi thông tin, vui lòng thử lại");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: !isNamCLB ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr",
        gap: "10px",
        borderBottom: "1px solid #ddd",
        paddingLeft: "12px",
      }}
    >
      <Select
        style={{
          width: "100%",
          margin: "12px 0",
        }}
        placeholder="Chọn tên"
        onChange={data ? handleFixMember : handleChange}
        allowClear
        disabled={!isEditable}
        value={selectedPerson ? selectedPerson.name : undefined}
      >
        {dataFilter?.map((option: Person) => (
          <Option key={option.code} value={option.code}>
            {option.name}
          </Option>
        ))}
      </Select>
      <div
        style={{
          borderLeft: "1px solid #ddd",
          borderRight: "1px solid #ddd",
          padding: "12px 18px",
          textAlignLast: "center",
          alignContent: "center",
        }}
      >
        {selectedPerson
          ? moment(selectedPerson.birthday).format("DD-MM-YYYY")
          : data && moment(data.birthday).format("DD-MM-YYYY")}
      </div>
      <div
        style={{
          borderRight: "1px solid #ddd",
          padding: "12px 18px",
          textAlignLast: "center",
          alignContent: "center",
        }}
      >
        {selectedPerson ? selectedPerson.id : data?.id}
      </div>
      {isNamCLB && (
        <div
          style={{
            borderRight: "1px solid #ddd",
            padding: "12px 18px",
          }}
        >
          {selectedPerson ? selectedPerson.NameClb : data?.tenClb}
        </div>
      )}
    </div>
  );
};

export default TableRow;
