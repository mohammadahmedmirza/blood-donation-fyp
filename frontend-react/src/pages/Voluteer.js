import React, { useState } from 'react';
import { Select, Spin, Button,  Form, Input, Card } from 'antd';
import { Link } from 'react-router-dom';
import { LockOutlined,  UserOutlined } from '@ant-design/icons';

const Volunteer = () => {
    const [loading, setLoading] = useState(false);
    const currentLoginUserId =  localStorage.getItem('id')
    const onFinish = async (values) => {
        setLoading(true);
        values.status = "pending"  //default value for request
    
        const response = await fetch(`http://127.0.0.1:5000/api/request-blood/${currentLoginUserId}`,{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        });
        if(response){

            setLoading(false);
        }
    };


    const divStyle = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        marginTop: '100px',
    };

    return (
        <div style={divStyle}>
            <Card
                title="Request"
                style={{ backgroundColor: 'lightgray', width: '100%' }}
                extra={
                    <Button type="link" block>
                        <Link to="/">Back</Link>
                    </Button>
                }
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
                        <Form.Item label="Blood Group" name="blood_group"
                            rules={[{
                                required: true, message: "Blood Group is required"
                            }]}
                        >
                            <Select
                                style={{width: 200, marginBottom: 16}}
                                placeholder="Select Your Blood Group"
                                options={[
                                    {value: 'ab+', label: "AB+"},
                                    {value: 'a-', label: "A-"},
                                    {value: 'ab-', label: "AB-"},
                                    {value: 'b+', label: "B+"},
                                    {value: 'a+', label: "A+"}
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Units Required"
                            name="units"
                            
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter units Required',
                                },
                            ]}
                           
                        >
                            <Input type="number" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter reqired Date',
                                },
                            ]}
                        >
                            <Input type='date' prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="MainButtons" block>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default Volunteer;
