import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    email: '',
    phone_number: '',
    department: '',
    date_of_joining: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const departments = ['HR', 'Engineering', 'Marketing', 'Finance'];
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    // Check if phone number is valid (10 digits)
    const isPhoneValid = /^[0-9]{10}$/.test(formData.phone_number.replace(/[^0-9]/g, ''));
    if (!isPhoneValid) {
        setError('Phone number must be 10 digits.');
        return false;
    }

    // Ensure date follows "YYYY-MM-DD" format
    const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(formData.date_of_joining);
    if (!isDateValid) {
        setError('Please enter a valid date for "Date of Joining" in YYYY-MM-DD format.');
        return false;
    }

    // Check required fields
    const requiredFields = ['name', 'employee_id', 'email', 'phone_number', 'department', 'date_of_joining', 'role'];
    for (const field of requiredFields) {
        if (!formData[field]) {
            setError(`The field "${field.replace('_', ' ')}" is required.`);
            return false;
        }
    }

    return true;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form inputs
  if (!validateForm()) {
    return;
  }

  console.log('Form Data:', formData);  // Log the data before sending it to the server

  try {
    const response = await axios.post('http://localhost:5001/employees', formData);
    setSuccess(response.data.message || 'Employee added successfully!');
    setError('');
    setFormData({
        name: '',
        employee_id: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: '',
    });
  } catch (err) {
    console.error('Error Details:', err.response?.data || err.message);
    // Check for specific error responses from the backend
    if (err.response?.data?.error) {
      setError(err.response.data.error);
    } else {
      setError('Something went wrong. Please try again.');
    }
  }
};
  const handleReset = () => {
    setFormData({
      name: '',
      employee_id: '',
      email: '',
      phone_number: '',
      department: '',
      date_of_joining: '',
      role: '',
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="form-container">
      <h2>Employee Management Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
          maxLength="10"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          maxLength="10"
          required
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date_of_joining"
          placeholder="Date of Joining"
          value={formData.date_of_joining}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default AddEmployee;
