// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
// import { MdEdit } from "react-icons/md";
// import { FaHandPointUp } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { format } from "date-fns";
// import customerService from "../../../../services/customer.service";
// import Loader from "../../Loader/Loader";

// const CustomersList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { employee } = useAuth();
//   let token = null;
//   if (employee) {
//     token = employee.data.customer_token;
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allCustomers = await customerService.getAllCustomer();
//         console.log("Got it, man", allCustomers.data[0].customer_id);

//         const data = allCustomers.data;
//         console.log("Customers List", data);
//         setCustomers(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//         setApiError(true);
//         setApiErrorMessage("Please try again later");
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {apiError ? (
//         <section className="contact-section">
//           <div className="auto-container">
//             <div className="contact-title">
//               <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <>
//           <section className="contact-section">
//             <div className="auto-container">
//               <div className="contact-title">
//                 <h2>Customers</h2>
//               </div>
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>First Name</th>
//                     <th>Last Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Added date</th>
//                     <th>Active</th>
//                     <th>Edit / View</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {customers.map((customer) => (
//                     <tr key={customer.customer_id}>
//                       <td>{customer.customer_id}</td>
//                       <td>{customer.customer_first_name}</td>
//                       <td>{customer.customer_last_name}</td>
//                       <td>{customer.customer_email}</td>
//                       <td>{customer.customer_phone_number}</td>
//                       <td>
//                         {format(
//                           new Date(customer.customer_added_date),
//                           "MM - dd - yyyy | kk:mm"
//                         )}
//                       </td>
//                       <td>{customer.active_customer_status ? "Yes" : "No"}</td>
//                       <td>
//                         <div className="edit-delete-icons">
//                           <Link
//                             style={{ color: "blue" }}
//                             to={`/admin/customer/edit/${customer.customer_id}`}
//                           >
//                             <MdEdit />
//                           </Link>
//                           <Link
//                             style={{ color: "blue" }}
//                             to={`/admin/customer/get/${customer.customer_id}`}
//                           >
//                             <FaHandPointUp />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default CustomersList;

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import customerService from "../../../../services/customer.service";
import Loader from "../../Loader/Loader";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.data.customer_token;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCustomers = await customerService.getAllCustomer();
        const data = allCustomers.data;
        setCustomers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setApiError(true);
        setApiErrorMessage("Please try again later");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? ( // Check if loading, show loader if true
        <Loader />
      ) : apiError ? ( // If not loading, check for API error
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added date</th>
                  <th>Active</th>
                  <th>Edit / View</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      {format(
                        new Date(customer.customer_added_date),
                        "MM - dd - yyyy | kk:mm"
                      )}
                    </td>
                    <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                    <td>
                      <div className="edit-delete-icons">
                        <Link
                          style={{ color: "blue" }}
                          to={`/admin/customer/edit/${customer.customer_id}`}
                        >
                          <MdEdit />
                        </Link>
                        <Link
                          style={{ color: "blue" }}
                          to={`/admin/customer/get/${customer.customer_id}`}
                        >
                          <FaHandPointUp />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomersList;
