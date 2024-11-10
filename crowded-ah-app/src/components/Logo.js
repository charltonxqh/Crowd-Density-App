
import './Logo.css';
import { Link, useLocation } from 'react-router-dom';

function Logo() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/';

    return (
        <div className='logo'>
            {isAuthPage ? (
                <>
                    <img src="/images/Logo.png" alt="Logo"/>
                    <span className="logo-text">Crowded Ah?</span>
                </>
            ) : (
                <Link to="/home">
                    <img src="/images/Logo.png" alt="Logo"/>
                    <span className="logo-text">Crowded Ah?</span>
                </Link>
            )}
        </div>
    );
}

export default Logo;

