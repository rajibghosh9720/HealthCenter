import React from "react";
import "./Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Message = ({ type, text, onClose }) => {
  return (
    <div className={`message ${type}`}>
      <div className="message-content">
        <p>{text}</p>
        <FontAwesomeIcon icon={faTimes} onClick={onClose} className="close-icon" />
      </div>
    </div>
  );
};

export default Message;
