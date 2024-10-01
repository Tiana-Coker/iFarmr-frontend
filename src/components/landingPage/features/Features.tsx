
import styles from "./features.module.css";
import IMAGES from '../../../assets/landingPage/features'

export default function Features() {
  return (
    <div className='mb-44'>

        <div className='container flex flex-wrap justify-center lg:justify-between items-center'>

            <div className='w-[80%] lg:w-[35%] '>
                <div className='mb-3 text-[40px] sm:text-[72px] p_color leading-[42.08px] sm:leading-[82.08px] font-[700] text-center lg:text-start'>How It Works?</div>
                <div className='text-[16px] sm:text-[20px] font-[Raleway] leading-[24px] text-center lg:text-start mb-6'>
                From Sign-Up to Successful Farming—Follow These Simple Steps to Unlock the Full Potential of iFarmr and Transform Your Agricultural Practices.
                </div>
                <div className='flex justify-center lg:justify-start mb-6 lg:mb-0'>
                    <button className='green_btn px-6 py-2 rounded-lg text-[16px] sm:text-[20px] font-[Raleway] font-[600]'>Learn More</button>
                </div>

            </div>

            <div className={`${styles.features} rounded-2xl bg_p_color py-20 px-10 text-white lg:w-[48%]`}>

                <div className={`${styles.features_step} flex items-center`}>
                    <div className={`${styles.feature_img}`}><img className='w-full' src={IMAGES.ACCOUNT_ICON} alt="" /></div>
                    <div className={`${styles.feature_title}`}>Create your account in just a few clicks.</div>
                </div>

                <div className={`${styles.features_step} flex items-center`}>
                    <div className={`${styles.feature_img}`}><img className='w-full' src={IMAGES.DETAILS_ICON} alt="" /></div>
                    <div className={`${styles.feature_title}`}>Create your account in just a few clicks.</div>
                </div>

                <div className={`${styles.features_step} flex items-center`}>
                    <div className={`${styles.feature_img}`}><img className='w-full' src={IMAGES.TIPS_ICON} alt="" /></div>
                    <div className={`${styles.feature_title}`}>Create your account in just a few clicks.</div>
                </div>

                <div className={`${styles.features_step} flex items-center`}>
                    <div className={`${styles.feature_img}`}><img className='w-full' src={IMAGES.PEERS_ICON} alt="" /></div>
                    <div className={`${styles.feature_title}`}>Create your account in just a few clicks.</div>
                </div>

            </div>

        </div>

    </div>
  )
}
