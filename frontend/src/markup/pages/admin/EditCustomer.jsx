import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditCustomerForm from "../../components/Admin/EditCustomer/EditCustomerForm";
const EditCustomer = () => {
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
            <EditCustomerForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
