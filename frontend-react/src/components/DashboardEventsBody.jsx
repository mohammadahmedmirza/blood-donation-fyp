import React, { useEffect, useState, createContext } from "react";
import DashboardHeader from "./DashboardHeader";
import { Link, Navigate } from "react-router-dom";
import add from "../images/add.png";
// import ListingTable from "./ListingTable";
import pen from "../images/pen.png";
import Modal from "react-bootstrap/Modal";
import { Label } from "reactstrap";
import { Alert } from "antd";
// import Places from "../pages/places";
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

  // const getCategories = async (e) => {
  //   try {
  //     const res = await fetch(
  //       `https://test-wrangler.listing.workers.dev/api/get-sub-categories`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const result = await res.json();
  //     const res2 = await fetch(
  //       `https://test-wrangler.listing.workers.dev/api/get-all-listing-user`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const result2 = await res2.json();
  //     setCategories(result.results);
  //     setUsers(result2.results);
  //     setSelectedUser(result2.results[0].id)
  //     setModalShow(true);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setModalShow(true);
  // };

  // const addListing = async (e) => {
  //   e.preventDefault();
  //   if (listing.location === "") {
  //     setMessageAlert("Please enter Location");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.name === "") {
  //     setMessageAlert("Please enter Listing Name");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.menu_type === "") {
  //     setMessageAlert("Please enter Comma Seprated Menu Types");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.services === "") {
  //     setMessageAlert("Please enter Comma Seprated Services");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.rating === "") {
  //     setMessageAlert("Please enter Rating");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.rating_count === "") {
  //     setMessageAlert("Please enter Rating Count");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.image_path === "") {
  //     setMessageAlert("Please enter Image Url");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.video_path === "") {
  //     setMessageAlert("Please enter Video Url");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.description === "") {
  //     setMessageAlert("Please enter Description");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.url === "") {
  //     setMessageAlert("Please enter URL");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.timing === "") {
  //     setMessageAlert("Please enter Timing");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if (listing.address === "") {
  //     setMessageAlert("Please enter Address");
  //     setStatusAlert("error");
  //     setShowAlert(true);

  //   } else if(listing.min_price  === ""){
  //     setMessageAlert("Please enter Minimum Price");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if(listing.max_price === ""){
  //     setMessageAlert("Please enter Maximum Price");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   } else if(listing.phn_number === ""){
  //     setMessageAlert("Please enter Phone Number");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   }else if(listing.start_time === ""){
  //     setMessageAlert("Please enter Start Time");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   }else if(listing.end_time === ""){
  //     setMessageAlert("Please enter End Time");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   }else if (listing.min_price >= listing.max_price) {
  //     setMessageAlert("Menus maximum price cannot be less than or equal to minimum price. ");
  //     setStatusAlert("error");
  //     setShowAlert(true);
  //   }else {
  //     try {
  //       const res = await fetch(
  //         `https://test-wrangler.listing.workers.dev/api/add-listing`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             sub_category_id: selectedCategory,
  //             rating: listing.rating,
  //             rating_count: listing.rating_count,
  //             menu_type: listing.menu_type,
  //             location: listing.location,
  //             services: listing.services,
  //             description: listing.description,
  //             url: listing.url,
  //             image_path: listing.image_link,
  //             video_path: listing.video_link,
  //             timing: listing.timing,
  //             user_id: selectedUser,
  //             name: listing.name,
  //             address: listing.address,
  //             max_price: listing.max_price,
  //             min_price: listing.min_price,
  //             timing: listing.start_time + " to " + listing.end_time,
  //             phone_number: listing.phn_number,
  //             start_time: listing.start_time,
  //             end_time: listing.end_time
  //           }),
  //         }
  //       );
  //       // const result = await res.json();
  //       CardsData();
  //       data();
  //       setModalShow(false);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };
  // // const handleInput = (e) => {
  //   e.preventDefault();
  //   setListing({ ...listing, [e.target.name]: e.target.value });
  // };

  // const handleChange = (e) => {
  //   setSelectedUser(e.target.value);
  // };



 
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
        // services: services,
      }}
    >
      <div className="dash-body">
        <DashboardHeader title={"Events"} />
        <div className="dash-user-content">
          
        </div>

        <div className="over-tbl-content">
         <DashboardEventsCards/>
          {/* <DashboardListingCards /> */}
          {/* <ListingTable /> */}
          <EventsTable />
        </div>
      </div>
    </EventsGlobals.Provider>
  );
}

export default DashboardEventsBody;
