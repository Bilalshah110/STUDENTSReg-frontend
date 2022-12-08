import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/myStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllStudents from "./components/AllStudents";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<AllStudents />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/editstudent/:id" element={<EditStudent />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
