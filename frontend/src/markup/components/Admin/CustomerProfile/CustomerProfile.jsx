import React, { useState, useEffect } from "react";
// import customer service
import customerService from "../../../../services/customer.service";
// import userParams, useNavigate, Link and useParams from react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
// import the css file
import "./CustomerProfile.css";
// const CustomerProfile = (props) => {
//   const [customer, setCustomer] = useState([]);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log("Customer ID", id);
//   //   const { id } = props.id;
//   useEffect(() => {
//     console.log("Use Effecttt", id);
//     const fetchCustomerData = async () => {
//       // Fetch employee data based on id
//       try {
//         const data = await customerService.getCustomerById(id);
//         console.log(data);
//         setCustomer(data);
//         console.log(customer);
//         console.log(customer.data);
//         console.log(customer.data[0].customer_first_name);
//       } catch (error) {
//         console.error("Error fetching employee data:", error.message);
//       }
//     };

//     fetchCustomerData();
//   }, []);
//   return (
//     <>
//       <div className="container-fluid customer-profile">
//         <div className="customer-info ">
//           <div className="info-icon ">Info</div>
//           <div className="customer-detail ">
//             <h3>Customer: {customer.data[0].customer_first_name}</h3>

//             <p>
//               <b>Email:{customer.data[0].customer_email}</b>
//             </p>
//             <p>
//               <b>Phone Number:{customer.data[0].customer_phone_number}</b>
//             </p>
//             <p>
//               <b>Active Customer:{customer.data[0].active_customer_status}</b>
//             </p>
//             <p>
//               <b>Edit customer info:</b> edit
//             </p>
//           </div>
//         </div>

//         <div className="customer-vehicle customer-info">
//           <div className="cars-icon info-icon">Cars</div>
//           <div className="vehicle-lists customer-detail">
//             <h3>Vehicles of </h3>
//             <p>List of vehicles</p>
//             <button>Add Vehicle</button>
//           </div>
//         </div>
//         <div className="customer-order customer-info">
//           <div className="orders-icon info-icon">Orders</div>
//           <div className="vehicle-lists customer-detail">
//             <h3>Orders of </h3>
//             <p>List of orders</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerProfile;

// Import statements...

const CustomerProfile = () => {
  const [customer, setCustomer] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await customerService.getCustomerById(id);
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };

    fetchCustomerData();
  }, [id]);

  return (
    <>
      {apiError ? (
        <div>Error: {apiErrorMessage}</div>
      ) : (
        <div className="container-fluid customer-profile">
          <div className="customer-info ">
            <div className="info-icon ">Info</div>
            <div className="customer-detail ">
              <h3>Customer: {customer?.data?.[0]?.customer_first_name}</h3>
              <p>
                <b>Email: {customer?.data?.[0]?.customer_email}</b>
              </p>
              <p>
                <b>
                  Phone Number: {customer?.data?.[0]?.customer_phone_number}
                </b>
              </p>
              <p>
                <b>
                  Active Customer: {customer?.data?.[0]?.active_customer_status}
                </b>
              </p>
              <p>
                <b>Edit customer info:</b> edit{" "}
                <Link
                  style={{ color: "blue" }}
                  to={`/admin/customer/edit/${customer.customer_id}`}
                >
                  <MdEdit />
                </Link>
              </p>
            </div>
          </div>

          <div className="customer-vehicle customer-info">
            <div className="cars-icon info-icon">Cars</div>
            <div className="vehicle-lists customer-detail">
              <h3>Vehicles of {customer?.data?.[0]?.customer_first_name}</h3>
              <p>List of vehicles</p>
              <button>Add Vehicle</button>
            </div>
          </div>
          <div className="customer-order customer-info">
            <div className="orders-icon info-icon">Orders</div>
            <div className="vehicle-lists customer-detail">
              <h3>Orders of {customer?.data?.[0]?.customer_first_name} </h3>
              <p>List of orders</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerProfile;
