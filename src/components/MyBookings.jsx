import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Track payment button click
  const [paymentMethod, setPaymentMethod] = useState(''); // Track selected payment method
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' }); // Track card details

  // Fetch bookings from localStorage
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  // Calculate total amount
  const totalAmount = bookings.reduce((total, booking) => total + booking.amount, 0);

  // Handle booking cancellation
  const handleCancel = (indexToCancel) => {
    const updatedBookings = bookings.filter((_, index) => index !== indexToCancel);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  // Handle payment method selection
  const handlePayment = () => {
    setShowPaymentOptions(true); // Show payment options when clicked
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method); // Set selected payment method
  };

  const handleCardDetailChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-black bg-opacity-90 min-h-screen text-white">
      <h2 className="text-2xl mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Sport</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Amount (LKR)</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{booking.sport}</td>
                <td className="px-4 py-2 border">{booking.date}</td>
                <td className="px-4 py-2 border">{booking.time}</td>
                <td className="px-4 py-2 border">{booking.amount}</td>
                <td className="px-4 py-2 border flex justify-center">
                  <button
                    onClick={() => handleCancel(index)}
                    className="item-center bg-red-500 text-white px-4 h-8 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-right px-4 py-2 border font-bold">Total</td>
              <td className="px-4 py-2 border font-bold">{totalAmount} LKR</td>
              <td className="px-4 py-2 border"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePayment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Proceed to Payment
      </button>

      {showPaymentOptions && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Select Payment Method:</h3>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handlePaymentMethod('cash')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Cash
            </button>
            <button
              onClick={() => handlePaymentMethod('card')}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Card
            </button>
          </div>
        </div>
      )}

      {/* Conditional rendering based on payment method */}
      {paymentMethod === 'cash' && (
        <div className="mt-4 bg-yellow-100 p-4 rounded">
          <p className="text-lg font-semibold">Make the payment at the court.</p>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h4 className="text-lg font-semibold">Enter Card Details:</h4>
          <div className="mt-2">
            <label className="block mb-2">
              Card Number:
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardDetailChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Expiry Date:
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleCardDetailChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
                placeholder="MM/YY"
              />
            </label>
            <label className="block mb-2">
              CVV:
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
              />
            </label>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
