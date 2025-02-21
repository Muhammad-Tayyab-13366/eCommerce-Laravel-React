import React, { useState } from 'react'
import { Layout } from '../../common/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Sidebar } from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../../common/http'

export const Edit = () => {

    const params = useParams()
    const [category, setCategory] = useState([])
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues : async () => {
            const res = await fetch(`${apiUrl}categories/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'applicationh/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
                
            }).then(res => res.json())
            .then(result => {
               
                if(result.status == 200){
                    setCategory(result.data)

                    reset({
                        name: result.data.name,
                        status: result.data.status
                    })

                }else {
                   
                }
                console.log(result)
            })
        }
    });
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()
    const saveCategory =  (data) => {
        //setDisable(true)
        const formData = {};
        formData.name = data.name;
        formData.status = data.status;
        const res = fetch(`${apiUrl}categories/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'applicationh/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
        .then(result => {
            //setDisable(false)
            if(result.status == 200){
                toast.success(result.message);
                navigate('/admin/categories')
            }else {
                toast.error(JSON.stringify(result.errors?.name[0]));
            }
            console.log(result)
        })
    }

  return (
    <Layout>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className='h4 pb-0 mb-0'>Categories / Edit</h4>
              <Link to="/admin/categories" className='btn btn-primary'>Back</Link>
            </div>
            <div className="col-md-3 ">
              <Sidebar/>
            </div>
            <div className="col-md-9">
                <form action="" onSubmit={handleSubmit(saveCategory)}>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="" className='form-label'>Name</label>
                                <input type="text" 
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                    name="" id=""
                                    placeholder='Name'
                                    {...register("name", { required: "category name is required" })}
                                />
                                {errors.name && <p className='invalid-feedback'>{ errors.name?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className='form-label'>Status</label>
                                <select name="" id="" 
                                    className={`form-control ${errors.status && 'is-invalid'}`}
                                    {...register("status", { required: "category status is required" })}
                                >
                                    <option value="">Select status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Block</option>
                                </select>
                                {errors.status && <p className='invalid-feedback'>{ errors.status?.message}</p>}
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
