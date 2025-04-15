import React, { useContext } from 'react'
import { Layout } from './common/Layout'
import { useForm } from 'react-hook-form';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';

export const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // console.log(await data.email);
        // console.log(await data.password);
         const res = await fetch(`${apiUrl}login`, {
             method: 'POST',
             headers: {
                 'Content-type' : 'application/json'
             },
             body: JSON.stringify(data)
         }).then(res => res.json())
         .then(result => {
             
             if(result.status == 200){

                const userInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }

                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                toast(result.message)
                login(userInfo)
                navigate('/account');
             }else {
                console.log(Object.values(result.errors))
                
                toast.error( getFirstError(result))
             }
         })
    }

    function getFirstError(response) {
        const errors = response.errors;
      
        if (typeof errors === 'string') {
          return errors; // plain error string
        }
      
        if (typeof errors === 'object' && errors !== null) {
          // Get first key's first error
          const firstKey = Object.keys(errors)[0];
          if (Array.isArray(errors[firstKey])) {
            return errors[firstKey][0]; // e.g., "The password field is required."
          }
        }
      
        return "Unknown error occurred.";
      }
      
  return (
    <Layout>
        
        <div className="container d-flex justify-content-center">
            <div className="row">
                <form method="post" action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card shadow border-0 m-5 admin-login">
                        <div className="card-body p-4">

                            <h3 className='text-center border-bottom pb-2 mb-2'>Login</h3>
                            
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
                            <button className='btn btn-secondary w-100'>Login</button>
                        </div>

                        <div className='d-flex justify-content-center pb-3'>
                            Have no account? &nbsp; <Link to="/account/register">Register</Link> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}
