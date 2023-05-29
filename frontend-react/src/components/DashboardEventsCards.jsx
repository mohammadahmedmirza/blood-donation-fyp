import React, {useContext } from "react";
import { CircularProgress } from "@mui/material";
import { EventsGlobals } from "./DashboardEventsBody";

export default function DashboardEventsCards({ users }) {
  const { Cardsloader, totalPatients, totalDonors,totalRequests,totalEvents } = useContext(EventsGlobals);
  

  return (
    <div class="overview-content">
      <div class="row gx-4">
        <div class="col-lg-3">
          <div class="overview-box">
            {Cardsloader === false ? (
              <div>
                <h6 class="d-flex align-items-center">Total Patients</h6>
                <p>{totalPatients}</p>
              </div>
            ) : (
              <div className="list-box d-flex justify-content-center align-items-center">
                <CircularProgress style={{ color: "#FF5348" }} />
              </div>
            )}
          </div>
        </div>
        <div class="col-lg-3">
          <div class="overview-box">
            {Cardsloader === false ? (
              <div>
                <h6 class="d-flex align-items-center">
                  Total Donors
                </h6>
                <p>
                  {totalDonors}
                </p>
              </div>
            ) : (
              <div className="list-box d-flex justify-content-center align-items-center">
                <CircularProgress style={{ color: "#FF5348" }} />
              </div>
            )}

          </div>
        </div>

        <div class="col-lg-3">
          <div class="overview-box">
            {Cardsloader === false ? (
              <div>
                <h6 class="d-flex align-items-center">
                  Total Requests
                </h6>
                <p>
                  {totalRequests}
                </p>
              </div>
            ) : (
              <div className="list-box d-flex justify-content-center align-items-center">
                <CircularProgress style={{ color: "#FF5348" }} />
              </div>
            )}
          </div>
        </div>
        <div class="col-lg-3">
          <div class="overview-box">
            {Cardsloader === false ? (
              <div>
                <h6 class="d-flex align-items-center">
                  Total Events
                </h6>
                <p>
                  {totalEvents}
                </p>
              </div>
            ) : (
              <div className="list-box d-flex justify-content-center align-items-center">
                <CircularProgress style={{ color: "#FF5348" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
