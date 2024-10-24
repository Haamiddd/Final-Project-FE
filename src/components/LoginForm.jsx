import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [userType, setUserType] = useState('user'); // State for user type (user or admin)
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      setSuccess('Login successful!');
      localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
      navigate('/'); // Redirect to the front page
    } catch (err) {
      setError(err.response.data.message || 'Login failed!');
    }
  };
  
  const handleAdminLogin = () => {
    const adminCredentials = {
      email: 'admin@gmail.com',
      password: 'admin123',
    };
  
    if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
      setSuccess('Admin login successful!');
      localStorage.setItem('isLoggedIn', 'true'); // Store admin login status in localStorage
      navigate('/AdminLan'); // Redirect to the AdminLan page
    } else {
      setError('Admin login failed: Invalid credentials!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');

    if (userType === 'admin') {
      handleAdminLogin(); // Handle admin login
    } else {
      handleUserLogin(); // Handle user login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        {error && <div className="mb-4 p-3 text-white bg-red-500 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 text-white bg-green-500 rounded">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Login Type</label>
            <div className="flex items-center">
              <label className="mr-6">
                <input
                  type="radio"
                  value="user"
                  checked={userType === 'user'}
                  onChange={() => setUserType('user')}
                  className="mr-2"
                />
                <span className="text-gray-700">User</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={userType === 'admin'}
                  onChange={() => setUserType('admin')}
                  className="mr-2"
                />
                <span className="text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => navigate('/register')} 
            className="text-purple-600 hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
