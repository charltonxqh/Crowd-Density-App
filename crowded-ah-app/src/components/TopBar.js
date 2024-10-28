import ProfileIcon from './ProfileIcon';
import './TopBar.css';

const TopBar = () => {

  return (
    <div className="top-bar">
      <input
        type="text"
        placeholder="Search for MRT Station"
        className="search-bar"
      />
      <ProfileIcon/>
    </div>
  );
};

export default TopBar;
