import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import logo from '../images/Say Cheese 2.png';
import '../App.css';


function ViewUser() {
  const { email } = useParams();
  const [bookingdetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:8081/view/${email}`)
        .then(res => {
          console.log(res);
          setBookingDetails(res.data);
        })
        .catch(err => console.log(err));
    };

    fetchData(); // Call fetchData on mount

    return () => {
      // Cleanup function
    };
  }, [email]); // Only re-run the effect if 'email' changes

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deleteBookingUser/${id}`)
      .then(res => {
        console.log(res.data);
        // Update bookingdetails state after successful deletion
        setBookingDetails(prevState => prevState.filter(booking => booking.id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="bgLogin">
      <nav className="navbar navbar-expand-lg">
        <div className="container">

          <NavLink className="navbar-brand" to="/"> <img src={logo} width="120" height="60" alt='logo' /> </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Category">Category</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link " to="/Gallery" tabindex="-1" aria-disabled="true">Gallery</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Booking">Booking</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/About">About</NavLink>
              </li>


            </ul>
            <form className="d-flex">
              <NavLink to="Booking" type="button" className="btn btn-primary me-2">Book Now</NavLink>
              <NavLink to="/" type="button" className="btn btn-info me-2">Log Out</NavLink>
            </form>
          </div>

        </div>
      </nav>

      <br />
      <div className="container">
        <div className="row">
          {bookingdetails.map((bookingDetail, index) => (
            <div className="userH1Container" key={index}>
              <h1 className="userH1">Welcome {bookingDetail.Name}!</h1>
            </div>
          ))}
        </div>

        <div className="row justify-content-center">



          <div className="report-container" style={{ marginLeft: '0px', marginTop: '30px' }} >
            <div className="report-header">
              <h1 className="recent-Articles">Booking Details</h1>

            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <table className="table table-striped " style={{ width: "100%" }} >
                  <thead>
                    <tr>
                      <th scope="col " style={{ width: "5%" }}>ID</th>
                      <th scope="col " style={{ width: "15%" }}>Name</th>

                      <th scope="col " style={{ width: "15%" }}>Type</th>
                      <th scope="col " style={{ width: "15%" }}>Date</th>
                      <th scope="col " style={{ width: "15%" }}>Message</th>
                      <th scope="col " style={{ width: "30%" }}>Download URL</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >

                    {bookingdetails.length > 0 ? (
                      bookingdetails.map((bookingdetails, index) => (
                        <tr key={index}>
                          <td > {bookingdetails.id}</td>
                          <td>{bookingdetails.Name} </td>

                          <td> {bookingdetails.Type}</td>
                          <td> {bookingdetails.Date}</td>
                          <td> {bookingdetails.Message}</td>
                          <td><a href={`http://${bookingdetails.Download}`} >{bookingdetails.Download}</a></td>
                          <td>
                            <button onClick={() => handleDelete(bookingdetails.id)} className='btn btn-sm btn-danger'>Delete</button>{' '}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No data found</td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
}

export default ViewUser;
