import React, { useState, useEffect } from "react";
import "./styles.css";
import Popup from "../components/NotiPopUp";

function Notification({ content, time, id, onPin, onDelete, isPinned }) {
  return (
    <div className={`notification-item ${isPinned ? "pinned" : ""}`}>
      <p>
        <strong>Message:</strong> {content}
      </p>
      <p>
        <strong>Time:</strong> {time}
      </p>
      <div className="notification-buttons">
        <button className="pin-button" onClick={() => onPin(id, isPinned)}>
          {isPinned ? "Unpin" : "Pin"}
        </button>
        <button className="delete-button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isNormalService, setIsNormalService] = useState(false);
  const [isDisruptedService, setIsDisruptedService] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState("");
  const [pinnedMessage, setPinnedMessage] = useState("");
  const [allDeletedMessage, setAllDeletedMessage] = useState("");
  const [affectedSegments, setAffectedSegments] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("../mockAPI/mockTrainServiceAlerts.json");
        //const response = await fetch("http://localhost:4000/api/train-alerts");
        if (!response.ok) throw new Error("Failed to load data");

        const data = await response.json();
        console.log("Full data:", data);

        if (data.status === 1) {
          setIsNormalService(true);
          setIsDisruptedService(false);
        } else if (data.status === 2) {
          setIsNormalService(false);
          setIsDisruptedService(true);

          // Set affected segments once, separately from messages
          setAffectedSegments(
            data.affectedSegments.map((segment) => ({
              line: segment.Line,
              direction: segment.Direction,
              stations: segment.Stations,
            }))
          );

          // Create a notification for each message
          const newNotifications = data.message.map((msg, index) => ({
            id: `message-${index}`,
            content: msg.Content,
            time: msg.CreatedDate,
            pinned: false,
            originalIndex: index,
          }));

          setNotifications(newNotifications);
        }
        setAllDeletedMessage("");
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handlePopupClose = () => {
    setIsDisruptedService(false);
  };

  const handlePin = (id, isPinned) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, pinned: !notif.pinned } : notif
    );

    updatedNotifications.sort((a, b) => {
      if (a.pinned === b.pinned) {
        return a.originalIndex - b.originalIndex;
      }
      return a.pinned ? -1 : 1;
    });

    setNotifications(updatedNotifications);
    setPinnedMessage(
      isPinned
        ? "Notification is unpinned successfully"
        : "Notification pinned successfully"
    );
    setTimeout(() => setPinnedMessage(""), 3000);
  };

  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== id
    );
    setNotifications(updatedNotifications);

    setDeletionMessage("Notification deleted successfully");
    setTimeout(() => setDeletionMessage(""), 3000);

    // Check if all notifications have been deleted
    if (updatedNotifications.length === 0) {
      setAllDeletedMessage("All notifications have been deleted");
      setAffectedSegments([]); // Clear the affected segments when all notifications are deleted
    }
  };

  return (
    <div className="notifications-page">
      {isDisruptedService && (
        <Popup
          message="Dear User, you are experiencing disrupted train services, please plan your trip as early as possible!"
          onClose={handlePopupClose}
        />
      )}
      {deletionMessage && (
        <div className="deletion-message">{deletionMessage}</div>
      )}
      {pinnedMessage && <div className="pinned-message">{pinnedMessage}</div>}
      {allDeletedMessage && (
        <div className="all-deleted-message">{allDeletedMessage}</div>
      )}

      {/* Display affected segments at the top */}
      {affectedSegments.length > 0 && (
        <div className="affected-segments">
          <h3>Affected Train Segments</h3>
          {affectedSegments.map((segment, index) => (
            <div key={index}>
              <p>
                <strong>Line:</strong> {segment.line}
              </p>
              <p>
                <strong>Direction:</strong> {segment.direction}
              </p>
              <p>
                <strong>Stations Affected:</strong> {segment.stations}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="notification-list">
        {isNormalService ? (
          <p className="normal-service-message">
            Dear User, you are experiencing Normal Train Service! No alert
            messages for now! Safe Commuting!
          </p>
        ) : notifications.length === 0 ? (
          <p className="no-notifications-message">
            No notifications available.
          </p>
        ) : (
          notifications.map((notif) => (
            <Notification
              key={notif.id}
              id={notif.id}
              content={notif.content}
              time={notif.time}
              isPinned={notif.pinned}
              onPin={handlePin}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
