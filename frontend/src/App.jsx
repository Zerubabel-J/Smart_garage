// Import react
import React from "react";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";
// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
// Import the custom css file
import "./assets/styles/custom.css";

// Import root level pages
import Home from "./markup/pages/Home";
import About from "./markup/pages/About";
import Service from "./markup/pages/Services";
import Contact from "./markup/pages/Contact";
import Login from "./markup/pages/Login";
import Unauthorized from "./markup/pages/Unauthorized";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";

// Import the PrivateAuthRoute components
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
// Import Admin levelpages
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";
import Employees from "./markup/pages/admin/Employees";
import EditEmployee from "./markup/pages/admin/EditEmployee";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import CustomerInfo from "./markup/pages/admin/CustomerInfo";
import CreateOrder from "./markup/pages/admin/CreateOrder";
import CustomerVihicleInfo from "./markup/pages/admin/CustomerVihicleInfo";
import Customer_vehicle_service_info from "./markup/pages/admin/Customer_vehicle_service_info";
import OrderUpdates from "./markup/pages/admin/OrderUpdates";
import AdminDashboard from "./markup/pages/admin/AdminDashBoard";
import EditVihicle from "./markup/pages/admin/EditVihicle";
import Services from "./markup/pages/admin/Services";
import EditServices from "./markup/pages/admin/EditService";
import EditOrders from "./markup/pages/admin/EditOrders";
import CustomerDetail from "./markup/pages/CustomerDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employee/edit/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/edit/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Services />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/vehicle/edit/:vehicle_id"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <EditVihicle />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-profile"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerInfo />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/get/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerInfo />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CreateOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-vehicle/get/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerVihicleInfo />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-vehicle-service/get/:id/:vehicle_id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customer_vehicle_service_info />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="customer/orderdetails/:order_hash"
          element={<CustomerDetail />}
        />

        <Route
          path="/admin/order-update/:order_id/:order_hash"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <OrderUpdates />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services/service-update/:service_id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditServices />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
