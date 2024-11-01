import './App.css';
import NavBar from './NavBar/NavBar';
import PageIdentifierHeader from './components/PageIdentifierHeader';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomeUI from './HomeUI/home'
import AuthForm from './AuthUI/Authentication'
import Stations from './StationsUI/Stations'
import MRTLines from './components/MRTLines';
import StationDetails from './components/StationDetails';
import StatisticsUI from './StatisticsUI'
import NotificationsUI from './NotificationsUI'
import HelpUI from './HelpUI'
import AboutUsUI from './AboutUsUI/About_us_index'
import { Page1, Page2, Page3, Page4 } from './AboutUsUI/About_us_pages'

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <PageIdentifierHeader/>
        <div className = "content">
        <Routes>
<<<<<<< Updated upstream
          <Route exact path="/" element={<HomeUI />} />
          <Route exact path="/login" element={<AuthForm />} />
          <Route exact path="/stations" element={<Stations />} />
          <Route exact path="/statistics" element={<StatisticsUI />} />
          <Route exact path="/notifications" element={<NotificationsUI />} />
          <Route exact path="/help" element={<HelpUI />} />
          <Route exact path="/about-us" element={<AboutUsUI />}>
              <Route index element={<Page1 />} /> 
              <Route path="page2" element={<Page2 />} />
              <Route path="page3" element={<Page3 />} />
              <Route path="page4" element={<Page4 />} />
          </Route>
          </Routes>
        </div>
=======
            <Route exact path="/" element={<Authentication />} />
            <Route exact path="/home" element={<HomeUI />} />
            <Route exact path="/stations" element={<Stations />} />
            {/* Define the main route for your MRT lines page */}
            <Route path="/" element={<MRTLines />} />
            {/* Define the route for station details */}
            <Route path="/stations/:stationId" element={<StationDetails />} />
            <Route exact path="/statistics" element={<StatisticsUI />} />
            <Route exact path="/notifications" element={<NotificationsUI />} />
            <Route exact path="/help" element={<HelpUI />} />
            <Route exact path="/about-us" element={<AboutUsUI />}>
                <Route index element={<Page1 />} /> 
                <Route path="page2" element={<Page2 />} />
                <Route path="page3" element={<Page3 />} />
                <Route path="page4" element={<Page4 />} />
                <Route path="page5" element={<Page5 />} />
                <Route path="page6" element={<Page6 />} />
                <Route path="page7" element={<Page7 />} />
            </Route>
        </Routes>
>>>>>>> Stashed changes
      </div>
    </Router>
  );
}
export default App;