import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerProfile from "../../components/Admin/CustomerProfile/CustomerProfile";
import { useParams } from "react-router-dom";
// Import the AddEmployeeForm component

function CustomerInfo() {
  const { id } = useParams();
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
            <CustomerProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
