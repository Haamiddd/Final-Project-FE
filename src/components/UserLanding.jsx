import React from 'react';
import { useNavigate } from 'react-router-dom';
import badmintonImage from '../images/home-badm.jpg'; // Import your images
import cricketImage from '../images/home-cri.jpg';
import footballImage from '../images/home-fot.jpg';

const UserLanding = () => {
  const navigate = useNavigate();

  const sports = [
    { name: 'Badminton', image: badmintonImage, path: '/badminton' },
    { name: 'Cricket', image: cricketImage, path: '/cricket' },
    { name: 'Football', image: footballImage, path: '/football' },
  ];

  const isLoggedIn = () => {
    // Check login status from localStorage or any authentication method
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const handleImageClick = (path) => {
    if (isLoggedIn()) {
      navigate(path); // User is logged in, navigate to the specific sport
    } else {
      // If not logged in, redirect to login page with the intended path to redirect after login
      navigate('/login', { state: { from: path } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-5 bg-black ">
      <h1 className=" text-blue-200 text-3xl font-dosis mb-10 text-center">
        <span className="text-5xl text-white">Welcome </span>to Sports Booking Pro! <br />
        <span className="">Choose Where you want to <span className="text-white">play</span></span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {sports.map((sport, index) => (
          <div
            key={index}
            className="relative cursor-pointer group"
            onClick={() => handleImageClick(sport.path)}
          >
            <img
              src={sport.image}
              alt={sport.name}
              className="w-[45vh] h-[65vh] object-cover rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-3xl font-semibold">{sport.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLanding;
