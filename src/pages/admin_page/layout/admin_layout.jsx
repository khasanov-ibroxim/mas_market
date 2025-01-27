import React from 'react';
import {
    Admin,
    ADMIN_CATEGORY,
    ADMIN_CHANGE_PRODUCT,
    ADMIN_DASHBOARD,
    ADMIN_PRODUCTS,
    HOME
} from "../../../utils/const/consts.jsx";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {Layout} from 'antd';

const {Header, Sider, Content} = Layout;
import "./admin_layout.css"

const AdminLayout = () => {
    const token = window.localStorage.getItem("token");
    const location = useLocation();


    const getHeaderTitle = () => {
        const pathSegments = location.pathname.split('/');

        if (pathSegments[pathSegments.length - 1] === ADMIN_PRODUCTS) {
            return "Product"
        }
        if (pathSegments[pathSegments.length - 1] === ADMIN_CATEGORY) {
            return "Category"
        }
        return pathSegments[pathSegments.length - 1];
    };

    const headerStyle = {
        textAlign: 'left',
        color: '#000',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#fff',
    };
    const contentStyle = {
        overflowY: 'auto',
        padding: "15px",
        height: '100%',
        minHeight: 120,
        color: '#000',
        backgroundColor: '#f3f3f3',
    };
    const siderStyle = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#333',
    };
    const layoutStyle = {
        overflow: 'hidden',
        width: 'calc(100% - 8px)',
        maxWidth: 'calc(100% - 8px)',
        height: 'calc(100% - 8px)',
    };

    if (token) {
        return (
            <div className="admin_layout">
                <Layout style={layoutStyle}>
                    <Sider width="15%" style={siderStyle}>
                        <div className="layout_sider">
                            <Link to={ADMIN_DASHBOARD+ADMIN_PRODUCTS}>Products</Link>
                            <Link to={ADMIN_DASHBOARD+ADMIN_CHANGE_PRODUCT}>Product Change</Link>
                        </div>
                    </Sider>
                    <Layout>
                        <Header style={headerStyle} className={"admin_layout_header"}>{getHeaderTitle()}</Header>
                        <Content style={contentStyle}>
                            <Routes>
                                {Admin.map(({Path, Component}, index) => (
                                    <Route key={index} path={Path} element={Component}/>
                                ))}
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    } else {
        window.location.assign(HOME);
    }
};

export default AdminLayout;
