import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userDetails, setUserDetails]: any = useState({});

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8001/users/myprofile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserDetails(response.data.data);
    } catch (e) {}
  };

  // Protected route...
  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      navigate("/login");
    }
    getProfile();
  }, []);

  return (
    <>
      <div className="bg-red-400">
        Welcome {userDetails.name}
        <a
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default Dashboard;
