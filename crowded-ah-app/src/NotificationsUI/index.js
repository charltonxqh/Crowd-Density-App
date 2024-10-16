import React, { useState, useEffect } from 'react';
import './styles.css';

function Notification({ message, id, onPin, onDelete, isPinned }) {
    return (
        <div className={`notification-item ${isPinned ? 'pinned' : ''}`}>
            <p>{message}</p>
            <div className="notification-buttons">
                <button onClick={() => onPin(id)}>
                    {isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
}

function NotificationsPage() {
    // State for notifications and deleted message
    const [notifications, setNotifications] = useState([]);
    const [deletedMessage, setDeletedMessage] = useState(''); // To show the deleted notification message

    // Fetching notifications from API
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts', { //API link pasted here
                    headers: {
                        'AccountKey': 'fI9eYMuuS8ufXqQOI7wdFA==',
                        'Content-Type': 'application/json',
                    }
                });

                // Check if the response is ok
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the JSON data
                const data = await response.json();

                // Check the "Status" field in the API response
                if (data.value.Status === 1) {
                    // If Status is 1, add a special notification message
                    const smoothCommuteNotification = {
                        id: 'smooth-commute', // Unique id for this notification
                        message: 'All train services are running smoothly. Have a safe commute.',
                        pinned: false,
                        originalIndex: 0 // Setting to 0 since this is a single message
                    };
                    setNotifications([smoothCommuteNotification]);
                } else {
                    // Handle other statuses and add notifications accordingly
                    const fetchedNotifications = data.value.AffectedSegments.map((segment, index) => ({
                        id: segment.id || index, // Assuming segments have IDs
                        message: segment.Message || 'Train service alert',
                        pinned: false,
                        originalIndex: index,
                    }));
                    setNotifications(fetchedNotifications);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Call the fetch function
        fetchNotifications();
    }, []); // Empty dependency array to call it once on mount

    // Handle Pin/Unpin logic: Move notification to the top when pinned, or restore when unpinned
    const handlePin = (id) => {
        const updatedNotifications = notifications.map((notif) =>
            notif.id === id ? { ...notif, pinned: !notif.pinned } : notif
        );

        // Sort: pinned notifications to the top, then unpinned in original order
        updatedNotifications.sort((a, b) => {
            if (a.pinned === b.pinned) {
                return a.originalIndex - b.originalIndex; // Maintain original order for unpinned notifications
            }
            return a.pinned ? -1 : 1; // Pinned notifications come first
        });

        setNotifications(updatedNotifications);
    };

    // Handle Delete logic: Remove the notification and display a message
    const handleDelete = (id) => {
        const deletedNotif = notifications.find((notif) => notif.id === id);
        setDeletedMessage(deletedNotif.message); // Show deleted message

        // Remove the notification from the list
        const updatedNotifications = notifications.filter((notif) => notif.id !== id);
        setNotifications(updatedNotifications);

        // Clear deleted message after 3 seconds
        setTimeout(() => {
            setDeletedMessage('');
        }, 3000);
    };

    return (
        <div className="notifications-page">
            <h1>Notifications</h1>

            {/* Deleted message notification */}
            {deletedMessage && (
                <div className="deleted-message">{deletedMessage} has been deleted</div>
            )}

            <div className="notification-list">
                {notifications.map((notif) => (
                    <Notification
                        key={notif.id}
                        id={notif.id}
                        message={notif.message}
                        isPinned={notif.pinned}
                        onPin={handlePin}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default NotificationsPage;
