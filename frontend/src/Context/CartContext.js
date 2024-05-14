import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (product) => {
        setCartItems(prevCartItems => {
            const newCartItems = { ...prevCartItems };
            const productId = product.Id;
            if (newCartItems[productId]) {
                if (newCartItems[productId].quantity < 1) { // Limiting to 1 items per product
                    newCartItems[productId].quantity += 1;
                }
            } else {
                newCartItems[productId] = {
                    name: product.Name,
                    price: product.Price,
                    quantity: 1
                };
            }
            return newCartItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevCartItems => {
            const newCartItems = { ...prevCartItems };
            if (newCartItems[productId]) {
                newCartItems[productId].quantity -= 1; // Decrease quantity by 1
                if (newCartItems[productId].quantity === 0) {
                    delete newCartItems[productId]; // Remove item if quantity becomes 0
                }
            }
            return newCartItems;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        Object.values(cartItems).forEach((item) => {
            totalAmount += item.price * item.quantity;
        });
        return totalAmount;
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalCartAmount }}>
            {children}
        </CartContext.Provider>
    );
};
