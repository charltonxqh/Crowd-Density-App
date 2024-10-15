import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomeUI from './HomeUI'
import MrtLrtUI from './MrtLrtUI'
import StatisticsUI from './StatisticsUI'
import NotificationsUI from './NotificationsUI'
import HelpUI from './HelpUI'
import AboutUsUI from './AboutUsUI'

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <div className = "content">
        <Routes>
          <Route exact path="/" element={<HomeUI />} />
          <Route exact path="/mrt-lrt" element={<MrtLrtUI />} />
          <Route exact path="/statistics" element={<StatisticsUI />} />
          <Route exact path="/notifications" element={<NotificationsUI />} />
          <Route exact path="/help" element={<HelpUI />} />
          <Route exact path="/about-us" element={<AboutUsUI />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

