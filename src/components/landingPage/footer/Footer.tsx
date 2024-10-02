<<<<<<< HEAD

import styles from "./Footer.module.css";
import IMAGES from "../../../assets/landingPage/footer"

export default function Footer() {
  return (
    <div className='bg_p_color py-32 font-[Raleway] mt-20'>

        <div className='container flex flex-wrap text-white'>

            <div className='md:w-6/12 mb-10 md:mb-0'>
                <div className='w-[80%] sm:w-[60%]'>
                    <div className='mb-3'><img src={IMAGES.IFARMR_LOGO} alt="" /></div>
                    <div className='text-[20px] leading-[24px] font-[300] font-[Raleway] mb-12'>Optimize your farming operations and connect with a community of experts.</div>
                    <div className='flex justify-between gap-4 w-[60%] md:[w-100%]  lg:w-[80%] xl:w-[60%] '>
                        <div><img className='w-full' src={IMAGES.INSTAGRAM} alt="" /></div>
                        <div><img className='w-full' src={IMAGES.BASKET} alt="" /></div>
                        <div><img className='w-full' src={IMAGES.FACEBOOK} alt="" /></div>
                        <div><img className='w-full' src={IMAGES.BEHANCE} alt="" /></div>
                    </div>
                </div>

            </div>


            <div className='md:w-6/12 flex flex-wrap gap-16'>
                {/* About */}
                <div className={`${styles.footer_links}`}>
                    <h1>About</h1>
                    <div>About Us</div>
                    <div>Our Team</div>
                    <div>Careers</div>
                </div>

                <div className={`${styles.footer_links}`}>
                    <h1>Support</h1>
                    <div>Help Center</div>
                    <div>FAQs</div>
                    <div>Contact Us</div>
                </div>

                <div className={`${styles.footer_links}`}>
                    <h1>Legal</h1>
                    <div>Privacy Policy</div>
                    <div>Terms of Service</div>
                    <div>Cookie Policy</div>
                </div>

            </div>



        </div>

    </div>
  )
}
=======
import React from 'react';

import styles from "./Footer.module.css";
import IMAGES from "../../../assets/landingPage/footer"

export default function Footer() {
  return (
    <div className='bg_p_color py-32 font-[Raleway] mt-20'>

        <div className='container flex flex-wrap text-white'>

            <div className='md:w-6/12 mb-10 md:mb-0'>
                <div className='w-[80%] sm:w-[60%]'>
                    <div className='mb-3'><img src={IMAGES.IFARMR_LOGO} alt="" /></div>
                    <div className='text-[20px] leading-[24px] font-[300] font-[Raleway] mb-12'>Optimize your farming operations and connect with a community of experts.</div>
                    <div className='flex justify-between gap-4 w-[60%] md:[w-100%]  lg:w-[80%] xl:w-[60%] '>
                        <div><img className='w-full' src={IMAGES.INSTAGRAM} alt="" /></div>
                        <div><img className='w-full' src={IMAGES.BASKET} alt="" /></div>
                        <div><img className='w-full' src={IMAGES.FACEBOOK} alt="" /></div>
                        <div><img className='w-full' src={IMAGES.BEHANCE} alt="" /></div>
                    </div>
                </div>

            </div>


            <div className='md:w-6/12 flex flex-wrap gap-16'>
                {/* About */}
                <div className={`${styles.footer_links}`}>
                    <h1>About</h1>
                    <div>About Us</div>
                    <div>Our Team</div>
                    <div>Careers</div>
                </div>

                <div className={`${styles.footer_links}`}>
                    <h1>Support</h1>
                    <div>Help Center</div>
                    <div>FAQs</div>
                    <div>Contact Us</div>
                </div>

                <div className={`${styles.footer_links}`}>
                    <h1>Legal</h1>
                    <div>Privacy Policy</div>
                    <div>Terms of Service</div>
                    <div>Cookie Policy</div>
                </div>

            </div>



        </div>

    </div>
  )
}
>>>>>>> b3c342e35c3008a3fa89c61e04b45f21f99c880a
