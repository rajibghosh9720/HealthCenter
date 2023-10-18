import React from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";
import Image from "../../img/img4.svg";
import Navbar from "../navbar/navbar";

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <div className="admin-page">
        <div className="admin-sidebar">
          <h2>Welcome to E-health Record Management System</h2>
          <div className="admin-sections">
            <div className="admin-section">
              <div className="admin-section-title">Registration</div>
              <div className="admin-button-column">
                <Link to="/admin/add-health-center" className="admin-button">
                  Health Center
                </Link>
                <Link to="/admin/add-doctor" className="admin-button">
                  Doctor
                </Link>
                <Link to="/admin/add-patient" className="admin-button">
                  Patient
                </Link>
              </div>
            </div>
            <div className="admin-section">
              <div className="admin-section-title">Update</div>
              <div className="admin-button-column">
                <Link to="/admin/update-health-center" className="admin-button">
                  Health Center
                </Link>
                <Link to="/admin/update-doctor" className="admin-button">
                  Doctor
                </Link>
                <Link to="/admin/update-patient" className="admin-button">
                  Patient
                </Link>
              </div>
            </div>
            <div className="admin-section">
              <div className="admin-section-title">View</div>
              <div className="admin-button-column">
                <Link to="/admin/view-health-center" className="admin-button">
                  Health Center
                </Link>
                <Link to="/admin/view-doctor" className="admin-button">
                  Doctor
                </Link>
                <Link to="/admin/view-patient" className="admin-button">
                  Patient
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-image">
          <img src={Image} alt="Admin" />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
