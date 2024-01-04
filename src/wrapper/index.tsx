import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profiles from "../pages/Profiles";
const Wrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Profiles" element={<Profiles />}></Route>
      </Routes>
    </>
  );
};

export default Wrapper;
