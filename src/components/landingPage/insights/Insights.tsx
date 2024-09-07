import React from 'react';
import IMAGES from "../../../assets/landingPage/insights";

export default function Insights() {

    const insights = [

        {
            img: IMAGES.INSIGHT_IMG1,
            title: "Top 10 Tips for Increasing Crop Yield",
            description: "Discover proven strategies to boost your farm's productivity with expert insights on crop management."
        },
        {
            img: IMAGES.INSIGHT_IMG2,
            title: "How to Optimize Livestock Health Year-Round",
            description: "Learn essential practices to keep your livestock healthy and productive throughout the seasons"
        },
        {
            img: IMAGES.INSIGHT_IMG3,
            title: "Sustainable Farming Practices for a Greener Future",
            description: "Explore eco-friendly farming techniques that help you conserve resources and protect the environment."
        }
    ];

    // Define the props interface
    interface InsightComponentProps {
        img: string;
        title: string;
        description: string;
    }

    const InsightComponent: React.FC<InsightComponentProps> =  ({img, title, description}) => {

        return (
            <div className='flex flex-col gap-4 sm:w-[31%]'>
                <div><img className='w-full' src={img} alt={title} /></div>
                <div className='font-[700] text-[22px] sm:text-[28px] md:text-[32px] p_color leading-[26px] sm:leading-[36.48px]'>{title}</div>
                <div className='font-[Raleway] font-[300] text-[1rem] sm:text-[20px] leading-[19px] sm:leading-[24px]'>{description}</div>
                <div className='p_color font-[Raleway] text-[1rem] sm:text-[20px] leading-[19px] sm:leading-[24px] underline mb-10 sm:mb-0'>Read More</div>
            </div>
        )

    }

  return (
    <div className='container'>
        <div className='w-[80%] mx-auto'>
            <div className='mb-3 text-[40px] sm:text-[72px] font-[700] p_color text-center leading-[42.08px] sm:leading-[82.08px]'>Insights & Stories from the Farming World</div>
            <div className='text-[16px] sm:text-[20px] font-[Raleway] leading-[24px] text-center mb-10'>Stay Informed with the Latest Trends, Tips, and Success Stories—Handpicked Just for You.</div>
        </div>

        <div className='flex flex-wrap justify-between'>
            {
                insights.map((insight, index) => (
                    <InsightComponent key={index} {...insight} />
                ))
            }

        </div>
    </div>
  )
}
