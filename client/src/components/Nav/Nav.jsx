import { Link } from 'react-router-dom';
import './Nav.css'
const Nav = () => {
    return (
        <nav>
            <img src="/logos/light-logo.png" alt="Cashboard App Logo" width={100} height={100} />
            <div>
                <button className='secondary'>
                    <Link to={'/login'}>Sign In</Link>
                </button>
                <button>
                    <Link to={'/register'}>Get Started</Link>
                </button>
            </div>
        </nav>
    )
}

export default Nav;