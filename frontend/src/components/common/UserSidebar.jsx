import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

export const UserSidebar = () => {
    const {logout}  = useContext(AuthContext)
  return (
    <>
        <div className="card shadow  mb-5">
            <div className="card-body p-4 sidebar">
                <ul>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/account/orders">Orders</Link></li>
                <li><Link to="">Change Password</Link></li>
                <li><Link href="javascript:void(0);" onClick={logout}>Logout</Link></li>
               
                </ul>
            </div>
        </div>
    </>
  )
}
