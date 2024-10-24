import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout2 } from 'react-icons/tb';

const Header = () => {
  const navigate = useNavigate();

  // Logout function to remove login state and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear the login status
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="text-white items-center">
      <h1 className="text-3xl font-bold text-green-500">Sports Booking Pro</h1>
      <nav className="flex justify-between items-center mt-4">
        <div className=''>
          <Link className="hover:underline" to="/cricket">Cricket</Link>
          <Link className="hover:underline mx-4" to="/football">Football</Link>
          <Link className="hover:underline mx-4" to="/badminton">Badminton</Link>
        </div>
        <div className="flex items-center relative">
          <Link className="hover:underline mx-4" to="/mybookings">My Bookings</Link>
          
          {/* Logout Icon with hover tooltip */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={handleLogout}
          >
            <TbLogout2 size={24} />
            <span className="absolute bottom-10 left-0 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Logout
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
