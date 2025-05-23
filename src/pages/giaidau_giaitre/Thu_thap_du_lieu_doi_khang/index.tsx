import CustomTableAdminOne from "./tableWeightOne";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { useParams } from "react-router";
import { getManagamentMember } from "../../../api/youngPrize";
import { isAdmin } from "../../../api/ApiUser";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { IData, IResponseFight2024 } from "../../../type";
import { exampleData } from "../Data";

interface Props {
  isNotShowTitle?: boolean;
  idClub?: number;
  isEdiTable?: boolean;
  isShowFullTable?: boolean;
}
const AdminManagementYpungPrize = ({
  isNotShowTitle = false,
  idClub,
  isEdiTable = true,
  isShowFullTable = false,
}: Props) => {
  const [data, setData] = useState<IResponseFight2024>({
    status: "success",
    pending: false,
    data: exampleData,
  });

  const payload = { mode: 2, ...(idClub && { idclub: idClub as number }) };

  useEffect(() => {
    const fetchManagementMember = async () => {
      const res = await getManagamentMember(payload);
      if (res?.data) {
        const updatedData: IData[] = updateExampleData(exampleData, res?.data);
        if (isShowFullTable === true) {
          setData(res);
        } else {
          setData({ ...res, data: updatedData });
        }
      }
    };
    fetchManagementMember();
  }, []);

  const updateExampleData = (exampleData: IData[], responseData: IData[]) => {
    return exampleData.map((item) => {
      const updatedItem = responseData.find(
        (data) =>
          data.name === item.name &&
          data.type === item.type &&
          data.sex === item.sex
      );
      if (updatedItem) {
        return {
          ...item,
          id: updatedItem.id || item.id,
          idclub: updatedItem.idclub || item.idclub,
          iduser: updatedItem.iduser || item.iduser,
          hoTen: updatedItem.hoTen || item.hoTen,
          tenClb: updatedItem.tenClb || item.tenClb,
          birthday: updatedItem.birthday || item.birthday,
          code: updatedItem.code || item.code,
          image: updatedItem.image || item.image,
        };
      }

      return item;
    });
  };
  return (
    <>
      <div>
        <CustomTableAdminOne
          idClub={idClub}
          title="NHÓM TUỔI 1 TỪ 12 ĐẾN 13 TUỔI"
          typeFilter="hinh_thuc_1"
          isEditTable={isEdiTable}
          dataManagement={data}
        />
        <CustomTableAdminOne
          idClub={idClub}
          title="NHÓM TUỔI 2 TỪ 14 ĐẾN 15 TUỔI"
          typeFilter="hinh_thuc_2"
          isEditTable={isEdiTable}
          dataManagement={data}
        />
        <CustomTableAdminOne
          idClub={idClub}
          title="NHÓM TUỔI 3 TỪ 16 ĐẾN 17 TUỔI"
          typeFilter="hinh_thuc_2"
          isEditTable={isEdiTable}
          dataManagement={data}
        />
      </div>
    </>
  );
};

export default AdminManagementYpungPrize;
