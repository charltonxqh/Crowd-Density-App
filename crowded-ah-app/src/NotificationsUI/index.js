import React, { useState, useEffect } from 'react';
import './styles.css';
import smoothCommuteImage from './trainsmile.png'; // Image for status 1
import disruptionImage from './sadtrain.png'; // New image for status 2

function Notification({ line, direction, stations, message, id, onPin, onDelete, isPinned, status }) {
    return (
        <div className={`notification-item ${isPinned ? 'pinned' : ''}`}>
            {status === 2 && (
                <>
                    <p><strong>Line:</strong> {line}</p>
                    <p><strong>Direction:</strong> {direction}</p>
                    <p><strong>Stations:</strong> {stations}</p>
                </>
            )}
            <p><strong>Message:</strong> {message}</p>
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
    const [notifications, setNotifications] = useState([]);
    const [deletedMessage, setDeletedMessage] = useState('');

    useEffect(() => {


        const fetchNotifications = async () => {
            try {
                const response = await fetch('/ltaodataservice/TrainServiceAlerts', {
                    headers: {
                        'AccountKey': 'fI9eYMuuS8ufXqQOI7wdFA==',
                        'accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
 
                // Force Status to 2 for testing purposes
                //data.value.Status = 2;  // Assign status 2 to simulate disruption

                // Mock multiple disruption cases
                const disruptions = [
                    {
                        id: 'disruption-1',
                        status: 2,
                        line: "NSL",
                        direction: "Marina Bay",
                        stations: "Yishun to Marina Bay",
                        message: "Train delay on North-South Line due to a power fault. Trains are delayed by 15 minutes.",
                        pinned: false,
                        originalIndex: 0
                    },
                    {
                        id: 'disruption-2',
                        status: 2,
                        line: "EWL",
                        direction: "Pasir Ris",
                        stations: "Paya Lebar to Pasir Ris",
                        message: "Train delay on East-West Line due to a track fault. Expect delays of up to 10 minutes.",
                        pinned: false,
                        originalIndex: 1
                    },
                    {
                        id: 'disruption-3',
                        status: 2,
                        line: "CCL",
                        direction: "HarbourFront",
                        stations: "Kent Ridge to HarbourFront",
                        message: "Service disruption on Circle Line due to signaling issues. Trains delayed by 20 minutes.",
                        pinned: false,
                        originalIndex: 2
                    }
                ];

                // Check the current status for smooth commute or disruption
                if (data.value.Status === 1) {
                    const smoothCommuteNotification = {
                        id: 'smooth-commute',
                        status: 1,
                        message: 'All train services are running smoothly. Have a safe commute.',
                        pinned: false,
                        originalIndex: 0
                    };
                    setNotifications([smoothCommuteNotification]);
                } else if (data.value.Status === 2) {
                    setNotifications(disruptions); // Add multiple disruptions to the state
                } else {
                    setNotifications([]);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handlePin = (id) => {
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
    };

    const handleDelete = (id) => {
        const deletedNotif = notifications.find((notif) => notif.id === id);
        setDeletedMessage(deletedNotif.message);

        const updatedNotifications = notifications.filter((notif) => notif.id !== id);
        setNotifications(updatedNotifications);

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

            {/* Conditionally render image based on the status */}
            {notifications.length === 1 && notifications[0].id === 'smooth-commute' && (
                <img src={smoothCommuteImage} alt="Smooth Commute" />
            )}
            {notifications.some(notif => notif.status === 2) && (
                <img src={disruptionImage} alt="Train Disruption" />
            )}

            <div className="notification-list">
                {notifications.map((notif) => (
                    <Notification
                        key={notif.id}
                        id={notif.id}
                        status={notif.status}
                        line={notif.line}
                        direction={notif.direction}
                        stations={notif.stations}
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
