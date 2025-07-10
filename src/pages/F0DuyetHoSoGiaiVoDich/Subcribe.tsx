import React, { useState } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation, useQuery } from "react-query";
import { submitListmember } from "../../api/giaiVoDich";
import { useLocation, useParams } from "react-router";
import { getListSubcribe, updateListSubcribe } from "../../api/giaiVoDich";
import useMemberGiaiVoDich from "../../hook/useMemberGiaiVoDich";
import { isAdmin } from "../../api/ApiUser";

interface User {
  sex: string;
  id: string;
}

interface AgeGroup {
  "Lão Hổ Thượng Sơn": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Hùng Kê Quyền": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Ngọc Trản Quyền": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Lão Mai Quyền": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Phong Hoa Đao": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Thanh Long Độc Kiếm": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Song Tuyết Kiếm": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Thái Côn Sơn": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Siêu Xung Thiên": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Độc Lư Thương": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Quyền Tay Không": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Binh Khí Ngắn, Đôi": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Binh Khí Dài": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Các loại binh khí khác": {
    // Nam: User | null;
    // Nữ: User | null;
  };
  "Tay không chống tay không"?: {};
  "Tay không chống binh khí"?: {};
  "Binh khí chống binh khí"?: {};
}

const listContents = [
  "Lão Hổ Thượng Sơn",
  "Hùng Kê Quyền",
  "Ngọc Trản Quyền",
  "Lão Mai Quyền",
  "Phong Hoa Đao",
  "Thanh Long Độc Kiếm",
  "Song Tuyết Kiếm",
  "Thái Côn Sơn",
  "Siêu Xung Thiên",
  "Độc Lư Thương",
];

export default function Subcribe() {
  const { id } = useParams();
  const [userSelected, setUserSelected] = useState<{
    "Nhóm tuổi 1": AgeGroup;
    "Nhóm tuổi 2": AgeGroup;
    "Nhóm tuổi 3": AgeGroup;
  }>({
    "Nhóm tuổi 1": {
      "Lão Hổ Thượng Sơn": {},
      "Hùng Kê Quyền": {},
      "Ngọc Trản Quyền": {},
      "Lão Mai Quyền": {},
      "Phong Hoa Đao": {},
      "Thanh Long Độc Kiếm": {},
      "Song Tuyết Kiếm": {},
      "Thái Côn Sơn": {},
      "Siêu Xung Thiên": {},
      "Độc Lư Thương": {},
      "Quyền Tay Không": {},
      "Binh Khí Ngắn, Đôi": {},
      "Binh Khí Dài": {},
      "Các loại binh khí khác": {},
      "Tay không chống tay không": {},
      "Tay không chống binh khí": {},
      "Binh khí chống binh khí": {},
    },
    "Nhóm tuổi 2": {
      "Lão Hổ Thượng Sơn": {},
      "Hùng Kê Quyền": {},
      "Ngọc Trản Quyền": {},
      "Lão Mai Quyền": {},
      "Phong Hoa Đao": {},
      "Thanh Long Độc Kiếm": {},
      "Song Tuyết Kiếm": {},
      "Thái Côn Sơn": {},
      "Siêu Xung Thiên": {},
      "Độc Lư Thương": {},
      "Quyền Tay Không": {},
      "Binh Khí Ngắn, Đôi": {},
      "Binh Khí Dài": {},
      "Các loại binh khí khác": {},
    },
    "Nhóm tuổi 3": {
      "Lão Hổ Thượng Sơn": {},
      "Hùng Kê Quyền": {},
      "Ngọc Trản Quyền": {},
      "Lão Mai Quyền": {},
      "Phong Hoa Đao": {},
      "Thanh Long Độc Kiếm": {},
      "Song Tuyết Kiếm": {},
      "Thái Côn Sơn": {},
      "Siêu Xung Thiên": {},
      "Độc Lư Thương": {},
      "Quyền Tay Không": {},
      "Binh Khí Ngắn, Đôi": {},
      "Binh Khí Dài": {},
      "Các loại binh khí khác": {},
    },
  });
  const submitMutation = useMutation(
    (payload: any) => submitListmember(id, payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") message.success("Cập nhật thành công.");
        else message.error(data?.data);
      },
      onError: (data) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
    }
  );
  const updateMutation = useMutation(
    (payload: any) => updateListSubcribe(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") message.success("Cập nhật thành công.");
        else message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
      onError: (data) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      },
    }
  );

  const { groupByName } = useMemberGiaiVoDich({ id: id });

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    submitMutation.mutate(userSelected);
  };

  const onSelectMember = (
    name: string,
    sex: string,
    ageGroup: string,
    memberSelected: any,
    idFight?: string
  ) => {
    if (!!id && idFight) {
      updateMutation.mutate({
        id: idFight,
        iduser: memberSelected?.id,
      });
    } else {
      submitMutation.mutate({
        [ageGroup]: {
          [name]: {
            [sex]: memberSelected.id,
          },
        },
      });
    }
  };

  return (
    <div className={styles.tableWrap}>
      <div className={styles.btnWrap}>
        {isAdmin() === "2" && (
          <Popconfirm
            title="Lưu ý"
            description="Khi hồ sơ đã gửi sẽ không sửa được nữa, bạn chắc chắn muốn gửi?"
            onConfirm={confirm}
            okText="Có"
            cancelText="Huỷ"
          >
            <Button danger>Đăng ký</Button>
          </Popconfirm>
        )}
      </div>
      {/* {groupByName !== undefined && Object.keys(groupByName).length > 0 ? ( */}
      <div>
        <p className={styles.title}>NỘI DUNG QUYỀN QUY ĐỊNH</p>
        <Subcribe1
          idclub={id}
          listMemberSubscribe={groupByName}
          onSelectMember={onSelectMember}
        />
        <p className={styles.title}>NỘI DUNG QUYỀN TỰ CHỌN</p>
        <Subcribe2
          idclub={id}
          listMemberSubscribe={groupByName}
          onSelectMember={onSelectMember}
        />
        <p className={styles.title}>NỘI DUNG ĐỐI LUYỆN</p>
        <Subcribe3
          idclub={id}
          listMemberSubscribe={groupByName}
          onSelectMember={onSelectMember}
        />
      </div>
      {/* ) : (
        <div className={styles.noti}>Chưa có dữ liệu</div>
      )} */}
    </div>
  );
}
