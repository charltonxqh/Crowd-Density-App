import React from 'react';
import TopBar from "../components/TopBar"
import NearbyStationMap from '../components/NearbyStationMap';
import NearbyStationList from '../components/NearbyStationList';

const HomeUI = () => {
    return (
        <div>
            <TopBar />
            <NearbyStationMap />
            <NearbyStationList />
        </div>
    )
}

export default HomeUI