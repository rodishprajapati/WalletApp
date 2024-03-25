import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./frontpage/login";
import SignUp from "./frontpage/SignUp";
import DashBoard from "./InsidePages/dashBoard";

const App = () => {
  const router = createBrowserRouter([
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
  return <RouterProvider router={router} />;
};
export default App;
