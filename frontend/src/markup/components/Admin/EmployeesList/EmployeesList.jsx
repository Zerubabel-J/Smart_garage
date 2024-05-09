import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import employeeService from "../../../../services/employee.service";
import Loader from "../../Loader/Loader";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state as true
  let token = null;
  if (employee) {
    token = employee.data.employee_token;
  }

  const handleDelete = async (employeeId) => {
    try {
      await employeeService.deleteEmployeeById(token, employeeId);
      setEmployees(employees.filter((emp) => emp.employee_id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployees = await employeeService.getAllEmployees(token);
        if (allEmployees.status !== "success") {
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

        const data = allEmployees.data;

        if (data.length !== 0) {
          setEmployees(data);
        }
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching employees:", error);
        setApiError(true);
        setApiErrorMessage("Please try again later");
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? ( // Check if loading, show loader if true
        <Loader />
      ) : apiError ? ( // If not loading, check for API error
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
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
                          style={{ color: "blue" }}
                          to={`/admin/employee/edit/${employee.employee_id}`}
                        >
                          <MdEdit />
                        </Link>
                        <Link
                          style={{ color: "red" }}
                          onClick={() => handleDelete(employee.employee_id)}
                        >
                          <MdDelete />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeesList;
