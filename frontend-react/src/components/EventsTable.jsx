import React, { useContext, useState, useRef, useEffect } from "react";
import pen from "../images/pen.png";
import trash from "../images/trash.png";
import Graypen from "../images/graypen.png";
import Graytrash from "../images/graytrash.png";
import Modal from "react-bootstrap/Modal";
import { Label } from "reactstrap";
import { Alert } from "antd";
import { EventsGlobals } from "./DashboardEventsBody";
import Pagination from "./Paginaton";
import Button from "@mui/material/Button";
import Search from "./GuiFilter";

import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";

function EventsTable() {
  
  const [showAlert, setShowAlert] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const {
    data,
    CardsData,
    data1,
    initialpage,
    setInitialpage,
    setAllListing,
    showTableLoader,
    allDonorEvents: allDonorEvents,
    allPatientEvents: allPatientEvents,
    setTableloader,
    filterState,
    setFilterState,
    services,
    totalResults
  } = useContext(EventsGlobals);
  // const {location, setLocation, selectedLocation, setSelectedLocation, editListingId, setEditListingId, setServices} = useContext(MapGlobals);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [items, setItems] = useState([]);
  const [query, setQuery] = React.useState("");
  const [isChecked, setisChecked] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteStatus, setDeleteStatusAlert] = useState(false);
  const [showDeleteMessage, setDeleteMessageAlert] = useState("");
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const [sorting, setsorting] = useState(false)
  const childCompRef = useRef();
  const count = totalResults;
  const limit = 10;

  
//   const ShowDeleteModal = (id) => {
//     setShowAlert(false);
//     setDeleteModalShow(true);
//     setDeleteUserId(id);
//   };
//   useEffect(()=>{
//     console.log(editListingId,'sjhdvjksdvhkjh');
//   },[editListingId])

//   const deleteListing = async () => {
//     try {
//       const res = await fetch(
//         `https://test-wrangler.listing.workers.dev/api/delete-listing/${deleteUserId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await res.json();
//     } catch (e) {
//       console.log(e);
//     }
//     CardsData();
//     data();
//   };

const changeEventStatus = async(eventId) => {
  try {
          const res = await fetch(
            `http://127.0.0.1:5000/api/change-event-status/${eventId}`,
            {
              method: "GET",
            }
          );
          const result = await res.json();
          if(result.status === 2){
            data();
          }
        } catch (e) {
          console.log(e);
        }

}


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
        `https://test-wrangler.listing.workers.dev/api/search-listing?page=${currentPage}&limit=10`
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

//   const allDelete = async () => {
//     const response = await fetch(
//       `https://test-wrangler.listing.workers.dev/api/bulk-delete-listing`,
//       {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           deleteData: isChecked,
//         }),
//       }
//     );
//     const result = await response.json();
//     setShowDeleteAlert(true);
//     setDeleteMessageAlert(result.msg);
//     setDeleteStatusAlert(result.status);
//     data();
//     CardsData();
//     setisChecked([]);
//   };
//   setTimeout(() => {
//     setShowDeleteAlert(false);
//   }, 5000);

  // useEffect(() =>{
  //   console.log("services?.results", services)
  // },[services])
// console.log(services,'aserveices')
  return (
    <>
      <div className="d-flex del-search">
        
        {/* {showDeleteAlert ? (
          <Alert message={showDeleteMessage} type="error" />
        ) : (
          ""
        )} */}

        {/* <Search
          placeholder={"Search listing by name"}
          url={`https://test-wrangler.listing.workers.dev/api/search-listing?page=1&limit=10`}
          state={setAllListing}
          setLoader={setTableloader}
          setInitialpage={setInitialpage}
          data={data}
          setFilterState={setFilterState}
          ref={childCompRef}
        /> */}
      </div>
      <div className="user-table-wrapper">
        <table
          className="user-tbl"
          style={{ maxWidth: "100%", overflow: "scroll", width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>
                Patient Name
              </th>
              <th>
                Donor Name
              </th>
              <th>
                Blood Group
              </th>
              <th>
                Donation Period
              </th>
              <th>
               Event Status
              </th>
              <th>
               Change Event Status
              </th>
            </tr>
          </thead>
          {showTableLoader === false ? (
            <tbody>
              {allDonorEvents.map((donorEvent) => {
                return(
                allPatientEvents.map((patientEvent)=>{
               
                  if(donorEvent.id === patientEvent.id){
                    return (
                      <tr key={donorEvent.id}>
                        <td>
                          <input
                            type="checkbox"
                            value={donorEvent.id}
                            checked={donorEvent.isChecked}
                            onChange={(e) => handelCheckbox(e)}
                          />
                        </td>
                        <td>
                          <div className="d-flex company-cell">
                            <input
                              type={"hidden"}
                              value={donorEvent.id}
                              classNameName="hidden-user-id"
                            />
                            <span>{patientEvent.first_name} {patientEvent.last_name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="customer-cell">
                            {donorEvent.first_name} {donorEvent.last_name}
                          </span>
                        </td>
                        <td>{donorEvent.blood_group.toUpperCase()}</td>
                        <td>{donorEvent.donation_date}</td>
                        <td>{donorEvent.status}</td>
                       
                        {
                          donorEvent.status === "PENDING" ?
                          <td><button className="btn-nav-addlisting" onClick={() =>{changeEventStatus(donorEvent.id)}}>Complete</button></td>:
                          <td><span className="customer-cell">This Event is Completed</span></td>


                        }
                        {/* <td>
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
                                // onClick={() => {
                                //    Navigate(`/admin/editListing/${listing.listing_id}`)
    
                                // }}
                                style={{ cursor: "pointer" }}
                                src={pen}
                                alt="..."
                                width="24"
                              />
                              <img
                                // onClick={() => {
                                //   return ShowDeleteModal(listing.listing_id);
                                // }}
                                style={{ cursor: "pointer" }}
                                src={trash}
                                alt="..."
                                width="24"
                                className="ms-2"
                              />
                            </span>
                          )}
                        </td> */}
                      </tr>
                    );


                  }

                  })
              )})}
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



        {/* deleting list Modal */}
        {/* <Modal
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
                Are you sure you want to delete this List?
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
        </Modal> */}
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


export default EventsTable;
