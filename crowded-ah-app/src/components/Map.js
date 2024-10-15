// src/App.js
import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const App = () => (
  <APIProvider apiKey={'AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w'} onLoad={() => console.log('Maps API has loaded.')}>
    <div style={{ width: '100%', height: '400px'}}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
      >
      </Map>
    </div>
  </APIProvider>
);

export default App;
