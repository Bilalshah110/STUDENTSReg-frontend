import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function AllStudents() {
  document.title = "STUDENTReg - Registered Students";
  const [students, setStudents] = useState([]);

  const handleDelete = (student) => {
    axios.delete(`https://studentsreg-backend.cyclic.app/${student._id}`);
    const deleteStudent = students.filter((students) => {
      return students !== student;
    });
    setStudents(deleteStudent);
  };

  const handleSearch = async (e) => {
    const searchStudent = e.target.value;
    const record = await axios.get("https://studentsreg-backend.cyclic.app/");
    const result = record.data.filter(
      (student) =>
        student.name.toLowerCase().includes(searchStudent) ||
        student.name.toUpperCase().includes(searchStudent) ||
        student.city.toLowerCase().includes(searchStudent) ||
        student.city.toUpperCase().includes(searchStudent)
    );
    setStudents(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const record = await axios.get("https://studentsreg-backend.cyclic.app/");
      setStudents(record.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-2">
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

      {students.length !== 0 ? (
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
                    <Link to={`/editstudent/${student._id}`}>
                      {" "}
                      <i title="Edit" className="icon edit-icon">
                        <FaEdit />
                      </i>
                    </Link>
                    &nbsp;&nbsp;
                    <i
                      title="Delete"
                      onClick={() =>
                        window.confirm(
                          `Are you sure to delete ${student.name}'s data`
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
      ) : (
        <h5
          style={{ color: "rgb(150, 150, 150)" }}
          className="my-3 mt-5 display-6 container-fluid"
        >
          No Record
        </h5>
      )}
      <Link to="/addstudent">
        <input
          type="button"
          className="form-control btn my-btn"
          value="Add Student"
        />
      </Link>
    </div>
  );
}

export default AllStudents;
