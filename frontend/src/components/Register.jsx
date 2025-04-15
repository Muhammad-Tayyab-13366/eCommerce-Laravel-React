import React from 'react'
import { Layout } from './common/Layout'
import { useForm } from 'react-hook-form';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // console.log(await data.email);
        // console.log(await data.password);
         const res = await fetch(`${apiUrl}register`, {
             method: 'POST',
             headers: {
                 'Content-type' : 'application/json'
             },
             body: JSON.stringify(data)
         }).then(res => res.json())
         .then(result => {
             
             if(result.status == 200){
                toast(result.message)
                navigate('/account/login');
             }else {
                toast.error(Object.values(result.errors)[0][0])
             }
         })
     }
  return (
    <Layout>
      
        <div className="container d-flex justify-content-center">
            <div className="row">
                <form method="post" action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card shadow border-0 m-5 admin-login">
                        <div className="card-body p-4">

                            <h3 className='text-center border-bottom pb-2 mb-2'>Register</h3>
                            <div className="mb-4">
                                <label htmlFor="" className='form-label'>Name</label>
                                <input type="text"  
                                className={`form-control ${errors.name && 'is-invalid'}`}
                                placeholder='Name' 
                                {...register("name",  { required: "Name is required"  })
                                }
                                />
                                {errors.name && <p className='invalid-feedback'>{ errors.name?.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="" className='form-label'>Email</label>
                                <input type="text"  
                                className={`form-control ${errors.email && 'is-invalid'}`}
                                placeholder='Email' 
                                {...register("email",
                                    { 
                                        required: "Email is required" ,
                                        pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                } 
                                    })
                                }
                                />
                                {errors.email && <p className='invalid-feedback'>{ errors.email?.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="" className='form-label'>Password</label>
                                <input type="password"  
                                className={`form-control ${errors.password && 'is-invalid'}`}
                                placeholder='Password' 
                                {...register("password", { required: "Password is required" })}/>
                                {errors.password && <p className='invalid-feedback'>{ errors.password?.message}</p>}
                            </div>
                            <button className='btn btn-secondary w-100'>Register</button>
                        </div>

                        <div className='d-flex justify-content-center pb-3'>
                            Already have an account? &nbsp; <Link to="/account/login">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}
