import React, { useContext } from 'react'
import { Layout } from '../common/Layout'
import { useForm } from "react-hook-form";
import { apiUrl } from '../common/http';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';
export const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const {login} = useContext(AdminAuthContext);
    const onSubmit = async (data) => {
       // console.log(await data.email);
       // console.log(await data.password);
        const res = await fetch(`${apiUrl}admin/login`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            
            if(result.status == 200){
                const adminInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }
               // console.log(adminInfo)
                localStorage.setItem('adminInfo',  JSON.stringify(adminInfo))
                login(adminInfo)
                navigate('/admin/dashboard');
            }else {
               toast.error(result.errors);
            }
        })
    }
  
  return (
    <Layout>
        <div className="container d-flex justify-content-center">
            <form method="post" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow border-0 m-5 admin-login">
                    <div className="card-body p-4">

                        <h3 className='text-center'>Admin Login</h3>
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
                        <button className='btn btn-secondary'>Login</button>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
  )
}
