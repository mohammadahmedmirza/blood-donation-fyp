import React, {useEffect} from 'react'
import {BookOutlined, LogoutOutlined, ShopOutlined} from '@ant-design/icons'
import {Breadcrumb, Layout, Menu, theme, Badge} from 'antd'
import {useState} from 'react'
import {Button} from 'antd'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Home from '../components/Home'

const {Header, Content, Sider, Footer} = Layout

const AdminNavigations = () => {
    const location = useLocation()
    return (
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
            <Menu.Item key="/home">
                <Link to="home">Home</Link>
            </Menu.Item>
            {/* <Menu.Item key="/application">
                <Link to="application">Create Application</Link>
            </Menu.Item>
            <Menu.Item key="/historicdata">
                <Link to="historicdata">Historic Data</Link>
            </Menu.Item>
            <Menu.Item key="/formbuilder">
                <Link to="formbuilder">Form Builder</Link>
            </Menu.Item> */}
        </Menu>
    )
}

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    const {
        token: {colorBgContainer},
    } = theme.useToken()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const buttonRef = React.useRef(null)

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Layout>
                <Routes>
                            <Route path="/" element={<Home />}/>
                            {/* <Route path="/application" element={<Application/>}/>
                            <Route path="/historicdata" element={<HistoricalData isAdmin={true}/>}/>
                            <Route path="/formbuilder" element={<FormBuilder/>}/> */}
                </Routes>
            </Layout>
        </Layout>
    )
}

export default AppLayout