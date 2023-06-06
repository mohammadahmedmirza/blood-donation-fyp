import React, { useContext, useState, useRef, useEffect } from "react";
import { EventsGlobals } from "./DashboardEventsBody";
import Pagination from "./Paginaton";
import { CircularProgress } from "@mui/material";

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


  return (
    <>
      <div className="d-flex del-search">
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
