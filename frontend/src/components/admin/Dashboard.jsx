import React, { useContext } from 'react'
import { Layout } from '../common/Layout'
import { Sidebar } from '../common/Sidebar'
import { Link } from 'react-router-dom'


export const Dashboard = () => {

  return (
    <Layout>
        {/* <div>Dashboard</div><button className='btn btn-danger' onClick={logout}>Logout</button> */}
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
              <Link style={{ visibility: 'hidden'}} to="/admin/categories/create" className='btn btn-primary'>ppp</Link>
            </div>
            <div className="col-md-3 ">
              <Sidebar/>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h2>1</h2>
                      <span>Users</span>
                    </div>
                    <div className="card-footer">
                      <a href="#">View Users</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h2>1</h2>
                      <span>Order</span>
                    </div>
                    <div className="card-footer">
                      <a href="#">View Order</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h2>1</h2>
                      <span>Products</span>
                    </div>
                    <div className="card-footer">
                      <a href="#">View Products</a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </Layout>
    
  )
}
