import React from 'react'
import user from "../images/user.png";
export default function DashboardHeader({title}) {   
  return (
    <div className="top-dash-header d-flex align-items-center">
                <div className="dash-page-title d-flex">
                    <h4>{title}</h4>
                </div>
                <div className="ms-auto signout-notify d-flex">
                    <div className="btn-group notfication">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {/* <img src={notification} alt="..." /> */}
                        </button>
                        {/* <ul className="dropdown-menu dropdown-menu-end">
                            <li><button className="dropdown-item" type="button">Action</button></li>
                            <li><button className="dropdown-item" type="button">Another action</button></li>
                            <li><button className="dropdown-item" type="button">Something else here</button></li>
                        </ul> */}
                    </div>
                    <div className="btn-group signout-user">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={user} alt="..." />
                            {/* {localStorage.getItem("username")} */}
                            {/* <img className="arrow-ico-grey" src={arrowdownGrey} alt="..."/> */}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><button className="dropdown-item" type="button">Action</button></li>
                            <li><button className="dropdown-item" type="button">Another action</button></li>
                            <li><button className="dropdown-item" type="button">Something else here</button></li>
                        </ul>
                    </div>
                </div>
            </div>
  )
}
