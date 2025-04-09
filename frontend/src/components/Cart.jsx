import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from './common/Layout'
import ProductImg from '../assets/images/mens/six.jpg';
import { CartContext } from './context/Cart';
export const Cart = () => {

  const {cartData, grandTotal, shipping, subTotal}  = useContext(CartContext)
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb " className='py-4'>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item " aria-current="page">Cart</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-12">
              <h2 className="border-bottom pb-2">Cart</h2>
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
                            <div className="d-flex pt-0">
                              <div>
                                <span>${item.price}</span>
                                { item.size && <button className="btn btn-size ms-1">{item.size}</button> }
                              </div>
                            </div>
                          </td>
                          <td>
                            <input type="number" name="" id="" value={item.qty} className='form-control'  style={{ width: '100px' }}/>
                          </td>
                          <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                          </td>
                        </tr>
                      )
                    })
                  }
                  
                 
                 
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-md-3">
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
              <div className="d-flex justify-content-end py-3">
                <button className='btn btn-primary'>Process to Checkouy</button>
              </div>
              
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
