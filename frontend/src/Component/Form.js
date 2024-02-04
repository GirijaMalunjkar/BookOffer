import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = ({ formData, setFormData, onSubmit }) => {
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', email: '' };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number. Please enter a 10-digit number.';
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address. Please enter a valid email.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make a POST request using Axios
        const response = await axios.post('http://localhost:5000/api/User/', formData);
        
        // Check for a successful response (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          console.log('Data submitted successfully:', response.data);
          // Call the onSubmit function if needed
          onSubmit();
        } else {
          // Handle unexpected status codes
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <div className='ani'>
        <h1>Book Donation</h1>
      </div>
      <form className='aaa' onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span style={{ color: 'red' }}>{errors.name}</span>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <span style={{ color: 'red' }}>{errors.phone}</span>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span style={{ color: 'red' }}>{errors.email}</span>
        </div>
        <button className='plus' type="submit">+</button>
      </form>
    </div>
  );
};

export default Form;
