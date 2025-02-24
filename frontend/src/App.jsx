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
import { default as ShowCategories } from './components/admin/category/Show'
import { Create as CreateCategory } from './components/admin/category/Create'
import { Edit  as EditCategory} from './components/admin/category/Edit'
import { Show as ShowBrands} from './components/admin/brand/Show'
import { Create as CreateBrand } from './components/admin/brand/Create'
import { Edit as EditBrand} from './components/admin/brand/Edit'

import { Show as ShowProducts} from './components/admin/product/Show'
import { Create as CreateProduct} from './components/admin/product/Create'
import { Edit as EditProduct} from './components/admin/product/Edit'


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
            <Route path="/admin/categories" element={
                <AdminRequireAuth>
                  <ShowCategories/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/categories/create" element={
                <AdminRequireAuth>
                  <CreateCategory/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/categories/edit/:id" element={
                <AdminRequireAuth>
                  <EditCategory/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/brands" element={
                <AdminRequireAuth>
                  <ShowBrands/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/brands/create" element={
                <AdminRequireAuth>
                  <CreateBrand/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/brand/:id" element={
                <AdminRequireAuth>
                  <EditBrand/>
                </AdminRequireAuth>
            } />

            <Route path="/admin/products" element={
                <AdminRequireAuth>
                  <ShowProducts/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/product/create" element={
                <AdminRequireAuth>
                  <CreateProduct/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/product/edit/:id" element={
                <AdminRequireAuth>
                  <EditProduct/>
                </AdminRequireAuth>
            } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
