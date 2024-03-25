 // EditForm.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // You may need to install axios if not already installed

function EditForm() {
  const { id } = useParams(); // Extracting the employee ID from the URL parameter
  const [employeeData, setEmployeeData] = useState({
    employee_email: '',
    employee_first_name: '',
    employee_last_name: '',
    employee_phone: '',
    company_role_id: '',
  });

  useEffect(() => {
    // Fetch employee data based on the ID when component mounts
    fetchEmployeeData();
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`/api/employee/${id}`);
      setEmployeeData(response.data); // Assuming the backend returns employee data in the correct format
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/employee/${id}`, employeeData);
      // Redirect or show success message upon successful edit
      console.log('Employee edited successfully');
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="employee_email" value={employeeData.employee_email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="employee_first_name" value={employeeData.employee_first_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="employee_last_name" value={employeeData.employee_last_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="employee_phone" value={employeeData.employee_phone} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Company Role ID:
          <input type="text" name="company_role_id" value={employeeData.company_role_id} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditForm;
