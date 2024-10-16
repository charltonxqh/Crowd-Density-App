// src/App.js
import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const App = () => (
  <APIProvider apiKey={'AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w'} onLoad={() => console.log('Maps API has loaded.')}>
    <div style={{ width: '100%', height: '400px'}}>
      <Map
        defaultZoom={11}
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
