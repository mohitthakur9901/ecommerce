import { useEffect, useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


const Cart = () => {
    const { currentUser } = useSelector(state => state.user)
    const [cart, setCart] = useState([])

    useEffect(() => {
        getCart()
    }, [])


    const getCart = async () => {
        try {
            const res = await fetch(`api/cart/${currentUser._id}`, {
                method: "GET",
            })
            if (res.ok) {
                const data = await res.json()
                setCart(data.cartItems)
                findProduct(data.cartItems)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const findProduct = async (data) => {
        const ids = data.map(item => item.productId);

        try {
            const promises = ids.map(async (productId) => {
                const res = await fetch(`api/products/${productId}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch product with ID: ${productId}`);
                }

                return res.json();
            });

            const productsData = await Promise.all(promises);
            setCart(productsData);
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <>
            <div className="flex flex-col sm:flex-row  items-center flex-wrap">
                {cart.map(product => (
                    <div
                        className="flex flex-col items-center p-4 m-2 border rounded-lg shadow-md"
                        key={product._id}
                    >
                        <div className="mb-4">
                            <img src={product.productImage} className="h-20" alt="" />
                        </div>
                        <h3 className="text-center font-bold">{product.productName}</h3>
                        <div className="flex items-center mt-2">
                            <h3 className="mr-2">Qty: {product.quantity}</h3>
                        </div>
                        <div className="mt-2">
                            <h3 className="font-bold">Price: {product.productPrice}</h3>
                            <button
                                
                                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4 mb-5">
                <h3 className="text-xl font-bold">
                    Total: ${cart.reduce((acc, product) => acc + product.productPrice, 0).toFixed(2)}
                </h3>
                <div className="flex gap-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Checkout
                    </button>
                    <button 
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                       <Link to='/' > Continue Shopping</Link>
                    </button>
                </div>
            </div>

        </>
    )
}

export default Cart