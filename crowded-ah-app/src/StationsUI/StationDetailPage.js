/**
 * @fileoverview StationDetailPage component serves as the detail page for displaying information
 * about a specific station selected by the user. It includes the StationDetails component, which
 * presents real-time and forecasted crowd density, station information, and other relevant data.
 * @author Liaw Rui Xian
 */
import React from 'react';
import StationDetails from '../components/StationDetails';

/**
 * StationDetailPage component that renders detailed information for a selected station.
 * It serves as a container for the StationDetails component, which displays specific
 * station data and crowd density levels.
 *
 * @component
 * @returns {JSX.Element} Rendered StationDetailPage component.
 */
const StationDetailPage = () => {
  return (
    <div>
      <StationDetails/>
    </div>
  );
};

export default StationDetailPage;
