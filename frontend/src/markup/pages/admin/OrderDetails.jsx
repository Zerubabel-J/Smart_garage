import React from "react";

// import the auth hook context
import { useAuth } from "../../../Contexts/AuthContext";



// import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

import OrderDetail from "../../components/Admin/OrderDetail/OrderDetail";

function OrderDetails() {
  const { isLogged, isAdmin } = useAuth();

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="col-md-12">
          <div
            className="col-md-9 mx-auto  ">
            <OrderDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
