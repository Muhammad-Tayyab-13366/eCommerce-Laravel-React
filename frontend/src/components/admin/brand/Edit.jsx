import React, { useState } from 'react'
import { Layout } from '../../common/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Sidebar } from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'

export const Edit = () => {

    const param = useParams();
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${apiUrl}brands/${param.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization'  : `Bearer ${adminToken()}`
                }
            })
            .then(res =>res.json())
            .then(result => {
                reset({
                    name: result.data.name,
                    status:  result.data.status
                })
                console.log(result)
            })
        }
    });

    
    const saveBrands = (data) => {
        setDisabled(true)
        fetch(`${apiUrl}brands/${param.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept' : 'application/json',
                'Authorization'  : `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        })
        .then(res =>res.json())
        .then(result => {

            setDisabled(false)
            if(result.status == 200){
                toast.success(result.message);
                navigate('/admin/brands')
            }else {
                toast.error(JSON.stringify(result.errors?.name[0]));
            }
        })
    }
  return (
    <Layout>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className='h4 pb-0 mb-0'>Brands / Edit</h4>
              <Link to="/admin/brands" className='btn btn-primary'>Back</Link>
            </div>
            <div className="col-md-3 ">
              <Sidebar/>
            </div>
            <div className="col-md-9">
                <form action="" onSubmit={handleSubmit(saveBrands)}>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="" className='form-label'>Brand</label>
                                <input type="text" 
                                className={`form-control ${errors.name && 'is-invalid' }`}
                                placeholder='Brand'
                                {...register("name", { required: "Brand name is required" })}
                                />
                                {errors.name && <p className='invalid-feedback'>{ errors.name?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className='form-label'>Status</label>
                                <select
                                className={`form-control ${errors.status && 'is-invalid' }`}
                                {...register("status", { required: "Brand status is required" })}>
                                    <option value="">Select status</option>
                                    <option value="1">Active</option>
                                    <option value="2">In-active</option>
                                </select>
                                {errors.status && <p className='invalid-feedback'>{ errors.status?.message}</p>}
                            </div>
                        </div>
                    </div>
                    <button disabled={disabled} className='btn btn-primary mt-3'>Update</button>
                </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}


