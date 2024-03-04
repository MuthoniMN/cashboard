import './Nav.css'
const Nav = () => {
    return (
        <nav>
            <img src="/logos/light-logo.png" alt="Cashboard App Logo" width={100} height={100} />
            <div>
                <button className='secondary'>Sign In</button>
                <button>Get Started</button>
            </div>
        </nav>
    )
}

export default Nav;