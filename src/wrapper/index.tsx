import { Route, Routes } from "react-router-dom";
import Article from "../pages/Article";
import Detail from "../pages/Detail";
import LevelOne from "../pages/f1";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Login/Signup";
import News from "../pages/News";
import Post from "../pages/Post";
import Search from "../pages/Search";

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
        <Route path="/dang-bai" element={<Post />}></Route>
        <Route path="/bai-viet" element={<Article />}></Route>
      </Routes>
    </>
  );
};

export default Wrapper;
