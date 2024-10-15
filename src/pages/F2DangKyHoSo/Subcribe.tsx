import React, { useState } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation } from "react-query";
import { submitListmember } from "../../api/f2";
import { useParams } from "react-router";
import { updateListSubcribe } from "../../api/f0";
import useMemberSubscribe from "../../hook/useMemberSubscribe";
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
    (payload: any) => submitListmember(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") message.success("Cập nhật thành công.");
        else message.error("Không thể thêm mới thông tin");
      },
      onError: (data) => {
        message.error("Không thể thêm mới thông tin");
      },
    }
  );
  const updateMutation = useMutation(
    (payload: any) => updateListSubcribe(payload),
    {
      onSuccess: (data) => {
        if (data?.status === "success") message.success("Cập nhật thành công.");
        else message.error("Không thể thêm mới thông tin");
      },
      onError: (data) => {
        message.error("Không thể thêm mới thông tin");
      },
    }
  );

  const { groupByName } = useMemberSubscribe({ id: id });

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
    if (!!id) {
      updateMutation.mutate({
        id: idFight,
        iduser: memberSelected?.id,
      });
    } else {
      setUserSelected((prevState) => ({
        ...prevState,
        [ageGroup as keyof typeof prevState]: {
          ...prevState[ageGroup as keyof typeof prevState],
          [name as keyof AgeGroup]: {
            ...prevState[ageGroup as keyof typeof prevState][
              name as keyof AgeGroup
            ],
            [sex]: memberSelected.id,
          },
        },
      }));
    }
  };
  // console.log("groupByName", groupByName);

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
            <Button>Gửi hồ sơ</Button>
          </Popconfirm>
        )}
      </div>

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
  );
}
