import React from 'react'
import getCarousel from '../components/Carousel';
import HomePage from '../components/HomePage';
import CardComp from '../components/Card';
const Women = () => {

    const products = getCarousel()

    const womenProducts = products.filter(product => product.productCategory === "womens")

    return (
        <>
            <HomePage product={womenProducts} />
            <div className="flex justify-around flex-wrap gap-5 px-5 sm:px-0  py-10 ">

                {womenProducts.map((product) => (
                    <CardComp key={product._id} products={product} />
                ))}
            </div>
        </>
    )
}

export default Women