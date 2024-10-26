import React, { useState } from 'react';
import './Stations.css';
import MRTLines from '../components/MRTLines';
import LRTLines from '../components/LRTLines';
import GoogleMap from '../components/Map';

const App = () => {
  const [view, setView] = useState('mrt');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="page-container">
      <div className="MRTmap">
        <GoogleMap />
      </div>

      <div className="content-container">
        <div className="view-buttons">
          <button onClick={() => handleViewChange('mrt')} className={view === 'mrt' ? 'active' : ''}>MRT</button>
          <button onClick={() => handleViewChange('lrt')} className={view === 'lrt' ? 'active' : ''}>LRT</button>
        </div>
        <div className="view-content">
          {view === 'lrt' && <LRTLines />}
          {view === 'mrt' && <MRTLines />}
        </div>
      </div>
    </div>
  );
};

export default App;




































