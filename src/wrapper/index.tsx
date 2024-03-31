import React from 'react'
import { logout } from '../api/api';
import {message} from "antd"
import { useLocation, useNavigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Component from './routes';
import NotFoundPage from "../pages/404";
import { RouteList } from './configRoute';
import { isAdmin } from '../api/ApiUser';


export default function Wrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const router = useLocation()
  
  const permissionAdmin = (): number | undefined => {
    for (const route of RouteList) {
      if (router.pathname.includes(route.name)) {
        return route.permission
      }
    }
      return 404
  }


  const goToLogin = (): null => {
    if (typeof window !== "undefined") {
      logout()
      message.warning( `Bạn cần đăng nhập quyền admin để truy cập trang này!`, 5);
      setTimeout(()=>{
          navigate('/dang-nhap')
      }, 5000)
    }
    
    return null;
  };

  if(permissionAdmin() === 404) return <NotFoundPage />
  if(permissionAdmin() !== 3){
    if(Cookies.get("token")){
      if(permissionAdmin() === 0 && isAdmin() === "0") return <Component />
      else if(permissionAdmin() === 1 && parseInt(isAdmin(),10) <= 1) return <Component />
      else if(permissionAdmin() === 2 && parseInt(isAdmin(),10) <= 2) return <Component />
      else return goToLogin()
    } else return goToLogin()
  } else return <Component />
  return <Component />
}