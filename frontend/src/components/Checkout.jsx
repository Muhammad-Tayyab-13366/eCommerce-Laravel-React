import React, { useState } from 'react'
import { Layout } from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/mens/six.jpg';
export const Checkout = () => {
    const [paymentMethod, setpaymentMethod] = useState('cod');
    const handlePaymentMethod = (e) => {
        setpaymentMethod(e.target.value);
    }
  return (
    <>
    <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <nav aria-label="breadcrumb " className='py-4'>
                        <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item " aria-current="page">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <h3 className='border-bottom pb-2'>Billing Details</h3>
                    <form action=''>
                        <div className='row'>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className="form-control" type="text" name="" id="" placeholder='Name' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className="form-control" type="text" name="" id="" placeholder='Email' />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className='mb-3'>
                                    <textarea rows={3} cols="" className="form-control" placeholder='Address'></textarea>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className="form-control" type="text" name="" id="" placeholder='City' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className="form-control" type="text" name="" id="" placeholder='State' />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className="form-control" type="text" name="" id="" placeholder='Zip' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className="form-control" type="text" name="" id="" placeholder='Phone' />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="col-md-5">
                    <h3 className='border-bottom pb-2'>Items</h3> 
                    <table className="table">
                        <tbody>
                            <tr className='border-bottom'>
                                <td width={100}>
                                    <img src={ProductImg} width={80} alt="" />
                                </td>
                                <td width={600}>
                                    <h4>Dummy product</h4>
                                    <div className="d-flex pt-0 align-items-center">
                                        <div>
                                            <span>$10</span>
                                            <button className="btn btn-size ms-1">S</button>
                                        </div>
                                        <div className='ps-5'> x2</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='border-bottom'>
                                <td width={100}>
                                    <img src={ProductImg} width={80} alt="" />
                                </td>
                                <td width={600}>
                                    <h4>Dummy product</h4>
                                    <div className="d-flex pt-0 align-items-center">
                                        <div>
                                            <span>$10</span>
                                            <button className="btn btn-size ms-1">S</button>
                                        </div>
                                        <div className='ps-5'> x1</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between border-bottom py-2">
                                <div>Subtotal</div>
                                <div>$30</div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom py-2">
                                <div>Shipping</div>
                                <div>$5</div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom py-2">
                                <div><strong>Grand Total</strong></div>
                                <div>$35</div>
                            </div>
                        </div>
                    </div>

                    <h3 className='border-bottom pb-2 pt-4'>Payment Method</h3> 
                    <div>
                        <input type="radio" 
                        onChange={handlePaymentMethod}
                        name="payment_method" 
                        checked={paymentMethod == 'stripe'} 
                        id="pm_stripe" value={'stripe'}/>&nbsp;
                        <label htmlFor="pm_stripe" className='form-label'> Stripe</label>

                        <input type="radio" 
                        onChange={handlePaymentMethod}
                        name="payment_method" 
                        checked={paymentMethod == 'cod'} 
                        id="pm_cod" className='ms-5' 
                        value={'cod'}/>&nbsp;
                        <label htmlFor="pm_cod" className='form-label'> Cash on Delivery</label>
                    </div>
                    
                    <div className="d-flex py-3">
                        <button className='btn btn-primary'>Pay Now</button>
                    </div>
                </div>
            </div>

        </div>
    </Layout>
    </>
  )
}
