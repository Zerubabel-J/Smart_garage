import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import { useParams } from "react-router-dom";
import CustomerVehicle from "../../components/Admin/AddOrder/CustomerVehicle/CustomerVehicle";
// Import the AddEmployeeForm component

function CustomerVihicleInfo() {
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
            <CustomerVehicle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerVihicleInfo;
