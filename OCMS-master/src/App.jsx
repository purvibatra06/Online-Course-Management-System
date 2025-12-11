import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/LoginPage";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Courses from "./Components/Courses/Courses";
import InstructorDashboard from "./Pages/InstructorDashboard/Instructor";
import UserDashboard from "./Pages/UserDashboard/User";
import UserProfilePage from "./Pages/UserProfile/UserProfile";
import InstructorProfilePage from "./Pages/InstructorProfile/InstructorProfile";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {                                                                                                                                     
    path: "/courses",
    element: <Courses />
  },
  {
    path: "/instructor/dashboard",
    element: <InstructorDashboard />
  },
  {
    path: "/user/profile",
    element: <UserProfilePage />
  },
  {
    path: "/instructor/profile",
    element: <InstructorProfilePage />
  },
  {
    path: "/user/dashboard",
    element: <UserDashboard />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />
  }

]);
function App() {
  return <RouterProvider router={router} />;
}


export default App;
