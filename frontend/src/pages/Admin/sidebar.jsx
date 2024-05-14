import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'; // Import style.css for Sidebar.jsx
import './responsive.css'; 

// NavigationOption component with custom styles
const NavigationOption = ({ imgSrc, altText, label, to }) => {
  return (
    <NavLink to={to} className="nav-option"  style={navLinkStyle}>
      <img src={imgSrc} className="nav-img" alt={altText} style={{ marginRight: '10px' }} />
      <span style={navLabelStyle}>{label}</span>
    </NavLink>
  );
};

// Custom styles
const navLinkStyle = {
  textDecoration: 'none',
  color: '#000', // Change color to match your design
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
};

const navLabelStyle = {
  fontWeight: 'bold',
};

// NavigationContainer component
const NavigationContainer = () => {
  return (
    <div className="navcontainer">

      <nav className="nav">

        <div className="nav-upper-options">

          <NavigationOption
            to="/Dashboard"
            
            
            label="Bookings"
          />
          <NavigationOption
            to="/Users"
            
            
            label="Users"
          />
          <NavigationOption
            to="/AlbumUpload"
            
            
            label="Album Upload"
          />
          
          <NavigationOption
            to="/ProductDetails"
            
            
            label="Product Details"
          />
           
          <NavigationOption
            to="/"
            
            
            label="Logout"
          />
        </div>
      </nav>
    </div>
  );
};

// Sidebar component
const Sidebar = () => {
  return (
    <div className="main-container">
      <NavigationContainer />
    </div>
  );
};

export default Sidebar;
