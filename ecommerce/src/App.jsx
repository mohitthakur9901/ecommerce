import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './pages/Error'
import Men from './pages/Men'
import Women from './pages/Women'
import Kid from './pages/kid'
import About from './pages/About'
import Home from './pages/Home'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import DashBoard from './pages/DashBoard'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import CreateProduct from './pages/CreateProduct'
import Cart from './pages/Cart'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mens' element={<Men />} />
        <Route path='/womens' element={<Women />} />
        <Route path='/kids' element={<Kid />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route element={<AdminPrivateRoute/>}>
        <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path='/create-product' element={<CreateProduct/>} />
          <Route path='/cart' element={<Cart/>} />
        </Route>
        <Route path='*' element={<Error/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>

  )
}

export default App