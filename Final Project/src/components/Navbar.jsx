import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <ul className="flex p-4">
        <li><Link className='px-3' to="/">Home</Link></li>
        <li><Link className='px-3' to="/admin">Admin</Link></li>
        <li><Link className='px-3' to='/cart'>Cart</Link></li>
        <li><Link className='px-3' to='/checkout'>Checkout</Link></li>
        <li><Link className='px-3' to='/orderhistory'>Order History</Link></li>
        <li><Link className='px-3' to='/productdetail'>Product Detail</Link></li>
        <li><Link className='px-3' to='/productlist'>Product List</Link></li>
      </ul>
    </div>
  )
}

export default Navbar