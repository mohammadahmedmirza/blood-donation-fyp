import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from './pages/Layout';
import UserLayout from './pages/UserLayout';
import {message} from "antd";
import Volunteer from './pages/Voluteer';
import Dashboard from "./pages/Dashboard";
import DashboardRequests from "./pages/DashboardRequests" 
import DashboardEvents from "./pages/DashboardEvents"
import Protected from "../src/components/Protected";
import CheckEvent from './components/CheckEvent';
import AvailabiltyCheck from './components/AvailabiltyCheck';
import UserProtected from './components/userProtected';
import AboutUsPage from './pages/AboutUsPage';

const App = () => {
    const url  = window.location.pathname

    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Layout />} />
                    <Route path="*" element={<Navigate to="/" />} />
            <Route
            path="/admin/user"
            element={<Protected Component={Dashboard} url={window.location.href} />}
          />
           <Route
            path="/admin/requests"
            element={<Protected Component={DashboardRequests} url={window.location.href}/>}
          />
            <Route
            path="/admin/events"
            element={<Protected Component={DashboardEvents} url={window.location.href}/> }
          />
             <Route
            path="/check-event"
            element={<UserProtected Component={CheckEvent} url={window.location.href}/> }
          />
                    <Route exact path="/login" element={<Login url={url}/>}/>
                    <Route exact path="/sign-up" element={<Signup />}/>
                    <Route exact path="/volunteer" element={<Volunteer />}/>
                    <Route exact path="/availability" element={<AvailabiltyCheck />}/>
                    <Route exact path="/about-us" element={<AboutUsPage />}/>

                    
                </Routes>
            </Router>
        </div>

    )

};

export default App;