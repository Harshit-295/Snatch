import React, { useState ,useEffect} from 'react'
import { createContext} from 'react'
import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({children}){
    const [cartItems,setCartItems] = useState([]);

    const fetchCart = async()=>{
        try {
            const resposne = await axios.get("http://localhost:8000/api/v1/cart", { withCredentials: true });
            setCartItems(resposne.data.data);
        } catch (error) {
            console.error(err);
            setCartItems([]);
        }
    }
    
    const addcart = async(productId,quantity=1)=>{
        try {
            await axios.post("http://localhost:8000/api/v1/addtocart",{productId,quantity}, { withCredentials: true })
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    }
    const removefromcart = async(productId,quantity=1)=>{
        try {
            await axios.delete("http://localhost:8000/api/v1/removefromcart",{ data: { productId, quantity }, withCredentials: true})
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCart();
    }, []);
    return (
    <CartContext.Provider
      value={{
        cartItems,
        addcart,
        removefromcart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
    )
}
