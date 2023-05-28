import React from 'react'
import PatientEvent from './PatientEvent'
import DonorEvent from './DonorEvent'
import Header from './Navbar';

function CheckEvent() {

    let loginAdmin = localStorage.getItem('user_role');

  return (
    
    <body className='check-event '>
      <Header/>
   
    {
        loginAdmin == "2" ? 
          <PatientEvent/>:<DonorEvent/> 
    }
     </body>
    
  )
}

export default CheckEvent