
import React from 'react'
import getCarousel from '../components/Carousel';
import HomePage from '../components/HomePage';
import CardComp from '../components/Card';

const Kid = () => {


    const products = getCarousel()
    const kidsProducts = products.filter(product => product.productCategory === "kids")

    return (
        <>
            <HomePage product={kidsProducts} />
            <div className="flex justify-around flex-wrap gap-5 px-5 sm:px-0  py-10 ">

                {kidsProducts.map((product) => (
                <CardComp key={product._id} products={product} />
                ))}
            </div>
        </>
    )
}

export default Kid