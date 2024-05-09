import React from "react";
import ServiceList from "../../components/Admin/ServiceList/ServiceList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddServiceForm from "../../components/Admin/AddServiceForm/AddServiceForm";
const Services = () => {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <ServiceList />
          <AddServiceForm />
        </div>
      </div>
    </div>
  );
};

export default Services;
