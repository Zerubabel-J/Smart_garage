import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddOrder from "../../components/Admin/AddOrder/AddOrder";
// Import the AddEmployeeForm component

function CreateOrder(props) {
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
}

export default CreateOrder;
