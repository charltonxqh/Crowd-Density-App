import './App.css';
import NavBar from './NavBar/NavBar';
import PageIdentifierHeader from './components/PageIdentifierHeader';
import HomeUI from './HomeUI/home'
import Authentication from './AuthUI/Authentication'
import Stations from './StationsUI/Stations'
import StatisticsUI from './StatisticsUI/Statistics'
import NotificationsUI from './NotificationsUI/Notification'
import MRTLines from './components/MRTLines';
import StationDetailPage from './StationsUI/StationDetailPage'
import HelpUI from './HelpUI/Help'
import AboutUsUI from './AboutUsUI/AboutUs'
import { Page1, Page2, Page3, Page4, Page5, Page6, Page7} from './AboutUsUI/AboutUsPages'
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
      <div>
        <NavBar />
        <PageIdentifierHeader />
        <div className="content">
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/home" element={<HomeUI />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/mrt-lines" element={<MRTLines />} /> 
            <Route path="/station/:stationId" element={<StationDetailPage />} />
            <Route path="/statistics" element={<StatisticsUI />} />
            <Route path="/notifications" element={<NotificationsUI />} />
            <Route path="/help" element={<HelpUI />} />
            <Route path="/about-us" element={<AboutUsUI />}>
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
