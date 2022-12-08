import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { v4 } from "uuid";
import { FormSchema } from "./FormSchema";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function FormikUser() {
  const id = v4().slice(0, 3);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const initialValues = {
    name: "",
    email: "",
  };
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit: (values, action) => {
      const newData = {
        name: values.name,
        email: values.email,
        id,
      };
      axios.post("http://localhost:3000/", newData).then(
        (res) => {
          setError();
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
      fetchData();

      // setData([...data, newData]);
      action.resetForm();
    },
  });
  const onDelete = (user) => {
    axios.delete(`http://localhost:3000/${user._id}`);
    setData(
      data.filter((i) => {
        return i !== user;
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/");
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4} lg={3}>
          <h4>Formik Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
            </div>
            <div>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.name && touched.name ? (
              <span style={{ color: "red" }}>{errors.name}</span>
            ) : null}
            <div>
              <label>Email</label>
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && touched.email ? (
              <span style={{ color: "red" }}>
                {errors.email}
                <br />
              </span>
            ) : null}{" "}
            <div style={{ color: "red" }}>
              {" "}
              {error !== false ? error : null}
            </div>
            <input
              className="mt-2 btn btn-sm btn-primary"
              type="submit"
              value="Submit"
            />
          </form>
        </Col>
        <Col md={8} lg={9}>
          <h4>Registered Users</h4>
          <hr />
          {data.length !== 0 ? (
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => {
                  return (
                    <tr key={user._id}>
                      <th scope="row">{user._id.slice(3,6)}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <input
                          className="btn btn-danger btn-sm"
                          type="button"
                          value="Delete"
                          onClick={() => onDelete(user)}
                        />
                        &nbsp;
                        <Link user={user._id} to={`/edit/${user._id}`}>
                          <input
                            className="btn btn-secondary btn-sm"
                            type="button"
                            value="Edit"
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h6>No Data</h6>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FormikUser;
