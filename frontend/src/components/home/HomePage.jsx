import React from "react";
import Navbar from "../navbar/navbar";

import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import ABI from "../../json/ABI.json";
import "./HomePage.css";
import image from "../../img/img1.svg";

const HomePage = ({ saveState }) => {
  console.log("Save:", saveState);
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0x143Db069924e7f8cb69f99BEB4Ce788c5f29a009";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo("/admin");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      <Navbar/>
      <div className="home-page">
        <div className="text-section">
          <h1>We Care Your Health</h1>
          <button className="connect-button" onClick={connectWallet} >Connect Wallet</button>
        </div>
        <div className="image-section">
          <img src={image} alt="Healthcare" />
        </div>
      </div>
    </div>
  );
};



export default HomePage;
