import React, { useEffect, useState, createContext } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardEventsCards from "./DashboardEventsCards";
import EventsTable from "./EventsTable";

export const EventsGlobals = createContext();
function DashboardEventsBody() {
  // const navigate = Navigate();
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [users, setUsers] = useState([]);
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [flag, setFlag] = useState(false);
  const [allPatientEvents, setAllPatientEvents] = useState([]);
  const [allDonorEvents, setAllDonorEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [totalPatients, setTotalPatients] = React.useState(0);
  const [totalDonors, setTotalDonors] = React.useState(0);
  const [totalRequests, setTotalRequests] = React.useState(0);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [initialpage, setInitialpage] = useState(0);
  const [showTableLoader, setTableloader] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [services, setServices] = useState([]);
  const [totalResults, setTotalResults] = useState(null)

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
        `http://127.0.0.1:5000/api/get-all-events?page=1&limit=10`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setAllPatientEvents(result.data[0]);
      setAllDonorEvents(result.data[1]);
      setTotalResults(result.data[2][0].count)
      setTableloader(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const data1 = async (page, limit) => {
    setTableloader(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-events?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setAllPatientEvents(result.data[0]);
      setAllDonorEvents(result.data[1]);
      setTotalResults(result.data[2][0].count)
      setTableloader(false);
    } catch (err) {
      console.log(err.message);
    }
  };




 
  return (
    <EventsGlobals.Provider
      value={{
        data: data,
        data1: data1,
        CardsData: CardsData,
        setInitialpage: setInitialpage,
        setTableloader: setTableloader,
        initialpage: initialpage,
        totalResults:totalResults,
        allDonorEvents: allDonorEvents,
        allPatientEvents: allPatientEvents,
        Cardsloader: loader,
        totalPatients: totalPatients,
        totalDonors:totalDonors,
        totalRequests: totalRequests,
        totalEvents:totalEvents,
        showTableLoader: showTableLoader,
        setFilterState: setFilterState,
        filterState: filterState,
      }}
    >
      <div className="dash-body">
        <DashboardHeader title={"Events"} />
        <div className="dash-user-content">
          
        </div>

        <div className="over-tbl-content">
         <DashboardEventsCards/>
          <EventsTable />
        </div>
      </div>
    </EventsGlobals.Provider>
  );
}

export default DashboardEventsBody;
