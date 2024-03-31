import { Col, Image, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./Style.module.scss"
import 'animate.css';
import {MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import Cookies from 'js-cookie';
import { logout } from '../../api/api';
import { isAdmin } from '../../api/ApiUser';
export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [manage, setManage] = useState("")
    const handleOpenMenu = () => {
        const menu = document.getElementById('menuResponsive')
        if(isOpen && menu) {
            setIsOpen(false)
            menu.style.display = 'none';
        } else if(!isOpen && menu) {
            setIsOpen(true)
            menu.style.display = 'block'
        }
        
    }
    const handleCloseMenu = () => {
        const menu = document.getElementById('menuResponsive')
        if(isOpen && menu){
           setIsOpen(false) 
           menu.style.display = 'none'
        } 
    }
    const handleLogout = () => {
        logout();
        window.location.replace("/dang-nhap")
    }
    useEffect(()=>{
        if(Cookies.get("token")){
            if(isAdmin() === "0") setManage("/lien-doan/quan-ly-hoi-vien")
            else if(isAdmin() === "1") setManage("/quan-ly-lien-doan-so-nganh")
            else if(isAdmin() === "2") setManage("/quan-ly-don-vi")
        }
        
    },[Cookies.get("token")])
  return (
    <>
        <Row  justify="space-between" className={styles.wrap}>
            <Col className='gutter-row'>
            <Row gutter={40} className={styles.headerList}>
                <Col >
                    <Image src={require("../../assets/image/logo.png")} preview={false} className={styles.img} />
                </Col>
                <Col className={styles.headerItem}>
                    <Link to={"/"} className={styles.itemLink}>
                        Trang chủ
                    </Link>
                </Col>
                {
                    Cookies.get("token") ?
                    <Col className={styles.headerItem}>
                        <Link to={manage} className={styles.itemLink}>
                            Quản lý
                        </Link>
                    </Col> 
                    : null
                }
                
                {/* <Col className={styles.headerItem}>
                    <Link to={"/hoi-vien-du-tu-cach-giam-khao"} className={styles.itemLink}>
                        Hội viên đủ tư cách giám khảo
                    </Link>
                </Col> */}
                <Col className={styles.headerItem}>
                    <Link to={"/tin-tuc"} className={styles.itemLink}>
                        Tin tức
                    </Link>
                </Col>
                <Col className={styles.headerItem}>
                    <Link to={"/huong-dan"} className={styles.itemLink}>
                        Hướng dẫn
                    </Link>
                </Col>
            </Row>
                
            </Col>
            <Col className={ `${styles.headerItem} gutter-row`} >
            <div className={styles.user}>
                <div className={styles.itemLink}>
                    <UserOutlined className={styles.userIcon} id="user"/>
                </div>
                <div className={`animate__zoomIn ${styles.userMenu}`}>
                {
                    Cookies.get("token") ? 
                    <li className={styles.menuItem}>
                        <Link to={'/doi-mat-khau'} className={`${styles.menuItemLink}`}>
                            Đổi mật khẩu
                        </Link>
                    </li> : null
                }
                    
                    <li className={styles.menuItem}>
                        <Link to={'/dang-ky'} className={styles.menuItemLink}>
                            Đăng ký
                        </Link>
                    </li>
                    {
                        Cookies.get("token") ? 
                        <li className={styles.menuItem}>
                            <span className={styles.menuItemLink} onClick={handleLogout}>
                                Đăng xuất
                            </span>
                        </li>
                        :
                        <li className={styles.menuItem}>
                        <Link to={'/dang-nhap'} className={styles.menuItemLink}>
                            Đăng nhập
                        </Link>
                    </li>
                    }
                                     
                </div> 
            </div>
                {/* <Link to={"/dang-nhap"} className={styles.itemLink}>
                        Đăng nhập
                </Link> */}
            </Col>
            <Col xs={12} md={12} lg={6} className={` ${styles.listResponsive}`} onClick={handleOpenMenu}>
                {
                    isOpen ?
                        <CloseOutlined style={{ fontSize: '24px', color: '#F6C404', fontWeight: '600', cursor: 'pointer' }}/>
                    : <MenuOutlined style={{ fontSize: '24px', color: '#F6C404', fontWeight: '600', cursor: 'pointer' }}/>
                }
            </Col>
        </Row>
        <div className={`animate__animated animate__slideInDown ${styles.menuResponsive}`} id="menuResponsive">
         <div className={styles.menu}>
            <li className={styles.menuResponsiveItem}>
                <Link to={'/'} className={styles.menuResponsiveLink} onClick={handleCloseMenu}>
                    Trang chủ
                </Link>
            </li>
            {
                Cookies.get("token") ? 
                <li className={styles.menuResponsiveItem}>
                    <Link to={manage} className={styles.menuResponsiveLink} onClick={handleCloseMenu}>
                        Quản lý
                    </Link>
                </li>
                : 
                null
            }
            <li className={styles.menuResponsiveItem}>
                <Link to={'/tin-tuc'} className={styles.menuResponsiveLink} onClick={handleCloseMenu}>
                Tin tức
                </Link>
            </li>
            <li className={styles.menuResponsiveItem}>
                <Link to={'/huong-dan'} className={styles.menuResponsiveLink} onClick={handleCloseMenu}>
                Hướng dẫn
                </Link>
            </li>
            {
                Cookies.get("token") ? 
                <li className={styles.menuResponsiveItem}>
                    <Link to={'/doi-mat-khau'} className={styles.menuResponsiveLink} onClick={handleCloseMenu}>
                        Đổi mật khẩu
                    </Link>
                </li> : null
            }
            {
                Cookies.get("token") ? 
                <li className={styles.menuResponsiveItem}>
                    <span className={styles.menuResponsiveLink} onClick={handleLogout}>
                        Đăng xuất
                    </span>
                </li>
                : 
                <li className={styles.menuResponsiveItem}>
                    <Link to={'/dang-nhap'} className={styles.menuResponsiveLink} onClick={handleCloseMenu}>
                        Đăng nhập
                    </Link>
                </li>
            }
            
         </div>
        </div>
    </>
    
  )
}
