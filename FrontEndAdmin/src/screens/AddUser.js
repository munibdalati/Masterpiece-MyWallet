import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import AddUserForm from "../components/Vacancies/AddUserForm";
import "../style/AdminPanel.css"

function AddUser() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={containerStyle}>
      <NavComponent />
      <div style={contentStyle}>
        <AddUserForm />
      </div>
      <Footer />
    </div>
  );
}

export default AddUser;
