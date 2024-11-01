import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import './PageIdentifierHeader.css'; 


const pageTitles = {
    '/home': 'Home',
    '/stations': 'Stations',
    '/statistics': 'Statistics',
    '/notifications': 'Notifications',
    '/help': 'Help',
    '/about-us': 'About Us',
    '/about-us/page2': 'About Us',
    '/about-us/page3': 'About Us',
    '/about-us/page4': 'About Us',
    '/about-us/page5': 'About Us',
    '/about-us/page6': 'About Us',
    '/about-us/page7': 'About Us'

};

const PageIdentifierHeader = () => {
    const location = useLocation();
    const currentPageTitle = pageTitles[location.pathname];
    const [username, setUsername] = useState("Guest");
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const unsubscribeUser = onSnapshot(userRef, (doc) => {
                    const data = doc.data();
                    setUsername(data?.username || "Guest");
                });
                return () => {
                    unsubscribeUser();
                };
            } else {
                setUsername("Guest");
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    return (
        <div className="header-banner">
            <h2>
                {location.pathname === '/home' ? `Welcome, ${username}!` : currentPageTitle}
            </h2>
        </div>
    );
};

export default PageIdentifierHeader;