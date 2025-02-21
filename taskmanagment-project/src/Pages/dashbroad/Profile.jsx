import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import task from '../../assets/profile.png'
const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
          <img
            src={user?.image || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {user?.displayName || 'User'}!
            </h1>
            <p className="text-gray-600">My Profile</p>

            <div className="mt-4">
              <p className="text-gray-700"><span className="font-medium">Username:</span> {user?.displayName || 'Not Available'}</p>
              <p className="text-gray-700"><span className="font-medium">Email:</span> {user?.email || 'Not Available'}</p>
            </div>
          </div>
          <div>
            <img src={task} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;