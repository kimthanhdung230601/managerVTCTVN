import { Button, Form, Input, Modal } from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
interface ModalUpdateNoteProps {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
}
const { TextArea } = Input;

const ModalUpdateNote = ({
  isModalOpen,
  handleCancel,
  handleOk,
}: ModalUpdateNoteProps) => {
  const [form] = useForm();
  const onFinish = (value: any) => {
    console.log("value:", value);

    handleOk();
  };
  return (
    <>
      <Modal
        title="Chỉnh sửa"
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
