import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { studentSchema } from "../validation/studentSchema";
import { useNavigate, Link } from "react-router-dom";

function EditStudent() {
  document.title = "STUDENTReg - Edit Student";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const id = window.location.pathname.split("/").pop();
  const history = useNavigate();
  const initialData = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    dob: "",
    city: "",
  };
  const [initialValues, setInitialValues] = useState(initialData);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: studentSchema,
    onSubmit: (values, action) => {
      const studentEdit = {
        name: values.name.toUpperCase(),
        email: values.email.toLowerCase(),
        password: values.password,
        cpassword: values.cpassword,
        phone: values.phone,
        dob: values.dob,
        city: values.city.toUpperCase(),
      };
      axios
        .put(`https://studentsreg-backend.cyclic.app/${id}`, studentEdit)
        .then(
          () => {
            action.resetForm();
            history("/");
            setError();
          },
          (err) => {
            setError(err.response.data.error);
          }
        );
    },
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const id = window.location.pathname.split("/").pop();
    setLoading(true);
    try {
      const record = await axios.get(
        `https://studentsreg-backend.cyclic.app/${id}`
      );
      setInitialValues(record.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassStatus = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="container p-3 my-3">
      <h3>Edit details</h3>
      <hr />
      {loading ? (
        <h5
          style={{ color: "rgb(150, 150, 150)" }}
          className="my-3 mt-5 display-6 container-fluid"
        >
          Please wait...
        </h5>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-2">
            <input
              type="text"
              name="name"
              className="form-control"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />
          </div>
          {errors.name && touched.name ? (
            <span className="input-errors">{errors.name}</span>
          ) : null}
          <div className="form-group mt-2">
            <input
              type="text"
              name="email"
              className="form-control"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && touched.email ? (
            <span className="input-errors">{errors.email}</span>
          ) : null}
          <span className="input-errors">
            {" "}
            {error !== false ? error : null}
          </span>
          <div className="form-group mt-2 ">
            <div className="d-flex justify-content-row ">
              <input
                type={showPass === false ? "password" : "text"}
                name="password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
              />
              <input
                type="button"
                className="btn btn-sm btn-light ms-2"
                value={showPass === false ? "Show Password" : "Hide Password"}
                onClick={handlePassStatus}
              />
            </div>
          </div>
          {errors.password && touched.password ? (
            <span className="input-errors">{errors.password}</span>
          ) : null}
          <div className="form-group mt-2">
            <input
              type={showPass === false ? "password" : "text"}
              name="cpassword"
              className="form-control"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm password"
            />
          </div>
          {errors.cpassword && touched.cpassword ? (
            <span className="input-errors">{errors.cpassword}</span>
          ) : null}
          <div className="form-group mt-2">
            <input
              type="number"
              name="phone"
              className="form-control"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your number"
            />
          </div>
          {errors.phone && touched.phone ? (
            <span className="input-errors">{errors.phone}</span>
          ) : null}
          <div className="form-group mt-2">
            <input
              type="date"
              name="dob"
              className="form-control"
              value={values.dob}
              onChange={handleChange}
            />
          </div>
          {errors.dob && touched.dob ? (
            <span className="input-errors">{errors.dob}</span>
          ) : null}
          <div className="form-group mt-2">
            <input
              type="text"
              name="city"
              className="form-control"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your city"
            />
          </div>
          {errors.city && touched.city ? (
            <span className="input-errors">{errors.city}</span>
          ) : null}
          <div className="mt-3">
            <input className="btn btn-success" type="submit" value="Update" />
            <Link to="/">
              <input
                type="button"
                value="Cancel"
                className="btn btn-light ms-2"
              />
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditStudent;
