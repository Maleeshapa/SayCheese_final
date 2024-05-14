import React, { useState } from 'react'
import Header from './Dashboard header'
import Sidebar from './sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import './responsive.css';

function ProductAdd() {

  const [values, setValues] = useState({
    id: '',
    price: '',
    image: '',
    

  })

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/product', values)
      .then(res => {
        console.log(res);
        navigate('/ProductDetails');
      })

      .catch(err => console.log(err))
  }


  return (
    <div className="dashboard">
      <Header />

      <div className="content">
        <Sidebar />

        <div className="main-container">

          <div className="main">
            

            <div className="report-container">
              <div className="report-header">
                <h1 className="recent-Articles">New Product Details</h1>
                <Link to='/ProductDetails' className='btn btn-success'>Back</Link>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <form onSubmit={handleSubmit}>
                    <table className="table table-striped" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                        
                        <th scope="col " style={{ width: "30%" }}>Price</th>
                        <th scope="col " style={{ width: "60%" }}>Product Image URL</th>
                          <th scope="col" htmlFor="" style={{ width: "10%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr >

                          

                          <td>   <input type="text" className='form-control'
                            onChange={e => setValues({ ...values, price: e.target.value })} /> </td>

                          <td>    <input type="text" className='form-control'
                            onChange={e => setValues({ ...values, image: e.target.value })} /></td>

                         

                          <td>
                            <button className='btn btn-success'>Submit</button>{' '}
                          </td>
                        </tr>

                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd