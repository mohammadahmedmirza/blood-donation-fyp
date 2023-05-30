import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../components/Navbar";
import { Spin, Button,  Form, Input, Card  } from 'antd'
import {LockOutlined, LoginOutlined, UserOutlined} from "@ant-design/icons";
import { Alert } from 'antd';


const Login = ({url}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert]= useState(false);
    const [showStatus, setStatusAlert]= useState('');
    const [showMessage, setMessageAlert]= useState('');




 

    const onFinish = async (values) => {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/auth/login',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        });

        const data = await response.json();
        setLoading(false)
            if(data.status===0)
            {
                setMessageAlert(data.msg)
                setStatusAlert("error")
                setShowAlert(true)
                console.log(data.msg);
            }
            else if(data.status===1){
                setMessageAlert(data.msg)
                setStatusAlert("error")
                setShowAlert(true)
                console.log(data.msg);
            }
            else {
                localStorage.setItem("firstname",data.data[0].first_name);
                localStorage.setItem("lastname", data.data[0].last_name);
                localStorage.setItem("user_role", data.data[0].user_role);
                localStorage.setItem("id", data.data[0].id);
                localStorage.setItem("account_status", data.data[0].account_status);
                if(data.data[0].user_role == "1"){
                    setMessageAlert(data.msg);
                    setStatusAlert("error");
                    setShowAlert(true);
                    navigate(url)
                }else{
                    
                    navigate('/');
                }

               
            }
    };


    const divStyle = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        marginTop: '300px',
        marginLeft: '37%'
    };



    return (
    <>
        <body className="sign-up-body">
            <Header/>
            
        <div style={divStyle}>

            <Card
                title="Login"
                style={{backgroundColor: "#ffe8e7", width: '50%' }}
                headStyle={{textAlign: 'center', fontSize:'20px', fontWeight:'bold', color:"#ff5348"}}
            >
                <Spin spinning={loading}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        layout="vertical"
                        onFinish={onFinish}
       
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your username',
                                },
                            ]}
                        >
                            <Input type="email" prefix={<UserOutlined />}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />}/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 4,
                                span: 16,
                            }}
                        >
                            {showAlert? <Alert message={showMessage} type={showStatus} />: <div></div>}

                            <Button style={{marginTop: "15px"}} type="primary" htmlType="submit" className="MainButtons"  block icon={<LoginOutlined/>}>
                                Log In
                            </Button>

                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
        </body>
        </>
    );
}

export default Login;
