import React, { useState } from "react";
import { Button, Modal } from "antd";

interface ModalAcceptProp {
  selectedRowKeys?: any;
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
}
const ModalAccept = ({
  selectedRowKeys,
  isModalOpen,
  handleCancel,
  handleOk,
}: ModalAcceptProp) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  
  return (
    <>

      <Modal
        title="Xét duyệt tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText="OK"
        cancelText="Hủy"
        // footer={null}
      >
        <>
        {selectedRowKeys.length != 0 ? `Xét duyệt ${selectedRowKeys.length} tài khoản ` : `Bạn có muốn duyệt tài khoản này`}
        </>
       
      </Modal>
    </>
  );
};

export default ModalAccept;
