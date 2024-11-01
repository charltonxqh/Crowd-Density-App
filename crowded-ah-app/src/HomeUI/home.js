import React from 'react';
import TopBar from "../components/TopBar"
import NearbyStationMap from '../components/NearbyStationMap';

const HomeUI = () => {
    return (
        <div>
            <TopBar />
            <NearbyStationMap />
        </div>
    )
}

export default HomeUI