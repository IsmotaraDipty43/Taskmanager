# Task Manager Application

## Project Description

This Task Manager Application allows users to manage their tasks seamlessly with a clean, minimalistic, and fully responsive UI. Users can:

- **Add, edit, and delete tasks:** Create, update, and remove tasks with details like title, description, task type, and estimated time.
- **Reorder tasks:** Drag and drop tasks to reorder them within a category.
- **Move tasks between categories:** Easily drag tasks from one category to another (To-Do, In Progress, Done).
- **Real-time synchronization:** All changes are instantly saved to the database and synchronized across connected clients using Socket.io and MongoDB change streams.

This project tests your ability to handle frontend interactivity, backend data management, and real-time communication within a structured design system.

## Live Links

- **Live Demo:** [Live Link](https://jobtask-19c05.web.app/)


## Features

- **Task CRUD Operations:** Users can add, edit, and delete tasks.
- **Drag-and-Drop Interface:** Reorder tasks within a category and move tasks between categories.
- **Real-time Data Persistence:** Changes are saved instantly to the database.
- **Responsive Design:** Fully functional on both desktop and mobile devices.
- **Clean and Minimalistic UI:** Focus on user experience with a modern design.

## Dependencies

### Backend Dependencies

- Node.js
- Express
- MongoDB 
- Socket.io
- JSON Web Tokens (JWT)
- CORS


### Frontend Dependencies

- React
- React Router DOM
- Axios
- Socket.io-client
- @hello-pangea/dnd (Drag-and-Drop)
- Tailwind CSS
- Firebase
- SweetAlert2

## Installation Steps

### Clone the Repository

1. git clone https://github.com/IsmotaraDipty43/Taskmanager

###  Frontend Setup
2. cd taskmanagment-project

### Firebase Setup 
3. Setup the .env file with firebase credintials

###  Install frontend dependencies:
4. npm install

### npm start
5. npm run dev