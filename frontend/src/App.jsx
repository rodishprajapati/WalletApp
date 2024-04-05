import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./frontpage/SignUp";
import Login from "./frontpage/login";
import "./global.css";
import Dashboard from "./InsidePages/dashBoard";

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
      element: <Dashboard />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
