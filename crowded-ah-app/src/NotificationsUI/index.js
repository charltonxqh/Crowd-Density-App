import React, { useState, useEffect } from 'react';
import './styles.css';
// Import the image from your assets folder
import smoothCommuteImage from './trainsmile.png'; // Adjust the path accordingly

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

                if (data.value.Status === 1) {
                    const smoothCommuteNotification = {
                        id: 'smooth-commute',
                        message: 'All train services are running smoothly. Have a safe commute.',
                        pinned: false,
                        originalIndex: 0
                    };
                    setNotifications([smoothCommuteNotification]);
                } else if (data.value.AffectedSegments && data.value.AffectedSegments.length > 0) {
                    const fetchedNotifications = data.value.AffectedSegments.map((segment, index) => ({
                        id: segment.id || index,
                        message: segment.Message || 'Train service alert',
                        pinned: false,
                        originalIndex: index,
                    }));
                    setNotifications(fetchedNotifications);
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

            {/* Conditionally render image when status is 1 */}
            {notifications.length === 1 && notifications[0].id === 'smooth-commute' && (
                <img src={smoothCommuteImage} alt="Smooth Commute" />
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
