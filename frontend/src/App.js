import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; // Import CartProvider

import Home from './pages/Home';
import Booking from './pages/Booking';
import Category from './pages/Category';
import { About } from './pages/About';
import Gallery from './pages/Shop/Gallery';
import Cart from './pages/Shop/Cart';

import Login from './pages/Login';
import ViewUser from './pages/ViewUser';

import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Create from './pages/Admin/Create';
import AlbumUpload from './pages/Admin/AlbumUpload';
import Update from './pages/Admin/Update';
import ProductDetails from './pages/Admin/ProductDetails';
import ProductAdd from './pages/Admin/ProductAdd';

function App() {
  return (
    <BrowserRouter>
      <CartProvider> {/* Wrap the entire application with CartProvider */}
        <Routes>
          <Route path="/SayCheese_final/" element={<Home />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/About" element={<About />} />
          <Route path="/Gallery" element={<Gallery />} /> {/* Add route for Gallery */}
          <Route path="/Cart" element={<Cart />} /> {/* Add route for Cart */}

          <Route path="/Login" element={<Login />} />
          <Route path="/Category/Login" element={<Login />} />
          <Route path="/Gallery/Login" element={<Login />} />
          <Route path="/Booking/Login" element={<Login />} />
          <Route path="/About/Login" element={<Login />} />
          <Route path="/About/Login/Login" element={<Login />} />
          <Route path="/Login/Login" element={<Login />} />
          <Route path="/Login/Booking" element={<Booking />} />
         < Route path="/About/Login/Booking" element={<Booking />} />




          <Route path="/view/:email" element={<ViewUser />} />

          <Route path="/Admin" element={<Admin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/AlbumUpload" element={<AlbumUpload />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/ProductAdd" element={<ProductAdd />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
