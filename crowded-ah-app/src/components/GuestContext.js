import React, { createContext, useState, useContext, useEffect } from 'react';

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(() => {
        const savedIsGuest = localStorage.getItem('isGuest');
        return savedIsGuest ? JSON.parse(savedIsGuest) : true;
    });

    useEffect(() => {
        localStorage.setItem('isGuest', JSON.stringify(isGuest));
    }, [isGuest]);

    return (
        <GuestContext.Provider value={{ isGuest, setIsGuest }}>
            {children}
        </GuestContext.Provider>
    );
};

export const useGuest = () => useContext(GuestContext);