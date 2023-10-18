import React, { useState } from "react";
import "./Add_hospital.css";
import HospitalImage from "../../../img/img5.svg";
import Navbar from "../../navbar/navbar";
import SuccessLogo from "../../../img/success.png";
import Message from "../../Message/Message";

const Add_Hospital = ({ state }) => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const [hospitalId, setHospitalId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalSpecialization, setHospitalSpecialization] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { contract, account } = state;

    try {
      const res = await fetch("http://localhost:4000/add-hospital", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ hospitalId: hospitalId }),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        if (contract && contract.methods) {
          await contract.methods
            .reg_Hospital(
              hospitalId,
              hospitalName,
              contactNumber,
              hospitalAddress,
              hospitalSpecialization
            )
            .send({ from: account });
          setIsSuccess(true);
          clearForm();
        }
      } else if (data.status === 400) {
        setMessage({
          type: "error",
          text: "Hospital ID already exists. Please use a different Hospital ID.",
        });
        clearForm();
      } else {
        setMessage({ type: "error", text: "Hospital cannot be added" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setHospitalId("");
    setHospitalName("");
    setContactNumber("");
    setHospitalAddress("");
    setHospitalSpecialization("");
  };

  return (
    <>
      <Navbar />
      <div className="hospital-registration-container">
        <div className="hospital-form-container">
          {isSuccess ? (
            <div className="hospital-success-container">
              <img src={SuccessLogo} alt="Success" />
              <p>Thank You 😊</p>
              <p>Hospital Registration Successful!</p>
            </div>
          ) : (
            <>
              <h2>Hospital Registration</h2>
              {message.text && (
                <Message
                  type={message.type}
                  text={message.text}
                  onClose={() => setMessage({ type: "", text: "" })}
                />
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="hospitalId">Hospital ID</label>
                  <input
                    type="number"
                    id="hospitalId"
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hospitalName">Hospital Name</label>
                  <input
                    type="text"
                    id="hospitalName"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="number"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hospitalAddress">Hospital Address</label>
                  <textarea
                    id="hospitalAddress"
                    value={hospitalAddress}
                    onChange={(e) => setHospitalAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hospitalSpecialization">
                    Hospital Specialization
                  </label>
                  <input
                    type="text"
                    id="hospitalSpecialization"
                    value={hospitalSpecialization}
                    onChange={(e) => setHospitalSpecialization(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </div>
        <div className="hospital-image-container">
          <img src={HospitalImage} alt="Hospital" />
        </div>
      </div>
    </>
  );
};

export default Add_Hospital;
