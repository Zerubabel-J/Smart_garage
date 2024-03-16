import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
// Import the AddEmployeeForm component

function AddEmployee(props) {
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
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
