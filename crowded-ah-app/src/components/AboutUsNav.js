/**
 * @fileoverview AboutUsNav component provides navigation dots for a multi-page view in the About Us section.
 * It displays a set of dots where one is active, indicating the user's position in the sequence of pages.
 * Each component corresponds to a specific page and highlights the active dot.
 * @author Meagan Eng Pei Ying, Choo Yi Ken
 */

import "../AboutUsUI/AboutUs.css";

/**
 * Page1Dots component renders the navigation dots for page 1, with the first dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page1Dots component
 */
export const Page1Dots = () => {
  return (
    <div className="dots">
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

/**
 * Page2Dots component renders the navigation dots for page 2, with the second dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page2Dots component
 */
export const Page2Dots = () => {
  return (
    <div className="dots">
      <span className="dot"></span>
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

/**
 * Page3Dots component renders the navigation dots for page 3, with the third dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page3Dots component
 */
export const Page3Dots = () => {
  return (
    <div className="dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

/**
 * Page4Dots component renders the navigation dots for page 4, with the fourth dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page4Dots component
 */
export const Page4Dots = () => {
  return (
    <div className="dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

/**
 * Page5Dots component renders the navigation dots for page 5, with the fifth dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page5Dots component
 */
export const Page5Dots = () => {
  return (
    <div className="dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

/**
 * Page6Dots component renders the navigation dots for page 6, with the sixth dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page6Dots component
 */
export const Page6Dots = () => {
  return (
    <div className="dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot active"></span>
      <span className="dot"></span>
    </div>
  );
};

/**
 * Page7Dots component renders the navigation dots for page 7, with the seventh dot marked as active.
 * @component
 * @returns {JSX.Element} The rendered Page7Dots component
 */
export const Page7Dots = () => {
  return (
    <div className="dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot active"></span>
    </div>
  );
};
