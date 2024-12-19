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

  const handleSubmit = async (e) => {
    e.preventDefault();
   

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
      console.error('Error Details:', err.response || err.message);
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
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
