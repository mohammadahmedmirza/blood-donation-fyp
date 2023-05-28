import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom';

function Protected(props) {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        let loginAdmin = localStorage.getItem('user_role');

        if (!loginAdmin == "1"){
          navigate("/login")
        }
        else if(loginAdmin == "2"){
          navigate("/")
        }else if(loginAdmin == "3"){
          navigate("/")
        }
      
    });
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected
