import { Route, Routes } from "react-router-dom";
import Article from "../pages/Article";
import Detail from "../pages/Detail";
import LevelOne from "../pages/f1";
import Guide from "../pages/Guide";
import Home from "../pages/Home";
import JuryMember from "../pages/JuryMember";
import Login from "../pages/Login";
import SignupF2 from "../pages/Login/SignupF2";
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
import NotFoundPage from "../pages/404";
import UpdateProfiles from "../pages/UpdateF0";
import SignupF1 from "../pages/Login/SignupF1";
const Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dang-nhap" element={<Login />}></Route>
        <Route path="/dang-ky" element={<SignupF2 />}></Route>
        <Route path="/dang-ky-f1" element={<SignupF1 />}></Route>
        <Route path="/quan-ly-lien-doan-so-nganh" element={<LevelOne />}></Route>
        <Route path="/thong-tin-ho-so/:id" element={<Detail />}></Route>
        <Route path="/thong-tin-ho-so" element={<Detail />}></Route>
        <Route path="/tin-tuc" element={<News />}></Route>
        <Route path="/huong-dan" element={<Guide />}></Route>
        <Route path="/dang-bai" element={<Post />}></Route>
        <Route path="/bai-viet/:id" element={<Article />}></Route>
        <Route path="/chinh-sua-ho-so/:id" element={<UpdateProfiles />}></Route>
        <Route path="/huong-dan/:id" element={<Article />}></Route>
        <Route
          path="/thong-tin-tai-khoan/:id"
          element={<Account />}
        ></Route>
        <Route
          path="/doi-mat-khau"
          element={<ChangePassword />}
        ></Route>
        <Route path="/them-hoi-vien" element={<Profiles />}></Route>
        <Route path={`/lien-doan/:key`} element={<Admin />}></Route>
        <Route
          path="/lien-doan/:key/UpdateMember"
          element={<UpdateMember />}
        ></Route>
        <Route path="/quan-ly-don-vi" element={<AdminTwo />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Component;
