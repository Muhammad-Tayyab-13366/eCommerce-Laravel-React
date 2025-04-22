import React, { useContext, useState } from 'react'
import { Layout } from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import ProductImg from '../assets/images/mens/six.jpg';
import { CartContext } from './context/Cart';
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from './common/http';
import { toast } from 'react-toastify';
export const Checkout = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [paymentMethod, setpaymentMethod] = useState('cod');        
    const {cartData, subTotal, grandTotal, shipping} = useContext(CartContext);  
    const navigate = useNavigate();
    const handlePaymentMethod = (e) => {
        setpaymentMethod(e.target.value);
    }

    const processOrder = (data) => {
        console.log(data)
        if(paymentMethod == "cod"){
            saveOrder(data, 'unpiad')
        }
    }

    const saveOrder = (formData, paymentStatus) => {

        const newFormData = {...formData, 
            grand_total: grandTotal(), 
            sub_total: subTotal(), 
            shipping: shipping(),
            discount: 0,
            payment_status: paymentStatus,
            status: 'pending',
            cart: cartData
        }

        console.log(newFormData)
        fetch(`${apiUrl}save-order`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`

            },
            body: JSON.stringify(newFormData)
        }).then(res => res.json())
        .then(result => {

            if(result.status == 200){
                localStorage.removeItem('cart');
                navigate(`/order/confirmation/${result.order_id}`)
            }else {
                toast.error(result.message)
            }
            console.log(result)
        })
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
            <form action=''  onSubmit={handleSubmit(processOrder)}>
                <div className="row">
                    <div className="col-md-7">
                        <h3 className='border-bottom pb-2'>Billing Details</h3>
                        <div className='row'>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className={`form-control ${errors.name && 'is-invalid'}`} 
                                        type="text" name="" id="" placeholder='Name'
                                        {...register("name", {  required: "Name is required" }) }
                                    />
                                    {errors.name && <p className='invalid-feedback'>{ errors.name?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input className={`form-control ${errors.name && 'is-invalid'}`} 
                                    type="text" name="" id="" placeholder='Email'
                                    {...register("email",
                                        { 
                                            required: "Email is required" ,
                                            pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    } 
                                        })

                                    } />
                                    {errors.email && <p className='invalid-feedback'>{ errors.email?.message}</p>}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className='mb-3'>
                                    <textarea rows={3} cols="" 
                                    className={`form-control ${errors.address && 'is-invalid'}`} 
                                    placeholder='Address'
                                    {...register("address", {  required: "Address is required"  })
                                    }
                                    ></textarea>
                                    {errors.address && <p className='invalid-feedback'>{ errors.address?.message}</p>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input 
                                    type="text" name="" id="" placeholder='City' 
                                    className={`form-control ${errors.city && 'is-invalid'}`} 
                                    {...register("city", {  required: "City is required" }) } />
                                    {errors.city && <p className='invalid-feedback'>{ errors.city?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input type="text" name="" id="" placeholder='State'
                                    className={`form-control ${errors.state && 'is-invalid'}`} 
                                    {...register("state", {  required: "Sate is required" }) }
                                     />
                                     {errors.state && <p className='invalid-feedback'>{ errors.state?.message}</p>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input  type="text" name="" id="" placeholder='Zip' 
                                    className={`form-control ${errors.phone && 'is-invalid'}`} 
                                    {...register("zip", {  required: "Zip code is required" }) }
                                     />
                                     {errors.zip && <p className='invalid-feedback'>{ errors.zip?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <input type="text" name="" id="" placeholder='Phone' 
                                    className={`form-control ${errors.mobile && 'is-invalid'}`} 
                                    {...register("mobile", {  required: "Phone is required" }) }
                                     />
                                     {errors.mobile && <p className='invalid-feedback'>{ errors.mobile?.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h3 className='border-bottom pb-2'>Items</h3> 
                        <table className="table">
                            <tbody>
                                {
                                    cartData && cartData.map(item => {
                                        return (
                                            <tr className='border-bottom' key={`cart-item-${item.id}`}>
                                                <td width={100}>
                                                    <img src={item.image_url} width={80} alt="" />
                                                </td>
                                                <td width={600}>
                                                    <h4>{item.title}</h4>
                                                    <div className="d-flex pt-0 align-items-center">
                                                        <div>
                                                            <span>${item.price}</span>
                                                            <button className="btn btn-size ms-1">S</button>
                                                        </div>

                                                        <div className='ps-5'> x{item.qty}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>Subtotal</div>
                                    <div>${subTotal()}</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>Shipping</div>
                                    <div>${shipping()}</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div><strong>Grand Total</strong></div>
                                    <div>${grandTotal()}</div>
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
            </form>
        </div>
    </Layout>
    </>
  )
}
