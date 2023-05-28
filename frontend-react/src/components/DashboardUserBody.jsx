import React, { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import add from "../images/add.png";
import DashboardOverViewContent from "./DashBoardOverViewContent";
import UserTable from "./UserTable";
import Modal from "react-bootstrap/Modal";
import pen from "../images/pen.png";
import { Alert, notification } from "antd";
import { Label } from "reactstrap";

export const Globals = createContext();
export default function DashboardUserBody() {
  const [modalShow, setModalShow] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userGender, setGender] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [loader, setLoader] = React.useState(false);
  const [totalPatients, setTotalPatients] = React.useState(0);
  const [totalDonors, setTotalDonors] = React.useState(0);
  const [totalRequests, setTotalRequests] = React.useState(0);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [allUsers, setAllUsers] = React.useState([]);
  const [initialpage, setInitialpage] = useState(0);
  const [showTableLoader, setTableloader] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cnic: "",
    age: "",
    phone_no: "",
    address: ""
  });
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    CardsData();
    data();
    setInitialpage(0);
  }, []);

  const openNotification = (placement, message,description) => {
    api.success({
      message,
      description,      
      placement,
    });
  };
  const CardsData = async () => {
    setLoader(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/get-cards-data`, {
        method: "GET",
      });
      const result = await res.json();
      setLoader(false);
      setTotalPatients(result.total_patients);
      setTotalDonors(result.total_donors);
      setTotalRequests(result.total_requests);
      setTotalEvents(result.total_events);
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const AddUser = async (user) => {
    setModalShow(true);
    setShowAlert(false);
  };

  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const data = async () => {
    setTableloader(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-user?page=1&limit=10`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setTableloader(false);
      setAllUsers(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const data1 = async (page, limit) => {
    setTableloader(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-user?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setTableloader(false);
      setAllUsers(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  const CreateUser = async (e) => {
    e.preventDefault();
    console.log("user Input: ", userInput);
    var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (userInput.first_name === "") {
      setMessageAlert("Please enter first name");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.last_name === "") {
      setMessageAlert("Please enter last name");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.email === "") {
      setMessageAlert("Please enter your email address");
      setStatusAlert("error");
      setShowAlert(true);
    }  else if (userInput.address === "") {
      setMessageAlert("Please enter your  address");
      setStatusAlert("error");
      setShowAlert(true);
    }else if (userGender === "") {
      setMessageAlert("Please set your Gender");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userRole === "") {
      setMessageAlert("Please set User role");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.cnic === "") {
      setMessageAlert("Please enter your CNIC");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.age === "") {
      setMessageAlert("Please enter your age");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (BloodGroup === "") {
      setMessageAlert("Please set Blood Group");
      setStatusAlert("error");
      setShowAlert(true);
    } else {
      console.log(userInput, "userdata");
      if (userInput.email.match(mailformat)) {
        
          const response = await fetch(
            "http://127.0.0.1:5000/api/add-user",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                email: userInput.email,
                age: userInput.age,
                cnic: userInput.cnic,
                phone_no : userInput.phone_no,
                address: userInput.address,
                user_role: userRole,
                blood_group: BloodGroup,
                gender: userGender,
                account_status : 'OK'
              }),
            }
          );
          data();
          CardsData();
          const respons = await response.json();
          if (respons.status === 0) {
            setMessageAlert(respons.msg);
            console.log(respons.msg, "Here")
            setStatusAlert("error");
            setShowAlert(true);
          } else if (respons.status === 1) {
            setMessageAlert(respons.msg);
            setStatusAlert("error");
            setShowAlert(true);
          } else {
            setMessageAlert(respons.msg);
            setStatusAlert("success");
            openNotification('top','SUCCESS', 'User Created Successfully')
            setShowAlert(true);
            setModalShow(false);
            setUserInput({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              about: "",
              role: "",
            });
          }

      }
      else {
        setMessageAlert("You have entered an invalid email address!");
        setStatusAlert("error");
        setShowAlert(true);
      }
    }
  };

  return (
    <Globals.Provider
      value={{
        data: data,
        data1: data1,
        CardsData: CardsData,
        setAllUsers: setAllUsers,
        setInitialpage: setInitialpage,
        setTableloader: setTableloader,
        showTableLoader: showTableLoader,
        initialpage: initialpage,
        Cardsloader: loader,
        totalPatients: totalPatients,
        totalDonors: totalDonors,
        totalRequests: totalRequests,
        totalEvents: totalEvents,
        allUsers: allUsers,
        setFilterState: setFilterState,
        filterState: filterState,
        openNotification: openNotification,
        api:api,
        contextHolder:contextHolder
      }}
    >
      <>
      {contextHolder}
        <div class="dash-body">
          <DashboardHeader title={"Users"} />
          <div className="dash-user-content">
            <div className="d-flex align-items-center total-over-add">
              {/*  */}
              <Link onClick={AddUser} className="ms-auto add-user-btn">
                <img src={add} alt="..." />
                Add User
              </Link>
            </div>
          </div>

          <div class="over-tbl-content">
            <DashboardOverViewContent />
            <UserTable />
          </div>
        </div>
        <Modal
          className="edit-modal"
          show={modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="d-flex justify-content-center color-orange font-family-poppins">
            <img style={{ cursor: "pointer" }} src={pen} alt="..." width="24" />
            <Modal.Title id="contained-modal-title-vcenter">
              &nbsp; Create User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login-form ">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">First Name*</Label>

                    <input
                      type="text"
                      name="first_name"
                      value={userInput.first_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Last Name*</Label>

                    <input
                      type="text"
                      name="last_name"
                      value={userInput.last_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Age*</Label>

                    <input
                      type="text"
                      name="age"
                      value={userInput.age}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Gender*</Label>
                    <select
                      className="edit-form-control padding-rigth-15"
                      value={userGender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option>Select</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Blood Group*</Label>

                    <select
                      className="edit-form-control padding-rigth-15"
                      value={BloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                    >
                      <option>Select</option>
                      <option value={"ab+"}>AB+</option>
                      <option value={"a-"}>A-</option>
                      <option value={"ab-"}>AB-</option>
                      <option value={"b+"}>B+</option>
                      <option value={"a+"}>A+</option>
                      <option value={"o+"}>O+</option>
                      <option value={"o-"}>O-</option>
                      <option value={"b-"}>B-</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">CNIC*</Label>

                    <input
                      type="text"
                      name="cnic"
                      value={userInput.cnic}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="CNIC"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Phone No.*</Label>

                    <input
                      type="text"
                      name="phone_no"
                      value={userInput.phone_no}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Phone No."
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Email*</Label>

                    <input
                      type="email"
                      name="email"
                      value={userInput.email}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6"></div>
              </div>
              <div className="mb-3">
                <Label className="edit-input-label">Role*</Label>
                <select
                  className="edit-form-control padding-rigth-15"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option>Select</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Patient</option>
                </select>
              </div>
              <div className="mb-3">
              <Label className="edit-input-label">Address*</Label>

                  <input
                    type="text"
                    name="address"
                    value={userInput.address}
                    onChange={handleInput}
                    className="edit-form-control"
                    placeholder="Address"
                  />
              </div>
              {showAlert ? (
                <Alert message={showMessage} type={showStatus} />
              ) : (
                ""
              )}
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="bg-white-cusd"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShow(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="col-md-6">
                  <button onClick={CreateUser}>Save</button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </Globals.Provider>
  );
}
