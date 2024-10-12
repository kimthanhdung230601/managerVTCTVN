import CustomTableAdminOne from "./tableWeightOne";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";

interface Props {
  isNotShowTitle?: boolean;
  idClub?: number;
  isEdiTable?: boolean;
}
const AdminManagement = ({
  isNotShowTitle = false,
  idClub,
  isEdiTable = true,
}: Props) => {
  return (
    <>
      <div>
        {!isNotShowTitle && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "120px",
              flexDirection: "column",
            }}
          >
            <Logo />
          </div>
        )}
      </div>
      <div>
        <CustomTableAdminOne
          idClub={idClub}
          title="BẢNG DỮ LIỆU ĐỐI KHÁNG I"
          typeFilter="hinh_thuc_1"
          isEditTable={isEdiTable}
        />
        <CustomTableAdminOne
          idClub={idClub}
          title="BẢNG DỮ LIỆU ĐỐI KHÁNG II"
          typeFilter="hinh_thuc_2"
          isEditTable={isEdiTable}
        />
      </div>
    </>
  );
};

export default AdminManagement;
