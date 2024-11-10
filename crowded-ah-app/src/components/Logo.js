/**
 * @fileoverview Logo component that displays the app logo with a conditional link to the home page or static display on the authentication page.
 * @author Choo Yi Ken
 */

import "./Logo.css";
import { Link, useLocation } from "react-router-dom";

/**
 * Logo component that displays the app logo with a conditional link to the home page.
 *
 * @component
 * @returns {JSX.Element} The rendered logo element, either as a clickable link or plain depending on the current page.
 */
function Logo() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  return (
    <div className="logo">
      {isAuthPage ? (
        <>
          <img src="/images/Logo.png" alt="Logo" />
          <span className="logo-text">Crowded Ah?</span>
        </>
      ) : (
        <Link to="/home">
          <img src="/images/Logo.png" alt="Logo" />
          <span className="logo-text">Crowded Ah?</span>
        </Link>
      )}
    </div>
  );
}

export default Logo;
