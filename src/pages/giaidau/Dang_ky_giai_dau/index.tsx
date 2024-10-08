import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import CustomTable from "./table";

interface TournamentRegistrationProps {}

const TournamentRegistration = () => {
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

          <h1 style={{ marginTop: "48px" }}> THI ĐẤU ĐỐI KHÁNG HÌNH THỨC I</h1>
        </div>
      </div>
      <div>
        <CustomTable />
      </div>
    </>
  );
};

export default TournamentRegistration;
