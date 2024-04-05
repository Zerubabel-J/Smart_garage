// Import react
import React from "react";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";
// Import the page components
import Home from "./markup/pages/Home";
import About from "./markup/pages/About";
import Service from "./markup/pages/Services";
import Contact from "./markup/pages/Contact";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
// Import the Orders and Customers components
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";
// Import the Employees component
import Employees from "./markup/pages/admin/Employees";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file
import "./assets/styles/custom.css";

// Import the Header component
import Header from "./markup/components/Header/Header";
// Import the Footer component
import Footer from "./markup/components/Footer/Footer";

// Import the PrivateAuthRoute component

import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import EditEmployee from "./markup/pages/admin/EditEmployee";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import CustomerInfo from "./markup/pages/admin/CustomerInfo";
import CustomerProfile from "./markup/components/Admin/CustomerProfile/CustomerProfile";
import CreateOrder from "./markup/pages/admin/CreateOrder";
import CustomerVihicleInfo from "./markup/pages/admin/CustomerVihicleInfo";
import Customer_vehicle_service_info from "./markup/pages/admin/Customer_vehicle_service_info";
import OrderDetails from "./markup/pages/admin/OrderDetails";
import OrderUpdates from "./markup/pages/admin/OrderUpdates";
import AdminDashboard from "./markup/pages/admin/AdminDashBoard";

import Services from "./markup/pages/admin/Services";
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
        {/* // Add the Orders Route  */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Customers Route  */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
        <Route path="/admin/employee/edit/:id" element={<EditEmployee />} />
        <Route path="/admin/add-customer" element={<AddCustomer />} />
        <Route path="/admin/customer/edit/:id" element={<EditCustomer />} />
        <Route
          path="/admin/vehicle/edit/:vehicle_id"
          element={<EditVihicle />}
        />
        <Route path="/admin/customer-profile" element={<CustomerInfo />} />
        <Route path="/admin/customer/get/:id" element={<CustomerInfo />} />
        <Route path="/admin/add-orders" element={<CreateOrder />} />
        <Route
          path="/admin/customer-vehicle/get/:id"
          element={<CustomerVihicleInfo />}
        />
        <Route
          path="/admin/customer-vehicle-service/get/:id/:vehicle_id"
          element={<Customer_vehicle_service_info />}
        />

        <Route
          path="/admin/order-detail/:order_id/:order_status"
          element={<OrderDetails />}
        />
        <Route
          path="/admin/order-update/:order_id/:order_status"
          element={<OrderUpdates />}
        />

        {/* <Route path="/admin/services" element={<Services />} /> */}
        {/* <Route path="/admin/customers" element={<Customers/>} /> */}
        {/*         
        <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          Customers (/admin/customers) - managers and admins
          Orders (/admin/orders) - Can be accessed by all employees
          Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

// // Import react
// import React from "react";
// // Import the Routes and Route components from react-router
// import { Routes, Route } from "react-router";
// // Import the page components
// import Home from "./markup/pages/Home";
// import Login from "./markup/pages/Login";
// import AddEmployee from "./markup/pages/admin/AddEmployee";

// // Import the css files
// import "./assets/template_assets/css/bootstrap.css";
// import "./assets/template_assets/css/style.css";
// import "./assets/template_assets/css/responsive.css";
// import "./assets/template_assets/css/color.css";

// // Import the custom css file
// import "./assets/styles/custom.css";
// import Footer from "./markup/components/Footer/Footer";
// import Header from "./markup/components/Header/Header";

// function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin/add-employee" element={<AddEmployee />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;
