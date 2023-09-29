import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "../../style/ConfirmWindow.css";

function UserTable() {
  const tableHeadings = [
    "Name",
    "Email",
    "Age",
    "Gender",
    "Date Registered",
    "Actions",
  ];

  const [data, setData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State variable for showing/hiding the confirmation alert
  const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Track the candidate ID to delete
  const [deleteCandidateTitle, setDeleteCandidateTitle] = useState(""); // Track the candidate title to delete





  // useEffect to get all the users
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/getAllUsers")
      .then((res) => {
        setData(res.data.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);



  // Filter the users based on the selected title
  const filteredUsers = selectedTitle
    ? data.filter((user) => user.title === selectedTitle)
    : data;

  // delete Applciation function
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        "http://localhost:8000/api/user/delete/" + id,
        {
          data: { user: id },
        }
      );
      window.location.reload();
      console.log("deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteCandidateId(null); // Reset the candidate ID
      setShowAlert(false); // Hide the confirmation alert
    }
  };

  // Function to format date and time
  const formatDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const hour = dateObj.getUTCHours().toString().padStart(2, "0");
    const minute = dateObj.getUTCMinutes().toString().padStart(2, "0");
    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getUTCFullYear();
    return ` ${day}/${month}/${year} - ${hour}:${minute}`;
  };


  const [editData, setEditData] = useState({
    id: null,
    username: "",
    email: "",
    age: "",
    gender: "",
  });

  const handleEdit = (user) => {
    setEditData({
      id: user._id,
      username: user.username,
      email: user.email,
      age: user.age,
      gender: user.gender,
    });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8000/api/user/update/${editData.id}`, {
        username: editData.username,
        email: editData.email,
        age: editData.age,
        gender: editData.gender,
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
        setEditData({ id: null, username: "", email: "", age: "", gender: "" });
      });
  };

  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending


  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort the filtered vacancies based on the deadline
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Welcome to My Wallet Admin Dashboard</h1>

      {data.length === 0 ? (
        <h4 className="text-center my-5">No Users are registered at the moment</h4>
      ) : (
        <div>


          <Table responsive className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                {tableHeadings.map((heading, index) => (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {heading === "Date Registered" ? (
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
                    )}                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="tableCell" style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === user._id ? (
                      <input
                        className="editInputUser"

                        type="text"
                        value={editData.username}
                        onChange={(e) =>
                          setEditData({ ...editData, username: e.target.value })

                        }
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === user._id ? (
                      <input
                        className="editInputEmail"

                        type="text"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === user._id ? (
                      <input
                        className="editInputAge"

                        type="text"
                        value={editData.age}
                        onChange={(e) =>
                          setEditData({ ...editData, age: e.target.value })
                        }
                      />
                    ) : (
                      user.age
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {editData.id === user._id ? (
                      <input
                        className="editInputGender"

                        type="text"
                        value={editData.gender}
                        onChange={(e) =>
                          setEditData({ ...editData, gender: e.target.value })
                        }
                      />
                    ) : (
                      user.gender
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {formatDateTime(user.createdAt)}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    <i
                      class="fa-solid fa-trash mx-2"
                      style={{ color: "#FF0000", cursor: "pointer" }}
                      onClick={() => {
                        setDeleteCandidateId(user._id); // Set the candidate ID to delete
                        setShowAlert(true);
                        setDeleteCandidateTitle(user.username);
                      }}
                    ></i>
                    {editData.id === user._id ? (
                      <i
                        className="fa-regular fa-square-check mx-2"
                        style={{ color: "#ff8947", cursor: "pointer" }}
                        onClick={handleSave}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-pen-to-square mx-2"
                        style={{ color: "#ff8947", cursor: "pointer" }}
                        onClick={() => handleEdit(user)}
                      ></i>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>

                  </td>

                </tr>
              ))}

            </tbody>
          </Table>
          {/* Confirmation Alert */}
          {showAlert && (
            <div className="confirmation-alert">
              <p>Are you sure you want to delete <strong>{deleteCandidateTitle}</strong> account?</p>
              <button
                className="confirm-button"
                onClick={() => deleteUser(deleteCandidateId)}
              >
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setDeleteCandidateId(null); // Reset the candidate ID
                  setShowAlert(false); // Hide the confirmation alert
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

export default UserTable;