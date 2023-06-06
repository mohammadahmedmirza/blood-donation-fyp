import React, { useContext, useState, useRef } from "react";
import pen from "../images/pen.png";
import trash from "../images/trash.png";
import Graypen from "../images/graypen.png";
import Graytrash from "../images/graytrash.png";
import Modal from "react-bootstrap/Modal";
import { Label } from "reactstrap";
import { Alert } from "antd";
import { RequestsGlobals } from "./DashboardRequestBody";
import Pagination from "./Paginaton";
import Button from "@mui/material/Button";
import Search from "./GuiFilter";
import { CircularProgress } from "@mui/material";

function RequestsTable() {
  const [showAlert, setShowAlert] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const {
    data,
    allRequest,
    CardsData,
    data1,
    initialpage,
    setInitialpage,
    setAllRequest,
    showTableLoader,
    setTableloader,
    filterState,
    setFilterState,
    api,
    openNotification,
   
  } = useContext(RequestsGlobals);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [items, setItems] = useState([]);
  const [isChecked, setisChecked] = useState([]);
 
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const childCompRef = useRef();
  const [editRequest, setEditRequest] = React.useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [bloodgroup, setBloodGroup] = useState("");
  const deleteNotification = (placement, message, description) => {
    api.error({
      message,
      description,
      placement,
    });
  };

  const getEditData = async (request) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/view-request/${request.id}`,
        {
          method: "GET",
        }
      );
      data();
      const result = await res.json();
      setEditRequest(result.data[0]);
      setBloodGroup(result.data[0].blood_group);
    } catch (e) {
      console.log("error", e);
    }
    setModalShow(true);
  };

  const UpdateRequest = async (e) => {
    e.preventDefault();
    if (editRequest.unit === "") {
      setMessageAlert("Please enter Units");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (editRequest.required_date === "") {
      setMessageAlert("Please enter required Date");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (bloodgroup === "") {
      setMessageAlert("Please Select blood Group");
      setStatusAlert("error");
      setShowAlert(true);
    } else {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/edit-request/${editRequest.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              unit: editRequest.unit,
              date: editRequest.required_dat,
              blood_group: bloodgroup,
              status: editRequest.status,
            }),
          }
        );
        data();
        const result = await res.json();
        console.log(result);
        openNotification("top", "SUCCESS", "Request Updated Successfully");
        setMessageAlert("User updated successfully");
        setStatusAlert("success");
        setShowAlert(true);
        setModalShow(false);
        setShowAlert(false);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    let copyEditRequest = editRequest;
    copyEditRequest = { ...copyEditRequest, [e.target.name]: e.target.value };
    setEditRequest(copyEditRequest);
  };

  const ShowDeleteModal = (id) => {
    setShowAlert(false);
    setDeleteModalShow(true);
    setDeleteUserId(id);
  };

  const deleteListing = async (e) => {
    e.preventDefault();
    setDeleteModalShow(false);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/delete-request/${deleteUserId}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
    } catch (e) {
      console.log(e);
    }
    deleteNotification("top", "DELETE User", "User Deleted Successfully");
    CardsData();
    data();
  };

  const count = allRequest.count;
  const limit = 10;

  const handlePageClick = (data) => {
    if (!filterState) {
      let currentPage = data.selected + 1;
      const commentsFormServer = data1(currentPage, limit);
      setInitialpage(data.selected);
      setItems(commentsFormServer);
      setisChecked([]);
    } else {
      let currentPage = data.selected + 1;
      setInitialpage(data.selected);
      const commentsFormServer = childCompRef.current.searchByPage(
        `http://127.0.0.1:5000/api/search-request?page=${currentPage}&limit=10`
      );
      setItems(commentsFormServer);
      setisChecked([]);
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
      `http://127.0.0.1:5000/api/bulk-delete-request`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleteData: isChecked,
        }),
      }
    );
    const result = await response.json();
    deleteNotification(
      "top",
      "DELETE Requests",
      "Requests Deleted Successfully"
    );
    data();
    CardsData();
    setisChecked([]);
  };


  return (
    <>
      <div className="d-flex del-search">
        {
          <Button
            className="deleteButton"
            disabled={isChecked.length > 0 ? false : true}
            variant="contained"
            color="error"
            onClick={allDelete}
          >
            Delete
          </Button>
        }

        <Search
          placeholder={"Search"}
          url={`http://127.0.0.1:5000/api/search-request?page=1&limit=10`}
          state={setAllRequest}
          setLoader={setTableloader}
          setInitialpage={setInitialpage}
          data={data}
          setFilterState={setFilterState}
          ref={childCompRef}
        />
      </div>
      <div className="user-table-wrapper">
        <table
          className="user-tbl"
          style={{ maxWidth: "100%", overflow: "scroll", width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Req. Blood Group</th>
              <th>Req. Date</th>
              <th>Request Status</th>
              <th>Units</th>
              <th>Remaining Units</th>
              <th>Action</th>
            </tr>
          </thead>
          {showTableLoader === false ? (
            <tbody>
              {allRequest.data?.map((request) => {
                return (
                  <tr key={request.id}>
                    <td>
                      <input
                        type="checkbox"
                        value={request.id}
                        checked={request.isChecked}
                        onChange={(e) => handelCheckbox(e)}
                      />
                    </td>
                    <td>
                      <div className="d-flex company-cell">
                        <input
                          type={"hidden"}
                          value={request.id}
                          classNameName="hidden-user-id"
                        />
                        <span>
                          {request.first_name} {request.last_name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="customer-cell">
                        {request.blood_group}
                      </span>
                    </td>
                    <td>{request.required_date}</td>
                    <td>{request.status}</td>
                    <td>{request.unit}</td>
                    <td>{request.remaning_unit}</td>
                    <td>
                      {isChecked.length > 0 ? (
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
                        </span>
                      ) : (
                        <span className="quick-act-ico d-flex">
                          <img
                            onClick={(e) => getEditData(request)}
                            style={{ cursor: "pointer" }}
                            src={pen}
                            alt="..."
                            width="24"
                          />
                          <img
                            onClick={() => {
                              return ShowDeleteModal(request.id);
                            }}
                            style={{ cursor: "pointer" }}
                            src={trash}
                            alt="..."
                            width="24"
                            className="ms-2"
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <td colspan="10" style={{ padding: "10px" }}>
              <center>
                <CircularProgress
                  style={{ color: "#FF5348", textAlign: "center" }}
                />
              </center>
            </td>
          )}
        </table>

        {/* {Edit Modal} */}

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
              &nbsp;Edit Patient Request
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login-form ">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">First Name</Label>
                    <input
                      style={{ background: "#e1d6d6" }}
                      type="text"
                      name="first_name"
                      onChange={handleInput}
                      value={editRequest.first_name}
                      className="edit-form-control"
                      placeholder="First Name"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Last Name</Label>
                    <input
                      style={{ background: "#e1d6d6" }}
                      type="text"
                      name="last_name"
                      onChange={handleInput}
                      value={editRequest.last_name}
                      className="edit-form-control"
                      placeholder="Last Name"
                      disabled
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
                    <Label className="edit-input-label">Req. Date</Label>
                    <input
                      type="date"
                      name="required_date"
                      onChange={handleInput}
                      value={editRequest.required_date}
                      className="edit-form-control"
                      placeholder="Date"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Request Status</Label>
                    <input
                      style={{ background: "#e1d6d6" }}
                      className="edit-form-control padding-rigth-15"
                      value={editRequest.status}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Units</Label>
                    <input
                      type="number"
                      name="unit"
                      onChange={handleInput}
                      value={editRequest.unit}
                      className="edit-form-control"
                      placeholder="Units"
                    />
                  </div>
                </div>
              </div>

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
                  <button onClick={UpdateRequest}>Save</button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        {/* deleting list Modal */}
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
              &nbsp; Delete Request
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4 className="delete-user-text">
                Are you sure you want to delete this Request?
              </h4>
            </div>
            <form className="login-form " onSubmit={deleteListing}>
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="bg-white-cusd"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteModalShow(false);
                    }}
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

export default RequestsTable;
