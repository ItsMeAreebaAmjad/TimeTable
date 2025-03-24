import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Enter username';
    }

    if (!password) {
      newErrors.password = 'Enter password';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with login logic
      console.log('Logging in...', { username, password });
      navigate('/mainScreen'); // Navigate to MainScreen
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <div className="flex flex-col items-center mb-8">
          <img src="../images/Logo.png" alt="Logo" className="w-32 h-32 mb-4" />
          <h1 className="text-3xl font-bold">Time Table Generator</h1>
          <h2 className="text-2xl mt-2">Login</h2>
        </div>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <div className="flex justify-end">
            <Link to="/forgotPassword" className="text-blue-900 hover:underline">Forgot Password?</Link>
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
        <div className="text-center mt-4">
          <p>
            Don't have an account? <Link to="/signup" className="text-blue-900 hover:underline">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
