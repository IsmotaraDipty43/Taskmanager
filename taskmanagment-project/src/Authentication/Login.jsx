import React, { useContext } from 'react';
import loginimg from '../assets/login.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import Sociallogin from '../Component/Sociallogin';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Ensure fallback

  const { signIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire({
          title: 'Login Successful!',
          icon: 'success',
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });
        navigate(from, { replace: true }); // Redirect properly
      })
      .catch((error) => {
        Swal.fire({
          title: 'Login Failed!',
          text: error.message || 'Invalid credentials. Please try again.',
          icon: 'error',
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });
      });
  };

  return (
    <div className="flex items-center justify-center  min-h-screen bg-gray-100 p-5">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full  max-w-5xl">
        {/* Image Section */}
        <div className="md:w-1/2 p-5 flex items-center justify-center">
          <img src={loginimg} alt="Login" className="rounded-lg w-full max-w-md" />
        </div>

        {/* Login Section */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-black mb-6">Login Now</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-blue-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-blue-700 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div className="text-right mt-2">
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Social Login */}
            <Sociallogin />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* Redirect to Registration */}
          <p className="text-center mt-4 text-gray-700 text-sm">
            New here?{' '}
            <Link className="text-blue-700 font-bold hover:underline" to="/signup">
              Create a New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
