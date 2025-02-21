import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home";
import Mainlayout from "../Mainlayout";
import Login from "../Authentication/Login";
import Singup from '../Authentication/Signup';
import Dashbroad from "../Pages/dashbroad/Dashbroad";
import Profile from "../Pages/dashbroad/Profile";
import AddTask from "../Pages/dashbroad/Addtask";
import AllTasks from "../Pages/dashbroad/Alltask";
import Update from "../Pages/dashbroad/Update";







const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Singup></Singup>
        },
        {
          path:'/dashboard',
          element:<Dashbroad></Dashbroad>,
          children:[
            {
              path:'profile',
              element:<Profile></Profile>
            },
            {
              path:'add',
              element:<AddTask></AddTask>
            },
            {
              path:'Alltasks',
              element:<AllTasks></AllTasks>
            },
            {
              path:'task/update/:id',
              element:<Update></Update>

            }
          ]
        },
]}
       
  
   
  ]);




export default router;