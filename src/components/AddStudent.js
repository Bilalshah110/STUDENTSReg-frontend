import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrationSchema } from "../validation/registrationSchema";

function AddStudent() {
  const URL =
    "http://localhost:2222" || "https://studentsreg-backend.cyclic.app/";
  document.title = "STUDENTReg - Add Student";
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    dob: "",
    city: "",
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
    validationSchema: registrationSchema,
    onSubmit: (values, action) => {
      const studentReg = {
        name: values.name.toUpperCase(),
        email: values.email.toLowerCase(),
        password: values.password,
        cpassword: values.cpassword,
        phone: values.phone,
        dob: values.dob,
        city: values.city.toUpperCase(),
      };
      axios.post(URL, studentReg).then(
        (res) => {
          const { id, token } = res.data;
          localStorage.setItem("id", id);
          localStorage.setItem("token", token);
          action.resetForm();
          navigate("/");
          setError();
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
    },
  });

  const handlePassStatus = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="container p-3 my-3 ">
      <h3>Registration Form</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2 ">
          <input
            type="text"
            name="name"
            className="form-control input-lg"
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
        <span className="input-errors"> {error !== false ? error : null}</span>
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
        <div className="form-group mt-2 ">
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
          <input className="btn btn-primary" type="submit" value="Register" />
          <Link to="/">
            <input
              type="button"
              value="Cancel"
              className="btn btn-light ms-2"
            />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
