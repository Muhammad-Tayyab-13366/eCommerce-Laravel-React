import React, { useEffect, useState } from 'react'
import ProductImg  from '../assets/images/mens/fivee.jpg'
import { apiUrl } from './common/http'
import { Link } from 'react-router-dom'
export const FeaturedProducts = () => {

    const [productsData, setProductData] = useState([])
    const getProducts = () => {
        fetch(apiUrl+'get-featured-products',{
            'method': "GET",
            "headers" : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then( result => {
            if(result.status == 200){
                setProductData(result.data)
            }else {
                console.log(result)
            }
        })
    }

    useEffect(() => {
        getProducts()
    },[])

  return (
    <>
        <section className='section-2 py-5'>
            <div className='container'>
                <h2 className='mb-4'>Features Products</h2>
                <div className="row">
                    {
                        productsData && productsData.length > 0 &&
                        productsData.map(product => {
                           
                            return ( 
                                <div className="col-md-3 col-6" key={`prod-${product.id}`}>
                                    <div className="product card border-0">
                                        <div className="card-img ">
                                            <Link to={`/product/${product.id}`}><img src={product.image_url} alt="" className='w-100'/></Link>
                                        </div>
                                        <div className="card-body pt-3">
                                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            <div className="price mb-4">
                                                ${product.price} &nbsp; 
                                                {
                                                    product.compare_price && <span className='test-decoration-line-through'>${product.compare_price}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </section>
   </>
  )
}
