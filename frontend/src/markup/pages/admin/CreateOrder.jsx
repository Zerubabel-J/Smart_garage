import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddOrder from "../../components/Admin/AddOrder/AddOrder";
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the AddEmployeeForm component

function CreateOrder(props) {
  // Destructure the auth hook
  const { isLogged, isAdmin } = useAuth();
  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                {/* <AdminMenu /> */}
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                {/* <AddEmployeeForm /> */}
                <AddOrder />
              </div>
            </div>
          </div>
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

export default CreateOrder;
