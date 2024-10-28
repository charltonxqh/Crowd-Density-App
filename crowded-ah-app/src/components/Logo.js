import './Logo.css';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <div className='logo'>
            <Link to="/home">
                <img src="/images/Logo.png" alt="Logo"/>
                <span className="logo-text">Crowded Ah?</span>
            </Link>
        </div>
    );
}

export default Logo;
