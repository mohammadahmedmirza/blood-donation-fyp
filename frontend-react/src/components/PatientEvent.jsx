// import React, { useEffect, useState } from "react";
// import { Table, Tag } from "antd";

// function PatientEvent() {
//   const userID = localStorage.getItem("id");
//   const [patientData, setPatientData] = useState([]);
//   const [eventData, setEventData] = useState([]);

//   const getPatientRequest = async () => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/patient-request/${userID}`,
//         {
//           method: "GET",
//         }
//       );
//       const result = await res.json();
//       setPatientData(
//         result.data.map((patient) => ({
//           unit: patient.unit,
//           blood_group: patient.blood_group.toUpperCase(),
//           date: patient.required_date,
//           tags: [patient.status],
//         }))
//       );
//     } catch (e) {
//       console.log("error", e);
//     }
//   };

//   const columns = [
//     {
//       title: "Units",
//       dataIndex: "unit",
//       key: "unit",
//       render: (text) => <a> {text} </a>,
//     },
//     {
//       title: "Blood Group Req.",
//       dataIndex: "blood_group",
//       key: "blood_group",
//     },
//     {
//       title: "Req. Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Status",
//       key: "tags",
//       dataIndex: "tags",
//       render: (_, { tags }) => (
//         <>
//           {tags.map((tag) => {
//             let color = "";
//             if (tag === "pending") {
//               color = "geekblue";
//             } else if (tag === "approve") {
//               color = "green";
//             } else {
//               color = "volcano";
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//   ];

//   const getPatientEvents = async () => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/patinet-events/${userID}`,
//         {
//           method: "GET",
//         }
//       );
//       const result = await res.json();
//       setEventData(
//         result.data.map((patient) => ({
//           name:
//             patient.first_name.toUpperCase() +
//             " " +
//             patient.last_name.toUpperCase(),
//           blood_group: patient.blood_group.toUpperCase(),
//           unit: patient.blood_unit,
//           date: patient.donation_date,
//           tags: [patient.event_status],
//         }))
//       );
//     } catch (e) {
//       console.log("error", e);
//     }
//   };
//   const columnsforPatient = [
//     {
//       title: "Donor Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Blood Group Req.",
//       dataIndex: "blood_group",
//       key: "blood_group",
//     },
//     {
//       title: "Unit",
//       dataIndex: "unit",
//       key: "unit",
//     },
//     {
//       title: "Event date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Status",
//       key: "tags",
//       dataIndex: "tags",
//       render: (_, { tags }) => (
//         <>
//           {tags.map((tag) => {
//             let color = "";
//             if (tag === "pending") {
//               color = "geekblue";
//             } else if (tag === "completed") {
//               color = "green";
//             } else {
//               color = "volcano";
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//   ];

//   useEffect(() => {
//     getPatientRequest();
//     getPatientEvents();
//   }, []);
//   const divStyle = {
//     margin: "auto",
//     width: "75%",
//     padding: "10px",
//     marginTop: "100px",
//   };

//   return (
//     <>
//       <div className="container" style={divStyle}>
//         <h2 style={{ textAlign: "center" }}>YOUR EVENTS</h2>
//         <div>
//           <Table
//             pagination={false}
//             columns={columnsforPatient}
//             dataSource={eventData}
//           />

//           <h2 style={{ textAlign: "center" }}>Request Status</h2>
//           <div className="mt-5">
//             <Table
//               bordered
//               pagination={false}
//               columns={columns}
//               dataSource={patientData}
//             />
//             ;
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PatientEvent;
