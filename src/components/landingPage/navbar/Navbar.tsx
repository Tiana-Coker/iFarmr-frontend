import React from 'react'
import { Link } from 'react-router-dom';
import IFARMR_LOGO from "../../../assets/landingPage/navbar/ifarmr_logo_green.png"

export default function Navbar() {
  return (
    <div className='min-h-[10vh] py-6'>
        <div className='container flex flex-wrap justify-between items-center'>
          <div className='mb-4'><img className='w-full' src={IFARMR_LOGO} alt="" /></div>

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

        </div>
    </div>
  )
}
