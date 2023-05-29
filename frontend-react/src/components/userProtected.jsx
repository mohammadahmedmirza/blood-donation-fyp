import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProtected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let loginAdmin = localStorage.getItem("user_role");

    if (!loginAdmin) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}

export default UserProtected;
