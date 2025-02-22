import React, { useEffect } from 'react';
import Sidebar from '../../Component/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashbroad = () => {
    const navigate = useNavigate();

    // Redirect to profile page when Dashbroad is loaded
    useEffect(() => {
      navigate('/dashboard/profile');
    }, [navigate]);
    return (
        <div>
        
        <div className="grid grid-cols-12 h-auto md:min-h-screen">
      {/* Sidebar Section */}
      <div className="col-span-12 md:col-span-3 ">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="col-span-12 md:col-span-9 p-6">
        <Outlet />
      </div>
    </div>
            
        </div>
    );
};

export default Dashbroad;