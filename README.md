# [Crowd-Density-App](#crowd-density-app)

## Table of Contents
1. [Project Title: Crowded Ah?](#project-title-crowded-ah)
2. [Project Description](#project-description)
3. [Website Features](#website-features)
4. [Installation and Setup](#installation-and-setup)
5. [YouTube Video Presentation](#youtube-video-presentation)
6. [Acknowledgements](#acknowledgements)

## [Project Title: Crowded Ah?](#project-title-crowded-ah)

### [Project Description](#project-description)
Crowded Ah? is a web application designed to enhance the commuting experience for train users in Singapore by providing real-time crowd levels, forecasted crowd levels, and upcoming train arrival times for MRT and LRT stations. The app also provides disruption alerts for affected lines and stations, as well as a statistics page showing the top 10 most crowded stations from the previous month. The statistics include graphs that visualize crowd density across different hours of the day.

The website was built primarily using React and JavaScript.

Contributors:
Charlton Siaw Qi Hen, Choo Yi Ken, Leow Yi Shian, Liaw Rui Xian, Meagan Eng Pei Ying, Quek Jared

We are from NTU SC2006 SCS3 Team 1.

All our final documentation will be in a folder "Lab 5". 

**Key Challenges:**
- **CORS Policies**: We encountered issues with API calls being blocked due to CORS restrictions, which we had to overcome by using proxies and configuring headers.
- **API Limits**: Limited usage of API keys posed a challenge for frequent data updates. To address this, we optimized data fetching techniques to work within the limits.

Our goal is to continually improve the application by adding new features and ensuring a smooth user experience.

### [Website Features](#website-features)
- **Guest Access**: Users can explore the site without needing an account.
- **Station Search and Favourites Management**: Search for stations and mark favourites for quick access.
- **User Authentication and Account Management**: Create accounts, login, change username, and manage favourites.
- **Location-Based Services**: View nearby stations based on current user location.
- **Real-Time Crowd Density Insights**: Get current crowd levels for all MRT/LRT stations.
- **Forecasted Crowd Density Insights**: View forecasted crowd levels for all MRT/LRT stations. 
- **Notifications Management**: Receive alerts about service disruptions.
- **Help and FAQ Search**: Access answers to common questions and contact support.
- **Statistics and Data Visualization**: Explore data about the busiest stations and view related visual analytics.
- **About Us Navigation**: Learn about the project’s mission, team, and future vision.
- **Logout and Session Management**: Secure logout and session handling.

### [Installation and Setup](#installation-and-setup)
To install and run the project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/Crowd-Density-App.git
    cd Crowd-Density-App
    ```

2. **Install Dependencies**:
    Make sure you have Node.js and npm installed. Run the following command to install the necessary dependencies:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory to include environment variables (e.g., API keys for the LTA Datamall, Firebase configuration). Example:
    ```env
    REACT_APP_API_KEY=your_lta_api_key_here
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
    ```

4. **Start the Application**:
    ```bash
    npm start
    ```
    The development server should start, and you can open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. **Build for Production**:
    To create an optimized production build, run:
    ```bash
    npm run build
    ```

### [YouTube Video Presentation](#youtube-video-presentation)
[Watch our video presentation on YouTube](https://www.youtube.com/watch?v=iNRiG7BhjoA)

### [Acknowledgements](#acknowledgements)
- **LTA Datamall**: For providing APIs that allowed us to access real-time crowd levels, forecasted crowd levels, and passenger volume data for train stations.
- **Special thanks to [elliotwutingfeng/train_arrival](https://github.com/elliotwutingfeng/train_arrival)** for providing code that helped us retrieve train ETAs.
