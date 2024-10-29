import React from 'react';
import TopBar from "../components/TopBar"
import Map from "../components/Map"
import MRTNearU from '../components/MRTNearU';

const HomeUI = () => {
    return (
        <div>
            <TopBar />
            <Map />
            <MRTNearU />
        </div>
    )
}

export default HomeUI