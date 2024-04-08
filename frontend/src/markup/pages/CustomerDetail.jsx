import React from "react";

// import the auth hook context
import { useAuth } from "../../Contexts/AuthContext";
import CustomerOrderDetial from "../components/CustomerOrderDetial/CustomerOrderDetial";
// import OrderDetail from "../../components/Admin/OrderDetail/OrderDetail";

function CustomerDetail() {
  const { isLogged, isAdmin } = useAuth();

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="col-md-12">
          <div className="col-md-9 mx-auto  ">
            <CustomerOrderDetial />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
