// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CricketBooking from './components/CricketBooking';
import FootballBooking from './components/FootballBooking';
import BadmintonBooking from './components/BadmintonBooking';
import MyBookings from './components/MyBookings';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AdminLan from './components/AdminLan';
/* import Header from './components/Header'; */
import UserLanding from './components/UserLanding'
import PaymentPage from './components/PaymentPage'
import Users from './components/Users'
import './App.css';
import './index.css';
import TodaysBooking from './components/TodaysBooking';
import BookingHistroy from './components/BookingHistroy';
import MonthlyIncome from './components/MonthlyIncome';

function App() {
  return (
    <Router>
      <div className=" min-h-screen ">
        <main className="">
          <Routes>
            <Route path="/cricket" element={<CricketBooking />} />
            <Route path="/football" element={<FootballBooking />} />
            <Route path="/badminton" element={<BadmintonBooking />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/AdminLan" element={<AdminLan />} />
            <Route path="/" element={<UserLanding />} />
            <Route path="/PaymentPage" element={<PaymentPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/TodaysBooking" element={<TodaysBooking />} />
            <Route path="/BookingHistroy" element={<BookingHistroy/>} />
            <Route path="/MonthlyIncome" element={<MonthlyIncome/>} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
