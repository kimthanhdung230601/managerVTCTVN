import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Spin, Table } from "antd";
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
    title: "Ngày cấp",
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
  const [isDataChangedLevel, setIsDataChangedLevel] = useState(false);
  const [isDataChangedAchie, setIsDataChangedAchie] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [newUpdateLevel, setNewUpdateLevel] = useState<DataType[]>([]);
  const [newUpdateAchie, setNewUpdateAchie] = useState<DataType[]>([]);
  const [newDataLevel, setNewDataLevel] = useState<DataType[]>([]);
  const [newDataAchie, setNewDataAchie] = useState<DataType[]>([]);
  const handleConfirmLevel = () => {
    //--------level
    const newEntry = newUpdateLevel[newUpdateLevel.length - 1];

    // Kiểm tra xem khóa đã tồn tại trong newUpdateLevel chưa
    const existingIndex = newUpdateLevel.findIndex(
      (entry) => entry.id == newEntry.id
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
    setIsDataChangedLevel(false);
  };
  const handleConfirmAchie = () => {
    //----------------------------achie
    const newEntryAchie = newUpdateAchie[newUpdateAchie.length - 1];

    // Kiểm tra xem khóa đã tồn tại trong newUpdateAchie chưa
    const existingIndexAchie = newUpdateAchie.findIndex(
      (entry) => entry.id == newEntryAchie.id
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

    setIsDataChangedAchie(false);
  };
  const handUpdate = () => {
    console.log("update");
  };
  useEffect(() => {
    if (isDataChangedLevel) {
      const timerId = setTimeout(() => {
        handleConfirmLevel();
      }, 1000);

      return () => {
        clearTimeout(timerId); // Clear the timeout if the component unmounts or isDataChanged becomes true
      };
    }
    if (isDataChangedAchie) {
      const timerId = setTimeout(() => {
        handleConfirmAchie();
      }, 1000);

      return () => {
        clearTimeout(timerId); // Clear the timeout if the component unmounts or isDataChanged becomes true
      };
    }
  }, [isDataChangedLevel, isDataChangedAchie]);
  return (
    <div className={styles.wrapUpdate}>
      {/* <Spin spinning={true} size="large" ><div style={{width:"200px", height:"200px", color:"#046c39"}}>456</div></Spin> */}
      <Row gutter={16}>
        <Col span={11} xs={24} sm={24} md={24} lg={11} xl={11}>
          <UpdateMemberTableLevel
            setIsDataChanged={setIsDataChangedLevel}
            setIsDisableBtn={setIsDisableBtn}
            isDataChanged={isDataChangedLevel}
            setNewUpdate={setNewUpdateLevel}
            newUpdate={newUpdateLevel}
          />
          {newDataLevel.every((item) => item !== undefined) &&
          newDataLevel.length > 0 ? (
            <>
              xxxx|{newDataLevel[newDataLevel.length - 1]?.level}|
              {newDataLevel[newDataLevel.length - 1]?.timeLevel}
              <Spin spinning={isDataChangedLevel}>
                {" "}
                <Table
                  columns={columnsLevel}
                  dataSource={newDataLevel}
                  scroll={{
                    x: "max-content",
                    y: "calc(100vh - 200px)",
                  }}
                  style={{ overflowX: "auto" }}
                />
              </Spin>
              <div className={styles.buttonUpdate}>
                <button
                  className={styles.btnEccept}
                  onClick={handleConfirmLevel}
                  disabled={!isDisableBtn}
                >
                  Xác nhận
                </button>
                <button
                  className={styles.btnDeny}
                  onClick={handUpdate}
                  disabled={!isDataChangedLevel}
                >
                  Hoàn tác
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </Col>
        <Col span={13} xs={24} sm={24} md={24} lg={13} xl={13}>
          <UpdateMemberTableAchie
            setIsDataChanged={setIsDataChangedAchie}
            setIsDisableBtn={setIsDisableBtn}
            isDataChanged={isDataChangedAchie}
            setNewUpdate={setNewUpdateAchie}
            newUpdate={newUpdateAchie}
          />
          {newDataAchie.every((item) => item !== undefined) &&
          newDataAchie.length > 0 ? (
            <>
              {" "}
              xxxx|{newDataAchie[newDataAchie.length - 1]?.prize}|
              {newDataAchie[newDataAchie.length - 1]?.timeAchie}
              <Spin spinning={isDataChangedAchie} delay={500}>
                <Table
                  columns={columnsAchie}
                  dataSource={newDataAchie}
                  scroll={{
                    x: "max-content",
                    y: "calc(100vh - 200px)",
                  }}
                  style={{ overflowX: "auto" }}
                />
              </Spin>
              <div className={styles.buttonUpdate}>
                <button
                  className={styles.btnEccept}
                  onClick={handleConfirmAchie}
                  disabled={!isDisableBtn}
                >
                  Xác nhận
                </button>
                <button
                  className={styles.btnDeny}
                  onClick={handUpdate}
                  disabled={!isDataChangedAchie}
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
