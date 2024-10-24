import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header'; 
import Footer from './Footer';
const FootballBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);
  const bookingAmount = 1250;

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', 
    '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
  ];

  useEffect(() => {
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const todaysBookings = existingBookings.filter(booking => booking.sport === 'Football' && booking.date === selectedDate.toLocaleDateString());
    setBookedSlots(todaysBookings.map(booking => booking.time));
  }, [selectedDate]);

  const handleBooking = (time) => {
    const newBooking = {
      sport: 'Football',
      time: time,
      date: selectedDate.toLocaleDateString(),
      amount: bookingAmount,  // Include amount in booking
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    setBookedSlots([...bookedSlots, time]);
    
    alert(`Football booked for ${time} on ${selectedDate.toLocaleDateString()}`);
  };

  const isSlotBooked = (time) => bookedSlots.includes(time);

  return (
    <div className="background-foot p-5">
      <Header/>
      <div className='flex justify-between justify-center item-center text-center mt-10'>
      <h2 className="text-2xl text-white font-bold ">Badminton Booking</h2>
      <div className="">
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} className=" p-2 rounded bg-black bg-opacity-50 text-white ring-2 ring-green-500" />
      </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {timeSlots.map((time, index) => (
          <button
          key={index}
          onClick={() => !isSlotBooked(time) && handleBooking(time)}
          className={`p-2 rounded ${
            isSlotBooked(time)
              ? 'bg-green-900 bg-opacity-80 text-white cursor-not-allowed ring-2 ring-white'
              : 'bg-black bg-opacity-50 ring-2 ring-green-500 text-white hover:bg-green-700'
          }`}
          disabled={isSlotBooked(time)}
        >
          {time} <br />
          <span className={`${isSlotBooked(time) ? 'text-red-500' : 'text-green-500'}`}>
            {isSlotBooked(time) ? 'Booked' : 'Available'}
          </span>
        </button>
        
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default FootballBooking;
