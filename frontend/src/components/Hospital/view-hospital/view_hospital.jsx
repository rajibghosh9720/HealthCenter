import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import "./view_hospital.css";

const ViewHospital = ({ state }) => {
  const [searchId, setSearchId] = useState("");
  const [HospitalDetails, setHospitalDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/HospitalDetails/view/${searchId}`
      );
      if (response.ok) {
        const data = await response.json();
        setHospitalDetails(data.retreiveHospitalDetailsObj);
      } else {
        console.error("Failed to fetch Hospital details.");
        setHospitalDetails(null);
      }
    } catch (error) {
      console.error("Error while Hospital details:", error);
      setHospitalDetails(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="view-Hospital-page">
        <h2>Search Hospital Details</h2>

        <div className="search-bar">
          <input
            type="number"
            placeholder="Search for Hospital Id ..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />

          <button onClick={handleSearch} className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {HospitalDetails ? (
          HospitalDetails.numhospitalId === 0 ? (
            <p className="not-found-message">Hospital Id not found</p>
          ) : (
            <div className="Hospital-details">
              <p>Hospital Id: {HospitalDetails.numhospitalId}</p>
              <p>Hospital Name: {HospitalDetails.hospitalName}</p>
              <p>Contact Number: {HospitalDetails.numcontactNumber}</p>
              <p>Hospital Address: {HospitalDetails.hospitalAddress}</p>
              <p>Hospital Specialization: {HospitalDetails.hospitalSpec}</p>
              <p>Registration ID: {HospitalDetails.numhospital_regId}</p>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default ViewHospital;
