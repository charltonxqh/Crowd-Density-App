import './App.css';
import NavBar from './NavBar/NavBar';
import TopBar from './components/TopBar';
import PageIdentifierHeader from './components/PageIdentifierHeader';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';

import HomeUI from './HomeUI/home'
import AuthForm from './AuthUI/Authentication'
import Stations from './StationsUI/Stations'
import StatisticsUI from './StatisticsUI'
import NotificationsUI from './NotificationsUI'
import HelpUI from './HelpUI'
import AboutUsUI from './AboutUsUI/About_us_index'
import { Page1, Page2, Page3, Page4 } from './AboutUsUI/About_us_pages'

function App() {
  const [isGuest, setIsGuest] = useState(true);

  return (
    <Router>
      <div>
        <TopBar isGuest={isGuest}/>
        <NavBar/>
        <PageIdentifierHeader/>
        <div className = "content">
        <Routes>
          <Route exact path="/" element={<AuthForm setIsGuest={setIsGuest}/>} />
          <Route exact path="/home" element={<HomeUI />} />
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
      </div>
    </Router>
  );
}
export default App;