import React, { useState, useEffect, } from 'react';
import { Table, Space, Tag, Button, Modal, Form, Input, message, Spin, Popconfirm, } from 'antd';
import { v4 as uuid4 } from 'uuid';
import { BASE_URL } from '../utils';
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const Application = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isEdited, setIsEdited] = useState(false);
    const [form] = Form.useForm();
    const createButtonRef = React.createRef();
    const [id, setId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}applications`);
            const data = await res.json();
            console.log(data);
            if (data.status) {
                setData(data.applications);
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEdit = (record) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            applicationName: record.applicationName,
            applicationId: record.applicationId,
        });
        setIsEdited(true);
        setId(record._id);
    }
    const handleDelete = async (record) => {
        try {
            console.log('delete');
            const response = await fetch(`${BASE_URL}applications/${record._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status) {
                message.success(data.message);
            } else {
                console.log(data);
                message.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            fetchData();
        }
    }

    const updateApplicatoin = async () => {
        try {
            const response = await fetch(`${BASE_URL}applications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationName: form.getFieldValue('applicationName'),
                    applicationId: form.getFieldValue('applicationId'),
                }),
            });
            const data = await response.json();
            if (data.status) {
                message.success(data.message);
            } else {
                console.log(data);
                message.error(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            form.resetFields();
            handleCancel();
            fetchData();
            setButtonLoading(false);
            setIsEdited(false);
        }
    }
    const onFinish = async (values) => {
        try {
            setButtonLoading(true);

            if (isEdited) {
                updateApplicatoin();
                return;
            }

            const response = await fetch(`${BASE_URL}applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationName: values.applicationName,
                    applicationId: values.applicationId,
                }),
            });
            const data = await response.json();
            if (data.status) {
                message.success(data.message);
            } else {
                console.log(data);
                message.error(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            form.resetFields();
            handleCancel();
            fetchData();
            setButtonLoading(false);
        }
    };

    const handleMouseEvent = (ref, fontColor, backgroundColor) => {
        ref.current.style.color = fontColor;
        ref.current.style.backgroundColor = backgroundColor;
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns = [
        {
            title: 'Application ID',
            dataIndex: 'applicationId',
            key: 'applicationId',
            render: (text) => {
                return (
                    <Tag color="geekblue"
                        icon={<CopyOutlined />}
                        style={{ cursor: "copy" }} onClick={() => {
                            navigator.clipboard.writeText(text);
                            message.success('Copied to clipboard');
                        }}>{text}</Tag>

                )
            },
            align: 'center',
        },
        {
            title: 'Application Name',
            dataIndex: 'applicationName',
            key: 'applicationName',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Tag
                        icon={<EditOutlined />}
                        color="blue"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(record)}>
                        Edit
                    </Tag>

                    <Popconfirm
                        placement="topRight"
                        title="Delete Application"
                        description="Are you sure you want to delete this application?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record)}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <Tag color="red" style={{ cursor: "pointer" }} icon={<DeleteOutlined />}>Delete</Tag>
                    </Popconfirm>

                </Space>
            ),
            align: 'center',
        },
    ];

    return (
        <div>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    size='small'
                    // create button in title
                    title={
                        () => (
                            <Button
                                ref={createButtonRef}
                                onMouseEnter={() => handleMouseEvent(createButtonRef, "black", "lightgreen")}
                                onMouseLeave={() => handleMouseEvent(createButtonRef, "white", "darkgreen")}
                                type="primary"
                                style={{
                                    float: 'right',
                                    marginBottom: '10px',
                                    marginRight: '10px',
                                    backgroundColor: 'darkgreen',
                                    color: 'white',
                                }}
                                onClick={showModal}
                                icon={<PlusOutlined />}
                            >
                                Create Application
                            </Button>
                        )
                    }

                />
            </Spin>

            <Modal title="Create Application"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    name="basic"
                    initialValues={{
                        remember: false,
                    }}
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Application ID"
                        name="applicationId"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input addonAfter={
                            <Button
                                type="text"
                                onClick={() => {
                                    form.setFieldsValue({
                                        applicationId: uuid4()
                                    })
                                }
                                }
                                size='small'
                            >
                                Generate
                            </Button>
                        } />
                    </Form.Item>

                    <Form.Item
                        label="Applicaton Name"
                        name="applicationName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your application name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={buttonLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Application