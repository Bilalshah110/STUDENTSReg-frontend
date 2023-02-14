import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function AllStudents() {
  document.title = "STUDENTReg - Registered Students";

  const id = localStorage.getItem("id");
  const token = `bearer ${localStorage.getItem("token")}`;
  const URL = "https://studentsreg-backend.cyclic.app/";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleEdit = (student) => {
    id === student._id
      ? navigate(`/editstudent/${student._id}`)
      : alert(`You are not authorized to edit ${student.name}'s record`);
  };

  const handleDelete = (student) => {
    id === student._id
      ? axios
          .delete(`${URL}/${student._id}`, {
            headers: { Authorization: token },
          })
          .then((res) => {
            alert(res.data.message);
            const deleteStudent = students.filter((students) => {
              return students !== student;
            });
            setStudents(deleteStudent);
          })
          .catch((error) => console.log(error))
      : alert(`You are not authorized to delete ${student.name}'s record`);
  };

  const handleSearch = async (e) => {
    const searchStudent = e.target.value;
    const record = await axios.get(URL, {
      headers: { Authorization: token },
    });
    const result = record.data.filter(
      (student) =>
        student.name.includes(searchStudent.toUpperCase()) ||
        student.city.includes(searchStudent.toUpperCase())
    );
    setStudents(result);
  };

  const handleLogout = () => {
    localStorage.setItem("id", "");
    localStorage.setItem("token", "");
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading("Loading...");
    await axios
      .get(URL, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
        setLoading();
      })
      .catch(() => {
        navigate("/login");
        setLoading("Connection Error");
      });
  };

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between">
        <h4>Registered Students</h4>
        <input
          className="form-control search-student"
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <hr />
      {loading ? (
        <h5
          style={{ color: "rgb(150, 150, 150)" }}
          className="my-3 mt-5 display-6 container-fluid"
        >
          {loading}
        </h5>
      ) : (
        <div>
          {students.length !== 0 ? (
            <div className="my-table">
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone #</th>
                    <th>DOB</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    return (
                      <tr key={student._id}>
                        <th scope="row">{student._id.slice(5, 7)}</th>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.dob}</td>
                        <td>{student.city}</td>
                        <td>
                          <i
                            title="Edit"
                            onClick={() => handleEdit(student)}
                            className="icon edit-icon"
                          >
                            <FaEdit />
                          </i>
                          &nbsp;&nbsp;
                          <i
                            title="Delete"
                            onClick={() =>
                              window.confirm(
                                `Are you sure to delete ${student.name}'s record`
                              )
                                ? handleDelete(student)
                                : null
                            }
                            className="icon delete-icon"
                          >
                            <RiDeleteBin6Line />
                          </i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h5
              style={{ color: "rgb(150, 150, 150)" }}
              className="my-3 mt-5 display-6 container-fluid"
            >
              No Record
            </h5>
          )}
          <div>
            <input
              type="button"
              className="form-control btn my-btn mt-3"
              value="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllStudents;
