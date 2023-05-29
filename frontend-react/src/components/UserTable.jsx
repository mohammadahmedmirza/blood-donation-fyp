import React, { useState, useContext , useRef} from "react";
import pen from "../images/pen.png";
import Graypen from "../images/graypen.png"
import Graytrash from "../images/graytrash.png"
import trash from "../images/trash.png";
import Modal from "react-bootstrap/Modal";
import { Label } from "reactstrap";
import { Alert } from "antd";
import Search from "./GuiFilter";
import { Globals } from "./DashboardUserBody";
import Button from "@mui/material/Button";
import Pagination from "./Paginaton";
import { CircularProgress } from "@mui/material";
import {EyeFilled}  from '@ant-design/icons';
export default function UserTable() {
  const [modalShow, setModalShow] = React.useState(false);
  const [viewmodalShow, setviewModalShow] = React.useState(false);
  const [viewdata, setviewData] = useState({})
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editUser, setEditUser] = React.useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const [userRole, setUserRole] = useState("");
  const [bloodgroup, setBloodGroup] = useState("")
  const [userStatus, setUserStatus] = useState("")
  const childCompRef = useRef();
  const {
    allUsers,
    data,
    CardsData,
    data1,
    initialpage,
    setInitialpage,
    showTableLoader,
    setTableloader,
    setAllUsers,
    setFilterState, 
    filterState,
    openNotification,
    api,
  } = useContext(Globals);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [items, setItems] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const count = allUsers.count;
  const limit = 10;

  const delelteNotification = (placement, message,description) => {
    api.error({
      message,
      description,      
      placement,
    });
  };

  const getEditData = async (user) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/view-user/${user.id}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setEditUser(result.data[0]);
      setUserRole(result.data[0].user_role);
      setBloodGroup(result.data[0].blood_group)
      setUserStatus(result.data[0].account_status)
    } catch (e) {
      console.log("error", e);
    }
    setModalShow(true);
  };

  const handleInput = (e) => {
    e.preventDefault();
    let copyEditUser = editUser;
    copyEditUser = { ...copyEditUser, [e.target.name]: e.target.value };
    setEditUser(copyEditUser);
  };

  const ShowDeleteModal = (id) => {
    setShowAlert(false);
    setDeleteModalShow(true);
    setDeleteUserId(id);
  };

 const viewUserData = async(user) => {
  try {
    const res = await fetch(
      `http://127.0.0.1:5000/api/view-user/${user.id}`,
      {
        method: "GET",
      }
    );
    data();
    const result = await res.json();
    setviewData(result.data[0])
  } catch (e) {
    console.log("error", e);
  }
  setviewModalShow(true);
 }
 const deleteUser = async (e) => {
   e.preventDefault()
   setDeleteModalShow(false)
   
   try {
     const res = await fetch(
       `http://127.0.0.1:5000/api/delete-user/${deleteUserId}`,
       {
         method: "DELETE",
        }
        );
        const result = await res.json();
        if (result.status === 2) {
          data();
          CardsData();
          delelteNotification('top','DELETE user', 'User Delete Successfully')
          setMessageAlert(result.msg);
          setStatusAlert("success");
          setShowAlert(true);
      } else {
        setMessageAlert(result.msg);
        setStatusAlert("error");
        setShowAlert(true);
      }
    } catch (err) {
      setMessageAlert(err.msg);
      setStatusAlert("error");
      setShowAlert(true);
      setMessageAlert(err.msg);
      setStatusAlert("error");
      setShowAlert(true);
    }
  };
  const UpdateUser = async (e) => {
    e.preventDefault();
    if (editUser.first_name === "") {
      setMessageAlert("Please enter first name");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (editUser.last_name === "") {
      setMessageAlert("Please enter last name");
      setStatusAlert("error");
      setShowAlert(true);
    } else {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/edit-user/${editUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              first_name: editUser.first_name,
              last_name: editUser.last_name,
              cnic: editUser.cnic,
              password: editUser.password ? editUser.password : "",
              user_role: userRole,
              age: editUser.age,
              address: editUser.address,
              gender: editUser.gender,
              blood_group: bloodgroup,
              phone_no: editUser.phone_no,
              availability: editUser.availability,
              account_status : userStatus ? userStatus : "", 
            }),
          }
        )
        data();
        const result = await res.json();
        setMessageAlert("User updated successfully");
        setStatusAlert("success");
        openNotification('top', 'SUCCESS', 'User Edit Successfully')
        setShowAlert(true);
        setModalShow(false);
        setShowAlert(false);
        setUserRole("");
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const handlePageClick = (data) => {
    if(!filterState){
      let currentPage = data.selected + 1;
      const commentsFormServer = data1(currentPage, limit);
      setInitialpage(data.selected);
      setItems(commentsFormServer);
      setisChecked([])

    }else{
      let currentPage = data.selected + 1;
      setInitialpage(data.selected)
      const commentsFormServer = childCompRef.current.searchByPage( `http://127.0.0.1:5000/api/search-user?page=${currentPage}&limit=10`);
      setItems(commentsFormServer);
      setisChecked([]) 
    }
  };

  const handelCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, value], value);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };
  const allDelete = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/bulk-delete-user`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleteData: isChecked,
        }),
      }
    );
    const result = await response.json();
    delelteNotification('top','DELETE User', "Users Deleted Successfully")
    data();
    CardsData();
    setisChecked([]);
  };

const setUserRoleforTable  = (user) =>{
    if(user === 1){
      return 'Admin'
    }else if(user === 2){
      return "Patient"
    }else{
      return "Donor"
    }
}

  return (
    <>
      <div className="d-flex del-search">
        {
          <Button
            disabled={isChecked.length > 0 ? false : true}
            variant="contained"
            color="error"
            onClick={allDelete}
          >
            Delete
          </Button>
        }
        <Search
          placeholder={"Search User by name"}
          url={`http://127.0.0.1:5000/api/search-user?page=1&limit=10`}
          state={setAllUsers}
          setLoader={setTableloader}
          setInitialpage={setInitialpage}
          data={data}
          setFilterState={setFilterState}
          ref={childCompRef}

        />
      </div>
      <div className="user-table-wrapper">
        <table className="user-tbl" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>
            Name
              </th>
              <th>
            CNIC
              </th>
              <th>
            Role
              </th>
              <th>
            Blood Group
              </th>
              <th>
            Account Status
              </th>
              <th>Quick Action</th>
            </tr>
          </thead>
          {showTableLoader === false ? (
            <tbody>
              {allUsers.data?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        value={user.id}
                        checked={user.isChecked}
                        onChange={(e) => handelCheckbox(e)}
                      />
                    </td>
                    <td>
                      <div className="d-flex company-cell">
                        <input
                          value={user.id}
                          type={"hidden"}
                          className="hidden-user-id"
                        />
                        <span>
                          {user.first_name} {user.last_name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className=" customer-cell ">{user.cnic}</span>
                    </td>
                    <td>{setUserRoleforTable(user.user_role)}</td>
                    <td>
                      <span maxlength="30">{user.blood_group}</span>
                    </td>
                    <td>
                      <span>{user.account_status}</span>
                    </td>
                    <td>
                    <span className="quick-act-ico d-flex">
                    <EyeFilled style={{ cursor: "pointer" }} onClick={() => viewUserData(user)}/>
                    </span>
                      { isChecked.length > 0 ?
                      <span className="quick-act-ico d-flex">
                        <img
                          style={{ cursor: "pointer" }}
                          src={Graypen}
                          alt="..."
                          width="24"
                        />
                        <img
                          style={{ cursor: "pointer" }}
                          src={Graytrash}
                          alt="..."
                          width="24"
                          className="ms-2"
                        />
                      </span>: (<span className="quick-act-ico d-flex">
                        <img
                          onClick={(e) => getEditData(user)}
                          style={{ cursor: "pointer" }}
                          src={pen}
                          alt="..."
                          width="24"
                        />
                        <img
                          onClick={() => ShowDeleteModal(user.id)}
                          style={{ cursor: "pointer" }}
                          src={trash}
                          alt="..."
                          width="24"
                          className="ms-2"
                        />
                      </span>)  }
                    </td>
                  </tr>
                );
              })}
            </tbody>
           ) : ( 
             <td colspan="6" style={{ padding: "10px" }}>
              <center>
                <CircularProgress
                  style={{ color: "#FF5348", textAlign: "center" }}
                />
              </center>
            </td> 
           )} 
        </table>

        {/* Update User Modal */}
        
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
              &nbsp; Edit User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login-form ">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">First Name</Label>
                    <input
                      type="text"
                      name="first_name"
                      onChange={handleInput}
                      value={editUser.first_name}
                      className="edit-form-control"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Last Name</Label>
                    <input
                      type="text"
                      name="last_name"
                      onChange={handleInput}
                      value={editUser.last_name}
                      className="edit-form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Age</Label>
                    <input
                      type="text"
                      name="age"
                      onChange={handleInput}
                      value={editUser.age}
                      className="edit-form-control"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Address</Label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleInput}
                      value={editUser.address}
                      className="edit-form-control"
                      placeholder="Address"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">CNIC</Label>
                    <input
                      type="text"
                      name="cnic"
                      onChange={handleInput}
                      value={editUser.cnic}
                      className="edit-form-control"
                      placeholder="CNIC"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Phone No.</Label>
                    <input
                      type="text"
                      name="phone_no"
                      onChange={handleInput}
                      value={editUser.phone_no}
                      className="edit-form-control"
                      placeholder="Phone No"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Blood Group</Label>
                    <select
                  className="edit-form-control padding-rigth-15"
                  value={bloodgroup}
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
                    <Label className="edit-input-label">Gender</Label>
                    <input
                      type="text"
                      name="gender"
                      onChange={handleInput}
                      value={editUser.gender}
                      className="edit-form-control"
                      placeholder="Gender"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">
                      Email*{" "}
                      <span className="edit-from-control-msg">
                        (Email is not editable)
                      </span>
                    </Label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={editUser.email}
                      className="edit-form-control"
                      placeholder="Emaill"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Availablity</Label>
                    <span className="edit-from-control-msg">
                        (Availability is not editable)
                      </span>
                    <input
                      type="text"
                      name="availability"
                      onChange={handleInput}
                      value={editUser.availability}
                      className="edit-form-control"
                      placeholder="Availability"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Label className="edit-input-label">Role</Label>
                <select
                  className="edit-form-control padding-rigth-15"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option>Select</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Patient</option>
                  <option value={3}>Donor</option>
                </select>
              </div>
              {
                userRole == '3' ? 
                <div className="mb-3">
                <Label className="edit-input-label">Account Status</Label>
                <select
                  className="edit-form-control padding-rigth-15"
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                >
                  <option>Select</option>
                  <option value={"HOLD"}>HOLD</option>
                  <option value={"OK"}>OK</option>
                </select>
              </div> : ""

              }
              {showAlert ? (
                <Alert message={showMessage} type={showStatus} />
              ) : (
                <div></div>
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
                  <button onClick={UpdateUser}>Save</button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>



      {/* { View model} */}
      <Modal
          className="edit-modal"
          show={viewmodalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="d-flex justify-content-center color-orange font-family-poppins">
            <img style={{ cursor: "pointer" }} src={pen} alt="..." width="24" />
            <Modal.Title id="contained-modal-title-vcenter">
              &nbsp; User Detail
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login-form ">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">First Name</Label>
                    <input
                      type="text"
                      name="first_name"
                      value={viewdata.first_name}
                      className="edit-form-control"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Last Name</Label>
                    <input
                      type="text"
                      name="last_name"
                      value={viewdata.last_name}
                      className="edit-form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Age</Label>
                    <input
                      type="text"
                      name="age" 
                      value={viewdata.age}
                      className="edit-form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Address</Label>
                    <input
                      type="text"
                      name="address"              
                      value={viewdata.address}
                      className="edit-form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">CNIC</Label>
                    <input
                      type="text"
                      name="cnic"                 
                      value={viewdata.cnic}
                      className="edit-form-control"                      
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Phone No.</Label>
                    <input
                      type="text"
                      name="phone_no"
                      value={viewdata.phone_no}
                      className="edit-form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Blood Group</Label>
                    <input
                      type="text"
                      name="phone_no"
                      value={viewdata.blood_group}
                      className="edit-form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Gender</Label>
                    <input
                      type="text"
                      name="gender"
                      value={viewdata.gender}
                      className="edit-form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">
                      Email
                    </Label>
                    <input
                      type="email"
                      name="email"
                      value={viewdata.email}
                      className="edit-form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Password</Label>
                    <input
                      type="password"
                      name="password"
                      className="edit-form-control"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Label className="edit-input-label">Role</Label>
                <input
                      type="text"
                      name="role"
                      value={viewdata.user_role}
                      className="edit-form-control"
                      placeholder="Password"
                    />
              </div>
              {
                viewdata.user_role == '3' ? 
                <div className="mb-3">
                <Label className="edit-input-label">Prefrence</Label>
                <input
                      type="text"
                      name="role"
                      value={viewdata.status}
                      className="edit-form-control"
                      placeholder="Password"
                    />
              </div> : ""

              }
              {showAlert ? (
                <Alert message={showMessage} type={showStatus} />
              ) : (
                <div></div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="bg-white-cusd"
                    onClick={(e) => {
                      e.preventDefault();
                      setviewModalShow(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>




        {/* Delete User Modal */}
        <Modal
          className="edit-modal"
          show={deleteModalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="d-flex justify-content-center color-orange font-family-poppins">
            <img
              style={{ cursor: "pointer" }}
              src={trash}
              alt="..."
              width="24"
            />
            <Modal.Title id="contained-modal-title-vcenter">
              &nbsp; Delete User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4 className="delete-user-text">
                Are you sure you want to delete this user?
              </h4>
            </div>
            <form className="login-form " onSubmit={deleteUser}>
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="bg-white-cusd"
                    onClick={(e) => { e.preventDefault();

                      setDeleteModalShow(false)}}
                  >
                    Close
                  </button>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="add-user-btn">
                    Delete
                  </button>
                </div>
              </div>
            </form>

            {showAlert ? <Alert message={showMessage} type={showStatus} /> : ""}
          </Modal.Body>
        </Modal>
      </div>
      <Pagination
        count={count}
        limit={limit}
        handlePageClick={handlePageClick}
        initialpage={initialpage}
      />
    </>
  );
}
