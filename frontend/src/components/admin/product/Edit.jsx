import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Layout } from '../../common/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Sidebar } from '../../common/Sidebar'
import { useForm, Controller } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify'

export const Edit = ({ placeholder }) => {

    const [disable, setDisable] = useState(false)
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sizesChecked, setSizesChecked] = useState([]);
    //const [gallery, setGallary] = useState([]);
    const [productImages, setProductImages] = useState([]);
    //const [galleryImages, setGalleryImages] = useState([]);
    const navigate = useNavigate();
    // JoditEditor
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const config = useMemo(() => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || ''
        }),
        [placeholder]
    );

    const params = useParams();
    const { register, 
        control, 
        reset,
        handleSubmit, 
        setError, 
        watch, 
        formState: { errors } 
    } = useForm({
        
        defaultValues : async () => {
            const res = await fetch(`${apiUrl}products/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'applicationh/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
                
            }).then(res => res.json())
            .then(result => {
                
                if(result.status == 200){
                   
                    reset({
                        title: result.data.title,
                        category:  result.data.category_id,
                        brand: result.data.brand_id,
                        short_description: result.data.short_description,
                        description:  result.data.description,
                        price: result.data.price,
                        compare_price: result.data.compare_price,
                        sku:  result.data.sku,
                        barcode: result.data.barcode,
                        qty: result.data.qty,
                        status:  result.data.status,
                        is_feature: result.data.is_feature
                    })

                    setContent(result.data.description)
                    setProductImages(result.data.product_images)
                    setSizesChecked(result.productSizes)
                }else {
                    
                }
            })
        }
    });

   

    const saveProduct =  (data) => {

        const formData = {...data}
        console.log(formData)
        // return 0;
        setDisable(true)
        const res = fetch(`${apiUrl}products/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
        .then(result => {
            setDisable(false)
            if(result.status == 200){
                toast.success(result.message);
                navigate('/admin/products')
            }else {
               const formErrors = result.errors;
                for (const field in formErrors) {
                    setError(field, { 
                        message: formErrors[field][0], 
                        shouldFocus: true
                    });
                    
                    const input_field = document.querySelector(`#${field}`)
                    input_field.focus();
                    break;
                }
            }
        })
    }

    const fetchCategories = () => {
        const res = fetch(`${apiUrl}categories`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            }
            
        }).then(res => res.json())
        .then(result => {
            setCategories(result.data);
        })
    }

    const fetchBrands = () => {
        const res = fetch(`${apiUrl}brands`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            }
            
        }).then(res => res.json())
        .then(result => {
            setBrands(result.data);
        })
    }

    const handleFile = (e) => {
        const formData = new FormData()
        const file = e.target.files[0]
        formData.append('image', file)
        formData.append('product_id', params.id) 
        setDisable(true)
        const res = fetch(`${apiUrl}save-product-image`, {
            method: 'POST',
            headers: {
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: formData
            
        }).then(res => res.json())
        .then(result => {

            if(result.status == 200){
                productImages.push(result.data);
                setProductImages(productImages);
               
            }else {
                toast.error(result.errors.image[0])
            }
            setDisable(false)
            e.target.value = ''
            
        })
    }

    const deleteImage = (id) => {

        if(confirm('Are you sure you want to delete image?'))
        {
            const res = fetch(`${apiUrl}delete-product-image/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'applicationh/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
                // body: formData
                
            }).then(res => res.json())
            .then(result => {

                if(result.status == 200){
                    toast.success(result.message);
                    const newProductImages = productImages.filter(productImage => productImage.id != id);
                    setProductImages(newProductImages);
                
                }else {
                    toast.error(result.message)
                }
                
            })
        }

    }

    const changeDefaultImage = (image) => {
        const res = fetch(`${apiUrl}chnage-product-default-image`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify({
                "image": image,
                "product_id": params.id // No need for `${params.id}` unless it's part of a string.
            })
            
        }).then(res => res.json())
        .then(result => {
            if(result.status == 200){

            }else {

            }
        })
    }

    const fetchSizes = () => {
        const res = fetch(`${apiUrl}sizes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            }
            
        }).then(res => res.json())
        .then(result => {
            setSizes(result.data);
        })
    }
    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchSizes();
    }, [])
  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-between mt-5 pb-3">
                <h4 className='h4 pb-0 mb-0'>Product / Edit</h4>
                <Link to="/admin/products" className='btn btn-primary'>View Products</Link>
                </div>
                <div className="col-md-3 ">
                <Sidebar/>
                </div>
                <div className="col-md-9 mb-5">
                    <form action="" onSubmit={handleSubmit(saveProduct)}>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Title</label>
                                    <input type="text" 
                                        className={`form-control ${errors.title && 'is-invalid'}`}
                                        name="" id=""
                                        placeholder='Name'
                                        {...register("title", { required: "Title is required" })}
                                    />
                                    {errors.title && <p className='invalid-feedback'>{ errors.title?.message}</p>}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-label'>Category</label>
                                        <select name="" id="" 
                                            className={`form-control ${errors.category && 'is-invalid'}`}
                                            {...register("category", { required: "Category is required" })}
                                        >
                                            <option value="">Select Category</option>
                                            {
                                                categories && categories.map( (category) => {
                                                    return (
                                                    <option key={`cat-${category.id}`} value={category.id}>{category.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {errors.category && <p className='invalid-feedback'>{ errors.category?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-label'>Brands</label>
                                        <select name="" id="" 
                                            className={`form-control`}
                                            {...register("brand")}
                                        >
                                            <option value="">Select Brand</option>
                                            {
                                                brands && brands.map( (brand) => {
                                                    return (
                                                    <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Short Description</label>
                                    <textarea rows="3" cols="" className="form-control" placeholder='Short Description'
                                    {...register("short_description")}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="form-label">Descrition</label>
                                    <JoditEditor
                                        control={control}
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => {}}
                                        
                                    />
                                </div>
                                <h3 className='pt-3 border-bottom mb-3'>Pricing</h3>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-lable'>Price</label>
                                        <input type="text" name="price" placeholder='Price' 
                                        className={`form-control ${errors.price && 'is-invalid'}`}
                                        {...register("price", { required: "Price is required" })}
                                        />
                                        {errors.price && <p className='invalid-feedback'>{ errors.price?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-lable'>Compare Price</label>
                                        <input type="text" name="compare_price" placeholder="Compare Price" className='form-control' 
                                        {...register("compare_price")}/>
                                    </div>
                                </div>
                                <h3 className='pt-3 border-bottom mb-3'>Inventory</h3>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-lable'>SKU</label>
                                        <input type="text" name="sku" placeholder='SKU' id="sku" 
                                        className={`form-control ${errors.sku && 'is-invalid'}`}
                                        {...register("sku", { required: "Sku is required" })}
                                        />
                                        {errors.sku && <p className='invalid-feedback'>{ errors.sku?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-lable'>Barcode</label>
                                        <input type="text" name="barcode" placeholder="Barcode" className='form-control'
                                        {...register("barcode")} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-lable'>Qty</label>
                                        <input type="text" name="qty" placeholder='Qty' className='form-control'/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className='form-label'>Status</label>
                                        <select name="" id="" 
                                            className={`form-control ${errors.status && 'is-invalid'}`}
                                            {...register("status", { required: "Product status is required" })}
                                        >
                                            <option value="">Select status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                        {errors.status && <p className='invalid-feedback'>{ errors.status?.message}</p>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    
                                    <div className="col-md-12">
                                        <label htmlFor="" className='form-label'>Featured</label>
                                        <select name="" id="" 
                                            className={`form-control ${errors.is_feature && 'is-invalid'}`}
                                            {...register("is_feature", { required: "Featured field is required" })}
                                        >
                                            
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                        {errors.is_feature && <p className='invalid-feedback'>{ errors.is_feature?.message}</p>}
                                    </div>
                                </div>
                                <h3 className='pt-3 border-bottom mb-3'>Sizes</h3>
                                <div className=" mb-3">
                                    <label htmlFor="" className='form-label pe-2'></label>
                                    {
                                        sizes && sizes.length > 0 && sizes.map((size, index) => {
                                            return (
                                                 <div className="form-check-inline ps2" key={`d-size-${index}`}>
                                                    <input {...register("sizes")}
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    checked={sizesChecked.includes(size.id)}
                                                    onChange={ (e) => {
                                                        console.log(size.id)
                                                        if(e.target.checked){

                                                            setSizesChecked([...sizesChecked, size.id])
                                                        }
                                                        else 
                                                        {
                                                            setSizesChecked(sizesChecked.filter(sid => size.id != sid))
                                                        }
                                                       // console.log(sizesChecked )
                                                    }}
                                                    value={size.id} 
                                                    id={`size-${size.id}`} />
                                                    <label className="form-check-label ps-2" htmlFor={`size-${size.id}`}>
                                                        {size.name}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                   
                                </div>
                                <h3 className='pt-3 border-bottom mb-3'>Image Gallery</h3>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-lable' >Image</label>
                                    <input type="file" name="" id="" onChange={handleFile} className='form-control'/>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        {
                                            productImages && productImages.map((productImage, index) => {
                                                return (
                                                    <div className='col-md-3 mb-3' key={`img-${index}`}>
                                                        <div className="card shadow">
                                                            <img width={200} src={productImage.image_url} alt="" />
                                                        </div>
                                                        <button type="button" className='btn btn-sm btn-danger w-100 mt-2' onClick={() => {deleteImage(productImage.id)}}>Delete</button>
                                                        <button type="button" className='btn btn-sm btn-secondary w-100 mt-2' onClick={() => {changeDefaultImage(productImage.image)}}>Set as Default</button>
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                </div>


                            </div>
                        </div>
                        <button disabled={disable} className='btn btn-primary mt-3'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}
