import './style.css';
import './responsive.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Dashboard header';
import Sidebar from './sidebar';


function ProductDetails() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/product')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };
  const handleDelete = (Id) => {
    axios.delete(`http://localhost:8081/delete/${Id}`)
      .then(res => {
        console.log(res.data);
        fetchData(); // Fetch updated data after successful deletion
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="dashboard">
      <Header />

      <div className="content">
        <Sidebar />

        <div className="main-container">

          <div className="main">


            <div className="report-container">
              <div className="report-header">
                <h1 className="recent-Articles">Product Details</h1>
                <Link to='/ProductAdd' className='btn btn-success'>Add New +</Link>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <table className="table table-striped " style={{ width: "100%" }} >
                    <thead>
                      <tr>

                        <th scope="col " style={{ width: "10%" }}>Id</th>
                        <th scope="col " style={{ width: "10%" }}>Price</th>
                        <th scope="col " style={{ width: "60%" }}>Product Image URL</th>
                        <th>Action</th>



                      </tr>
                    </thead>
                    <tbody >
                      {data.map((product, index) => (
                        <tr key={index}>

                          <td> {product.Id}</td>
                          <td> {product.Price}</td>
                          <td> <a href={`http://${product.Image}`} >{product.Image}</a></td>
                          <td>
                            <button onClick={() => handleDelete(product.Id)} className='btn btn-sm btn-danger'>Delete</button>{' '}
                          </td>


                        </tr>
                      ))}
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
