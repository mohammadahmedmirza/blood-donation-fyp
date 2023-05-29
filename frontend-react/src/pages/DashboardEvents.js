import DashboardSideNavigationBar from "../components/DashboardSideNavigationBar";
import DashboardEventsBody from "../components/DashboardEventsBody";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-wrapper d-flex">
        <DashboardSideNavigationBar />
        <DashboardEventsBody />
      </div>
    </>
  );
}
