import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:8081/Login', { email, nic })
                .then(res => {
                    console.log(res);
                    if (res.data.message === "Logged In") {
                        // If logged in successfully, navigate to '/UserAccount'
                        navigate(`/view/${email}`);
                    } else {
                        // Email does not exist, display an alert
                        alert('Email is incorrect');
                    }
                })
                .catch(err => {
                    console.log(err);
                    // Set bookingStatus to 'error' and display error message
                    setBookingStatus('error');
                });
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };
  
    return (
        <div className="bgLogin">
            <Navbar />
            <div className="container">
                <div className="row justify-content-center"> 
                    <div className="col-lg-8 mx-auto userlogincard">  {bookingStatus === 'error' && (
                                            <div>
                                                <div className="alert alert-danger" role="alert">
                                                    Login Details are incorrect Try Again
                                                </div>
                                                
                                            </div>
                                        )}

                        <div className="card shadow-lg my-5 "> 
                            <div className="row ">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">

                                
                                    <div className="card-body p-5"> 
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}> 
                                            <div className="form-group">

                                                <input type="email" 
                                                className="form-control form-control-user" 
                                                id="email" aria-describedby="emailHelp" 
                                                placeholder="Enter Email Address..." 
                                                value={email} onChange={e => setEmail(e.target.value)}/>

                                            </div>
                                            <br />
                                            <div className="form-group">

                                                <input type="password" 
                                                className="form-control form-control-user" 
                                                id="nic" 
                                                placeholder="Password is your NIC" 
                                                value={nic} onChange={e => setNic(e.target.value)}/>

                                            </div>
                                            <br />
                                            <button className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            <hr />
                                        </form>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

