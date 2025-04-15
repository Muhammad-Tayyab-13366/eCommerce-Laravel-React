import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider  =  ({children}) => {

    const [cartData, setCartData] = useState( () => {
       return  JSON.parse(localStorage.getItem('cart')) || [];
    })
    

    const addToCart = (product, size=null) => {
        let updatedCart = [...cartData]

        if(cartData.length == 0){
            updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 100000000)}`,
                product_id: product.id,
                size: size,
                title: product.title,
                price: product.price,
                qty: 1,
                image_url: product.image_url

            })
        }
        else 
        {
            if(size != null){
                const isProductExist = updatedCart.find( item => item.product_id == product.id && item.size == size )
                // if product and size combination exist then increase the quantity
                if(isProductExist){
                    updatedCart = updatedCart.map( item => 
                        (item.product_id == product.id && item.size == size) ?  {...item, qty: item.qty + 1 } : item
                    )
                }
                else 
                {
                    // if produt and size combination not exist then add new item
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 100000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
        
                    })
                }
            }
            else 
            {
                const isProductExist = updatedCart.find( item => item.product_id == product.id )
                // if product and size combination exist then increase the quantity
                if(isProductExist){
                    updatedCart = updatedCart.map( item => 
                        (item.product_id == product.id) ?  {...item, qty: item.qty + 1 } : item
                    )
                }
                else 
                {
                    // if produt and size combination not exist then add new item
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 100000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
        
                    });
                }
            }
        }

        setCartData(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        
    }

    const shipping = () => {
        return 0;
    }

    const subTotal = () => {
        let subtotal = 0;
        cartData.map(item => {
            subtotal += item.qty * item.price
        })

        return subtotal;
    }

    const grandTotal = () => {
        return subTotal() + shipping();
    }

    const updateCartItem = (itemId, newQty) => {
        let updatedCart = [...cartData];
        updatedCart = updatedCart.map(item => 
            (item.id == itemId) ? {...item, qty:newQty} : item
        )
        setCartData(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const deleteCartItem =(itemId) => {
        const newCart = cartData.filter(item => item.id != itemId)
        setCartData(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const getQty = () => {
        let qty = 0;
        cartData.map(item => {
            qty += parseInt(item.qty)
        });

        return qty;
    }

    return (
        <CartContext.Provider 
            value={{ addToCart, 
                    cartData, 
                    grandTotal, 
                    shipping, 
                    subTotal, 
                    updateCartItem, 
                    deleteCartItem, 
                    getQty
                }}
        >
            {children}
        </CartContext.Provider>
    )
}