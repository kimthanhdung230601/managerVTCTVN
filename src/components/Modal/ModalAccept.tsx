import React, { useState } from "react";
import { Button, Modal } from "antd";

interface ModalAcceptProp {
  selectedRowKeys?: any;
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
  id: string;
  type: string;
}
const ModalAccept = ({
  selectedRowKeys,
  isModalOpen,
  handleCancel,
  handleOk,
  type = "Xét duyệt",
  id,
}: ModalAcceptProp) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  return (
    <>
      <Modal
        title={`${type} tài khoản`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText="OK"
        cancelText="Hủy"
        // footer={null}
      >
        <>
          {selectedRowKeys.length != 0 && !(typeof selectedRowKeys === "string")
            ? `${type} ${selectedRowKeys.length} tài khoản `
            : `Bạn có muốn ${type}  ${
                !(typeof selectedRowKeys === "string") ? "" : selectedRowKeys
              }  không?`}
        </>
      </Modal>
    </>
  );
};

export default ModalAccept;
