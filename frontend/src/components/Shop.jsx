import React, { useEffect, useState } from 'react'
import { Layout } from './common/Layout'
import { Hero } from './common/Hero'
import ProductImg  from '../assets/images/mens/five.jpg'
import { Link, useSearchParams } from 'react-router-dom'
import { apiUrl } from './common/http'
export const Shop = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [products, setProducts] = useState([])
    const [catChecked, setCatChecked] = useState( () => {
        const category = searchParams.get('category');
        return category ? category.split(',') : [];
    })
    const [brandChecked, setBrandChecked] = useState(() => {
        const brand = searchParams.get('brand');
        return brand ? brand.split(',') : [];
    })
   
    const getCategories = () => {
        fetch(apiUrl+'get-categories',{
            'method': "GET",
            "headers" : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then( result => {
            if(result.status == 200){
                setCategories(result.data)
            }else {
               // console.log(result)
            }
          
        })
    }

    const getBrands= () => {
        fetch(apiUrl+'get-brands',{
            'method': "GET",
            "headers" : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then( result => {
            if(result.status == 200){
                setBrands(result.data)
            }else {
               // console.log(result)
            }
            
        })
    }

    const getProducts= () => {

        let search = [];
        let params = '';
        if(catChecked.length > 0){
            search.push(['category', catChecked])
        }

        if(brandChecked.length > 0){
            search.push(['brand', brandChecked])
        }

        if(search.length > 0){
            params = new URLSearchParams(search)
            setSearchParams(params)
        }
        else 
        {
            setSearchParams([]);
        }

        //console.log(params.toString())
        
        fetch(`${apiUrl}get-products?${params}`,{
            'method': "GET",
            "headers" : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then( result => {
            if(result.status == 200){
                setProducts(result.data)
            }else {
               // console.log(result)
            }
            
        })
    }

    const handleCategory = (e) => {

        const {checked, value} = e.target;
        
        setCatChecked((pre) => {
            const updatedList = checked ? [...pre, value] : pre.filter(id => id != value);
            return updatedList;
        })
        // if(checked){
        //     setCatChecked( pre => [...pre, value])
        // }
        // else {
        //     setCatChecked(catChecked.filter(id => id != value))
        // }

        
    }

    const handleBrand = (e) => {
        
        const {checked, value} = e.target;

        setBrandChecked((pre) => {
            const updatedList = checked ? [...pre, value] : pre.filter(id => id != value);
            return updatedList;
        })

        // if(checked){
        //     setBrandChecked( pre => [...pre, value])
        // }
        // else {
        //     setBrandChecked(brandChecked.filter(id => id != value))
        // }
    }
    
    useEffect(() => {

        getCategories()
        getBrands()
    }, [])

    useEffect(() => {
        getProducts()
    }, [catChecked,brandChecked])

    useEffect(() => {
        const category = searchParams.get('category');
        setCatChecked(category ? category.split(',') : []);
    
        const brand = searchParams.get('brand');
        setBrandChecked(brand ? brand.split(',') : []);
    
    }, [searchParams]); // Dependency array updated to track changes in searchParams

    
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
                                {
                                    categories && categories.length > 0 &&
                                    categories.map(category => {
                                       
                                        return (
                                            <li className='mb-2' key={`cat_${category.id}`}>
                                                <input className="form-check-input"
                                                    // defaultChecked={searchParams.get('category') ? searchParams.get('category').includes(category.id) : false } 
                                                    checked={catChecked.length > 0 ? catChecked.includes(category.id.toString()) : false } 
                                                    type="checkbox" 
                                                    value={category.id} 
                                                    name=""
                                                    id={`chk_cat_${category.id}`}
                                                    onChange={handleCategory}
                                                    
                                                    />
                                                <label htmlFor={`chk_cat_${category.id}`} className='px-2'>{category.name}</label>
                                            </li>
                                        )
                                    })
                                }
                                

                            </ul>
                        </div>
                    </div>

                    <div className="card shadow border-0 mb-3">
                        <div className="card-body p-4">
                            <h3 className='mb-3'>Brands</h3>
                            <ul>
                                {
                                    brands && brands.length > 0 &&
                                    brands.map(brand => {
                                        return (
                                            <li className='mb-2' key={`brand_${brand.id}`}>
                                                <input className="form-check-input" 
                                                    checked={brandChecked.length > 0 ? brandChecked.includes(brand.id.toString()) : false } 
                                                    type="checkbox" 
                                                    value={brand.id} 
                                                    name="" id={`chk_brand_${brand.id}`}
                                                    onChange={handleBrand} />
                                                <label htmlFor={`chk_brand_${brand.id}`} className='px-2'>{brand.name}</label>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">

                        {
                            products && products.length > 0 &&
                            products.map(product => {
                                return (
                                    <div className="col-md-3 col-6" key={`prod-${product.id}`}>
                                        <div className="product card border-0">
                                            <div className="card-img">
                                            <Link to={`/product/${product.id}`}>
                                                <img src={product.image_url} alt="" className='w-100'/>
                                            </Link>
                                            </div>
                                            <div className="card-body pt-3">
                                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                                                <div className="price mb-4">
                                                    ${product.price}&nbsp;
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
            </div>
        </div>
    </Layout>
  )
}
