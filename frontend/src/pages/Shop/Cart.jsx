import React, { useContext } from 'react';
import NavbarShop from './NavbarShop';
import { CartContext } from '../../Context/CartContext'; // Import CartContext

const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(CartContext); // Use CartContext

    return (
        <div className='bgCart'>
            <NavbarShop />
            <div className="container">
                <div className="py-5 text-center">
                    <h2 className="mt-5">Checkout form</h2>
                </div>
                <div className="row fade-up">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{Object.keys(cartItems).length}</span> {/* Display item count */}
                        </h4>
                        <ul className="list-group mb-3 sticky-top">
                            {Object.keys(cartItems).map((itemId) => (
                                <li key={itemId} className="list-group-item d-flex justify-content-between">
                                    <span>{cartItems[itemId].name}</span> {/* Display item name */}
                                    <strong>Rs. {cartItems[itemId].price}</strong> {/* Display item price */}
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (LKR)</span>
                                <strong>Rs. {getTotalCartAmount()}</strong> {/* Display total amount */}
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                                    <div className="invalid-feedback"> Valid first name is required. </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                                    <div className="invalid-feedback"> Valid last name is required. </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                                <div className="invalid-feedback"> Please enter your shipping address. </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback"> Please select a valid country. </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback"> Please provide a valid state. </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required />
                                    <div className="invalid-feedback"> Zip code required. </div>
                                </div>
                            </div>

                            <hr className="mb-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                                    <label className="custom-control-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="debit">Debit card</label>
                                </div>

                            </div>


                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                        </form><br />
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Cart;




