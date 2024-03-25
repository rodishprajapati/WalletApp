import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      navigate("/login");
    }
  });
  return (
    <>
      <> welcome to dashBoard </>
    </>
  );
};
export default DashBoard;
