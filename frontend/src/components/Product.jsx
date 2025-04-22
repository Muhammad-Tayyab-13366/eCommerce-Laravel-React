import React, { useContext, useEffect, useState } from 'react'
import { Layout } from './common/Layout'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImgOne from '../assets/images/mens/eight.jpg';
import ProductImgTwo from '../assets/images/mens/five.jpg';
import ProductImgThree from '../assets/images/mens/four.jpg';
import ProductImgFour from '../assets/images/mens/nine.jpg';
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from './common/http';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';

export const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4)
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null)
    const params = useParams();

    const { addToCart } = useContext(CartContext)
    const getProduct = () => {
        fetch(`${apiUrl}get-product/${params.id}`,{
            'method': "GET",
            "headers" : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then( result => {
            if(result.status == 200){
                setProduct(result.data)
                setProductImages(result.data.product_images)
                setProductSizes(result.data.product_sizes)
               console.log(result)

            }else {
               // console.log(result)
            }
          
        })
    }

    const handleAddToCart = () => {

        if(productSizes.length > 0){

            if(sizeSelected == null){
                toast.error('Please select a size')
            }
            else 
            {
                addToCart(product, sizeSelected)
                toast.success('Product successfully added to cart')

            }
        }
        else 
        {
            addToCart(product, null)
            toast.success('Product successfully added to cart')
        }
        
    }
    useEffect(() => {
        getProduct();
    },[])

  return (
    <>
        <Layout>
            <div className="container product-detail mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb " className='py-4'>
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item " aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item " aria-current="page"><Link to="/shop">{product.title}</Link></li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="row">
                            <div className="col-2">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                        }}
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        direction={`vertical`}
                                        spaceBetween={10}
                                        slidesPerView={6}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper mt-2"
                                    >  

                                    {
                                        productImages && productImages.map(product_image => {

                                            return (
                                                <SwiperSlide key={`ss-prod-${product_image.image_url}`}>
                                                    <div className='content' >
                                                        <img 
                                                            src={product_image.image_url} 
                                                            alt="" 
                                                            height={100}
                                                            className='w-100' />
                                                    </div>                                                                      
                                                </SwiperSlide>
                                            )
                                        })
                                    } 
                                   
                                </Swiper>
                            </div>
                            <div className="col-10">
                                <Swiper
                                    style={{
                                    '--swiper-navigation-color': '#000',
                                    '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {
                                        productImages && productImages.map(product_image => {

                                            return (
                                                <SwiperSlide key={`sl-prod--${product_image.image_url}`}>
                                                    <div className='content'  >
                                                        <img 
                                                            src={product_image.image_url} 
                                                            alt="" 
                                                           
                                                            className='w-100' />
                                                    </div>                                                                      
                                                </SwiperSlide>
                                            )
                                        })
                                    } 
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h2>{product.title}</h2>
                        <div className='d-flex'>
                            <Rating
                                size={20}
                                readonly
                                initialValue={rating}
                                /* Available Props */
                            />
                            <span className='ps-2'>10 Reviews</span>
                        </div>
                        <div className="price h3 py-3">
                            ${product.price} &nbsp;
                            {
                                product.compare_price && <span className='test-decoration-line-through'>${product.compare_price}</span>
                            }
                        </div>
                        <div>
                            {product.short_description} 
                        </div>
                        <div className='pt-3'>
                            <strong>Select size</strong>
                            <div className='sizes pt-2'>

                                { 
                                    productSizes && productSizes.map(product_size => {
                                        
                                        return (
                                            <button 
                                                key={`btn-size-${product_size.sizes.id}`} 
                                                className={`btn btn-size ms-1 ${sizeSelected == product_size.sizes.name ? 'active' : ''}`}
                                                onClick={ () => setSizeSelected(product_size.sizes.name) }>
                                                    {product_size.sizes.name}
                                                </button>
                                        )
                                    }) 
                                }
                                
                                {/* <button className="btn btn-size ms-1">M</button>
                                <button className="btn btn-size ms-1">L</button>
                                <button className="btn btn-size ms-1">XL</button> */}
                            </div>
                        </div>
                        <div className='add-to-cart mt-4'>
                            <button 
                                className="btn btn-primary text-uppercase"
                                onClick={handleAddToCart}
                                >Add to Cart</button>
                        </div>
                        <hr />
                        <div>
                            <strong>SKU: </strong>{product.sku}
                        </div>
                        
                    </div>
                </div>
                <div className="row pb-5 pt-5">
                    <div className="col-md-12">
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{ __html: product.description}}>

                                </div>
                            </Tab>
                            <Tab eventKey="review" title="Reviews (10)">
                                Review area
                            </Tab>
                            
                        </Tabs>
                    </div>
                </div>
            </div>
            
        </Layout>
    </>
  )
}
