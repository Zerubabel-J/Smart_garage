// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
//import link
import { Link } from "react-router-dom";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the getAllEmployees function
import employeeService from "../../../../services/employee.service";
// Create the EmployeesList component
const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  // console.log(employee);
  let token = null; // To store the token
  if (employee) {
    token = employee.data.employee_token;
  }
  // Handle delete
  const handleDelete = async (employeeId) => {
    try {
      await employeeService.deleteEmployeeById(token, employeeId);
      setEmployees(employees.filter((emp) => emp.employee_id !== employeeId)); // Remove the deleted employee from the state
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployees = await employeeService.getAllEmployees(token);
        console.log("Got it, man", allEmployees.data[0].employee_id);

        if (allEmployees.status !== "success") {
          console.log("heyyyyyyy");
          console.log(allEmployees.status);
          setApiError(true);
          if (allEmployees.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (allEmployees.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
          return;
        }
        // const data = await allEmployees.json();
        const data = allEmployees.data;
        // console.log(data);
        // console.log(data.length);

        if (data.length !== 0) {
          setEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <Link
                            style={{ color: "red" }}
                            onClick={() => handleDelete(employee.employee_id)}
                          >
                            <MdDelete />
                          </Link>

                          <Link
                            style={{ color: "blue" }}
                            to={`/admin/employee/edit/${employee.employee_id}`}
                          >
                            <MdEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

// Export the EmployeesList component
export default EmployeesList;
