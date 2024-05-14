import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './products'; // Import the PRODUCTS array
import axios from 'axios';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Make a GET request to the backend route
        setProducts(response.data); // Update the state with the retrieved products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Render products */}
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.productImage} alt={`Product ${product.id}`} />
          <p>ID: {product.id}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;
