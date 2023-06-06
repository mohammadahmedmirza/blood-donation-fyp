import React, { useEffect, useState, createContext } from "react";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router-dom";
import add from "../images/add.png";
import pen from "../images/pen.png";
import Modal from "react-bootstrap/Modal";
import { Label } from "reactstrap";
import { Alert, notification } from "antd";
import DashboardRequestsCards from "./DashboardRequestsCards";
import RequestsTable from "./RequestsTable";

export const RequestsGlobals = createContext();
function DashboardRequestsBody() {
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const [patientsData, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [flag, setFlag] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  const [loader, setLoader] = useState(false);
  const [totalPatients, setTotalPatients] = React.useState(0);
  const [totalDonors, setTotalDonors] = React.useState(0);
  const [totalRequests, setTotalRequests] = React.useState(0);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [initialpage, setInitialpage] = useState(0);
  const [showTableLoader, setTableloader] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [BloodGroup, setBloodGroup] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const [requestData, setRequest] = useState({
    units: "",
    required_date: "",
  });

  const openNotification = (placement, message, description) => {
    api.success({
      message,
      description,
      placement,
    });
  };

  useEffect(() => {
    data();
    CardsData();
    setInitialpage(0);
  }, []);

  const CardsData = async () => {
    setLoader(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/get-cards-data`, {
        method: "GET",
      });
      const result = await res.json();

      //setCategoriesList(result);
      setTotalPatients(result.total_patients);
      setTotalDonors(result.total_donors);
      setTotalRequests(result.total_requests);
      setTotalEvents(result.total_events);
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const data = async () => {
    setTableloader(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-request?page=1&limit=10`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setTableloader(false);
      setAllRequest(result);
      // setServices(result.services);
      setFlag(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const data1 = async (page, limit) => {
    setTableloader(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-request?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setTableloader(false);
      setAllRequest(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addRequestModal = async (e) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/get-all-patients`, {
        method: "GET",
      });
      const result = await res.json();
      setPatients(result.data);
      setModalShow(true);
    } catch (e) {
      console.log(e);
    }
    // setModalShow(true);
  };

  const addRequest = async (e) => {
    e.preventDefault();
    if (requestData.units === "") {
      setMessageAlert("Please Enter Required Units");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (requestData.required_date === "") {
      setMessageAlert("Please enter Required Date");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (selectedPatient === "") {
      setMessageAlert("Please Select the Patient");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (BloodGroup === "") {
      setMessageAlert("Please Select the Blood Group");
      setStatusAlert("error");
      setShowAlert(true);
    } else {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/approve-request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            unit: requestData.units,
            required_date: requestData.required_date,
            blood_group: BloodGroup,
            id: selectedPatient,
          }),
        });
        openNotification("top", "SUCCESS", "Request Added  Successfully");
        const result = await res.json();
        CardsData();
        data();
        setModalShow(false);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleInput = (e) => {
    e.preventDefault();
    setRequest({ ...requestData, [e.target.name]: e.target.value });
  };

  return (
    <RequestsGlobals.Provider
      value={{
        data: data,
        data1: data1,
        CardsData: CardsData,
        setInitialpage: setInitialpage,
        setAllRequest: setAllRequest,
        setTableloader: setTableloader,
        initialpage: initialpage,
        allRequest: allRequest,
        Cardsloader: loader,
        totalPatients: totalPatients,
        totalDonors: totalDonors,
        totalRequests: totalRequests,
        totalEvents: totalEvents,
        api: api,
        contextHolder: contextHolder,
        openNotification: openNotification,
        showTableLoader: showTableLoader,
        setFilterState: setFilterState,
        filterState: filterState,
      }}
    >
      {contextHolder}
      <div className="dash-body">
        <DashboardHeader title={"Requests"} />
        <div className="dash-user-content">
          <div className="d-flex align-items-center total-over-add">
            <Link onClick={addRequestModal} className="ms-auto add-user-btn">
              <img src={add} alt="..." />
              Add Requests
            </Link>
          </div>
        </div>

        <div className="over-tbl-content">
          <DashboardRequestsCards />
          <RequestsTable />
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
            &nbsp; Add Patient Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login-form ">
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
                  <Label className="edit-input-label">Units Required*</Label>

                  <input
                    type="number"
                    name="units"
                    value={requestData.units}
                    onChange={handleInput}
                    className="edit-form-control"
                    placeholder="Units"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <Label className="edit-input-label">Required Date*</Label>

                  <input
                    type="date"
                    name="required_date"
                    value={requestData.required_date}
                    onChange={handleInput}
                    className="edit-form-control"
                    placeholder="Required Date"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <Label className="edit-input-label">Patient*</Label>
                  <select
                    className="edit-form-control padding-rigth-15"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  >
                    <option>Select</option>
                    {patientsData?.map((element) => {
                      return (
                        <option value={element.id}>
                          {element.first_name} {element.last_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {showAlert ? <Alert message={showMessage} type={showStatus} /> : ""}
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
                <button onClick={addRequest}>Save</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </RequestsGlobals.Provider>
  );
}

export default DashboardRequestsBody;
