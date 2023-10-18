import React, { useState } from "react";
import "./Add_doctor.css";
import DoctorImage from "../../../img/img5.svg";
import Navbar from "../../navbar/navbar";
import SuccessLogo from "../../../img/success.png";

import Message from "../../Message/Message";

const Add_doctor = ({ state }) => {
  console.log(state);
  const [message, setMessage] = useState({ type: "", text: "" });

  console.log(state);
  const [doctorLicenseId, setDoctorLicenseId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { contract, account } = state;

    try {
      const res = await fetch("http://localhost:4000/add-doctor", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ doctorLicenseId: doctorLicenseId }),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        if (contract && contract.methods) {
          await contract.methods
            .reg_Doctor(
              doctorLicenseId,
              doctorName,
              doctorAddress,
              doctorSpecialization,
              doctorPhone,
              [hospitalId]
            )
            .send({ from: account });
          console.log("Doctor Added");
          setIsSuccess(true);
          clearForm();
        }
      } else if (data.status === 400) {
        setMessage({
          type: "error",
          text: "Doctor License ID already exists. Please use a different License ID.",
        });
        clearForm();
      } else {
        setMessage({ type: "error", text: "Doctor cannot be added" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setDoctorLicenseId("");
    setDoctorName("");
    setDoctorAddress("");
    setDoctorSpecialization("");
    setDoctorPhone("");
    setHospitalId("");
  };

  return (
    <>
      <Navbar />
      <div className="doctor-registration-container">
        <div className="doctor-form-container">
          {isSuccess ? (
            <div className="doctor-success-container">
              <img src={SuccessLogo} alt="Success" />
              <p>Thank You 😊</p>
              <p>Doctor Registration Successful!</p>
            </div>
          ) : (
            <>
              <h2>Doctor Registration</h2>
              {message.text && (
                <Message
                  type={message.type}
                  text={message.text}
                  onClose={() => setMessage({ type: "", text: "" })}
                />
              )}
              <form onSubmit={handleSubmit}>
                <label htmlFor="doctorLicenseId">Doctor License ID:</label>
                <input
                  type="text"
                  id="doctorLicenseId"
                  value={doctorLicenseId}
                  onChange={(e) => setDoctorLicenseId(e.target.value)}
                  required
                />

                <label htmlFor="doctorName">Doctor Name:</label>
                <input
                  type="text"
                  id="doctorName"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />

                <div className="doctor-address-section">
                  <label htmlFor="doctorAddress">Address:</label>
                  <textarea
                    id="doctorAddress"
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                    required
                    className="doctor-address-input"
                  />
                </div>

                <label
                  htmlFor="doctorSpecialization"
                  style={{ marginTop: "10px" }}
                >
                  Doctor Specialization:
                </label>
                <input
                  type="text"
                  id="doctorSpecialization"
                  value={doctorSpecialization}
                  onChange={(e) => setDoctorSpecialization(e.target.value)}
                  required
                />

                <label htmlFor="doctorPhone">Contact Number:</label>
                <input
                  type="number"
                  id="doctorPhone"
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  required
                />

                <label htmlFor="hospitalId" style={{ marginTop: "10px" }}>
                  Visited Hospital ID:
                </label>
                <input
                  type="number"
                  id="hospitalId"
                  value={hospitalId}
                  onChange={(e) => setHospitalId(e.target.value)}
                  required
                />

                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </div>
        <div className="doctor-image-container">
          <img src={DoctorImage} alt="Doctor" />
        </div>
      </div>
    </>
  );
};

export default Add_doctor;
