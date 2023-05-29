import React from "react";
import "../App.css";
import "./HeroSection.css";
import { Link } from "react-router-dom";


function HeroSection() {
  const userId = localStorage.getItem("id");
  const account_status = localStorage.getItem("account_status")

  const ClickHandler = (event) => {
		event.preventDefault();
	};
  return (
    <div className="hero-container">  
        <>
          <p>
            "Your single blood donation can be the difference between life
            <p />
            and death for a thalassemia patient - donate today and be a hero!"
          </p> 
          {!userId ? 
          <div className="d-flex">
          <div className="hero-btns">
            <Link to="/sign-up" className="btns">
              Register Yourself!
            </Link>
          </div>
          <div className="hero-btns">
            <Link to="/login" className="btns">
              Login
            </Link> 
          </div>
          </div> : account_status !== "HOLD" ?
          <>
          
          <div className="d-flex">
            <div className="hero-btns">
              <Link to="/availability" className="btns">
                Search Patient
              </Link>
            </div>
            <div className="hero-btns">
              <Link to="/check-event" className="btns">
                Your Donations
              </Link> 
            </div>
            </div>
          
          </> : 
          <>
          <div className="d-flex">
            <div className="hero-btns">
              <Link onClick={ClickHandler} to="/availability" className="btns">
                Search Patient
              </Link>
            </div>
        <div className="hero-btns">
              <Link to="/check-event" className="btns">
                Your Donations
              </Link> 
            </div>
            </div>
          </>
        
        
        
          
          }
        </>
    </div>
  );
}

export default HeroSection;
