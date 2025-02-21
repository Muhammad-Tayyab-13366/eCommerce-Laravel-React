import React from 'react'
import { Layout } from '../../common/Layout'
import { Sidebar } from '../../common/Sidebar';
import { Link } from 'react-router-dom';

const Show = () => {
  return (
    <Layout>
        {/* <div>Dashboard</div><button className='btn btn-danger' onClick={logout}>Logout</button> */}
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center-between mt-5 pb-3">
              <h4 className='h4 pb-0 mb-0'>Categories</h4>
              <Link to="" className='btn btn-primary'>Create</Link>
            </div>
            <div className="col-md-3 ">
              <Sidebar/>
            </div>
            <div className="col-md-9">
              <div className="card shadow">
                <div className="card-body">
                    
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Show;
