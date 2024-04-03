import { Button, Form, Input, Modal } from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import { editNote } from "../../api/f2";
import { useEffect } from "react";
interface ModalUpdateNoteProps {
  id: any;
  note: string;
  refetch: () => void;
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
}
const { TextArea } = Input;

const ModalUpdateNote = ({
  isModalOpen,
  handleCancel,
  handleOk,
  id,
  refetch,
  note,
}: ModalUpdateNoteProps) => {
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({});
    form.setFieldsValue({ note: note });
  }, [isModalOpen, note, id]);
  const onFinish = async (value: any) => {
    const payload = {
      id: id,
      note: value.note,
    };
    const res = await editNote(payload);
    refetch();
    handleOk();
  };
  return (
    <>
      <Modal
        title={`Chỉnh sửa ghi chú`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="Chỉnh sửa ghi chú" name="note">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className={styles.btn}>
            <div className={styles.btnContainer}>
              <Button className="btn" htmlType="submit">
                Lưu
              </Button>
              <Button
                onClick={handleCancel}
                className="btn-boder"
                style={{ marginLeft: "10px" }}
              >
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateNote;
