import { Route, Routes } from "react-router-dom";
import Article from "../pages/Article";
import Detail from "../pages/Detail";
import LevelOne from "../pages/f1";
import Guide from "../pages/Guide";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignupF2 from "../pages/Login/SignupF2";
import News from "../pages/News";
import Post from "../pages/Post";
import Profiles from "../pages/Profiles";
import Admin from "../pages/Admin0";
import UpdateMember from "../pages/Admin0/updateMember";
import AdminTwo from "../pages/Admin2";
import Account from "../pages/Account";
import ChangePassword from "../pages/ChangePassword";
import NotFoundPage from "../pages/404";
import UpdateProfiles from "../pages/UpdateF0";
import SignupF1 from "../pages/Login/SignupF1";
import SignupF2Free from "../pages/Login/SignupF2Free";
import RegisterForPrize from "../pages/RegisterForPrize";
import AdminManagement from "../pages/giaidau/Thu_thap_du_lieu_doi_khang";
import AcceptListMember from "../pages/giaidau/Xem_chi_tiet_du_lieu_duyet";
import AcceptListMemberDetail from "../pages/giaidau/Xem_chi_tiet_du_lieu_duyet";
import AcceptSubscribe from "../pages/AcceptSubscibe";
import F0AcceptFile from "../pages/F0DuyetHoSo";
import F2Subcribe from "../pages/F2DangKyHoSo";
import F0ViewList from "../pages/F0ViewList";
import F2SubcribeYoungPrize from "../pages/F2DangKyGiaiTre";
import F0ViewListYoungPrize from "../pages/F0ViewListYoungPrize";
import F0AcceptFileGiaiTre from "../pages/F0DuyetHoSoGiaiTre";
const Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dang-nhap" element={<Login />}></Route>
        <Route path="/dang-ky" element={<SignupF2 />}></Route>
        <Route path="/dang-ky-tai-khoan" element={<SignupF2Free />}></Route>
        <Route path="/dang-ky-f1" element={<SignupF1 />}></Route>
        <Route
          path="/quan-ly-lien-doan-so-nganh"
          element={<LevelOne />}
        ></Route>
        <Route path="/thong-tin-ho-so/:id" element={<Detail />}></Route>
        <Route path="/thong-tin-ho-so" element={<Detail />}></Route>
        <Route path="/tin-tuc" element={<News />}></Route>
        <Route path="/huong-dan" element={<Guide />}></Route>
        <Route path="/dangkygiaivodich" element={<RegisterForPrize />}></Route>
        <Route path="/dang-bai" element={<Post />}></Route>
        <Route path="/dang-bai/:id" element={<Post />}></Route>
        <Route path="/bai-viet/:id" element={<Article />}></Route>
        <Route path="/chinh-sua-ho-so/:id" element={<UpdateProfiles />}></Route>
        <Route path="/huong-dan/:id" element={<Article />}></Route>
        <Route path="/thong-tin-tai-khoan/:id" element={<Account />}></Route>
        <Route path="/doi-mat-khau" element={<ChangePassword />}></Route>
        <Route path="/them-hoi-vien" element={<Profiles />}></Route>
        <Route path="/them-hoi-vien/:key" element={<Profiles />}></Route>

        <Route path={`/lien-doan/:key`} element={<Admin />}></Route>
        <Route
          path="/lien-doan/:key/UpdateMember"
          element={<UpdateMember />}
        ></Route>
        <Route path="/quan-ly-don-vi" element={<AdminTwo />}></Route>
        {/* dang ky giai dau */}
        {/* <Route
          path="/dang-ky-giai-dau"
          element={<TournamentRegistration />}
          ></Route> */}
        <Route path="/quan-ly-giai-dau" element={<AdminManagement />}></Route>
        <Route path="/duyet-giai-tre" element={<AcceptListMember />}></Route>
        {/* f0 duyệt hồ sơ đăng ký */}
        <Route
          path="/duyet-ho-so-dang-ky"
          element={<AcceptSubscribe />}
        ></Route>

        {/* F0 sua ho so chi tiet*/}
        <Route path="/dang-ky-thi-dau/:id" element={<F0AcceptFile />}></Route>
        <Route
          path="/dang-ky-thi-dau-giai-tre/:id"
          element={<F0AcceptFileGiaiTre />}
        ></Route>

        {/* f0 xem danh sach nhieu CLB */}
        <Route path="/danh-sach-thi-dau" element={<F0ViewList />}></Route>
        <Route
          path="/danh-sach-thi-dau-giai-tre"
          element={<F0ViewListYoungPrize />}
        ></Route>

        {/* f2 dang ky thi dau  */}
        <Route path="/dang-ky-thi-dau" element={<F2Subcribe />}></Route>
        <Route
          path="/dang-ky-giai-tre"
          element={<F2SubcribeYoungPrize />}
        ></Route>

        <Route
          path="/duyet-giai-dau/:id"
          element={<AcceptListMemberDetail />}
        ></Route>
        {/*  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Component;
