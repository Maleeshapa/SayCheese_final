import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation
import Navbar from '../../components/Navbar';
import axios from 'axios'; // Don't forget to import axios if you haven't already


const Admin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/Admin', { email, password })
      .then(res => {
        console.log(res);
        if (res.data.message === "Logged In") {
          // If logged in successfully, navigate to '/Dashboard'
          navigate('/Dashboard');
        }
      })
      .catch(err => console.log(err));
  };


  return (
    <>
      <Navbar />
      <div className='bgAdmin'>

        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-sm-center h-100">
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                <div className="card shadow-lg" style={{ marginTop: '100px' }}>
                  <div className="card-body p-5">
                    <h1 className="fs-4 card-title fw-bold mb-4">Admin Login</h1>

                    <form onSubmit={handleSubmit} method="POST" className="needs-validation" noValidate autoComplete="off">

                      <div className="mb-3">
                        <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>

                        <input id="email"
                          type="email"                          
                          className="form-control form-control-lg"
                          value={email}
                          onChange={e => setEmail(e.target.value)} />

                            <div className="invalid-feedback">
                              Email is invalid
                            </div>
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 w-100">
                          <label className="text-muted" htmlFor="password">Password</label>
                        </div>

                        <input id="password"
                          type="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={e => setPassword(e.target.value)} required />

                        <div className="invalid-feedback">
                          Password is required
                        </div>
                      </div>

                      <div className="d-flex align-items-center">

                        <button type="submit" className="btn btn-primary ms-auto">
                          Login
                        </button>
                      </div>
                    </form>

                  </div>


                </div>

                <div className="text-center mt-5 text-muted">
                  Copyright &copy; 2024 &mdash; SayCheese
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admin;
