/**
 * @fileoverview NotiPopup component - Displays a popup notification with a message and a close button.
 * Provides a user-friendly way to show alerts or messages with the option to close the popup.
 * @author Choo Yi Ken
 */

import React from "react";
import "./NotiPopUp.css";

/**
 * NotiPopup component displays a popup notification with a message and a close button.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.message - The message to be displayed inside the popup.
 * @param {Function} props.onClose - The function to call when the close button is clicked.
 * @returns {JSX.Element} The rendered NotiPopup component.
 */
function NotiPopup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NotiPopup;
