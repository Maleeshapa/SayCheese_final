import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import NavbarCart from './NavbarCart';
import { CartContext } from '../../Context/CartContext';
import './Gallery.css';

const Gallery = () => {
    const [products, setProducts] = useState([]);
    const { addToCart, cartItems, removeFromCart } = useContext(CartContext);
   
    const [setAddedItemCount] = useState(0);


    const fetchData = useCallback(() => {
        axios.get('http://localhost:8081/product')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const updateAddedItemCount = useCallback(() => {
        const count = Object.keys(cartItems).reduce((acc, itemId) => {
            return acc + cartItems[itemId].quantity;
        }, 0);
        setAddedItemCount(count);
    }, [cartItems]);

    useEffect(() => {
        fetchData();
        updateAddedItemCount();
    }, [cartItems, fetchData, updateAddedItemCount]);

    const handleAddToCart = (product) => {
        addToCart(product);
        updateAddedItemCount();
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        updateAddedItemCount();
    };

    return (
        <div className='bgGallery'>
            <NavbarCart />
            <div className='container'>
                <div className="row"></div>
                <div className="row Gallery fade-up">
                    {products.map((product, index) => (
                        <div key={product.Id} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                            <div className="card">
                                <img
                                    src={product.Image}
                                    className="gallery-img card-img-top rounded mb-1"
                                    alt="Product"
                                />
                                <div className="card-body">
                                    <p className="card-text">Price : Rs.{product.Price}</p>
                                    <div className="centered-buttons">
                                        <button type="button" className="btn btn-danger remove-button" onClick={() => handleRemoveFromCart(product.Id)}>-</button>
                                        <span className="added-item-count me-3 mt-2">{cartItems[product.Id] ? cartItems[product.Id].quantity : 0}</span> {' '}
                                        <button type="button" className="btn btn-primary" onClick={() => handleAddToCart(product)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-5 text-muted">
                Copyright &copy; 2024 &mdash; SayCheese
            </div>
        </div>
    );
};

export default Gallery;
