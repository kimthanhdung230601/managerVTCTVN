import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Table } from "antd";
import type { GetRef } from "antd";
import styles from "./styles.module.scss";
import UpdateMemberTableAchie from "./updateMemberTableAchie";
import UpdateMemberTableLevel from "./updateMemberTableLevel";
import useDebounce from "../../hook/useDebounce"; // Adjust the path accordingly
import type { TableProps } from "antd";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

interface DataType {
  key: any;
  id?: string;
  level?: string;
  name?: string;
  achie?: string;
  timeAchie?: string;
  timeLevel?: string;
  prize?: string;
}
const columnsLevel: TableProps<DataType>["columns"] = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mã định danh",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Cấp đai",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Thời gian",
    dataIndex: "timeLevel",
    key: "timeLevel",
  },
];
const columnsAchie: TableProps<DataType>["columns"] = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Mã định danh",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Thành tích",
    dataIndex: "achie",
    key: "achie",
  },
  {
    title: "Giải thưởng",
    dataIndex: "prize",
    key: "prize",
  },
  {
    title: "Thời gian",
    dataIndex: "timeAchie",
    key: "timeAchie",
  },
];
const UpdateMember: React.FC = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [newUpdateLevel, setNewUpdateLevel] = useState<DataType[]>([]);
  const [newUpdateAchie, setNewUpdateAchie] = useState<DataType[]>([]);
  const [newDataLevel, setNewDataLevel] = useState<DataType[]>([]);
  const [newDataAchie, setNewDataAchie] = useState<DataType[]>([]);
  const handleConfirm = () => {
    //--------level
    const newEntry = newUpdateLevel[newUpdateLevel.length - 1];

    // Kiểm tra xem khóa đã tồn tại trong newUpdateLevel chưa
    const existingIndex = newUpdateLevel.findIndex(
      (entry) => entry.key == newEntry.key
    );
    console.log("existingIndex", existingIndex);

    if (existingIndex !== -1) {
      // Nếu khóa đã tồn tại, thay thế bản ghi cũ bằng bản ghi mới
      setNewDataLevel((prev) => [
        ...prev.slice(0, existingIndex),
        newEntry,
        ...prev.slice(existingIndex + 1),
      ]);
    } else {
      // Nếu khóa không tồn tại, thêm bản ghi mới vào cuối mảng
      setNewDataLevel((prev) => [...prev, newEntry]);
    }
    //----------------------------achie
    const newEntryAchie = newUpdateAchie[newUpdateAchie.length - 1];

    // Kiểm tra xem khóa đã tồn tại trong newUpdateAchie chưa
    const existingIndexAchie = newUpdateAchie.findIndex(
      (entry) => entry.key == newEntryAchie.key
    );

    if (existingIndexAchie !== -1) {
      // Nếu khóa đã tồn tại, thay thế bản ghi cũ bằng bản ghi mới
      setNewDataAchie((prev) => [
        ...prev.slice(0, existingIndexAchie),
        newEntryAchie,
        ...prev.slice(existingIndexAchie + 1),
      ]);
    } else {
      // Nếu khóa không tồn tại, thêm bản ghi mới vào cuối mảng
      setNewDataAchie((prev) => [...prev, newEntryAchie]);
    }
    console.log("newDataAchie", newDataAchie);

    setIsDataChanged(false);
  };
  const handUpdate = () => {
    console.log("update");
  };
  useEffect(() => {
    if (isDataChanged) {
      const timerId = setTimeout(() => {
        handleConfirm();
      }, 1000);

      return () => {
        clearTimeout(timerId); // Clear the timeout if the component unmounts or isDataChanged becomes true
      };
    }
  }, [isDataChanged]);
  return (
    <div className={styles.wrapUpdate}>
      <Row gutter={16}>
        <Col span={11}>
          <UpdateMemberTableLevel
            setIsDataChanged={setIsDataChanged}
            setIsDisableBtn={setIsDisableBtn}
            isDataChanged={isDataChanged}
            setNewUpdate={setNewUpdateLevel}
            newUpdate={newUpdateLevel}
          />
          {newDataLevel.every((item) => item !== undefined) &&
          newDataLevel.length > 0 ? (
            <>
              xxxx|{newDataLevel[newDataLevel.length - 1]?.level}|
              {newDataLevel[newDataLevel.length - 1]?.timeLevel}
              <Table columns={columnsLevel} dataSource={newDataLevel} />
              <div className={styles.buttonUpdate}>
                <button
                  className={styles.btnEccept}
                  onClick={handleConfirm}
                  disabled={!isDisableBtn}
                >
                  Xác nhận
                </button>
                <button
                  className={styles.btnDeny}
                  onClick={handUpdate}
                  disabled={!isDataChanged}
                >
                  Hoàn tác
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </Col>
        <Col span={13}>
          <UpdateMemberTableAchie
            setIsDataChanged={setIsDataChanged}
            setIsDisableBtn={setIsDisableBtn}
            isDataChanged={isDataChanged}
            setNewUpdate={setNewUpdateAchie}
            newUpdate={newUpdateAchie}
          />
          {newDataAchie.every((item) => item !== undefined) &&
          newDataAchie.length > 0 ? (
            <>
              {" "}
              xxxx|{newDataAchie[newDataAchie.length - 1]?.prize}|
              {newDataLevel[newDataLevel.length - 1]?.timeAchie}
              <Table columns={columnsAchie} dataSource={newDataAchie} />
              <div className={styles.buttonUpdate}>
                <button
                  className={styles.btnEccept}
                  onClick={handleConfirm}
                  disabled={!isDisableBtn}
                >
                  Xác nhận
                </button>
                <button
                  className={styles.btnDeny}
                  onClick={handUpdate}
                  disabled={!isDataChanged}
                >
                  Hoàn tác
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UpdateMember;