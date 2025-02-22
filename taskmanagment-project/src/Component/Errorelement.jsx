import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorImage from '../assets/ERROR.png';

const Errorelement = () => {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-gray-700">
            We encountered an error. Please try again later.
          </p>
        </div>
        <div className="mb-8">
          <img
            src={errorImage}
            alt="Error"
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  };

export default Errorelement;