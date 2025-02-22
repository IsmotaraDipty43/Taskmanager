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
import Errorelement from "../Component/Errorelement";
import Private from '../Router/Private'






const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      errorElement:<Errorelement></Errorelement>,
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
          element:<Private><Dashbroad></Dashbroad></Private>,
          children:[
            {
              path:'profile',
              element:<Private><Profile></Profile></Private>
            },
            {
              path:'add',
              element:<Private><AddTask></AddTask></Private>
            },
            {
              path:'Alltasks',
              element:<Private><AllTasks></AllTasks></Private>
            },
            {
              path:'task/update/:id',
              element:<Private><Update></Update></Private>

            }
          ]
        },
]}
       
  
   
  ]);




export default router;