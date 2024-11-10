import './App.css';
import Header from './Header/Header';
import PageIdentifierHeader from './components/PageIdentifierHeader';
import Home from './HomeUI/home'
import Authentication from './AuthUI/Authentication'
import Stations from './StationsUI/Stations'
import Statistics from './StatisticsUI/Statistics'
import Notifications from './NotificationsUI/NotificationsPage'
import MRTLines from './components/MRTLines';
import StationDetailPage from './StationsUI/StationDetailPage'
import Help from './HelpUI/Help'
import AboutUs from './AboutUsUI/AboutUs'
import { Page1, Page2, Page3, Page4, Page5, Page6, Page7} from './AboutUsUI/AboutUsPages'
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
      <div>
        <Header />
        <PageIdentifierHeader />
        <div className="content">
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/mrt-lines" element={<MRTLines />} /> 
            <Route path="/station/:stationId" element={<StationDetailPage />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about-us" element={<AboutUs />}>
              <Route index element={<Page1 />} />
              <Route path="page2" element={<Page2 />} />
              <Route path="page3" element={<Page3 />} />
              <Route path="page4" element={<Page4 />} />
              <Route path="page5" element={<Page5 />} />
              <Route path="page6" element={<Page6 />} />
              <Route path="page7" element={<Page7 />} />
            </Route>
          </Routes>
        </div>
      </div>
  );
}

export default App;
