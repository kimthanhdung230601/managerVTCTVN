import React, { useState, useEffect } from "react";
import { message, Select } from "antd";
import { useQuery } from "react-query";
import {
  F0AddNewMember,
  getListInfor,
  getListInforAdmin,
  postFixF0,
} from "../../../api/thiDau";
import moment from "moment";
import { weight } from "../Data";
import { CheckOutlined } from "@ant-design/icons";
import { IData } from "../../../type";
import { useParams } from "react-router";

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
  data?: IData;
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
  const param = useParams();

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
    ? dataFight?.data
      ? dataFight.data.filter((item: IData) => item.sex === sex)
      : []
    : dataManagement1?.data
    ? dataManagement1.data.filter((item: IData) => item.sex === sex)
    : [];

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
    console.log("change");

    if (setWeight) {
      const person =
        dataFight?.data.find((option: any) => option.id === value) || null;

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
      }
      if (value === undefined) {
        setSelectedPerson(null);
      } else {
        setSelectedPerson(person);
      }
    }
  };

  const handleFixMember = async (value: string) => {
    const person =
      dataManagement1?.data.find((option: any) => option.id === value) || null;

    if (data?.id) {
      console.log("sửa API");

      const payload = {
        iduser: value ? person.id : 0,
        id: data?.id,
      };
      const res = await postFixF0(payload);
      setSelectedPerson(person);
      if (res?.status === "success") {
        message.success("Sửa đổi thông tin thành công");
      } else {
        message.error("Lỗi khi sửa đổi thông tin, vui lòng thử lại");
      }
    } else {
      const transformData = (item: any) => {
        const result: any = {};
        result[item.type] = result[item.type] || {};
        result[item.type][item.name] = result[item.type][item.name] || {};
        result[item.type][item.name][item.sex] = value;
        return result;
      };

      const transformedData = transformData(data);
      const res = await F0AddNewMember(transformedData, param.id);
      if (res?.status === "success") {
        message.success("Sửa đổi thông tin thành công");
      } else {
        message.error("Lỗi khi sửa đổi thông tin, vui lòng thử lại");
      }
    }
    setSelectedPerson(person);
  };
  const onSearch = (value: string) => {
    // console.log('search:', value);
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
      {isEditable ? (
        <Select
          style={{
            width: "100%",
            margin: "12px 0",
          }}
          placeholder="Chọn tên"
          onChange={data ? handleFixMember : handleChange}
          disabled={!isEditable}
          value={selectedPerson ? selectedPerson.name : undefined}
          allowClear
          menuItemSelectedIcon={<CheckOutlined />}
          showSearch
          onSearch={onSearch}
          optionFilterProp="children"
        >
          {dataFilter?.map((option: Person) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>
      ) : (
        <div style={{ textAlignLast: "center", alignContent: "center" }}>
          {" "}
          {selectedPerson?.name}
        </div>
      )}

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
          ? moment(selectedPerson.birthday).format("DD/MM/YYYY")
          : data && moment(data.birthday).format("DD/MM/YYYY")}
      </div>
      {isNamCLB && (
        <div
          style={{
            borderRight: "1px solid #ddd",
            padding: "12px 18px",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          {selectedPerson ? selectedPerson.NameClb : data?.tenClb}
        </div>
      )}
      <div
        style={{
          borderRight: "1px solid #ddd",
          padding: "12px 18px",
          textAlignLast: "center",
          alignContent: "center",
        }}
      >
        {selectedPerson ? selectedPerson.code : data?.code}
      </div>
    </div>
  );
};

export default TableRow;
