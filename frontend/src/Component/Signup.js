import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onSignup }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '', confirmPassword: '' };

    // Username validation
    if (!userData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Password validation
    if (!userData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    // Confirm password validation
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const jsonData = {
        username: userData.username,
        // You may want to hash the password before storing it in a real application
        password: userData.password,
      };

      // Log the JSON data to the console (you can replace this with your own logic)
      console.log('Signup Data:', jsonData);

      // Clear the form fields
      setUserData({
        username: '',
        password: '',
        confirmPassword: '',
      });

      // Execute the onSignup callback if provided
      if (onSignup) {
        onSignup(jsonData);
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <span style={{ color: 'red' }}>{errors.username}</span>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <span style={{ color: 'red' }}>{errors.password}</span>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
