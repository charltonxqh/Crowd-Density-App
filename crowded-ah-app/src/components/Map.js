// src/Map.js
// import React from 'react';
// import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

// const App = ({ width = '30%', markers }) => (
//   <APIProvider apiKey={'AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w'} onLoad={() => console.log('Maps API has loaded.')}>
//     <div style={{ 
//       width: width, 
//       height: '300px', 
//       border: '2px solid white', 
//       borderRadius: '25px',
//       margin: '50px', 
//       display: 'flex',
//       overflow: 'hidden'
//     }}>
//       <Map
//         defaultZoom={11.5}
//         defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
//         onCameraChanged={(ev) =>console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
//       >
//         {markers.map((station, index) => (
//           <Marker 
//             key={index} 
//             position={{ lat: station.lat, lng: station.lng }} 
//             title={station.name} 
//           />
//         ))}
//       </Map>
//     </div>
//   </APIProvider>
// );



// src/Map.js


// import React from 'react';
// import { APIProvider, Map } from '@vis.gl/react-google-maps';

// const App = ({ width = '30%' }) => (
//   <APIProvider apiKey={'AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w'} onLoad={() => console.log('Maps API has loaded.')}>
//     <div style={{ 
//     width: width, 
//     height: '300px', 
//     border: '2px solid white', 
//     borderRadius: '25px',
//     margin: '50px', 
//     display: 'flex'
// }}>
//       <Map
//         defaultZoom={11.5}
//         defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
//         onCameraChanged={(ev) =>
//           console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
//         }
//       >
//       </Map>
//     </div>
//   </APIProvider>
// );


// export default App;

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
