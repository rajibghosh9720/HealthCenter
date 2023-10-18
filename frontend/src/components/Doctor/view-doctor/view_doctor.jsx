import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import "./view_doctor.css";

const ViewDoctor = ({ state }) => {
  const [searchId, setSearchId] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/DoctorDetails/view/${searchId}`);
      if (response.ok) {
        const data = await response.json();
        setDoctorDetails(data.retreiveDoctorDetailsObj);
      } else {
        console.error("Failed to fetch doctor details.");
        setDoctorDetails(null);
      }
    } catch (error) {
      console.error("Error while fetching doctor details:", error);
      setDoctorDetails(null); 
    }
  };

  return (
    <>
      <Navbar />
      <div className="view-doctor-page">
        <h2>Search Doctor Details</h2>

        <div className="search-bar">
          <input
            type="number"
            placeholder="Search for Doctor License Id ..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />

          <button onClick={handleSearch} className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {doctorDetails ? (
          doctorDetails.numdoctorLicenseId === 0 ? (
            <p className="not-found-message">Doctor License Id not found</p>
          ) : (
            <div className="doctor-details">
              <p>Doctor License ID: {doctorDetails.numdoctorLicenseId}</p>
              <p>Doctor Name: {doctorDetails.doctorName}</p>
              <p>Doctor Address: {doctorDetails.doctorAddress}</p>
              <p>Doctor Specialization: {doctorDetails.doctorSpecialization}</p>
              <p>Doctor Phone: {doctorDetails.numdoctorPhone}</p>
              <p>Hospital ID: {doctorDetails.numhospitalId}</p>
              <p>Registration ID: {doctorDetails.numD_regId}</p>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default ViewDoctor;
