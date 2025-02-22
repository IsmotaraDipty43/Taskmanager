import React from "react";
import { FaTasks, FaCheckCircle, FaClock, FaUserShield, FaUsers, FaStar } from "react-icons/fa";

import heroImage from "../assets/h.jpg";
import whychoos from "../assets/why.png"; 
import Navbar from "../Component/Navbar";
import { FaDollarSign, FaSmile, FaSyncAlt } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Home = () => {
  return (
    <div className=" text-gray-900">
      <Navbar /> 

     {/* Hero Section */}
     <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-12 text-black">
  {/* Left Content */}
  <div className="md:w-1/2 text-center md:text-left">
    <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text animate-fadeInUp">
      Stay Organized with <span className="text-purple-500">TaskFlow</span>
    </h1>
    <p className="mt-4 text-lg text-gray-700 animate-fadeInUp delay-100">
      Boost your productivity and take control of your daily tasks with 
      <span className="font-semibold"> TaskFlow</span>. Our smart task 
      management system helps you <strong>plan, track, and complete tasks</strong> 
      effortlessly. Stay focused, meet deadlines, and achieve your goals 
      with ease!
    </p>
    <p className="mt-2 text-gray-600 animate-fadeInUp delay-200">
      Whether you're a student, professional, or business owner, 
      <span className="font-semibold"> TaskFlow </span> provides 
      <strong> powerful tools</strong> like **deadline reminders, priority 
      management, and progress tracking** to keep you ahead of your work.
    </p>

    {/* CTA Buttons */}
    <div className="mt-6 flex justify-center md:justify-start gap-4 animate-fadeInUp delay-300">
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
        Get Started
      </button>
      <button className="border border-purple-600 hover:bg-purple-600 hover:text-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
        Learn More
      </button>
    </div>
  </div>

  {/* Right Image */}
  <div className="md:w-1/2 p-5 md:p-10">
    <img 
      src={heroImage} 
      alt="Task Management" 
      className="rounded-lg shadow-lg animate-fadeInUp delay-400"
    />
  </div>
</section>



   {/* Features Section */}
<section className="p-5 container mx-auto">
<h2 className="text-4xl font-bold text-center text-purple-700 animate-fadeInUp">
    Our <span className="text-indigo-800">Features</span>
  </h2>
  <p className="text-center text-gray-600 mt-2 text-lg animate-fadeInUp delay-100">
    TaskFlow brings you powerful tools to enhance productivity and keep you on track.
  </p>

  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp delay-200">
    {/* Feature 1 */}
    <div className="p-8 bg-white shadow-xl rounded-2xl text-center transform transition-all hover:scale-105 hover:shadow-2xl">
      <FaTasks className="text-blue-600 text-5xl mx-auto mb-4" />
      <h3 className="font-bold text-xl text-indigo-900">Task Management</h3>
      <p className="text-gray-700 mt-2">Effortlessly create, update, and organize tasks with ease.</p>
    </div>

    {/* Feature 2 */}
    <div className="p-8 bg-white shadow-xl rounded-2xl text-center transform transition-all hover:scale-105 hover:shadow-2xl">
      <FaClock className="text-yellow-500 text-5xl mx-auto mb-4" />
      <h3 className="font-bold text-xl text-indigo-900">Scheduling & Reminders</h3>
      <p className="text-gray-700 mt-2">Never miss a deadline with automated smart reminders.</p>
    </div>

    {/* Feature 3 */}
    <div className="p-8 bg-white shadow-xl rounded-2xl text-center transform transition-all hover:scale-105 hover:shadow-2xl">
      <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
      <h3 className="font-bold text-xl text-indigo-900">Progress Tracking</h3>
      <p className="text-gray-700 mt-2">Monitor your progress and track completion rates effortlessly.</p>
    </div>
  </div>
</section>


<section className="mt-10 mb-10 container mx-auto px-6 md:px-16">
  <h2 className="text-4xl font-bold text-center text-purple-700 animate-fadeInUp mb-8">
    Why Choose TaskFlow?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
    {/* Image Section (Left Side) */}
    <div className="flex justify-center">
      <img
         src={whychoos} 
        alt="Task Management"
        className="rounded-2xl shadow-lg max-w-full h-auto"
      />
    </div>

    {/* Text Section (Right Side) */}
    <div>
      <p className="text-lg leading-relaxed mb-4 text-gray-700">
        TaskFlow is designed to make task management effortless, helping you 
        stay organized and boost productivity. Here’s why you should choose us:
      </p>
      <ul className="list-disc list-inside text-base space-y-3">
        <li>
          <span className="font-semibold text-blue-600">User-Friendly Interface:</span> 
          Intuitive design for easy task management.
        </li>
        <li>
          <span className="font-semibold text-blue-600">Smart Scheduling:</span> 
          Set reminders and deadlines effortlessly.
        </li>
        <li>
          <span className="font-semibold text-blue-600">Real-Time Collaboration:</span> 
          Share tasks with your team and track progress.
        </li>
        <li>
          <span className="font-semibold text-blue-600">Multi-Device Sync:</span> 
          Access your tasks anywhere, anytime.
        </li>
      </ul>
      <div className="mt-6">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-90 transition-all">
          Get Started
        </button>
      </div>
    </div>
  </div>
</section>


      {/* Reviews Section */}
      <section className="mt-16 px-6 container mx-auto md:px-16">
  <h2 className="text-4xl font-bold text-center text-purple-700 animate-fadeInUp mb-8">
    What Our Users Say
  </h2>
  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Review Card 1 */}
    <div className="p-6 bg-blue-100 shadow-lg rounded-lg text-center">
      <img
        src="data:image/jpeg;base64,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"
        alt="Emily R."
        className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white shadow-md"
      />
      <p className="italic text-gray-700">
        "TaskFlow made my work so much easier! Highly recommended!"
      </p>
      <p className="mt-4 font-bold text-blue-800">- Sanjana</p>
    </div>

    {/* Review Card 2 */}
    <div className="p-6 bg-yellow-100 shadow-lg rounded-lg text-center">
      <img
        src="data:image/jpeg;base64,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"
        alt="John D."
        className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white shadow-md"
      />
      <p className="italic text-gray-700">
        "Best task manager out there. I stay on track effortlessly."
      </p>
      <p className="mt-4 font-bold text-yellow-800">- Karim Rahman</p>
    </div>

    {/* Review Card 3 */}
    <div className="p-6 bg-green-100 shadow-lg rounded-lg text-center">
      <img
        src="data:image/jpeg;base64,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"
        alt="Sarah W."
        className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white shadow-md"
      />
      <p className="italic text-gray-700">
        "A game-changer for productivity. Love the features!"
      </p>
      <p className="mt-4 font-bold text-green-800">- Sakib </p>
    </div>
  </div>
</section>

   {/* Footer Section */}
<footer className="mt-16 bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Brand Section */}
    <div>
      <h3 className="text-2xl font-bold text-white">TaskFlow</h3>
      <p className="mt-2 text-gray-300 max-w-sm">
        Your ultimate task management solution to boost productivity and efficiency.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-2xl font-bold text-white">Quick Links</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="/" className="hover:text-gray-300 transition">🏠 Home</a></li>
        <li><a href="/features" className="hover:text-gray-300 transition">🚀 Features</a></li>
        <li><a href="/about" className="hover:text-gray-300 transition">📖 About Us</a></li>
        <li><a href="/contact" className="hover:text-gray-300 transition">📞 Contact</a></li>
      </ul>
    </div>

    {/* Contact & Social Media */}
    <div>
      <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
      <p className="mt-4 text-gray-300">📧 support@taskflow.com</p>
      <p className="text-gray-300">📍 123 TaskFlow St, Productivity City</p>
      <div className="mt-4 flex space-x-4">
        <a href="#" className="text-gray-300 hover:text-white transition">
          <FaFacebook className="text-2xl" />
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition">
          <FaTwitter className="text-2xl" />
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition">
          <FaLinkedin className="text-2xl" />
        </a>
      </div>
    </div>
  </div>
  
  {/* Copyright */}
  <div className="text-center mt-10 border-t border-gray-700 pt-6">
    <p className="text-gray-400">© 2024 TaskFlow. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Home;
