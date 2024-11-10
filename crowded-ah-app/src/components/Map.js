/**
 * @fileoverview Map component that displays a map with markers and allows interaction with the map.
 * The component renders a Google Map, centered on Southeast Asia by default, and supports dynamic panning
 * and zooming based on the provided markers.
 * @author Meagan Eng Pei Ying, Liaw Rui Xian
 */

import React, { useRef, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

/**
 * Map component that displays a Google Map with markers.
 *
 * @component
 * @param {string} [width='30%'] - The width of the map container.
 * @param {Array<Object>} [markers=[]] - List of marker objects, each containing latitude and longitude.
 */
const App = ({ width = "30%", markers = [] }) => {
  const mapRef = useRef(null);

  /**
   * Sets the initial map view and zoom level based on the first marker when the markers prop changes.
   * This effect runs when the markers prop is updated.
   */
  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      mapRef.current.panTo({ lat: markers[0].lat, lng: markers[0].lng });
      mapRef.current.setZoom(11.5);
    }
  }, [markers]);

  return (
    <APIProvider apiKey={"AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w"}>
      <div
        style={{
          width: width,
          height: "300px",
          border: "2px solid white",
          borderRadius: "25px",
          margin: "50px",
          display: "flex",
        }}
      >
        <Map
          ref={mapRef}
          defaultZoom={11.5}
          defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
        >
          {markers.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default App;
