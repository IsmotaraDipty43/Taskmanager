import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert
import Loading from "../../Component/Loading";
import { Link } from "react-router-dom"; // Import Link for routing

const AllTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    if (!user || !user.email) return; // ✅ Prevent error when user is null

    const fetchTasks = async (category, setTasks) => {
      try {
        const response = await axiosSecure.get(`/tasks/${user.email}?category=${category}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(`Error fetching ${category} tasks:`, error);
      }
    };

    fetchTasks("To-Do", setToDoTasks);
    fetchTasks("In Progress", setInProgressTasks);
    fetchTasks("Done", setDoneTasks);
  }, [user, axiosSecure]); // ✅ Include `user` dependency

  // 🔹 Function to handle task deletion
  const handleDeleteTask = async (taskId, category, setTasks) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/task/${taskId}`);
          if (response.data.success) {
            // Remove the deleted task from UI
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error!", "Failed to delete the task.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Tasks</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        <TaskSection title="To-Do" tasks={toDoTasks} bgColor="bg-red-100" setTasks={setToDoTasks} handleDeleteTask={handleDeleteTask} />
        <TaskSection title="In Progress" tasks={inProgressTasks} bgColor="bg-blue-100" setTasks={setInProgressTasks} handleDeleteTask={handleDeleteTask} />
        <TaskSection title="Done" tasks={doneTasks} bgColor="bg-green-100" setTasks={setDoneTasks} handleDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
};

// 🔹 Updated Task Section Component with Delete Button and Task Update Link
const TaskSection = ({ title, tasks, bgColor, setTasks, handleDeleteTask }) => (
  <div className={`${bgColor} p-4 rounded-lg shadow-lg`}>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded-lg mb-3 shadow-lg border-l-4 border-gray-400">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Type: {task.taskType}</span>
            <span>Time: {task.estimatedTime} hrs</span>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteTask(task._id, title, setTasks)}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white py-1 px-3 mr-3 rounded text-sm"
          >
            Delete
          </button>

          {/* Link to Task Update Page */}
          <Link to={`/dashboard/task/update/${task._id}`} className="mt-3 inline-block bg-blue-500 text-white py-1 px-3 rounded text-sm">
            Update Task
          </Link>
        </div>
      ))
    ) : (
      <p>No tasks available</p>
    )}
  </div>
);

export default AllTasks;
