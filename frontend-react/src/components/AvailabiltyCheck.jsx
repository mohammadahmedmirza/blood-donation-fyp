import React, { useEffect, useState } from "react";
import { Switch, Card, Button, Drawer, notification, Alert } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";

function AvailabiltyCheck() {
  const userID = localStorage.getItem("id");
  const [bloodGroup, setBloodGroup] = useState("");
  const [ischecked, setChecked] = useState(false);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState([]);
  const [isBoxChecked, setisChecked] = useState("");
  const [patientID, setPatientId] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [disableMessage, setDisableMessage] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message, description) => {
    api.success({
      message,
      description,
      placement,
      duration: 15
    });
  };

  const getAvailability = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-user-availability/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      console.log(result);
      if (result.status === 2) {
        if (result.data[0].length > 0) {
          setDisableMessage(
            `Please visit Thalassemia Center 5 days prior to the "${result.data[0][0].donation_date}" for smooth process`
          );
          setDisable(true);
        }
        if (result.data[1].length > 0) {
          setDisableMessage(
            `You cannot serach for patient because you are already donated to someone else, and your next availability date will be "${result.data[1][0].donor_availability_date}"`
          );
          setDisable(true);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const getBloodGroup = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-donor-bloodgroup/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setBloodGroup(result.data[0].blood_group);
    } catch (e) {
      console.log("error", e);
    }
  };
  const onChange = async (checked) => {
    if (checked) {
      try {
        setChecked(true);
        const res = await fetch(
          `http://127.0.0.1:5000/api/patient-request-for-donor`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blood_group: bloodGroup,
            }),
          }
        );
        const result = await res.json();
        setPatient(result.data);
        console.log(result.data);
        setOpen(true);
      } catch (e) {
        console.log("error", e);
      }
    } else {
      setOpen(false);
      setChecked(false);
    }
  };
  const onClose = () => {
    setOpen(false);
    setChecked(false);
  };

  const handelCheckbox = async (e) => {
    const { value, checked } = e.target;
    console.log(value, "value", checked, "checked");
    if (checked) {
      setisChecked(value);
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/get-single-request-data/${value}`,
          {
            method: "GET",
          }
        );
        const result = await res.json();
        setPatientId(result.data[0].patient_id);
        setDonationDate(result.data[0].required_date);
      } catch (e) {
        console.log("error", e);
      }
    } else {
      setisChecked();
    }
  };

  const submitHandle = async (e) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/add-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: patientID,
          donor_id: userID,
          donation_date: donationDate,
          requestID: isBoxChecked,
          blood_group: bloodGroup,
        }),
      });
      const result = await res.json();
      onClose();
      openNotification(
        "top",
        "SUCCESS",
        `Thanks for Donating Blood. You can Donate blood on ${donationDate}`
      );
      getAvailability();
    } catch (e) {
      console.log("error", e);
    }
  };

  const divStyle = {
    margin: "auto",
    width: "50%",
    padding: "10px",
    marginTop: "100px",
    justifyContent: "space-between",
  };
  const divStyleforSwitch = {
    margin: "auto",
    padding: "10px",
    marginTop: "100px",
    justifyContent: "space-between",
    backgroundColor: "#ff5348",
    width: "80%",
    borderRadius: "10px",
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "end",
    width: "auto",
  };
  useEffect(() => {
    getBloodGroup();
    getAvailability();
  }, []);

  return (
    <body className="check-event">
      {contextHolder}
      <Header />
      <div className="container" style={divStyle}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginTop: "20px", color: "#fff", fontWeight: "bold" }}>
            Search a Deserving Patient whom you want to Donate
          </h1>
        </div>
        <div style={buttonStyle}>
          <Button style={{ color: "white", background: "#ff5348" }}>
            <Link to="/">Back</Link>
          </Button>
        </div>
        <div style={divStyleforSwitch} className="d-flex">
          <p style={{ fontWeight: "bold", color: "#fff" }}>Search</p>
          {!disable ? (
            <Switch checked={ischecked} onChange={onChange} />
          ) : (
            <>
              <Switch checked={false} disabled={true} onChange={onChange} />
            </>
          )}
        </div>
        {disable ? (
          <div className="d-flex justify-content-center m-2">
            <Alert message={disableMessage} banner type="error" closable />
          </div>
        ) : (
          ""
        )}
      </div>
      <Drawer
        title="Available Patients"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        footer={
          isBoxChecked ? (
            <div
              className="btn"
              style={{
                width: "100%",
                textAlign: "center",
                border: "none !important",
                color: "#fff",
              }}
              onClick={submitHandle}
            >
              Submit
            </div>
          ) : (
            <div
              disabled
              className="btn"
              style={{
                width: "100%",
                textAlign: "center",
                border: "none !important",
                color: "#fff",
                background: "gray",
              }}
            >
              Submit
            </div>
          )
        }
        footerStyle={
          isBoxChecked
            ? {
                backgroundColor: "#ff5348",
                padding: "inherit",
              }
            : {
                padding: "inherit",
                backgroundColor: "gray",
              }
        }
      >
        {patient.map((patientData) => {
          return (
            <div
              className="drawer-cards d-flex"
              style={{ justifyContent: "space-evenly", background: "#ffe8e7" }}
            >
              <input
                type="checkbox"
                value={patientData.id}
                checked={isBoxChecked == patientData.id ? true : false}
                onChange={(e) => handelCheckbox(e)}
              />
              <Card
                title={patientData.first_name + " " + patientData.last_name}
                bordered={true}
                style={{
                  width: 300,
                  border: "#ff7f7fd9 1px solid",
                  background: "#ffe8e7",
                  margin: "20px",
                }}
              >
                <p>
                  <b>Blood Group :</b> {patientData.blood_group}
                </p>
                <p>
                  <b>Required Date : </b> {patientData.required_date}
                </p>
                <p>
                  <b>Units Required : </b> {patientData.unit}
                </p>
              </Card>
            </div>
          );
        })}
      </Drawer>
    </body>
  );
}

export default AvailabiltyCheck;
