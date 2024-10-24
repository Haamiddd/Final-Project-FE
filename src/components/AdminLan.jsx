import { Link } from 'react-router-dom';

const AdminLan = () => {
  return (
    <div className='bg-black min-h-screen p-5'>
      <header className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold text-green-500">Sports Booking Pro</h1>
        <h2 className='text-white'>Welcome Admin</h2>
      </header>
      <div className='flex mt-5 gap-4 text-xl'>
        <Link to="/users" className='bg-white h-[10vh] w-[40vh] flex items-center justify-center rounded-xl'>
          <h1>Registered Users</h1>
        </Link>
        <Link to="/TodaysBooking" className='bg-white h-[10vh] w-[40vh] flex items-center justify-center rounded-xl'>
          <h1>Today's Bookings</h1>
        </Link>
        <Link to="/BookingHistroy" className='bg-white h-[10vh] w-[40vh] flex items-center justify-center rounded-xl'>
          <h1>Booking History</h1>
        </Link>
        <Link to="/badminton" className='bg-white h-[10vh] w-[40vh] flex items-center justify-center rounded-xl'>
          <h1>Make Bookings</h1>
        </Link>
        <Link to="/MonthlyIncome" className='bg-white h-[10vh] w-[40vh] flex items-center justify-center rounded-xl'>
          <h1>Monthly Incomr</h1>
        </Link>
      </div>
    </div>
  );
};

export default AdminLan;
