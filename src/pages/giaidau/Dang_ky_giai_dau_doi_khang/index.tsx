import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import CustomTableWeightOne from "./tableWeightOne";
import CustomTableWeightTwo from "./tableWeighTwo";

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
        </div>
      </div>
      <div>
        <CustomTableWeightOne />
        <CustomTableWeightTwo />
      </div>
    </>
  );
};

export default TournamentRegistration;
