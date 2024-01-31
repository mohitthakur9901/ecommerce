

import HomePage from '../components/HomePage';
import getCarousel from '../components/Carousel';
import CardComp from '../components/Card';

const Men = () => {

    const products = getCarousel()


    const mensProduct = products.filter(product => product.productCategory === "mens")
    console.log(mensProduct);
  return (
   <>
    <HomePage product={mensProduct} />
    <div className="flex justify-around flex-wrap gap-5 px-5 sm:px-0  py-10 ">
 
            {mensProduct.map((product) => (
              <CardComp key={product._id} products={product}/>
            ))}
        </div>
   </>
  )
}

export default Men