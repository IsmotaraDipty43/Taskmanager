import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import Swal from 'sweetalert2'; 
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();
   const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    taskType: '',
   estimatedTime: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosSecure.get(`/task/${id}`);
        if (response.data.success) {
          setTaskData(response.data.task); 
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, axiosSecure]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosSecure.patch(`/update/task/${id}`, taskData);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Task updated successfully',
          text: response.data.message,
        });

        navigate("/dashboard/Alltasks")
       
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update task',
        text: 'Please try again later.',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Update Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-semibold">Category</label>
          <select
            id="category"
            name="category"
            value={taskData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="taskType" className="block text-lg font-semibold">Task Type</label>
          <select
            id="taskType"
            name="taskType"
            value={taskData.taskType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
           <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="estimatedTime" className="block text-lg font-semibold">Estimated Time (hrs)</label>
          <input
            type="number"
            id="estimatedTime"
            name="estimatedTime"
            value={taskData.estimatedTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Update;
