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
import { Register } from './components/Register'
import { Login as AccountLogin} from './components/Login'
import { Profile } from './components/Profile'
import { RequireAuth } from './components/RequireAuth'
import { Confirmation } from './components/Confirmation'
import { ShowOrders } from './components/admin/orders/ShowOrders'
import { OrderDetail } from './components/admin/orders/OrderDetail'
import { Orders } from './components/front/Orders'
import { OrderDetail as UserOrderDetail } from './components/front/OrderDetail'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/product/:id" element={<Product/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={
              <RequireAuth>
                <Checkout/>
              </RequireAuth>
            }/>
            <Route path="/order/confirmation/:id" element={
              <RequireAuth>
                <Confirmation/>
              </RequireAuth>
            }/>

            <Route path="/account/orders" element={
              <RequireAuth>
                <Orders/>
              </RequireAuth>
            }/>

            <Route path="/account/order/:id" element={
              <RequireAuth>
                <UserOrderDetail/>
              </RequireAuth>
            }/>

            <Route path="/account/register" element={<Register/>} />
            <Route path="/account/login" element={<AccountLogin/>} />
            <Route path="/account/" element={
              <RequireAuth>
                <Profile/>
              </RequireAuth>
            }/>

            {/* Admin Routes */}
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
            <Route path="/admin/orders" element={
                <AdminRequireAuth>
                  <ShowOrders/>
                </AdminRequireAuth>
            } />
            <Route path="/admin/order/:id" element={
                <AdminRequireAuth>
                  <OrderDetail/>
                </AdminRequireAuth>
            } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
