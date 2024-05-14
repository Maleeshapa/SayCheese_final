import React, { useState } from 'react'
import Header from './Dashboard header'
import Sidebar from './sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import './responsive.css';

function Create() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    nic: '',
    type: '',
    date:'',
    message: ''

  })

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/Booking', values)
      .then(res => {
        console.log(res);
        navigate('/Dashboard');
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
                <h1 className="recent-Articles">New Booking Details</h1>
                <Link to='/Dashboard' className='btn btn-success'>Back</Link>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <form onSubmit={handleSubmit}>
                    <table className="table table-striped" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th scope="col" htmlFor="" style={{ width: "15%" }}>Name</th>
                          <th scope="col" htmlFor="" style={{ width: "15%" }}>Email</th>
                          <th scope="col" htmlFor="" style={{ width: "15%" }}>Nic</th>
                          <th scope="col" htmlFor="" style={{ width: "15%" }}>Type</th>
                          <th scope="col" htmlFor="" style={{ width: "15%" }}>Date</th>
                          <th scope="col" htmlFor="" style={{ width: "15%" }}>Message</th>
                          <th scope="col" htmlFor="" style={{ width: "10%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr >

                          <td> <input type="text" className='form-control'
                            onChange={e => setValues({ ...values, name: e.target.value })} />  </td>

                          <td>   <input type="email" className='form-control'
                            onChange={e => setValues({ ...values, email: e.target.value })} /> </td>

                          <td>    <input type="text" className='form-control'
                            onChange={e => setValues({ ...values, nic: e.target.value })} /></td>

                          <td>    
                            <select className="form-control" id="type" name="type" required
                            onChange={e => setValues({ ...values, type: e.target.value })}>
                            <option value="">Select Photography Type</option>
                            <option value="wedding">Wedding Photography</option>
                            <option value="portrait">Portrait Photography</option>
                            <option value="street">Street Photography</option>
                            </select>
                          </td>


                          <td>    
                            
                            <input type="date" className='form-control'
                            onChange={e => setValues({ ...values, date: e.target.value })} />

                          </td>

                          <td>    <input type="text" className='form-control'
                            onChange={e => setValues({ ...values, message: e.target.value })} /></td>

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

export default Create