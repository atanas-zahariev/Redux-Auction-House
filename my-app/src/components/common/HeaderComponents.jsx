import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/authSlice';

export default function Header() {
    // const { state } = useContext(AuthContext);
    const user = useSelector(selectUser);
    const state = Object.entries(user.entities).length;

    console.log(state);
    return (
        <header>
            <Link to="/" className="title-logo">
                <img src="/static/assets/logo.png" alt="static" />
                <span>Auction House</span>
            </Link>
            <nav className="main-nav nav-mid">               

                    {/* <!-- User actions --> */}
                    {state && (
                        <ul>
                            <li>
                                <Link to="/catalog">Browse</Link>
                            </li>
                             <li>
                                <Link to="/search">Search</Link>
                            </li>

                            <li className="user">
                                <Link to="/create">Publish</Link>
                            </li>


                            <li className="user">
                                <Link to="/closed">Closed Auctions</Link>
                            </li>


                            <li className="user">
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                    )}

                    {/* <!-- Guest actions --> */}

                    {!state && (
                        <ul>
                            <li>
                                <Link to="/catalog">Browse</Link>
                            </li>
                            <li>
                                <Link to="/search">Search</Link>
                            </li>

                            <li className="guest">
                                <Link to="/register">Register</Link>
                            </li>

                            <li className="guest">
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    )}  
                                  
            </nav>
        </header>
    );
}