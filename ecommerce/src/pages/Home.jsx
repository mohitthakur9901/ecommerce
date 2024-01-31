import React from 'react'
import HomePage from '../components/HomePage'
import CardComp from '../components/Card'
import getCarusel from '../components/Carousel'
const Home = () => {
  
  const product = getCarusel()

  return (
    <div className=''>
      <HomePage product={product}/>
     <CardComp key={product._id} products={product}/>
    </div>
  )
}

export default Home