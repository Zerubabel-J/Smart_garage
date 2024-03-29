import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddCustomerForm from "../../components/Admin/AddCustomerForm/AddCustomerForm";
// Import the AddEmployeeForm component

function AddCustomer(props) {
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
            <AddCustomerForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
