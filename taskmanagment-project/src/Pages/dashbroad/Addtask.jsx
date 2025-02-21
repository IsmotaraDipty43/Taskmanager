import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const AddTask = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    taskType: "Feature",
    estimatedTime: "",
    userName: user?.displayName || "",
    userEmail: user?.email || "",
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTask((prev) => ({ ...prev, timestamp: new Date().toISOString() }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Title",
        text: "Please enter a title before submitting.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    try {
      await axiosSecure.post("/addtask", task);
      Swal.fire({
        icon: "success",
        title: "Task Added!",
        text: "Your task has been successfully added.",
        confirmButtonColor: "#22c55e",
      }).then(() => {
        navigate("/dashboard/Alltasks");
      });
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error adding your task. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Add New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Title (max 50 chars) *</label>
          <input
            type="text"
            name="title"
            maxLength="50"
            value={task.title}
            onChange={handleChange}
            className="w-full p-3 border rounded mt-1 text-gray-800 bg-gray-100"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Description (max 200 chars)</label>
          <textarea
            name="description"
            maxLength="200"
            value={task.description}
            onChange={handleChange}
            className="w-full p-3 border rounded mt-1 text-gray-800 bg-gray-100"
          ></textarea>
        </div>

        {/* Task Type */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Task Type</label>
          <select
            name="taskType"
            value={task.taskType}
            onChange={handleChange}
            className="w-full p-3 border rounded mt-1 text-gray-800 bg-gray-100"
          >
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
          </select>
        </div>

        {/* Estimated Time */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Estimated Time (hrs)</label>
          <input
            type="number"
            name="estimatedTime"
            value={task.estimatedTime}
            onChange={handleChange}
            className="w-full p-3 border rounded mt-1 text-gray-800 bg-gray-100"
            placeholder="Enter estimated time in hours"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-3 border rounded mt-1 text-gray-800 bg-gray-100"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* User Email (Readonly) */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Email</label>
          <input
            type="email"
            name="userEmail"
            value={task.userEmail}
            readOnly
            className="w-full p-3 border rounded mt-1 bg-gray-300 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="block font-medium text-lg text-gray-700">Your Name</label>
          <input
            type="text"
            name="userName"
            value={task.userName}
            onChange={handleChange}
            className="w-full p-3 border rounded mt-1 text-gray-800 bg-gray-100"
            placeholder="Enter your name"
          />
        </div>

        {/* Timestamp */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Timestamp: {new Date(task.timestamp).toLocaleString()}</span>
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
