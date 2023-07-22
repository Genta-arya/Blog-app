import React, { useState } from "react";
import { login } from "../../Service/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NULogo from "../../../Asset/Logo-NU-Green.jpg";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessageEmail("Email tidak sesuai");
      return;
    }

    try {
      const response = await login(email, password);
    

      if (response.status === 200) {
        const user = response.data[0]; // Akses properti data dari objek response
        console.log(user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", user.email); // Menggunakan properti user.email
        localStorage.setItem("id", user.id_user); // Menggunakan properti user.id_user
        localStorage.setItem("username", user.username); // Menggunakan properti user.username
        navigate("/dashboard");
      }
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid password");
      } 
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <img src={NULogo} alt="NU Logo" className="h-16 w-16 mr-2" />
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 ${
              email.length > 0 && !validateEmail(email) ? "border-red-500" : ""
            }`}
          />
          {email.length > 0 && !validateEmail(email) && (
            <p className="text-red-500 mt-1">Email tidak sesuai.</p>
          )}
        </div>
  
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <div className="flex border border-gray-300 rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="border-none rounded-md px-4 py-2 w-full focus:outline-none"
            />
            <button
              type="button"
              className="text-gray-500 px-2"
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <button
          type="submit"
          className={`${
            email.length === 0 || !validateEmail(email)
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md px-4 py-2 w-full`}
          disabled={email.length === 0 || !validateEmail(email)}
        >
          Login
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default LoginAdmin;
