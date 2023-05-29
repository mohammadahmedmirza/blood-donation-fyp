import DashboardSideNavigationBar from '../components/DashboardSideNavigationBar'
import DashboardRequestsBody from '../components/DashboardRequestBody'

export default function Dashboard() {
  return (
    <>
    <div className="dashboard-wrapper d-flex">   
    <DashboardSideNavigationBar/>
    <DashboardRequestsBody/>  
    </div>
   
    </>
  )
}