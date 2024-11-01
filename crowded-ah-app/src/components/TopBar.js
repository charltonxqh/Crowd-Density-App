import ProfileIcon from './ProfileIcon';
import './TopBar.css';
import SearchBar from './SearchBar';

const TopBar = () => {

  return (
    <div className="top-bar">
      <SearchBar/>
      <ProfileIcon/>
    </div>
  );
};

export default TopBar;
