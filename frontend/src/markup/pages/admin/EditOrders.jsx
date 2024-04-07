import React from "react";

// import the auth hook context
import { useAuth } from "../../../Contexts/AuthContext";


// import the login component
import LoginForm from "../../components/LoginForm/LoginForm";

// import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

import EditOrder from "../../components/Admin/EditOrder/EditOrder";

function EditOrders() {
  const { isLogged, isAdmin } = useAuth();

  // console.log(useAuth())

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EditOrder />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ padding: "100px" }}>
            You don't have the Permission to access the page you request!
          </h1>
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

export default EditOrders;
