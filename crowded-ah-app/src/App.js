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
          <Route exact path="/about-us" element={<AboutUsUI />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;

//code to test Login + Signup
// import React from 'react';
// import AuthForm from './components/AuthForm';

// function App() {
//     return (
//         <div className="App">
//             <AuthForm />
//         </div>
//     );
// }

// export default App;
