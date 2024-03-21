import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the Login component
import LoginForm from "../../components/LoginForm/LoginForm";
import EmployeesList from "../../components/Admin/EmployeesList/EmployeesList";

function Employees() {
  // Destructure the auth hook
  console.log(useAuth());
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <EmployeesList />
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to access this page</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default Employees;
