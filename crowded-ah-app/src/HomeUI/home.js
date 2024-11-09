/**
 * @fileoverview HomeUI component serves as the main landing page of the application.
 * It displays the NearbyStationMap component, allowing users to view nearby MRT stations
 * and related information based on their location.
 * @author Charlton Siaw Qi Hen
 */

import React from "react";
import NearbyStationMap from "../components/NearbyStationMap";

/**
 * HomeUI component that serves as the landing page for the application.
 * It renders the NearbyStationMap component to display nearby stations and their details.
 *
 * @component
 * @returns {JSX.Element} Rendered HomeUI component.
 */
const HomeUI = () => {
  return (
    <div>
      <NearbyStationMap />
    </div>
  );
};

export default HomeUI;
