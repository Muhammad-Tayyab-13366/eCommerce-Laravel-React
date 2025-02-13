import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Shop } from './components/Shop'
import { Product } from './components/Product'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
import { Login } from './components/admin/Login'
import { ToastContainer } from 'react-toastify';
import { Dashboard } from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/product" element={<Product/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/admin/login" element={<Login/>} />
            <Route path="/admin/dashboard" element={
                <AdminRequireAuth>
                  <Dashboard/>
                </AdminRequireAuth>
            } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
