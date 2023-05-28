// import React, {useState, useEffect} from "react";
// import {Table, Select, message, Space, Tag, Popconfirm, Button} from "antd";
// import axios from "axios";
// import {BASE_URL} from "../utils";
// import {DeleteOutlined, DownloadOutlined, EditOutlined, QuestionCircleOutlined} from "@ant-design/icons";
// import ExcelJS from "exceljs";


// const {Option} = Select;

// const DynamicTable = ({isAdmin = false, applicationId}) => {
//     const [formData, setFormData] = useState([]);
//     const [columns, setColumns] = useState([]);
//     const [applications, setApplications] = useState([]);
//     const [selectedApplicationId, setSelectedApplicationId] = useState(null);

//     useEffect(() => {
//         if (isAdmin) {
//             fetchApplications();
//         } else {
//             setSelectedApplicationId(applicationId);
//         }
//     }, []);

//     useEffect(() => {
//         if (selectedApplicationId) {
//             fetchFormSchema();
//         }
//     }, [selectedApplicationId]);

//     const fetchApplications = async () => {
//         try {
//             const res = await fetch(`${BASE_URL}applications`);
//             const data = await res.json();
//             setApplications(data.applications);
//         } catch (error) {
//             message.error("Something went wrong!");
//         }
//     };

//     const fetchFormSchema = async () => {
//         try {
//             const res = await axios.get(
//                 `${BASE_URL}forms/application/${selectedApplicationId}`
//             );
//             const formSchema = res.data.form;

//             if (formSchema.length === 0) {
//                 message.error("No Data Found");
//                 return;
//             }

//             const newColumns = formSchema[0].values.map((field) => ({
//                 title: field.label,
//                 dataIndex: field.label,
//                 key: field.label,
//             }));

//             newColumns.push({
//                 title: 'Action',
//                 key: 'action',
//                 render: (_, record) => (
//                     <Space size="small">
//                         <Tag
//                             icon={<EditOutlined/>}
//                             color="blue"
//                             style={{cursor: "pointer"}}
//                             onClick={() => handleEdit(record)}>
//                             Edit
//                         </Tag>

//                         <Popconfirm
//                             placement="topRight"
//                             title="Delete Application"
//                             description="Are you sure you want to delete this application?"
//                             okText="Yes"
//                             cancelText="No"
//                             onConfirm={() => handleDelete(record)}
//                             icon={
//                                 <QuestionCircleOutlined
//                                     style={{
//                                         color: 'red',
//                                     }}
//                                 />
//                             }
//                         >
//                             <Tag color="red" style={{cursor: "pointer"}} icon={<DeleteOutlined/>}>Delete</Tag>
//                         </Popconfirm>

//                     </Space>
//                 ),
//                 align: 'center',
//             })

//             setColumns(newColumns);
//             setFormData(formSchema);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleEdit = (record) => {
//         console.log(record);
//     }

//     const handleDelete = (record) => {
//         console.log(record);
//     }

//     const handleMouseEvent = (ref, fontColor, backgroundColor) => {
//         ref.current.style.color = fontColor;
//         ref.current.style.backgroundColor = backgroundColor;
//     }

//     const handleDownloadExcel = () => {
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet("Data");

//         worksheet.columns = columns;

//         worksheet.addRows(
//             formData.map((form) => {
//                 const values = {};
//                 form.values.forEach((value) => {
//                     values[value.label] = value.value;
//                 });
//                 return {
//                     ...values,
//                 };
//             })
//         );

//         workbook.xlsx
//             .writeBuffer()
//             .then((buffer) => {
//                 const blob = new Blob([buffer], {type: "application/vnd.ms-excel"});
//                 const link = document.createElement("a");
//                 link.href = window.URL.createObjectURL(blob);
//                 link.download = selectedApplicationId + ".xlsx";
//                 link.click();
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const btn1 = React.createRef();


//     const handleApplicationChange = (value, option) => {
//         setSelectedApplicationId(option.key);
//         setColumns([]);
//         setFormData([]);
//     };

//     return (
//         <>
//             <Select
//                 hidden={!isAdmin}
//                 style={{width: 200, marginBottom: 16}}
//                 placeholder="Select an application"
//                 onChange={handleApplicationChange}
//             >
//                 {applications.map((app) => (
//                     <Option key={app._id} value={app.applicationName}>
//                         {app.applicationName}
//                     </Option>
//                 ))}
//             </Select>

//             <Button
//                 ref={btn1}
//                 onMouseEnter={() => handleMouseEvent(btn1, "black", "lightgreen")}
//                 onMouseLeave={() => handleMouseEvent(btn1, "white", "darkgreen")}
//                 icon={<DownloadOutlined/>}
//                 onClick={handleDownloadExcel}
//                 type="primary"
//                 style={{backgroundColor: "darkgreen", color: "white", marginLeft: "65%"}}
//             >
//                 Download as Excel
//             </Button>

//             <Table
//                 bordered={true}
//                 dataSource={
//                     formData.length > 0
//                         ? formData.map((form) => {
//                             const values = {};
//                             form.values.forEach((value) => {
//                                 values[value.label] = value.value;
//                             });
//                             return {
//                                 key: form._id,
//                                 ...values,
//                             };
//                         })
//                         : []
//                 }
//                 columns={columns}
//             />
//         </>
//     );
// };

// export default DynamicTable;