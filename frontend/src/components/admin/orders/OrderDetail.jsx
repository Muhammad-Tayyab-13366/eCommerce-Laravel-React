import React, { useEffect, useState } from 'react'
import { Layout } from '../../common/Layout'
import { Link, useParams } from 'react-router-dom'
import { Sidebar } from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { Loader } from '../../common/Loader'
import { Nostate } from '../../common/Nostate'
import { useForm } from 'react-hook-form'

export const OrderDetail = () => {
    const params = useParams();
    const [order, setOrder]  = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] =  useState(true);
    const { register, handleSubmit, reset, formState: { errors} } = useForm();

    const fetchOrderDetail = () => {
        fetch(`${apiUrl}order/${params.id}`,{
            method: "GET",
            "headers" : {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
        .then(result => {

            if(result.status == 200){
                setOrder(result.data)
                setOrderItems(result.data.order_items)
                setLoading(false);
                reset({
                    status: result.data.status,
                    payment_status: result.data.payment_status,
                });
            }
            else 
            {
                toast.error(result.message)
                setLoading(false);
            }
        })
    }

    const updateOrderStatus = (data) => {
        //setLoading(true);
        fetch(`${apiUrl}update-order/${params.id}`,{
            method: "POST",
            headers : {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {

            if(result.status == 200){
                //setLoading(false);
                setOrder(result.data)
                reset({
                    status: result.data.status,
                    payment_status: result.data.payment_status,
                });

                toast.success(result.message)
            }
            else 
            {
                toast.error(result.message)
                // setLoading(false);
            }
        })
    }

    useEffect(() => {
        fetchOrderDetail();
    }, [])
  return (
    <Layout>
        {/* <div>Dashboard</div><button className='btn btn-danger' onClick={logout}>Logout</button> */}
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className='h4 pb-0 mb-0'>Order Detail</h4>
              <Link to="/admin/orders" className='btn btn-primary'>Back</Link>
            </div>
            <div className="col-md-3 ">
              <Sidebar/>
            </div>
            <div className="col-md-9 pb-3">
                {
                    loading === true && <Loader/>
                }
                {
                    loading === false && Object.keys(order).length > 0 &&
                    <div className="row">
                        <div className="col-md-9">
                            <div className="card shadow">
                                <div className="card-body fw-normal">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h3>Order ID: #{order.id}</h3>
                                            <div>
                                                { order.status == 'pending' && <span className='badge bg-warning'>Pending</span> }
                                                { order.status == 'shipped' && <span className='badge bg-warning'>Shipped </span> }
                                                { order.status == 'delivered' && <span className='badge bg-success'>Delivered </span> }
                                                { order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled </span> }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className='text-secondary'>Date</div>
                                            <div>{order.created_at}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className='text-secondary'>Payment Status</div>
                                            <h4>
                                            { order.payment_status == 'paid' && <span className='badge bg-success'>Paid</span>}
                                            { order.payment_status == 'unpaid' && <span className='badge bg-danger'>Unpaid</span>}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="row py-4">
                                        <div className="col-md-4 ">
                                            <strong>{order.name}</strong>
                                            <div>{order.email}</div>
                                            <div>{order.mobile}</div>
                                            <div>{order.address} {order.city} {order.sate} {order.zip}</div>
                                        
                                        </div>
                                        <div className="col-md-4">
                                            <div className='text-secondary'>Payment Method</div>
                                            <div>Cash on Delivery</div>
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>

                                    <div className="row pt-5">
                                        <h3 className="pb-2 "><strong>Items</strong></h3>
                                        <div className="row justify-content-end">
                                            <div className="col-lg-12">
                                                {
                                                    orderItems && orderItems.map(item => {
                                                        return (

                                                            <div key={`od-item-${item.id}`} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                <div className="d-flex">
                                                                    {
                                                                        item.product.image_url && <img width="70" className="me-3" src={item.product.image_url} alt=""/>
                                                                    }
                                                                
                                                                <div className="d-flex flex-column">
                                                                    <div className="mb-2"><span>{item.name}</span></div>
                                                                    <div><button className="btn btn-size">{item.size}</button></div>
                                                                </div>
                                                                </div>
                                                                <div className="d-flex">
                                                                <div>${item.unit_price} X {item.qty}</div>
                                                                <div className="ps-3">${item.price}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-lg-12">
                                                <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div>Subtotal</div>
                                                    <div>${order.sub_total}</div>
                                                </div>
                                                <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div>Shipping</div>
                                                    <div>${order.shipping}</div>
                                                </div>
                                                <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div><strong>Grand Total</strong></div>
                                                    <div>${order.grand_total}</div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <form action="" onSubmit={handleSubmit(updateOrderStatus)}>
                                        <div className='mb-3'>
                                            <label className='form-label' htmlFor="status">Status</label>
                                            <select
                                                { ...register('status', {required: true}) }
                                                className="form-control"   name="status"  id="status">
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label className='form-label' htmlFor="payment_status">Payment Status</label>
                                            <select 
                                                { ...register('payment_status', {required: true}) }
                                                className="form-control"   name="payment_status"   id="payment_status">
                                                <option value="unpaid">Unpaid</option>
                                                <option value="paid">Paid</option>
                                            </select>    
                                        </div>
                                        <button className='btn btn-primary'>Update</button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                }
                {
                    loading === false && Object.keys(order).length == 0 && 
                    <div className="card">
                        <div className="card-body">
                            <Nostate text="Order not found"></Nostate>
                        </div>
                    </div>
                }
            </div>
          </div>
        </div>
    </Layout>
  )
}
