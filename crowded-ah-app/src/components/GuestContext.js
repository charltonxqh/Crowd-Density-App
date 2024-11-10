/**
 * @fileoverview GuestContext provides context for managing guest or logged-in user state
 * in the MRT app, handling Firebase authentication state changes to set guest status.
 * Allows components to access and update the `isGuest` status globally across the app.
 * @author Leow Yi Shian
 */

import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const GuestContext = createContext();

/**
 * GuestProvider component that wraps children components and provides guest state context.
 * Sets `isGuest` state based on Firebase authentication status.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to render within the provider.
 * @returns {JSX.Element} The GuestContext provider component.
 */
export const GuestProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    // Sets guest state based on authentication state changes
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

/**
 * Custom hook for accessing the guest context.
 * Provides `isGuest` status and `setIsGuest` function.
 *
 * @returns {{ isGuest: boolean, setIsGuest: Function }} The guest context value.
 */
export const useGuest = () => useContext(GuestContext);
