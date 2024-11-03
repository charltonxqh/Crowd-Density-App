import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        // Listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Set isGuest to false if a user is authenticated, true otherwise
            setIsGuest(!user);
        });

        return () => unsubscribe(); // Cleanup on component unmount
    }, [auth]);

    return (
        <GuestContext.Provider value={{ isGuest, setIsGuest }}>
            {children}
        </GuestContext.Provider>
    );
};

export const useGuest = () => useContext(GuestContext);