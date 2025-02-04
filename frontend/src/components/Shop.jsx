import React from 'react'
import { Layout } from './common/Layout'
import { Hero } from './common/Hero'
import ProductImg  from '../assets/images/mens/five.jpg'
import { Link } from 'react-router-dom'
export const Shop = () => {
  return (
    <Layout>
        
        <div className="container">
            <nav aria-label="breadcrumb " className='py-4'>
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
                </ol>
            </nav>

            <div className="row">
                <div className="col-md-3">
                    <div className="card shadow border-0 mb-3">
                        <div className="card-body p-4">
                            <h3 className='mb-3'>Categories</h3>
                            <ul>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="chk_mens" />
                                    <label htmlFor="chk_mens" className='px-2'>Mens</label>
                                </li>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="chk_womens" />
                                    <label htmlFor="chk_womens" className='px-2' >Womens</label>
                                </li>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="chk_kids" />
                                    <label htmlFor="chk_kids" className='px-2'>Kids</label>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="card shadow border-0 mb-3">
                        <div className="card-body p-4">
                            <h3 className='mb-3'>Brands</h3>
                            <ul>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="" />
                                    <label htmlFor="" className='px-2'>Puma</label>
                                </li>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="" />
                                    <label htmlFor="" className='px-2' >Killer</label>
                                </li>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="" />
                                    <label htmlFor="" className='px-2'>Levis</label>
                                </li>
                                <li className='mb-2'>
                                    <input className="form-check-input" type="checkbox" name="" id="" />
                                    <label htmlFor="" className='px-2'>GUCCI</label>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-3 col-6">
                            <div className="product card border-0">
                                <div className="card-img">
                                <Link to="/product">
                                    <img src={ProductImg} alt="" className='w-100'/>
                                </Link>
                                </div>
                                <div className="card-body pt-3">
                                    <Link to="/product">Test Shirt for Men</Link>
                                    <div className="price mb-4">
                                        $70 <span className='test-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="product card border-0">
                                <div className="card-img">
                                <Link to="/product">
                                    <img src={ProductImg} alt="" className='w-100'/>
                                </Link>
                                </div>
                                <div className="card-body pt-3">
                                    <Link to="/product">Test Shirt for Men</Link>
                                    <div className="price mb-4">
                                        $70 <span className='test-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="product card border-0">
                                <div className="card-img">
                                <Link to="/product">
                                    <img src={ProductImg} alt="" className='w-100'/>
                                </Link>
                                </div>
                                <div className="card-body pt-3">
                                    <Link to="/product">Test Shirt for Men</Link>
                                    <div className="price mb-4">
                                        $70 <span className='test-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="product card border-0">
                                <div className="card-img">
                                <Link to="/product">
                                    <img src={ProductImg} alt="" className='w-100'/>
                                </Link>
                                </div>
                                <div className="card-body pt-3">
                                    <Link to="/product">Test Shirt for Men</Link>
                                    <div className="price mb-4">
                                        $70 <span className='test-decoration-line-through'>$80</span>
                                    </div>
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
