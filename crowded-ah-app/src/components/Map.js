import React, { useRef, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const App = ({ width = '30%', markers = [] }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      mapRef.current.panTo({ lat: markers[0].lat, lng: markers[0].lng });
      mapRef.current.setZoom(11.5);
    }
  }, [markers]);

  return (
    <APIProvider apiKey={'AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w'}>
      <div style={{ 
        width: width, 
        height: '300px', 
        border: '2px solid white', 
        borderRadius: '25px',
        margin: '50px', 
        display: 'flex'
      }}>
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
