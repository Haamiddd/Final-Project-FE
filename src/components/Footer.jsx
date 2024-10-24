// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-center text-white p-4 mt-10">
      <p>&copy; {new Date().getFullYear()} Sports Booking Pro. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
