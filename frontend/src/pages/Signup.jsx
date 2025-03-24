import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = 'Enter First Name';
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = 'Enter only characters';
    }

    if (!lastName) {
      newErrors.lastName = 'Enter Last Name';
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = 'Enter only character';
    }

    if (!email) {
      newErrors.email = 'Enter Email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid Email';
    }

    if (!password) {
      newErrors.password = 'Enter Password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with signup logic
      console.log('Signing up...', { firstName, lastName, email, password });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full w-1/2">
        <div className="flex flex-col items-center mb-8">
          <img src="../images/Logo.png" alt="Logo" className="w-32 h-32 mb-4" />
          <h1 className="text-3xl font-bold">Time Table Generator</h1>
          <h2 className="text-2xl mt-2">Create Account</h2>
        </div>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
          <div className="flex flex-col space-y-4 mt-4">
          <label className="flex items-center justify-center w-full px-4 py-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <FaCamera className="mr-2" />
            <span>Upload Image</span>
            <input
              type="file"
              className="hidden"
            />
          </label>
        </div>
          <button
            onClick={handleSignup}
            className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-4">
          <p>
            Already have an account? <Link to="/login" className="text-blue-900 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
