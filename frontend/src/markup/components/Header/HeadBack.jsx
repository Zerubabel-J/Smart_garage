// import React, { useContext } from "react";
// import logo from "../../../assets/images/logo.png";
// //import custom hook
// import { useAuth } from "../../../Contexts/AuthContext";
// // import the  AuthContext

// const Header = () => {
//   const { isLogged, setIsLogged, setIsAdmin, isAdmin, employee } = useAuth();
//   console.log(useAuth());
//   return (
//     <>
//       <div>
//         <header class="main-header header-style-one">
//           <div class="header-top">
//             <div class="auto-container">
//               <div class="inner-container">
//                 <div class="left-column">
//                   <div class="text">Enjoy the Beso while we fix your car</div>
//                   <div class="office-hour">
//                     Monday - Saturday 7:00AM - 6:00PM
//                   </div>
//                 </div>
//                 <div class="right-column">
//                   {isLogged ? (
//                     <div className="link-btn">
//                       <div className="phone-number">
//                         <strong>Welcome {employee?.employee_first_name}</strong>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="phone-number">
//                       Schedule Appointment: <strong>1800 456 7890 </strong>{" "}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="header-upper">
//             <div class="auto-container">
//               <div class="inner-container">
//                 <div class="logo-box">
//                   <div class="logo">
//                     <a href="/">
//                       <img src={logo} alt="" />
//                     </a>
//                   </div>
//                 </div>
//                 <div class="right-column">
//                   <div class="nav-outer">
//                     <div class="mobile-nav-toggler">
//                       <img src="assets/images/icons/icon-bar.png" alt="" />
//                     </div>
//                     <nav class="main-menu navbar-expand-md navbar-light">
//                       <div
//                         class="collapse navbar-collapse show clearfix"
//                         id="navbarSupportedContent"
//                       >
//                         <ul class="navigation">
//                           <li class="dropdown">
//                             <a href="/">Home</a>
//                           </li>
//                           <li class="dropdown">
//                             <a href="/about">About Us</a>
//                           </li>
//                           <li class="dropdown">
//                             <a href="/services">Services</a>
//                           </li>
//                           <li>
//                             <a href="/contact">Contact Us</a>
//                           </li>
//                         </ul>
//                       </div>
//                     </nav>
//                   </div>
//                   <div class="search-btn"></div>
//                   <div class="link-btn">
//                     <a href="/login" class="theme-btn btn-style-one">
//                       Login
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="sticky-header">
//             <div class="header-upper">
//               <div class="auto-container">
//                 <div class="inner-container">
//                   <div class="logo-box">
//                     <div class="logo">
//                       <a href="/">
//                         <img src={logo} alt="" />
//                       </a>
//                     </div>
//                   </div>
//                   <div class="right-column">
//                     <div class="nav-outer">
//                       <div class="mobile-nav-toggler">
//                         <img src="assets/images/icons/icon-bar.png" alt="" />
//                       </div>

//                       <nav class="main-menu navbar-expand-md navbar-light"></nav>
//                     </div>
//                     <div class="search-btn"></div>
//                     <div class="link-btn">
//                       <a href="/login" class="theme-btn btn-style-one">
//                         Login
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="mobile-menu">
//             <div class="menu-backdrop"></div>
//             <div class="close-btn">
//               <span class="icon flaticon-remove"></span>
//             </div>

//             <nav class="menu-box">
//               <div class="nav-logo">
//                 <a href="index.html">
//                   <img src="assets/images/logo-two.png" alt="" title="" />
//                 </a>
//               </div>
//               <div class="menu-outer"></div>
//             </nav>
//           </div>

//           <div class="nav-overlay">
//             <div class="cursor"></div>
//             <div class="cursor-follower"></div>
//           </div>
//         </header>
//       </div>
//     </>
//   );
// };

// export default Header;
