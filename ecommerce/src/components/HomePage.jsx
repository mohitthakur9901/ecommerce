import React, { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react';

const HomePage = ({product}) => {

  return (
    <div className="h-96 sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel slideInterval={5000}>
        {product.slice(0, 4).map((product) => (
          <img
            className='h-96 sm:h-64 xl:h-80 2xl:h-96'
            key={product._id}
            src={product.productImage}
            alt={product.productName}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HomePage;
