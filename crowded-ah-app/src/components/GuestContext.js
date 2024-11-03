import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsGuest(!user);
        });

        return () => unsubscribe();
    }, [auth]);

    return (
        <GuestContext.Provider value={{ isGuest, setIsGuest }}>
            {children}
        </GuestContext.Provider>
    );
};

export const useGuest = () => useContext(GuestContext);