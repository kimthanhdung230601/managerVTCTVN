import CustomTableAdminOne from "./tableWeightOne";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import CustomTableAdminTwo from "./tableWeightTwo";

const AdminManagement = () => {
  return (
    <>
      <div>
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
      </div>
      <div>
        <CustomTableAdminOne />
        <CustomTableAdminTwo />
      </div>
    </>
  );
};

export default AdminManagement;
