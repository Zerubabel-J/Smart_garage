import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the Login component
import LoginForm from "../../components/LoginForm/LoginForm";
import CustomersList from "../../components/Admin/CustomersList/CustomersList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditVehicleForm from "../../components/Admin/EditVehicle/EditVehicleForm";
const EditVihicle = () => {
  // Destructure the auth hook
  // console.log(useAuth());
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <EditVehicleForm />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <h1>You are not authorized to access this page</h1>
            </div>
          </div>
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
};

export default EditVihicle;
