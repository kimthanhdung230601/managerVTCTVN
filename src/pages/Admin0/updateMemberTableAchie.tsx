import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Table } from "antd";
import type { GetRef } from "antd";
import { useQuery } from "react-query";
import { getList } from "../../api/example";
import styles from "./styles.module.scss";
type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  id: string;
  name: string;
  level: string;
  timeAchie: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  handleSaveB: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleSaveB,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: ` vui lòng nhập ${title}.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          className={styles.Items}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        <div className={styles.block}></div>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: string;
  id?: string;
  level?: string;
  name?: string;
  achie?: string;
  timeAchie?: string;
  // timeAchie?: string;
  prize?: string;
}
interface updateMemberTableAchieProp {
  setIsDataChanged: Function;
  setIsDisableBtn:Function;
  isDataChanged: boolean;
  setNewUpdate: any;
  newUpdate: any;
}
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const UpdateMemberTableAchie = ({
  setIsDataChanged,
  isDataChanged,
  setNewUpdate,
  newUpdate,
  setIsDisableBtn
}: updateMemberTableAchieProp) => {

  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      name: "Nguyễn Văn A",
      id: "VCT0011523",
      level: "14",
      prize: "vàng",
      achie: "Giải trẻ",
      timeAchie: "20/10/2023",
      // timeAchie: "20/10/2023",
    },
    {
      key: "1",
      name: "Nguyễn Văn A",
      id: "VCT0011523",
      prize: "vàng",
      achie: "Giải trẻ",
      level: "17",
      timeAchie: "20/10/2023",
    },
  ]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item: any) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 170,
      // editable: true,
    },
    {
      title: "Mã định danh",
      dataIndex: "id",
      // editable: true,
    },
    {
      title: "Thành tích",
      dataIndex: "achie",
      editable: true,
      width: 150,
    },
    {
      title: "Giải",
      dataIndex: "prize",
      width: 150,
      editable: true,
    },
    { title: "Thời gian", dataIndex: "timeAchie", width: 150, editable: true },
    // {
    //   // title: "operation",
    //   dataIndex: "operation",
    //   render: (_, record) =>
    //     dataSource?.length >= 1 ? (
    //       <Popconfirm
    //         title="Bạn có muốn xóa không?"
    //         okText="Có"
    //         cancelText="Hủy"
    //         onConfirm={() => handleDelete(record.key)}
    //       >
    //         <span>
    //           <button className={styles.btnTbDanger}>Xóa</button>
    //         </span>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];

  const handleAdd = () => {
    // Tạo một key mới
    const newKey = `${count}`;
    // Tạo dữ liệu mới với key và giá trị mặc định
    const newData: DataType = {
      key: newKey,
      id: "",
      name: "",
      level: "",
      timeAchie: "",
    };
    // Thêm dữ liệu mới vào dataSource

    // Check if the key already exists in newUpdate
    const keyExistsInNewUpdate = newUpdate.some(
      (item: any) => item.key === newKey
    );
    if (!keyExistsInNewUpdate) {
      setNewUpdate((prev: any) => [...prev, newData]);
      setIsDataChanged(true);
      setIsDisableBtn(true);
    }
    // Tăng count để sử dụng cho key tiếp theo
    setCount(count + 1);
    setIsDataChanged(true);
    setIsDisableBtn(true);

    setDataSource([...dataSource, newData]);
  
  };
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    // console.log("newData", newData[index]);

    setDataSource(newData);
    setNewUpdate((pre: any) => [...pre, newData[index]]);
    // setNewUpdate(newData[index]);
    setIsDataChanged(true); // Đánh dấu sự thay đổi khi lưu dữ liệu
    setIsDisableBtn(true);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //update thành tích

  return (
    <div className={styles.wrapUpdateChild}>
      <div>
        {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Thêm mới
        </Button> */}
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    </div>
  );
};

export default UpdateMemberTableAchie;
