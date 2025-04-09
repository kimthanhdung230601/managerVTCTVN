import React, { useState } from "react";
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import { Table, Button } from "antd";
import { TableProps, Popconfirm, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { acceptClubSubscribe, getListAcceptSubscribe } from "../../api/f0";
import { useNavigate } from "react-router";
import ModalAccept from "../../components/Modal/ModalAccept";

interface DataType {
  idclub: string;
  nameClb: string;
  mode_1: number;
  mode_2: number;
  pending: string;
}

export default function AcceptSubscribe() {
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState({
    id: "",
    name: "",
    type: "",
  });
  const { data: getListAccept, refetch } = useQuery(["listAccept"], () =>
    getListAcceptSubscribe()
  );
  const acceptMutation = useMutation(
    (payload: any) => acceptClubSubscribe(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          message.success("Cập nhật thành công.");
          refetch();
        } else message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
      onError: (data) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
    }
  );
  const handleUpdateMember = (id: string, name: string, type: string) => {
    setClubInfo({
      id: id,
      name: name,
      type: type,
    });
  };
  const handleCancelUpdate = () => {
    setClubInfo({
      id: "",
      name: "",
      type: "",
    });
  };
  const confirm = () => {
    acceptMutation.mutate({ idclub: clubInfo?.id });
    handleCancelUpdate();
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      render: (_, record, index) => <span>{++index}</span>,
    },
    {
      title: "Tên đơn vị",
      dataIndex: "nameClb",
      key: "club",
    },
    {
      title: "Số vận động viên quyền thuật",
      dataIndex: "mode_1",
      key: "mode_1",
    },
    {
      title: "Số vận động viên đối kháng",
      dataIndex: "mode_2",
      key: "mode_2",
    },
    {
      title: "Tình trạng hồ sơ",
      dataIndex: "pending",
      key: "pending",
      render: (value, record, index) => (
        <div>
          {value === "1" && <span className={styles.accept}>Đã duyệt</span>}
          {value === "0" && (
            <span className={styles.notApproved}>Chưa duyệt</span>
          )}
        </div>
      ),
    },
    {
      title: "Xem/Sửa/Duyệt",

      render: (_, record) => (
        <div className={styles.buttonWrap}>
          <Button
            onClick={() => navigate(`/dang-ky-thi-dau/${record?.idclub}`)}
            className={styles.view}
          >
            Xem/Sửa
          </Button>

          <Button
            disabled={record?.pending === "1"}
            className={styles.accept}
            onClick={() =>
              handleUpdateMember(record?.idclub, record.nameClb, "Xét duyệt")
            }
          >
            Duyệt
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      {" "}
      <Header />
      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>DUYỆT HỒ SƠ ĐĂNG KÝ</p>
          <div className={styles.tableWrap}>
            <Table
              pagination={false}
              dataSource={getListAccept?.data || []}
              columns={columns}
            />
          </div>
          <div className={styles.total}>
            <div className={styles.total1}>Tổng số</div>
            <div className={styles.total2}>
              Vận động viên quyền thuật:{" "}
              <b>{getListAccept?.total[0].total_mode_1}</b>
            </div>
            <div className={styles.total2}>
              Vận động viên đối kháng hình thức:{" "}
              <b>{getListAccept?.total[0].total_mode_2}</b>
            </div>
          </div>
        </div>
      </div>
      <ModalAccept
        selectedRowKeys={clubInfo.name}
        handleOk={confirm}
        handleCancel={handleCancelUpdate}
        id=""
        isModalOpen={!!clubInfo.id}
        type={clubInfo.type}
      />
    </>
  );
}
