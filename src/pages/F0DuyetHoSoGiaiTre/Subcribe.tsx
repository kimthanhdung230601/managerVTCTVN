import React, { useState } from "react";
import styles from "./styles.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import Subcribe1 from "./Subcribe1";
import Subcribe2 from "./Subcribe2";
import Subcribe3 from "./Subcribe3";
import { useMutation, useQuery } from "react-query";
import { submitListmember } from "../../api/youngPrize";
import { useLocation, useParams } from "react-router";
import { getListSubcribe, updateListSubcribe } from "../../api/youngPrize";
import useMemberSubscribe from "../../hook/useMemberSubscribe";
import { isAdmin } from "../../api/ApiUser";
import useMemberYoungPrize from "../../hook/useMemberYoungPrize";
import { ageGroups } from "../../constant/ContentYoungPrize";
import SubcribeOther from "./SubcribeOther";
import SubcribeDL from "./SubcribeDL";
interface User {
  sex: string;
  id: string;
}

interface TechniqueGroup {
  [techniqueName: string]: {
    [sex: string]: string | undefined;
  };
}

export default function Subcribe() {
  const { id } = useParams();
  const [userSelected, setUserSelected] = useState(ageGroups);
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

  const { groupByName } = useMemberYoungPrize({ id: id });

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    submitMutation.mutate(userSelected);
  };

  const onSelectMember = (
    name: string,
    sex: string,
    ageGroup: string,
    memberSelected: any,
    idFight?: string,
    type?: string
  ) => {
    if (!!id && idFight) {
      updateMutation.mutate({
        id: idFight,
        iduser: memberSelected?.id,
      });
    } else {
      if (type === "Quyền Quy Định" || type === "Quyền Tự Chọn") {
        submitMutation.mutate({
          [ageGroup]: {
            [name]: {
              [type]: {
                [sex]: memberSelected.id,
              },
            },
          },
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
      {groupByName !== undefined && Object.keys(groupByName).length > 0 ? (
        <div style={{ marginBottom: "20px" }}>
          <p className={styles.title}>NHÓM 1 TỪ 6 ĐẾN 10 TUỔI</p>
          <Subcribe1
            idclub={id}
            listMemberSubscribe={groupByName?.["Nhóm tuổi 1"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>NHÓM 2 TỪ 11 ĐẾN 14 TUỔI</p>
          <Subcribe2
            idclub={id}
            listMemberSubscribe={groupByName?.["Nhóm tuổi 2"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>NHÓM 3 TỪ 15 ĐẾN 17 TUỔI</p>
          <Subcribe3
            idclub={id}
            listMemberSubscribe={groupByName?.["Nhóm tuổi 3"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>QUYỀN TỰ CHỌN (từ 6 đến 17 tuổi)</p>
          <SubcribeOther
            idclub={id}
            listMemberSubscribe={groupByName?.["Khác"]}
            onSelectMember={onSelectMember}
          />
          <p className={styles.title}>ĐỐI LUYỆN (từ 6 đến 17 tuổi)</p>
          <SubcribeDL
            idclub={id}
            listMemberSubscribe={groupByName?.["Đối luyện"]}
            onSelectMember={onSelectMember}
          />
        </div>
      ) : (
        <div className={styles.noti}>Chưa có dữ liệu</div>
      )}
    </div>
  );
}
