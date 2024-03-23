import { Route, Routes } from "react-router-dom";
import Article from "../pages/Article";
import Detail from "../pages/Detail";
import LevelOne from "../pages/f1";
import Guide from "../pages/Guide";
import Home from "../pages/Home";
import JuryMember from "../pages/JuryMember";
import Login from "../pages/Login";
import Signup from "../pages/Login/Signup";
import News from "../pages/News";
import Post from "../pages/Post";
import Search from "../pages/Search";
import Profiles from "../pages/Profiles";
import Admin from "../pages/Admin0";
import UpdateMember from "../pages/Admin0/updateMember";
import AdminTwo from "../pages/Admin2";
import Account from "../pages/Account";
import ChangePassword from "../pages/ChangePassword";
import CryptoJS from "crypto-js";
const Wrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dang-nhap" element={<Login />}></Route>
        <Route path="/dang-ky" element={<Signup />}></Route>
        <Route path="/admin1" element={<LevelOne />}></Route>
        <Route path="/thong-tin-ho-so" element={<Detail />}></Route>
        <Route path="/tra-cuu-hoi-vien" element={<Search />}></Route>
        <Route path="/tin-tuc" element={<News />}></Route>
        <Route path="/huong-dan" element={<Guide />}></Route>
        <Route path="/dang-bai" element={<Post />}></Route>
        <Route path="/bai-viet" element={<Article />}></Route>
        <Route
          path="/hoi-vien-du-tu-cach-giam-khao"
          element={<JuryMember />}
        ></Route>
        <Route
          path="/thong-tin-tai-khoan"
          element={<Account />}
        ></Route>
        <Route
          path="/doi-mat-khau"
          element={<ChangePassword />}
        ></Route>
        <Route path="/them-hoi-vien" element={<Profiles />}></Route>
        <Route path={`Admin0/:key`} element={<Admin />}></Route>
        <Route path="/Admin0/:key/UpdateMember" element={<UpdateMember />}></Route>
        <Route path="/Admin2" element={<AdminTwo />}></Route>
      </Routes>
    </>
  );
};

export default Wrapper;
