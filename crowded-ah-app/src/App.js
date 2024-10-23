import './App.css';
import NavBar from './NavBar/NavBar';
import PageIdentifierHeader from './components/PageIdentifierHeader';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomeUI from './HomeUI/home'
import AuthForm from './AuthUI/index'
import Stations from './StationsUI/Stations'
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
          <Route exact path="/" element={<HomeUI />} />
          <Route exact path="/login" element={<AuthForm />} />
          <Route exact path="/stations" element={<Stations />} />
          <Route exact path="/statistics" element={<StatisticsUI />} />
          <Route exact path="/notifications" element={<NotificationsUI />} />
          <Route exact path="/help" element={<HelpUI />} />
          <Route path="/about-us" element={<AboutUsUI />}>
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