import React from 'react'
import LOGO from '../images/dashlogo.png'
import {Link, useNavigate } from 'react-router-dom';
import { Alert } from 'antd'

function Header() {     
    const navigate  = useNavigate()
    const currentUserLoginId = localStorage.getItem("id");
    const username = "Welcome, " + localStorage.getItem('firstname') + " " + localStorage.getItem("lastname")
    const account_status = localStorage.getItem("account_status")

    const clearToken = () => {
        localStorage.clear()
        navigate('/')
    }

  return (
    <>
        <header className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand" to="/">
                        <img 
                            src={LOGO} 
                            alt="Logo"
                            width={220}
                            style={{width:120}}
                    />
                    </Link> 
                    <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0"></ul>
                    {
                        !currentUserLoginId ? <form className="d-flex">
                        <Link to="/about-us" className="btn-nav-login">About Us</Link>
                        {/* <Link to="/sign-up" className="btn-nav-login">How It Works</Link> */}
                    </form> : <div class="btn-group signout-user ">
                    
                    
                     <p className='header-username'>{username}</p>
                    <Link to="/about-us">
                    <button className="btn-nav-login mt-2">About Us</button>
                    </Link>
                     <Link to="/check-event">
                     {/* <button className="btn-nav-login mt-2">How It Works</button> */}
                     </Link>
                     
                     <button className="btn-nav-addlisting mt-2" onClick={clearToken}>LOGOUT</button>  
                </div>
                    }
                
                        
                    </div>
                </nav>
            </div>
            {
      account_status === "HOLD" ? 
      <Alert
      message="Your Account is on Hold. Kindly go to our screening center to complete your verification to become eligible for blood donation. You can't set your availability when your account is on Hold."
      banner
      type="error"
      closable
    />: ""
    }
        </header>
       
    </>
  )
}

export default Header