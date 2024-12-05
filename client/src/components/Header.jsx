import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

 
const Header = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect user", user);
      }, [user]);
    
    console.log('Current User:', user);// debug
    
    return (
        <header className="bg-green-500 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                <Link to="/home" className="text-white no-underline hover:underline">
                    Vuelo!
                </Link>
            </h1>
            <nav>
                {user ? (
                    <div className="relative">
                        <button
                            className="bg-white text-gray-700 font-bold px-4 py-2 rounded"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        >
                            {user.username}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg">
                                <ul className="list-none p-0">
                                    <li
                                        className="px-4 py-2 hover:bg-green-200 cursor-pointer"
                                        onClick={() => navigate('/favorites')}
                                    >
                                        My Favorites
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-green-200 cursor-pointer"
                                     onClick={handleLogout}   
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <Link
                            to="/login"
                            className="text-white font-bold px-4 py-2 rounded"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-white font-bold px-4 py-2 rounded"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
//onClick={handleLogout} this belongs to line  46