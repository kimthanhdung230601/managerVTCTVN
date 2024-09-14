import { Route, Routes } from "react-router-dom";

import Home from "../pages/GiaiDau/Home";
import Update from "../pages/GiaiDau/Update";
import ExamnierOne from "../pages/GiaiDau/ExamierOne";
import Dashboard from "../pages/GiaiDau/Select";
// giám định: 1-5
// khu vực thi đấu: 1-2
const Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/nguoi-xem/:arena" element={<Home />}></Route>
        <Route path="/cap-nhat/:arena" element={<Update />}></Route>
        <Route path="/giam-dinh/:id/:arena" element={<ExamnierOne />} />
      </Routes>
    </>
  );
};

export default Component;
