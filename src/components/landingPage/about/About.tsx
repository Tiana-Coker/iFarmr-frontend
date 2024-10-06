import React from 'react';
import IMAGES from "../../../assets/landingPage/about"

export default function About() {


    const aboutCards = [
        {
            icon: `${IMAGES.CROP_ICON}`,
            description:"Track and manage your crops efficiently"
        },
        {
            icon: `${IMAGES.MONITOR_ICON}`,
            description:"Monitor your livestock's health and growth"
        },
        {
            icon: `${IMAGES.REAL_TIME_ICON}`,
            description:"Get real-time weather alerts for better planning"
        },
        {
            icon: `${IMAGES.NETWORK_ICON}`,
            description:"Join a supportive network of fellow farmers"
        }
    ]

    // Define the props interface
    interface AboutCardProps {
        icon: string;
        description: string;
    }
  

    const AboutCard: React.FC<AboutCardProps> = ({icon, description}) => {
        return (
            <div className='bg-white rounded-xl mb-8 lg:mb-0 w-[80%] sm:w-[46%] lg:w-[23%] h-[281px] flex flex-col items-center justify-center gap-10 p-4'>
                <div className='w-[28%]'><img className='w-full' src={icon} alt="" /></div>
                <div className='text-center text-[14px] sm:text-[24px] p_color font-[500px]'>{description}</div>
            </div>
        )
    }

  return (
        <>
             <div className=' py-20'>

                <div className='container'>
                    <div className='text-center text-[50px] sm:text-[72px] p_color font-[700] leading-[74.88px] mb-3'>Why Choose iFarmr?</div>
                    <div className='text-center text-[14px] sm:text-[24px] mb-14 text-[#1E1E1E] font-[400] font-[Raleway] leading-[24px]'>Explore the Powerful Tools iFarmr Offers to Streamline Your Farming Operations.</div>
                    <div className='flex flex-wrap justify-center sm:justify-between'>
                        {aboutCards.map((card, index) => (
                            <AboutCard key={index} {...card} />
                                ))
                        }
                    </div>
                </div>

            </div>

            <div className='mb-20 p-16' style={{backgroundImage:`url(${IMAGES.ABOUT_BG})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundBlendMode:'overlay', backgroundColor:"rgba(0, 0, 0, 0.698)"}}>

                <div className='container text-white py-20'>
                    <div className='lg:w-[79%]'>
                        <div className='text-[50px] sm:text-[72px] font-[700] leading-[50.88px] sm:leading-[74.88px] mb-6'>Ready to Take Your Farm to the Next Level?</div>
                        <div className='text-[20px] font-[Raleway] mb-4'>Join thousands of farmers optimizing their operations with iFarmr.</div>
                        <div className='text-[13px] sm:text-[20px]'>
                            <button className='green_btn font-[Raleway] py-2 px-6 rounded-lg sm:mr-8'>Sign Up for Free</button>
                            <button className='hidden md:inline transparent_btn font-[Raleway] py-2 px-8 rounded-lg'>Learn more</button>
                        </div>
                    </div>
                </div>

            </div>
        
        </>
)
}
