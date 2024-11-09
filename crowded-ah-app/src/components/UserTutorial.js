/**
 * @fileoverview UserTutorial component provides an embedded tutorial video
 * that guides users through the app's features, navigation, and usage.
 * @author Choo Yi Ken
 */

import React from "react";
import ReactPlayer from "react-player";
import "./UserTutorial.css";

/**
 * UserTutorial component renders a video player with a tutorial for new and returning users.
 * The video provides an overview of the app's navigation and main functionalities,
 * helping users make the most of the app.
 *
 * @component
 * @returns {JSX.Element} Rendered UserTutorial component
 */
function UserTutorial() {
  return (
    <div className="video-player">
      <h1 className="user-tutorial-video">User Tutorial Video</h1>
      <p className="use-tutorial-description">
        This tutorial video provides a comprehensive guide to using CrowdedAh.
        In just a few minutes, you'll learn how to navigate the app, interpret
        crowd density data, and make the most of features designed to enhance
        your commuting experience. Whether you're a first-time user or need a
        quick refresher, this video will walk you through everything you need to
        know to get started with CrowdedAh.
      </p>
      <ReactPlayer url="https://youtu.be/29cLls9Rm2A" controls />
    </div>
  );
}

export default UserTutorial;
