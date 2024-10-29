// src/Map.js
import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const App = ({ width = '30%' }) => (
  <APIProvider apiKey={'AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w'} onLoad={() => console.log('Maps API has loaded.')}>
    <div style={{ 
    width: width, 
    height: '300px', 
    border: '2px solid white', 
    borderRadius: '25px',
    margin: '50px', 
    display: 'flex'
}}>
      <Map
        defaultZoom={11.5}
        defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
        onCameraChanged={(ev) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
      >
      </Map>
    </div>
  </APIProvider>
);

export default App;
