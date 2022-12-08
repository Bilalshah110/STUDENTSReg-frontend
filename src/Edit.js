import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Edit() {
  let history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const id = window.location.pathname.split("/").pop();

  const handleSubmit = (e) => {
    e.preventDefault();
    const update = {
      name,
      email,
    };
    axios.put(`http://localhost:3000/${id}`, update);
    history("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const id = window.location.pathname.split("/").pop();
    try {
      const result = await axios.get(`http://localhost:3000/${id}`);
      setName(result.data.name);
      setEmail(result.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <label htmlFor="name">Name: </label>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="email">Email: </label>
        </div>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input className="mt-2 btn btn-sm btn-primary" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
}

export default Edit;
