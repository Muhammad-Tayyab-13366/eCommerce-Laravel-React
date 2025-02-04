import React from 'react'
import ProductImg  from '../assets/images/mens/fivee.jpg'
export const FeaturedProducts = () => {
  return (
    <>
        <section className='section-2 py-5'>
            <div className='container'>
                <h2 className='mb-4'>Features Products</h2>
                <div className="row">
                    <div className="col-md-3 col-6">
                        <div className="product card border-0">
                            <div className="card-img ">
                            <img src={ProductImg} alt="" className='w-100'/>
                            </div>
                            <div className="card-body pt-3">
                            <a href="">Test Shirt for Men</a>
                            <div className="price mb-4">
                                $70 <span className='test-decoration-line-through'>$80</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="product card border-0">
                            <div className="card-img ">
                            <img src={ProductImg} alt="" className='w-100'/>
                            </div>
                            <div className="card-body pt-3">
                            <a href="">Test Shirt for Men</a>
                            <div className="price mb-4">
                                $70 <span className='test-decoration-line-through'>$80</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="product card border-0">
                            <div className="card-img ">
                            <img src={ProductImg} alt="" className='w-100'/>
                            </div>
                            <div className="card-body pt-3">
                            <a href="">Test Shirt for Men</a>
                            <div className="price mb-4" >
                                $70 <span className='test-decoration-line-through'>$80</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="product card border-0">
                            <div className="card-img">
                            <img src={ProductImg} alt="" className='w-100'/>
                            </div>
                            <div className="card-body pt-3">
                            <a href="">Test Shirt for Men</a>
                            <div className="price mb-4">
                                $70 <span className='test-decoration-line-through'>$80</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
   </>
  )
}
