import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Input, message, Radio, Row, Select, Spin } from "antd";
import { MinusOutlined, PlusOutlined, SaveFilled, } from "@ant-design/icons";
import { BASE_URL } from "../utils";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";


const FormBuilder = () => {
    const [formFields, setFormFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorFields, setErrorFields] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState({ applicationId: "", applicationName: "" });
    const [isCardVisible, setIsCardVisible] = useState(true);
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");

    // checks whether any label fields are empty or if there are no fields
    const emptyCheck = () => {
        // check if an option is selected in the select field
        if (selectedApp.applicationId === "" && selectedApp.applicationName === "") {
            return 2;
        }
        if (formFields.length === 0) {
            return 0;
        }
        for (let i = 0; i < formFields.length; i++) {
            if (formFields[i].label === "") {
                return 1;
            }
        }
        return false;
    }

    useEffect(() => {
        fetchApp();
    }, []);

    const fetchApp = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}applications`);
            const data = await res.json();
            if (data.status) {
                setApplications(data.applications);
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (values) => {
        const temp = emptyCheck();
        if (temp === false) {
            let body = {
                title: formTitle,
                description: formDescription,
                fields: (values),
                applicationId: selectedApp.applicationId,
            };


            axios.post(`${BASE_URL}form-builders/`, body).then((res) => {
                message.success('Form Created Successfully')
                // console.log("Post request successful: ", res.data);
                setFormFields([]);
                setFormDescription("");
                setFormTitle("");
            }).catch((err) => {
                message.error('Error creating form')
                console.log("Post request unsuccessful: ", err);
            });

            // nav('/dashboard/home')

        } else if (temp === 0) {
            message.error('No fields added to form')
        } else if (temp === 2) {
            message.error('Please select an application first')
        } else {
            // update errorFields state with indexes of fields with empty labels
            const errorFields = formFields.reduce((acc, field) => {
                if (field.label === '') {
                    acc.push(field)
                }
                return acc;
            }, []);
            setErrorFields(errorFields);
        }
    }

    const handleAddField = (type) => {
        const newField = {
            id: Math.random(),
            type: type,
            label: "",
            options: [],
            required: false,
        };
        setFormFields([...formFields, newField]);
    };

    const handleRemoveField = (id) => {
        const updatedFields = formFields.filter((field) => field.id !== id);
        setFormFields(updatedFields);
    };

    const handleLabelChange = (id, label) => {
        const updatedFields = formFields.map((field) =>
            field.id === id ? { ...field, label: label } : field
        );
        setFormFields(updatedFields);
    };

    const handleOptionChange = (id, options) => {
        const updatedFields = formFields.map((field) =>
            field.id === id ? { ...field, options: options } : field
        );
        setFormFields(updatedFields);
    };

    const handleRequiredChange = (id, required) => {
        const updatedFields = formFields.map((field) =>
            field.id === id ? { ...field, required: required } : field
        );
        setFormFields(updatedFields);
    };

    const handleMouseEvent = (ref, fontColor, backgroundColor) => {
        ref.current.style.color = fontColor;
        ref.current.style.backgroundColor = backgroundColor;
    }

    function RadioOption({ index, optionValue, onOptionChange, onOptionRemove }) {
        const handleOptionChange = (e) => {
            // console.log(e.target.value)
            onOptionChange(e.target.value);
        };

        const handleOptionBlur = (e) => {
            const optionValue = e.target.value.trim();
            if (optionValue !== '') {
                onOptionChange(optionValue);
            }
        };


        return (
            <div style={{ marginBottom: "8px" }}>
                <Input
                    placeholder={`Option ${index + 1}`}
                    value={optionValue}
                    onChange={handleOptionChange}
                    onBlur={handleOptionBlur}
                    style={{ width: "80%" }}
                />
                <Button
                    type="dashed"
                    style={{ marginLeft: "8px" }}
                    onClick={() => onOptionRemove(index)}
                >
                    <MinusOutlined /> Remove
                </Button>
            </div>
        );
    }

    const handleAddOption = (fieldId) => {
        setFormFields((prevFields) => {
            const updatedFields = [...prevFields];
            const fieldIndex = updatedFields.findIndex((field) => field.id === fieldId);
            updatedFields[fieldIndex].options.push(`Option ${updatedFields[fieldIndex].options.length + 1}`);
            return updatedFields;
        });
    };

    const handleRadioOptionChange = (id, optionIndex, optionValue) => {
        const updatedFields = formFields.map((field) => {
            if (field.id === id) {
                const updatedOptions = [...field.options];
                updatedOptions[optionIndex] = optionValue;
                return { ...field, options: updatedOptions };
            }
            return field;
        });
        setFormFields(updatedFields);
    };

    function handleRemoveOption(id, optionIndex) {
        const field = formFields.find((f) => f.id === id);
        const newOptions = [...field.options];
        newOptions.splice(optionIndex, 1);

        // Update the state with the new options array
        setFormFields((prevState) => {
            const updatedFields = [...prevState];
            const fieldIndex = updatedFields.findIndex((f) => f.id === id);
            updatedFields[fieldIndex].options = newOptions;
            return updatedFields;
        });
    }

    const handleApplicationChange = (_, app) => {
        setSelectedApp({ applicationId: app.value, applicationName: app.label });
        setIsCardVisible(false);
    }

    const buttonRef = useRef(null);
    const btn1 = useRef(null), btn2 = useRef(null), btn3 = useRef(null),
        btn4 = useRef(null), btn5 = useRef(null), btn6 = useRef(null), removeBtnRef = useRef(null);


    return (
        <div>
            <Spin spinning={loading}>
                <Select
                    placeholder={"Select an application"}
                    style={{ width: "30%", marginLeft: "35%", marginBottom: "2%" }}
                    options={applications.map((app) => {
                        return { value: app._id, label: app.applicationName }
                    })}
                    onChange={handleApplicationChange}
                />
            </Spin>

            <Card hidden={isCardVisible} style={{
                backgroundImage: "linear-gradient(135deg, #ffffff, lightgray 150%)",
                border: "0px solid lightgray"
            }}>
                <Form initialValues={{ remember: true }} autoComplete="on" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="Title" name="formTitle" rules={[{ required: true, message: 'Please input form title!' }]}>
                        <Input placeholder="Title" onChange={(e) => setFormTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Description" name="formDescription" rules={[{ required: false, message: 'Please input form description!' }]}>
                        <TextArea placeholder="Description" onChange={(e) => setFormDescription(e.target.value)} />
                    </Form.Item>
                </Form>

                <Row gutter={[30, 30]} style={{ marginLeft: "13%" }}>
                    <Col lg={{ flex: 5 }} md={{ flex: 3 }} sm={{ flex: 2 }}>
                        <Button style={{ backgroundColor: "#003B8E", color: "white", border: "none" }}
                            ref={btn1}
                            onMouseLeave={() => handleMouseEvent(btn1, "white", "#003B8E")}
                            onMouseEnter={() => handleMouseEvent(btn1, "black", "skyblue")}
                            onClick={() => handleAddField("input")} icon={<PlusOutlined />}>Input Field</Button>
                    </Col>
                    <Col lg={{ flex: 5 }} md={{ flex: 3 }} sm={{ flex: 2 }}>
                        <Button style={{ backgroundColor: "#003B8E", color: "white", border: "none" }}
                            ref={btn2}
                            onMouseLeave={() => handleMouseEvent(btn2, "white", "#003B8E")}
                            onMouseEnter={() => handleMouseEvent(btn2, "black", "skyblue")}
                            onClick={() => handleAddField("number")} icon={<PlusOutlined />}>
                            Number Field</Button>
                    </Col>
                    <Col lg={{ flex: 5 }} md={{ flex: 3 }} sm={{ flex: 2 }}>
                        <Button style={{ backgroundColor: "#003B8E", color: "white", border: "none" }}
                            ref={btn3}
                            onMouseLeave={() => handleMouseEvent(btn3, "white", "#003B8E")}
                            onMouseEnter={() => handleMouseEvent(btn3, "black", "skyblue")}
                            onClick={() => handleAddField("select")} icon={<PlusOutlined />}>Select Field</Button>
                    </Col>
                    {/* <Col lg={{ flex: 5 }} md={{ flex: 3 }} sm={{ flex: 2 }}>
                        <Button style={{ backgroundColor: "#003B8E", color: "white", border: "none" }}
                            ref={btn4}
                            onMouseLeave={() => handleMouseEvent(btn4, "white", "#003B8E")}
                            onMouseEnter={() => handleMouseEvent(btn4, "black", "skyblue")}
                            onClick={() => handleAddField("radio")} icon={<PlusOutlined />}>Radio Field</Button>
                    </Col> */}
                    <Col lg={{ flex: 5 }} md={{ flex: 3 }} sm={{ flex: 2 }}>
                        <Button style={{ backgroundColor: "#003B8E", color: "white", border: "none" }}
                            ref={btn5}
                            onMouseLeave={() => handleMouseEvent(btn5, "white", "#003B8E")}
                            onMouseEnter={() => handleMouseEvent(btn5, "black", "skyblue")}
                            onClick={() => handleAddField("email")} icon={<PlusOutlined />}>Email Field</Button>
                    </Col>
                    <Col lg={{ flex: 5 }} md={{ flex: 3 }} sm={{ flex: 2 }}>
                        <Button style={{ backgroundColor: "#003B8E", color: "white", border: "none" }}
                            ref={btn6}
                            onMouseLeave={() => handleMouseEvent(btn6, "white", "#003B8E")}
                            onMouseEnter={() => handleMouseEvent(btn6, "black", "skyblue")}
                            onClick={() => handleAddField("date")} icon={<PlusOutlined />}>Date Field</Button>
                    </Col>
                </Row>
            </Card>

            {formFields.map((field) => {
                return (
                    <Card style={{ backgroundColor: "rgb(200, 210, 340)", margin: "2% 2% 2% 0", width: "100%" }}
                        title={(formFields.indexOf(field) + 1) + ". " + field.type[0].toUpperCase() + field.type.slice(1)
                            + " Field"}
                        extra={
                            <Button
                                ref={removeBtnRef}
                                style={{ backgroundColor: "#de1b4f", color: "white", border: "none" }}
                                onClick={() => handleRemoveField(field.id)} icon={<MinusOutlined />}>
                                Remove
                            </Button>
                        }
                    >
                        <Form.Item label="Label" validateStatus={errorFields.includes(field) ? 'error' : ''}
                            help={errorFields.includes(field) ? 'Label field cannot be empty' : ''}>
                            <Input
                                value={field.label}
                                onChange={(e) => handleLabelChange(field.id, e.target.value)}
                            />
                        </Form.Item>
                        {field.type === "select" && (
                            <Form.Item label="Options">
                                <Select
                                    mode="tags"
                                    value={field.options}
                                    onChange={(value) => handleOptionChange(field.id, value)}
                                />
                            </Form.Item>
                        )}{field.type === "radio" && (
                            <div>
                                <Form.Item label="Options">
                                    {field.options.map((option, index) => (
                                        <RadioOption
                                            key={index}
                                            index={index}
                                            optionValue={option}
                                            onOptionRemove={() => handleRemoveOption(field.id, index)}
                                            onOptionChange={(optionValue) =>
                                                handleRadioOptionChange(field.id, index, optionValue)}
                                        />
                                    ))}
                                    <Button type="dashed" onClick={() => handleAddOption(field.id)}>
                                        <PlusOutlined /> Add Option
                                    </Button>
                                </Form.Item>
                            </div>
                        )}
                        <Form.Item label="Required">
                            <Radio.Group
                                onChange={(e) =>
                                    handleRequiredChange(field.id, e.target.value === "yes")
                                }
                            >
                                <Radio value={"yes"}>Yes</Radio>
                                <Radio value={"no"}>No</Radio>
                            </Radio.Group>
                        </Form.Item>

                    </Card>
                )
            })}
            <Button ref={buttonRef}
                onMouseEnter={() => handleMouseEvent(buttonRef, "black", "lightgreen")}
                onMouseLeave={() => handleMouseEvent(buttonRef, "white", "darkgreen")}
                style={{
                    marginLeft: "2%",
                    position: 'absolute',
                    left: 210,
                    top: 12,
                    color: "white",
                    backgroundColor: "darkgreen",
                    border: "none"
                }}
                icon={<SaveFilled />} onClick={() => onSubmit(formFields)}>
                Submit
            </Button>
        </div>
    );
};

export default FormBuilder;
