import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger icon
import { IoClose } from 'react-icons/io5'; // Close icon for the mobile menu
import IFARMR_LOGO from "../../../assets/landingPage/navbar/ifarmr_logo_green.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to handle mobile menu

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='min-h-[10vh] py-6'>
      <div className='container flex flex-wrap justify-between items-center'>
        {/* Logo */}
        <div className='mb-4'>
          <img className='w-full' src={IFARMR_LOGO} alt="IFarmr Logo" />
        </div>

        {/* Desktop Nav Links - hidden on mobile/tablet */}
        <div className='hidden sm:flex flex-wrap justify-between gap-16 items-center'>
          {/* Nav Links */}
          <div className='hidden lg:flex flex-wrap gap-10 items-center text-[#1E1E1E] font-[600] font-[Raleway] text-[20px] leading-[23.48px]'>
            <div>Home</div>
            <div>About Us</div>
            <div>Features</div>
          </div>
          {/* Onboard Links */}
          <div className='font-[600] font-[Raleway] text-[20px] leading-[23.48px]'>
            <Link to="/login">
              <button className='mr-8 green_btn py-2 px-8 rounded-lg'>Login</button>
            </Link>
            <Link to="/signup">
              <button className='p_color border-[1px] border-solid border-[#204E51] py-2 px-8 rounded-lg'>Sign Up</button>
            </Link>
          </div>
        </div>

        {/* Hamburger Icon for Mobile/Tablet - visible on small screens */}
        <div className='sm:hidden flex items-center'>
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <IoClose className='text-3xl text-[#1E1E1E]' /> // Close icon
            ) : (
              <GiHamburgerMenu className='text-3xl text-[#1E1E1E]' /> // Hamburger icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className='sm:hidden absolute top-[10vh] left-0 w-full bg-white shadow-lg py-6 px-4 mt-10'>
          <div className='flex flex-col gap-6'>
            <Link to="/" onClick={toggleMobileMenu} className='text-[#1E1E1E] font-[600] text-[18px]'>
              Home
            </Link>
            <Link to="/about" onClick={toggleMobileMenu} className='text-[#1E1E1E] font-[600] text-[18px]'>
              About Us
            </Link>
            <Link to="/features" onClick={toggleMobileMenu} className='text-[#1E1E1E] font-[600] text-[18px]'>
              Features
            </Link>
            <Link to="/login" onClick={toggleMobileMenu} className='text-[#1E1E1E] font-[600] text-[18px]'>
              Login
            </Link>
            <Link to="/signup" onClick={toggleMobileMenu} className='text-[#1E1E1E] font-[600] text-[18px]'>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
