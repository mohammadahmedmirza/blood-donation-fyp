import React from 'react'
import { Alert } from "antd";

function AlertForHold() {
    const account_status = localStorage.getItem("account_status")

  return (
    <div>
    {
      account_status === "hold" ? 
      <Alert
      style={{marginTop: '88px'}}
      message="Your Account is on Hold. Kindly go to our screening center to complete your verification to become avaialble for donation"
      banner
      closable
    />: ""
    }
    </div>
  )
}

export default AlertForHold
