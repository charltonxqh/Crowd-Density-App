/**
 * @fileoverview PdfViewer component provides an embedded viewer for displaying
 * the user manual of the Crowded Ah? web application.
 * @author Choo Yi Ken
 */

import "./PdfViewer.css";

/**
 * PdfViewer component displays a PDF viewer for the user manual of the Crowded Ah? app.
 * It includes a title and a description of the app’s purpose, giving users insights into
 * the functionality and benefits of the application.
 *
 * @component
 * @returns {JSX.Element} Rendered PdfViewer component
 */
const PdfViewer = () => {
  return (
    <div className="pdf-container">
      <h1 className="pdf-title">User Manual</h1>
      <p className="pdf-description">
        "Crowded Ah?" is an innovative web application designed to enhance your
        commuting experience in Singapore. With real-time data and user-friendly
        features, the app provides insights into crowd density at MRT and LRT
        stations, helping you choose the best times to travel. Whether you're a
        daily commuter or a casual traveler, "Crowded Ah?" empowers you to
        navigate the bustling transit system with ease and convenience.
      </p>
      <iframe
        src="/user-manual-v1.pdf"
        className="pdf"
        frameborder="0"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
