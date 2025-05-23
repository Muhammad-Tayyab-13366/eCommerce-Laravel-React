import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const {logout}  = useContext(AdminAuthContext);
  return (
    <>
        <div className="card shadow  mb-5">
            <div className="card-body p-4 sidebar">
                <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/categories">Categories</Link></li>
                <li><Link to="/admin/brands">Brands</Link></li>

                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><a href="">Users</a></li>
                <li><a href="">Shipping</a></li>
                <li><a href="">Change Password</a></li>
                <li><a href="#" onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>
    </>
  )
}
