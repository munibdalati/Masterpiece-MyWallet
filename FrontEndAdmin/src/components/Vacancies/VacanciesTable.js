import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../style/AdminPanel.css";
import "../../style/ConfirmWindow.css";

// styling the date
function formatDeadline(deadline) {
  const date = new Date(deadline);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function VacanciesTable() {
  const tableHeadings = ["Title", "Description", "Deadline", "Delete", "Edit"];

  const [data, setData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State variable for showing/hiding the confirmation alert
  const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Track the candidate ID to delete
  const [deleteCandidateTitle, setDeleteCandidateTitle] = useState(""); // Track the candidate title to delete

  // Add state variables to track edit mode for each field
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    description: "",
    deadline: "",
  });
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vacancy/allVacancies")
      .then((res) => {
        setData(res.data.data.vacancies);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Filter the applications based on the selected title
  const filteredVacancies = selectedTitle
    ? data.filter((vacancy) => vacancy.title === selectedTitle)
    : data;

  // delete Application function
  const deleteVacancy = async (id) => {
    try {
      await axios.delete(
        "http://localhost:5000/api/vacancy/deleteVacancy/" + id,
        {
          data: { vacancy: id },
        }
      );
      window.location.reload();
      console.log("Deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteCandidateId(null); // Reset the candidate ID
      setShowAlert(false); // Hide the confirmation alert
    }
  };

  const handleEdit = (vacancy) => {
    setEditData({
      id: vacancy._id,
      title: vacancy.title,
      description: vacancy.description,
      deadline: vacancy.deadline,
    });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/vacancy/updateVacancy/${editData.id}`, {
        title: editData.title,
        description: editData.description,
        deadline: editData.deadline,
      })
      .then((res) => {
        console.log("Updated successfully");
        // Reload data or update it in your state here.
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      })
      .finally(() => {
        setEditData({ id: null, title: "", description: "", deadline: "" });
      });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort the filtered vacancies based on the deadline
  const sortedVacancies = [...filteredVacancies].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else {
      return new Date(b.deadline) - new Date(a.deadline);
    }
  });
  return (
    <Container>
      {data.length === 0 ? (
        <div>
          <h4 className="text-center my-5">
            No vacancies available at the moment
          </h4>
          <Row className="my-4 text-center my-5">
            <Col md="12">
              <Link to="/AddVacancy">
                <Button className="btn-orange">Add a Job Vacancy</Button>
              </Link>
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <Row className="my-4">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Select
                aria-label="Default select example"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                required
              >
                <option value="">Filter Vacancies</option>
                {data.map((vacancy, index) => (
                  <option key={index} value={vacancy.title}>
                    {vacancy.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Col md="6">
              <Link to="/AddVacancy">
                <Button className="btn-orange">Add a Job Vacancy</Button>
              </Link>
            </Col>
          </Row>
  
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                {tableHeadings.map((heading, index) => (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {heading === "Deadline" ? (
                      <span
                        onClick={toggleSortOrder}
                        style={{ cursor: "pointer" }}
                      >
                        {heading}{" "}
                        {sortOrder === "asc" ? (
                          <i className="fa-solid fa-arrow-up"></i>
                        ) : (
                          <i className="fa-solid fa-arrow-down"></i>
                        )}
                      </span>
                    ) : (
                      heading
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedVacancies.map((vacancy, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === vacancy._id ? (
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                      />
                    ) : (
                      vacancy.title
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === vacancy._id ? (
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      vacancy.description
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === vacancy._id ? (
                      <input
                        type="date"
                        value={editData.deadline}
                        onChange={(e) =>
                          setEditData({ ...editData, deadline: e.target.value })
                        }
                      />
                    ) : (
                      formatDeadline(vacancy.deadline)
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#FF0000", cursor: "pointer" }}
                      onClick={() => {
                        setDeleteCandidateId(vacancy._id);
                        setShowAlert(true);
                        setDeleteCandidateTitle(vacancy.title);
                      }}
                    ></i>
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === vacancy._id ? (
                      <i
                        className="fa-regular fa-square-check"
                        style={{ color: "#ff8947", cursor: "pointer" }}
                        onClick={handleSave}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "#ff8947", cursor: "pointer" }}
                        onClick={() => handleEdit(vacancy)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
  
          {showAlert && (
            <div className="confirmation-alert">
              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteCandidateTitle}</strong> vacancy?
              </p>
              <button
                className="confirm-button"
                onClick={() => deleteVacancy(deleteCandidateId)}
              >
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setDeleteCandidateId(null);
                  setShowAlert(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
  
}
export default VacanciesTable;
