import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./InsidePages/dashBoard";
import SignUp from "./frontpage/SignUp";
import Login from "./frontpage/login";
import "./global.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
