import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profiles from "../pages/Profiles";
import Admin from "../pages/Admin0";
import AdminTwo from "../pages/Admin2";
const Wrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Profiles" element={<Profiles />}></Route>
        <Route path="/Admin0" element={<Admin />}></Route>
        <Route path="/Admin2" element={<AdminTwo />}></Route>
      </Routes>
    </>
  );
};

export default Wrapper;
