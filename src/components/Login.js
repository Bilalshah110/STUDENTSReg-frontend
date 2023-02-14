import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userLogin = {
      email,
      password,
    };
    await axios
      .post("http://localhost:2222/login", userLogin)
      .then((res) => {
        const { id, token } = res.data;
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.result);
      });
  };

  return (
    <div className="container p-3 my-3 ">
      <h3>Login</h3>
      <hr />
      <form onSubmit={handleLogin}>
        <div className="form-group mt-2">
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group mt-2">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error ? (
          <>
            <span className="input-errors">{error}</span>
            <br />
          </>
        ) : null}

        <input className="btn btn-primary mt-3" type="submit" value="Login" />
        <p>
          <br />
          Don't have an account? <Link to="/addstudent">Click here</Link> to
          create account{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
