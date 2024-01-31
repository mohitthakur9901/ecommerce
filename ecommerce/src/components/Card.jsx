import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react';
import { useSelector } from 'react-redux';

const CardComp = ({ products }) => {
  const { currentUser } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          userId: currentUser._id,
          productId: products._id,
          quantity:1,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Added to cart:', data);
    }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around flex-wrap gap-5 px-5 sm:px-0  py-10 rounded-sm ">
     {
      products.map(product => (
        <Card className="max-w-sm rounded-md" key={product._id} imgAlt="Product image" imgSrc={product.productImage}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.productName}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{product.productPrice}</p>
        <Button onClick={addToCart} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {loading ? 'Adding to Cart...' : 'Add to Cart'}
        </Button>
      </Card>
      ))

     }
    </div>
  );
};

export default CardComp;
