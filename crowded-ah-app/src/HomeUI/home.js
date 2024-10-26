import React from 'react';
import TopBar from "../components/TopBar"
import NearbyStations from '../components/NearbyStations';

const HomeUI = () => {
    return (
        <div>
            <TopBar />
            <NearbyStations />
        </div>
    )
}

export default HomeUI