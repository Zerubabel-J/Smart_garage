import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import { useParams } from "react-router-dom";
import Customer_vehicle_service from "../../components/Admin/AddOrder/Customer_vehicle_service/Customer_vehicle_service";

// Import the AddEmployeeForm component

function Customer_vehicle_service_info() {
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
            <Customer_vehicle_service />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer_vehicle_service_info;
