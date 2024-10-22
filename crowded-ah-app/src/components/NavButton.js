import React from 'react';
import {Link} from 'react-router-dom';
import './NavButton.css'

const NavButton = ({label, route}) => {
    return(
        <Link to = {route}>
            <button className = 'navButton'>
                <img src = {`/images/${label}.png`} alt={label} />
                <span>{label}</span>
            </button>
        </Link>
    );
};

export default NavButton

// .navButton {
//     flex: 1;                        /* Allow the button to take up equal space */
//     height: 100%;                   /* Make the button fill the height of the nav bar */
//     background-color: transparent;  /* Button background */
//     border: none;                   /* Remove borders */
//     cursor: pointer;                /* Change cursor to pointer */
//     display: flex;                  /* Use flexbox to align content */
//     flex-direction: column;         /* Stack icon and label vertically */
//     align-items: center;            /* Center align items horizontally */
//     justify-content: center;        /* Center align items vertically */
//     text-align: center;             /* Ensure text is centered */
//     padding: 0;                     /* Remove default padding */
// }

// /* Image within the button */
// .navButton img {
//     width: 30%;                     /* Set image size relative to button */
//     height: auto;                   /* Maintain aspect ratio */
//     margin-bottom: 5px;             /* Space between image and label */
// }

// /* Text within the button */
// .navButton span {
//     font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
//     font-weight: bold;
//     font-size: 12px;                /* Set smaller font size for responsiveness */
//     text-align: center;             /* Center text */
// }

// /* Add shadow when the entire button is pressed */
// .navButton:active {
//     box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Create shadow when pressed */
//     transform: translateY(2px);                  /* Simulate button pressing down */
// }

// /* Add shadow and effect when hovering over the button */
// .navButton:hover {
//     background-color: rgba(0, 0, 0, 0.05);       /* Slight background color change */
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* Slight shadow on hover */
// }

// /* Style the link */
// a {
//     text-decoration: none;    /* No underline for the link */
//     color: inherit;           /* Inherit color */
//     width: 100%;              /* Ensure link takes up full button space */
//     height: 100%;             /* Ensure link takes up full button space */
//     display: flex;            /* Ensure link covers the entire button area */
//     flex-direction: column;   /* Stack link contents vertically */
//     justify-content: center;  /* Center content vertically */
//     align-items: center;      /* Center content horizontally */
// }

// /* Media queries for smaller screens */
// @media (max-width: 600px) {
//     .NavBar {
//         height: 60px;         /* Reduce height for smaller screens */
//     }

//     .navButton img {
//         width: 25%;           /* Reduce image size on smaller screens */
//     }

//     .navButton span {
//         font-size: 10px;      /* Smaller font for labels on small screens */
//     }
// }

// /* Media queries for larger screens */
// @media (min-width: 1024px) {
//     .NavBar {
//         height: 100px;        /* Increase height for larger screens */
//     }

//     .navButton img {
//         width: 40%;           /* Larger image size for larger screens */
//     }

//     .navButton span {
//         font-size: 16px;      /* Larger font for labels on large screens */
//     }
// }




