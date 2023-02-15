import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrationSchema } from "../validation/registrationSchema";

function AddStudent() {
  const URL = "https://studentsreg-backend.cyclic.app/";
  document.title = "STUDENTReg - Add Student";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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
      setLoading(true);
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
          setLoading(false);
          navigate("/");
          setError();
        },
        (err) => {
          setLoading(false);
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
        <span className="input-errors"> {error ? error : null}</span>
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

        <button
          className="btn btn-primary mt-3"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? "Loading" : "Register"}
        </button>
        <Link to="/">
          <button className="btn btn-light mt-3 ms-2">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default AddStudent;
