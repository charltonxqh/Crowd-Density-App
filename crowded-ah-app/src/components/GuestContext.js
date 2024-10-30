import React, { createContext, useState, useContext } from 'react';

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(false);

    return (
        <GuestContext.Provider value={{ isGuest, setIsGuest }}>
            {children}
        </GuestContext.Provider>
    );
};

export const useGuest = () => useContext(GuestContext);