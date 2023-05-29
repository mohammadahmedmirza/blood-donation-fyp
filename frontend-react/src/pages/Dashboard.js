import React from "react";
import DashboardSideNavigationBar from "../components/DashboardSideNavigationBar";
import DashboardUserBody from "../components/DashboardUserBody";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-wrapper d-flex">
        <DashboardSideNavigationBar />
        <DashboardUserBody />
      </div>
    </>
  );
}
