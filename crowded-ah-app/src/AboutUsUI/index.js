import React from 'react';
import {Outlet} from 'react-router-dom'

const AboutUsUI = () => {
  console.log("Rendering AboutUsUI");
    return (
        <div className="AboutUsUI">
          <Outlet />
        </div>
      );
};

export default AboutUsUI;
