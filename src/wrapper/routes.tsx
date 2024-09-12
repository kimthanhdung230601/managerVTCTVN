import { Route, Routes } from "react-router-dom";

import Home from "../pages/GiaiDau/Home";
import Update from "../pages/GiaiDau/Update";
import ExamnierOne from "../pages/GiaiDau/ExamierOne";
import ExamnierTwo from "../pages/GiaiDau/ExamierTwo";
import ExamnierThree from "../pages/GiaiDau/ExamierThree";
import ExamierFour from "../pages/GiaiDau/ExamierFour";
import ExamierFive from "../pages/GiaiDau/ExamierFive";
import Dashboard from "../pages/GiaiDau/Select";
const Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/nguoi-xem" element={<Home />}></Route>
        <Route path="/cap-nhat" element={<Update />}></Route>
        <Route path="/giam-dinh-1" element={<ExamnierOne />}></Route>
        <Route path="/giam-dinh-2" element={<ExamnierTwo />}></Route>
        <Route path="/giam-dinh-3" element={<ExamnierThree />}></Route>
        <Route path="/giam-dinh-4" element={<ExamierFour />}></Route>
        <Route path="/giam-dinh-5" element={<ExamierFive />}></Route>
      </Routes>
    </>
  );
};

export default Component;
