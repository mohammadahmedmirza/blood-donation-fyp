import React, { useState } from "react";
import {
  Select,
  Spin,
  Button,
  Form,
  Input,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined,
  MailOutlined,
  RedEnvelopeOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import Header from "../components/Navbar";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState(""); 

  const navigate = useNavigate();
 

  

  const onFinish = async (values) => {
    values.availability = "not_available";
    values.user_role = "3"
    values.account_status = "OK"
    var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    var passw = /^(?=.*[a-z]).{8,15}$/;
    setLoading(true)
    if (values.email.match(mailformat)) {
      if (values.password.match(passw)) {
        const response = await fetch("http://127.0.0.1:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        setLoading(false)
        const data = await response.json();
        if (data.status === 0) {
          setMessageAlert("Email Already Registered");
          setStatusAlert("error");
          setShowAlert(true);
        } else if (data.status === 1) {
          setMessageAlert("Error in Creating User");
          setStatusAlert("error");
          setShowAlert(true);
          console.log("Error in Creating User");
        } else {
          
          navigate("/login");
        }
      } else {
        alert(
          "Wrong password Type! Please use characters between 8 and 15 and alteast one numeric digit and special character."
        );
      }
    } else {
      alert("You have entered an invalid email address!");
    }
  };
  


  const divStyle = {
    margin: "auto",
    width: "50%",
    padding: "10px",
    marginTop: "100px",
  };

  return (
    
    <body className="sign-up-body">
        <Header/>
      <div style={divStyle}>
        <Card
          title="Sign Up"
          style={{ backgroundColor: "#ffe8e7", width: "100%"}}
          headStyle={{textAlign: 'center', fontSize:'20px', fontWeight:'bold',color:"#ff5348"}}
        >
          <Spin spinning={loading}>
            <Form
              name="basic"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your first name",
                        },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your last name",
                        },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Item
                      label="Age"
                      name="age"
                      type="number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Age",
                        },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Address",
                        },
                      ]}
                    >
                      <Input prefix={<HomeOutlined />} />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Item
                      label="CNIC"
                      name="cnic"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your CNIC without dashes",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (getFieldValue("cnic").length !== 13) {
                              return Promise.reject("Invalid CNIC");
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input type="text" prefix={<RedEnvelopeOutlined />} />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Item
                      label="Phone No."
                      name="phoneNo"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone without dashes",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (getFieldValue("phoneNo").length !== 11) {
                              return Promise.reject("Invalid Phone No.");
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input type="number" prefix={<RedEnvelopeOutlined />} />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                    <Form.Item
                label="Blood Group"
                name="blood"
                rules={[
                  {
                    required: true,
                    message: "Blood Group is required",
                  },
                ]}
              >
                <Select
                  style={{ width: 200, marginBottom: 16 }}
                  placeholder="Select Your Blood Group"
                  options={[
                    { value: "ab+", label: "AB+" },
                    { value: "a-", label: "A-" },
                    { value: "ab-", label: "AB-" },
                    { value: "b+", label: "B+" },
                    { value: "a+", label: "A+" },
                    { value: "b-", label: "B-" },
                    { value: "o+", label: "o+" },
                    { value: "o-", label: "o-" },
                  ]}
                />
              </Form.Item >
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                    <Form.Item style={{ width: '200px'}}
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Gender is required",
                  },
                ]}
              >
                <Select
                  style={{ width: 200, marginBottom: 16 }}
                  placeholder="Select Your Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </Form.Item>
                    </div>
                </div>
              </div>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              {showAlert ? (
                <Alert message={showMessage} type={showStatus} />
              ) : (
                <div></div>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="MainButtons"
                  block
                  icon={<LoginOutlined/>}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    </body>
  );
};

export default Signup;
