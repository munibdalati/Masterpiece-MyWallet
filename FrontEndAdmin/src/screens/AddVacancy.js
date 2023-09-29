import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import VacancyForm from "../components/Vacancies/VacancyForm";
import "../style/AdminPanel.css"

function AddVacancy() {
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
        <VacancyForm />
      </div>
      <Footer />
    </div>
  );
}

export default AddVacancy;
