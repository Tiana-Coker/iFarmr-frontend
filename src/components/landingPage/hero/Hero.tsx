import React from 'react';
import IMAGES from "../../../assets/landingPage"

export default function Hero() {
  return (
    <div className="flex justify-center min-h-[100vh]" 
     style={{ backgroundImage: `url(${IMAGES.HERO_BG})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundBlendMode:'overlay', backgroundColor:"rgba(30, 30, 30, 0.6)" }}>
        <div className='flex flex-col items-center justify-center w-[80%] text-white'>
            <div className='text-[30px] sm:text-[60px] lg:text-[90px] leading-[43.6px] sm:leading-[93.6px] text-center mb-6 font-[700]'>Empower Your Farm with iFarmr</div>
            <div className='text-[10px] sm:text-[1rem] text-center sm:leading-[24px] mb-14 font-[600] font-[Raleway]'>Optimize your farming operations and connect with a community of experts.</div>
            <div className='text-[13px] sm:text-[20px]'>
                <button className=' green_btn py-2 px-8 rounded-lg sm:mr-12'>Get Started</button>
                <button className='hidden sm:inline transparent_btn py-2 px-8 rounded-lg'>Learn More</button>
            </div>
        </div>
    </div>
  )
}
