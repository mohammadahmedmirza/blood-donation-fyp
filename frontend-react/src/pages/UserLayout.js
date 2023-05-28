import React, { useEffect } from 'react'
import { BookOutlined, LogoutOutlined, ShopOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Badge } from 'antd'
import { useState } from 'react'
import { Button } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import HistoricalData from '../components/HistoricalData'

const { Header, Content, Sider, Footer } = Layout

const UserNavigations = () => {
    const location = useLocation()
    return (
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
            <Menu.Item key="/home">
                <Link to="home">Home</Link>
            </Menu.Item>
            <Menu.Item key="/historicdata">
                <Link to="historicdata">Historic Data</Link>
            </Menu.Item>
        </Menu>
    )
}

const UserLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const getApplicationId = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return user.applicationId
    }

    const buttonRef = React.useRef(null)

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                // collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                breakpoint="md"
                collapsedWidth="0"
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '20px 10px',
                    }}
                >
                    <img src="/fav.png" style={{ width: 300, height: 200 }} />
                </div>
                <UserNavigations />
            </Sider>
            <Layout>
                <Header
                    style={{
                        height: '60px',
                        backgroundImage: "linear-gradient(135deg, #ffffff, lightgray 150%)",
                        color: "transparent",
                    }}
                >
                    <Button
                        onClick={handleLogout}
                        ref={buttonRef}
                        onMouseEnter={() => {
                            buttonRef.current.style.backgroundColor = "white"
                            buttonRef.current.style.color = "orangered"
                        }}
                        onMouseLeave={() => {
                            buttonRef.current.style.backgroundColor = "orangered"
                            buttonRef.current.style.color = "white"
                        }}
                        style={{ position: 'absolute', right: 40, top: 12, backgroundColor: 'orangered', color: 'white', border: 'none' }}
                        icon={<LogoutOutlined />}
                    >
                        Logout
                    </Button>
                </Header>
                <Content
                    style={{
                        margin: '1.5%',
                        backgroundImage: "linear-gradient(135deg, #ffffff, lightgray)"
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 'inherit',
                            backgroundImage: "lightgray",
                            overflow: 'auto',
                        }}
                    >
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/historicdata" element={<HistoricalData isAdmin={false} applicationId={getApplicationId()}/>} />
                        </Routes>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center', fontFamily: 'monospace', color: 'black',
                        backgroundImage: "linear-gradient(205deg, lightgray 60%, #001529 80%)"
                    }}
                >
                    Made by FazerTech ©2023
                </Footer>
            </Layout>
        </Layout>
    )
}

export default UserLayout;