import { useEffect, useState } from "react";

function getCarousel(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
  
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);

    return products;
};

export default getCarousel;