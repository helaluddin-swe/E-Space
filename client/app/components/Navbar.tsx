"use client"
import Link from 'next/link'
import { Bell, Home, Search, ShoppingCart, User, Menu } from "lucide-react"
import { useCart } from '../context/CartContext';
import TextLogo from './TextLogo';


const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className='bg-white border-b sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 gap-4'>
        
        {/* Logo */}
       <TextLogo variant='light'/>

        {/* Desktop Search */}
        <div className='hidden md:flex flex-1 max-w-md relative items-center'>
          <Search size={18} className='absolute left-3 text-gray-400' />
          <input 
            type="text" 
            placeholder='Search products...' 
            className='w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all'
          />
        </div>

        {/* Icons & Actions */}
        <div className='flex gap-3 md:gap-6 items-center'>
          {/* Mobile Search Icon (Hidden on Desktop) */}
          <button className='md:hidden p-2 hover:bg-gray-100 rounded-full'>
            <Search size={22} />
          </button>

          <Link href="/" className='hidden sm:block p-2 hover:bg-gray-100 rounded-full transition'>
            <Home size={22} />
          </Link>

          <button className='relative p-2 hover:bg-gray-100 rounded-full transition'>
            <Bell size={22} />
            <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white'></span>
          </button>

          {/* Shopping Cart Icon with Badge */}
          <Link href="/Cart" className='relative p-2 hover:bg-gray-100 rounded-full transition'>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </Link>

          <Link 
            href="/signin" 
            className='hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md shadow-blue-200'
          >
            <User size={18} />
            SignIn
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button className='md:hidden p-2 hover:bg-gray-100 rounded-full'>
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar