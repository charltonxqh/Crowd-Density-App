/**
 * @fileoverview AboutUsUI component acts as a parent layout component for the About Us section,
 * rendering nested routes specified within the About Us UI section of the application.
 * This serves as the container for all child pages under the About Us section.
 * @author Meagan Eng Pei Ying, Choo Yi Ken
 */

import React from 'react';
import {Outlet} from 'react-router-dom'

/**
 * AboutUsUI component that acts as a layout wrapper for all About Us pages.
 * It renders the `Outlet` component, which is a placeholder for nested routes
 * that dynamically renders the component corresponding to the active route.
 *
 * @component
 * @returns {JSX.Element} Rendered AboutUsUI component with child routes.
 */
const AboutUsUI = () => {
  console.log("Rendering AboutUsUI");
    return (
        <div className="AboutUsUI">
          <Outlet />
        </div>
      );
};

export default AboutUsUI;
