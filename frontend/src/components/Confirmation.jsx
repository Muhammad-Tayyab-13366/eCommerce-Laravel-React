import React, { useEffect, useState } from 'react'
import { Layout } from './common/Layout'
import { apiUrl, userToken } from './common/http';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from './common/Loader';

export const Confirmation = () => {

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    const {id} = useParams();
    const fetchOrder = () => {
        fetch(`${apiUrl}get-order-detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {

            if(result.status == 200){
                setOrder(result.data);
                setLoading(false);
            }
            else 
            {
                setLoading(false);
                toast.error(result.message)
            }
           
        })
        .catch(error => {
            console.error("Fetch error:", error);
            toast.error("Failed to load order");
            setLoading(false);
          });
    }

    useEffect(() => {
        fetchOrder()
    }, [])
  return (
    <Layout>
        {/* <div>Dashboard</div><button className='btn btn-danger' onClick={logout}>Logout</button> */}
        <div className="container py-5">
            {
                loading === true && <Loader/>
            }
            
            {  loading == false && order.length != 0 && 
                <div>
                    <div className="row">
                        <h1 className='text-center text-success fw-bold'>Thank You</h1>
                        <p className='text-center text-muted'>Your order has been placed successfully</p>
                    </div>
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className='fw-bold'>Order Summary</h3>
                            <hr />
                            <div className="row">
                                <div className="col-6">
                                    <p><strong>Order ID:</strong> #{order.id}</p>
                                    <p><strong>Date:</strong>   {order.created_at}</p>
                                    <p><strong>Status: </strong>  
                                        { order.status == 'pending' && <span className='badge bg-warning'>Pending</span> }
                                        { order.status == 'shipped' && <span className='badge bg-warning'>Shipped </span> }
                                        { order.status == 'delivered' && <span className='badge bg-success'>Delivered </span> }
                                        { order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled </span> }
                                    </p>
                                    <p><strong>Payment Method:</strong> Cash on Delivery</p>
                                </div>
                                <div className="col-6">
                                    <p><strong>Customer:</strong> {order.name}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Contact:</strong> {order.mobile}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-12'>
                                    <h3>Items</h3>
                                    <table className='table table-striped table-bordered mt-2'>
                                        <thead className='table-light'>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th width="150">Price</th>
                                                <th width="150">Total</th>
                                            </tr>
                                            
                                        </thead>
                                        <tbody>
                                            {
                                                order.order_items && order.order_items.map(item => {
                                                    return (
                                                        <tr key={`tr-order-item-${item.id}`}>
                                                            <td>{item.name}</td>
                                                            <td>{item.qty}</td>
                                                            <td>${item.unit_price}</td>
                                                            <td>${item.unit_price*item.qty}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="text-end fw-bold" colSpan={3}>Subtotal</td>
                                                <td>${order.sub_total}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-end  fw-bold" colSpan={3}>Shipping</td>
                                                <td>${order.shipping}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-end  fw-bold" colSpan={3}>Grand Total</td>
                                                <td>${order.grand_total}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-primary'>View Order Details</button>
                                    <Link to="/" className='btn btn-outline-secondary ms-2'>Continue Shopping</Link>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            }
            { 
                loading === false && order.length == 0 &&
                <div className="row">
                    <h1 className='text-center text-muted fw-bold'>Sorry, Order not found</h1>
                </div>
            }

        </div>
    </Layout>
  )
}
