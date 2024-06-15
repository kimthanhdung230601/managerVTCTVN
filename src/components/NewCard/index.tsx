import React from "react";
import { Row, Col, Image, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin } from "../../api/ApiUser";
import { useMutation } from "react-query";
import { deleteNew } from "../../api/f0";

const extractContent = (html: string) => {
  const pTags = html.match(/<p>(.*?)<\/p>/g);

  let paragraphs: string[] = [];
  let images: string[] = [];

  if (pTags) {
    pTags.forEach((pTag) => {
      const imgMatch = pTag.match(/<img.*?src="(.*?)".*?>/);
      if (imgMatch) {
        images.push(imgMatch[1]);
      } else {
        const textMatch = pTag.match(/<p>(.*?)<\/p>/);
        if (textMatch) {
          paragraphs.push(textMatch[1]);
        }
      }
    });
  }

  return {
    paragraphs: paragraphs,
    images: images,
  };
};
export default function NewCard(props: any) {
  const { id, title, content, time } = props;
  const navigate = useNavigate();
  const result = extractContent(content);
  const deleteNewMutaion = useMutation(
    async (payload: any) => await deleteNew(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          message.success("Xoá bài viết thành công");
          props.refetch();
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      },
      onError: (error) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      },
    }
  );
  const confirm = (id: string) => {
    deleteNewMutaion.mutate({ id: id });
  };
  return (
    <>
      <Row gutter={40} className={styles.post} justify="center">
        <Col className={`gutter-row`} xxl={8} lg={8} md={8}>
          <Link to={`/bai-viet/${id}`} className={styles.imgWrap}>
            <Image
              src={
                result.images[0]
                  ? result.images[0]
                  : require("../../assets/image/new.png")
              }
              preview={false}
              className={styles.postImg}
            />
          </Link>
        </Col>
        <Col
          className="gutter-row"
          xxl={16}
          lg={16}
          md={16}
          style={{ padding: "20px 20px" }}
        >
          <Link to={`/bai-viet/${id}`}>
            <div className={styles.postTitle}>{title}</div>
          </Link>
          <div className={styles.postContent}>{result.paragraphs}</div>
          <div className={styles.time}>Đăng ngày {time}</div>
        </Col>
        {/* {isAdmin() === "0" && (
          <div className={styles.btnWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate(`/dang-bai/${props.id}`)}
            >
              <EditOutlined className={styles.icon} />
            </div>
            <Popconfirm
              title="Xác nhận"
              description="Bạn có chắc chắn muốn xoá bài viết không?"
              onConfirm={() => confirm(props.id)}
              okText="Đồng ý"
              cancelText="Huỷ"
            >
              <div className={styles.btn}>
                <DeleteOutlined className={styles.icon} />
              </div>
            </Popconfirm>
          </div>
        )} */}
      </Row>
    </>
  );
}
