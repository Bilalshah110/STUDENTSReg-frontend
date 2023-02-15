import React from "react";

function About() {
  document.title = "STUDENTReg - About";
  return (
    <div className="container my-3">
      <h3>About</h3>
      <hr />

      <h5>App info</h5>
      <hr />

      <h6>App Name</h6>
      <p>STUDENTReg</p>
      <h6>App Type</h6>
      <p>Registration App</p>
      <h6>App Features</h6>
      <ul>
        <li>
          Add Students: Register unique email addresses; duplicates are not
          allowed.
        </li>
        <li>Authorize student after successfull login</li>
        <li>Display a list of registered students.</li>
        <li>Search the list of registered students for specific records.</li>
        <li>Edit and update student records.</li>
        <li>Delete student records from the database.</li>
        <li>
          Only the student who created a record can edit or delete it; other
          students cannot modify the record.
        </li>
      </ul>

      <h5>Development info</h5>
      <hr />
      <h6>Stack</h6>
      <p>MERN Stack</p>
      <h6>Versions</h6>
      <ul>
        <li>React JS - v18.2</li>
        <li>Express - v4.18</li>
        <li>Mongoose - v6.7</li>
        <li>Bootstrap - v5.2</li>
      </ul>
      <h6>Other Dependencies</h6>
      <ul>
        <li>Axios</li>
        <li>JWT</li>
        <li>Formik</li>
        <li>Yup</li>
        <li>React-icons</li>
      </ul>
      <h6>Released</h6>
      <p> 13 Dec 2022</p>
      <h5>Developer info</h5>
      <hr />
      <h6>Name</h6>
      <p>Bilal Hassan</p>
      <h6>City</h6>
      <p>Rawalpindi/Islamabad</p>
      <h6>Email</h6>
      <p>bilalhassain14@gmail.com</p>
      <a
        style={{ textDecoration: "none" }}
        href="https://bilalhassan.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here for more Developer's info
      </a>
    </div>
  );
}

export default About;
