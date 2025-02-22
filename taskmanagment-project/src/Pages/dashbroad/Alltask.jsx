import { useContext, useEffect, useState, useRef } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import io from "socket.io-client";

const AllTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);

  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  // Map droppable IDs to the category names used in the database
  const categoryMapping = {
    toDoTasks: "To-Do",
    inProgressTasks: "In Progress",
    doneTasks: "Done",
  };

  useEffect(() => {
    if (!user || !user.email) return;

    // Initialize socket connection
    socketRef.current = io("https://jobtask-red.vercel.app");

    // Listen for task changes from the backend
    socketRef.current.on("taskChanged", (change) => {
      fetchTasks("To-Do", setToDoTasks);
      fetchTasks("In Progress", setInProgressTasks);
      fetchTasks("Done", setDoneTasks);
    });

    // Function to fetch tasks for a given category
    const fetchTasks = async (category, setTasks) => {
      try {
        const response = await axiosSecure.get(
          `/tasks/${user.email}?category=${category}`
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(`Error fetching ${category} tasks:`, error);
      }
    };

    // Initial fetch
    fetchTasks("To-Do", setToDoTasks);
    fetchTasks("In Progress", setInProgressTasks);
    fetchTasks("Done", setDoneTasks);

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [user, axiosSecure]);

  // Delete a task
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
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task._id !== taskId)
            );
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error!", "Failed to delete the task.", "error");
        }
      }
    });
  };

  // Handle drag-and-drop end event
  const handleOnDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    // Map to get current tasks and their setters
    const categories = {
      toDoTasks: { tasks: toDoTasks, setTasks: setToDoTasks },
      inProgressTasks: { tasks: inProgressTasks, setTasks: setInProgressTasks },
      doneTasks: { tasks: doneTasks, setTasks: setDoneTasks },
    };

    // Reordering within the same category
    if (sourceCategory === destinationCategory) {
      const updatedTasks = Array.from(categories[sourceCategory].tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
      categories[sourceCategory].setTasks(updatedTasks);

      try {
        const response = await axiosSecure.patch(`/update/task/${draggableId}`, {
          category: categoryMapping[sourceCategory],
          title: movedTask.title,
          description: movedTask.description,
          taskType: movedTask.taskType,
          estimatedTime: movedTask.estimatedTime,
          position: destination.index, // Update the position for ordering
        });
        if (response.data.success) {
          socketRef.current.emit("taskChanged", {
            operationType: "update",
            task: movedTask,
          });
        } else {
          Swal.fire("Error!", "Failed to update task order.", "error");
        }
      } catch (error) {
        console.error("Error reordering task:", error);
        Swal.fire("Error!", "Failed to update task order.", "error");
      }
    }
    // Moving between categories
    else {
      const sourceTasks = Array.from(categories[sourceCategory].tasks);
      const destinationTasks = Array.from(categories[destinationCategory].tasks);
      const movedTask = sourceTasks.splice(source.index, 1)[0];
      movedTask.category = categoryMapping[destinationCategory];
      destinationTasks.splice(destination.index, 0, movedTask);

      // Update local states for both categories
      categories[sourceCategory].setTasks(sourceTasks);
      categories[destinationCategory].setTasks(destinationTasks);

      try {
        const response = await axiosSecure.patch(`/update/task/${draggableId}`, {
          category: categoryMapping[destinationCategory],
          title: movedTask.title,
          description: movedTask.description,
          taskType: movedTask.taskType,
          estimatedTime: movedTask.estimatedTime,
        });
        if (response.data.success) {
          socketRef.current.emit("taskChanged", {
            operationType: "update",
            task: movedTask,
          });
        } else {
          Swal.fire("Error!", "Failed to update task category.", "error");
        }
      } catch (error) {
        console.error("Error moving task:", error);
        Swal.fire("Error!", "Failed to update task category.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Tasks</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
          <TaskSection
            id="toDoTasks"
            title="To-Do"
            tasks={toDoTasks}
            bgColor="bg-red-100"
            setTasks={setToDoTasks}
            handleDeleteTask={handleDeleteTask}
          />
          <TaskSection
            id="inProgressTasks"
            title="In Progress"
            tasks={inProgressTasks}
            bgColor="bg-blue-100"
            setTasks={setInProgressTasks}
            handleDeleteTask={handleDeleteTask}
          />
          <TaskSection
            id="doneTasks"
            title="Done"
            tasks={doneTasks}
            bgColor="bg-green-100"
            setTasks={setDoneTasks}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

const TaskSection = ({ title, tasks, bgColor, setTasks, handleDeleteTask, id }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`${bgColor} p-4 rounded-lg shadow-lg`}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white p-4 rounded-lg mb-3 shadow-lg border-l-4 border-gray-400"
                >
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Type: {task.taskType}</span>
                    <span>Time: {task.estimatedTime} hrs</span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task._id, title, setTasks)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white py-1 px-3 mr-3 rounded text-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/task/update/${task._id}`}
                    className="mt-3 inline-block bg-blue-500 text-white py-1 px-3 rounded text-sm"
                  >
                    Update Task
                  </Link>
                </div>
              )}
            </Draggable>
          ))
        ) : (
          <p>No tasks available</p>
        )}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default AllTasks;
