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
  const [loading, setLoading] = useState(false);

  const departments = ['HR', 'Engineering', 'Marketing', 'Finance'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone_number' && isNaN(value)) {
      setError('Phone number must be numeric.');
      return;
    }

    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employees`,
        formData
      );
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
      if (err.response?.status === 400) {
        setError(err.response.data.error || 'Invalid input.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
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
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="employee_id">Employee ID</label>
        <input
          id="employee_id"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
          maxLength="10"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone_number">Phone Number</label>
        <input
          id="phone_number"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          maxLength="10"
          required
        />

        <label htmlFor="department">Department</label>
        <select
          id="department"
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

        <label htmlFor="date_of_joining">Date of Joining</label>
        <input
          id="date_of_joining"
          type="date"
          name="date_of_joining"
          placeholder="Date of Joining"
          value={formData.date_of_joining}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <input
          id="role"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
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
