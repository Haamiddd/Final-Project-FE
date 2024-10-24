import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', password: '' });

  // Fetch all users from the backend
  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle input change for updating user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  // Update user details
  const handleUpdateUser = (id) => {
    axios.put(`/api/users/${id}`, updatedUser)
      .then(response => {
        alert(response.data.message);

        // Update the user directly in the state to avoid page reload
        setUsers(users.map(user => 
          user.id === id ? { ...user, ...updatedUser } : user
        ));

        setEditUserId(null); // Exit edit mode
      })
      .catch(error => console.error('Error updating user:', error));
  };

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`/api/users/${id}`)
        .then(response => {
          alert(response.data.message);
          // Remove the user from the list without reloading the page
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  return (
    <div className="p-5 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-green-500">Registered Users</h1>
      <table className="table-auto w-full mt-5 bg-white text-black">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editUserId === user.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateUser(user.id)}
                      className="bg-green-500 px-4 py-2 text-white mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditUserId(null)}
                      className="bg-red-500 px-4 py-2 text-white"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditUserId(user.id)}
                      className="bg-blue-500 px-4 py-2 text-white mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 px-4 py-2 text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
