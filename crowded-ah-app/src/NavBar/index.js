import './index.css'
import NavButton from '../components/NavButton';
import {React, memo} from "react"


function NavBar() {
    return (
        <div className="NavBar">
            <NavButton label="Home" route="/" />
            <NavButton label="MRT/LRT" route="/mrt-lrt" />
            <NavButton label="Statistics" route="/statistics" />
            <NavButton label="Notifications" route="/notifications" />
            <NavButton label="Help" route="/help" />
            <NavButton label="About Us" route="/about-us" />
        </div>
    );
}


export default memo(NavBar);