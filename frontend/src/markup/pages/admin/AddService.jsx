import React from 'react';
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the AddCustomerForm component 
import AddServiceForm from '../../components/Admin/AddServiceForm/AddServiceForm';
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import ServiceList from '../../components/Admin/ServiceList/ServiceList';

function AddService(props) {
 // Destructure the auth hook 
 const { isLogged, isAdmin } = useAuth();
 if (isLogged) {

   if (isAdmin) {
     return (
       <div>
         <div className="container-fluid admin-pages">
           <div className="row">
             <div className="col-md-3 admin-left-side">
               <AdminMenu />
             </div>
             <div className="col-md-9 admin-right-side">
             <ServiceList/>
             <AddServiceForm />
             </div>
            
           </div>
         </div>
       </div>
     );
   } else {
     return (
       <div>
         <h1>You are not authorized to access this page</h1>
       </div>
     );
   }
 
 }
}

export default AddService;


