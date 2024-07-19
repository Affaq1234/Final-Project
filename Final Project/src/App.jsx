import { useState } from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminPanel from './pages/AdminPanel'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/orderhistory' element={<OrderHistory/>}/>
        <Route path='/productdetail' element={<ProductDetail/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
