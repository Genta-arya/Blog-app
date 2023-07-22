import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    navigate("/Login-admin");
  };

  useEffect(() => {
    if (isLoggedIn !== "true") {
      navigate("/Login-admin");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn !== "true") {
    return null;
  }

  const handleGoToBlog = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Dynamic Dashboard
          </h1>
          <div>
            <p className="text-gray-600">
              Welcome, <span className="font-semibold">{username}</span> (
              {email})!
            </p>
            <button
              className="text-gray-600 mt-2 py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6 px-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Widget 1</h2>
            <p>Content for Widget 1</p>
          </div>
          <div className="bg-white p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Widget 2</h2>
            <p>Content for Widget 2</p>
          </div>
          <div className="bg-white p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Widget 3</h2>
            <p>Content for Widget 3</p>
          </div>
          <div className="bg-white p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Widget 4</h2>
            <p>Content for Widget 4</p>
          </div>
        </div>
        <div className="mt-8">
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            onClick={handleGoToBlog}
          >
            Go to Blog
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
