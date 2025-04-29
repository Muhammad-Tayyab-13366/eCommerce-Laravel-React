import React, { useEffect, useState } from 'react'
import { Layout } from '../../common/Layout'
import { Sidebar } from '../../common/Sidebar'
import { Link } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/http'
import { Loader } from '../../common/Loader'

export const ShowOrders = () => {

    const [orders, setOrders]  = useState([]);
    const [loading, setLoading] =  useState(true);


    const fetchOrders = () => {
            fetch(`${apiUrl}orders`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
    
                if(result.status == 200){
                   setOrders(result.data);
                   setLoading(false);
                }
                else 
                {
                    setLoading(false);
                    toast.error(result.message)
                }
               
            })
            .catch(error => {
                toast.error("Failed to load order");
                setLoading(false);
              });
        }
    
        useEffect(() => {
           fetchOrders()
        },[])
  return (
    <Layout>
        {/* <div>Dashboard</div><button className='btn btn-danger' onClick={logout}>Logout</button> */}
        <div className="container">
            {
                loading === true && <Loader/>
            }
            {
                loading === false && orders.length != 0 &&
            
                <div className="row">
                        <div className="d-flex justify-content-center-between mt-5 pb-3">
                        <h4 className='h4 pb-0 mb-0'>Orders</h4>
                        
                        </div>
                        <div className="col-md-3 ">
                        <Sidebar/>
                        </div>
                        <div className="col-md-9">
                            <div className="card shadow">
                                <div className="card-body fw-normal">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Customer</th>
                                                <th>Email</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Payment</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map(order => {
                                                    return (
                                                        <tr key={`tr-order-${order.id}`}>
                                                            <td>
                                                                <Link to={`/admin/order/${order.id}`}>{order.id}</Link></td>
                                                            <td>{order.name}</td>
                                                            <td>{order.email}</td>
                                                            <td>${order.grand_total}</td>
                                                            <td>{order.created_at}</td>
                                                            <td>
                                                                { order.payment_status == 'paid' && <span className='badge bg-success'>Paid</span>}
                                                                { order.payment_status == 'unpaid' && <span className='badge bg-warning'>Unpaid</span>}
                                                            </td>
                                                            <td>
                                                                { order.status == 'pending' && <span className='badge bg-warning'>Pending</span> }
                                                                { order.status == 'shipped' && <span className='badge bg-warning'>Shipped </span> }
                                                                { order.status == 'delivered' && <span className='badge bg-success'>Delivered </span> }
                                                                { order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled </span> }
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                </div>
            }
            {
                loading === false && orders.length == 0 &&
                <div className="row">
                    <div className="col-12 flex justify-content-center">
                        <h3>Order not found</h3>
                    </div>
                </div>
            }
        </div>
    </Layout>
  )
}
