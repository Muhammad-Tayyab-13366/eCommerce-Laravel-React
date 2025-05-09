import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { apiUrl } from './http';
import { useContext } from 'react';
import { CartContext } from '../context/Cart';
export const Header = () => {

    const [categories, setCategories] = useState([])
    const  {getQty} = useContext(CartContext)
    const getCategories = () => {
        fetch(apiUrl+'get-categories',{
            'method': "GET",
            "headers" : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then( result => {
            if(result.status == 200){
                setCategories(result.data)
            }else {
               // console.log(result)
            }
          
        })
    }

    useEffect( () => {
        getCategories()
    },[])

  return (
    <>
        <header className='shadow'>
            <div className='bg-dark text-center py-2'>
            <span className='text-white'>Your fashion partner</span>
            </div>
            <div className='container'>
            <Navbar expand="lg" className="">
                <Navbar.Brand as={Link} to="/">
                    <img className="img-fluid logo" 
                    src={Logo} alt="" 
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            categories && categories.map( category => {
                                return (
                                    <Nav.Link key={`nav-cat-${category.id}`}  as={Link} to={`/shop?category=${category.id}`}>{category.name}</Nav.Link>
                                )
                            })
                        }
                        {/* <Nav.Link as={Link} to="/shop">Mens</Nav.Link>
                        <Nav.Link as={Link} to="/women">Womens</Nav.Link>
                        <Nav.Link as={Link} to="/kids">Kids</Nav.Link> */}
                    </Nav>
                    <div className='nav-right d-flex'>
                    <Link to="/account" className='ms-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path></svg>
                    </Link>

                    <Link to="/cart" className='ms-3 cart-bucket'>
                        <span>{getQty()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path></svg>
                    </Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            </div>
        </header>
    </>
  )
}
