import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

import styles from "./Testimonials.module.css";
import IMAGES from "../../../assets/landingPage/testimonials"

export default function Testimonials() {

  const testimonialData = [
    {
      img:IMAGES.TESTIMONIAL_IMG1,
      rating:5,
      name:'John Doe',
      title:"Rice Farmer",
      testimony:'"iFarmr has revolutionized the way I manage my farm!"'
    },
    {
      img:IMAGES.TESTIMONIAL_IMG2,
      rating:5,
      name:'Jane Smith',
      title:"Poultry Farmer",
      testimony:'"The community feature has been a game-changer for me."'
    },
    {
      img:IMAGES.TESTIMONIAL_IMG3,
      rating:5,
      name:'John Doe',
      title:"Rice Farmer",
      testimony:'"Real-time weather updates saved my crops last season."'
    },
    {
      img:IMAGES.TESTIMONIAL_IMG3,
      rating:5,
      name:'John Doe',
      title:"Rice Farmer",
      testimony:'"Real-time weather updates saved my crops last season."'
    }
  ]

  
  // Custom Next Arrow
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      >
        <img src={IMAGES.RIGHT_ARROW} alt="Next" className="custom-arrow" />
      </div>
    );
  };

  // Custom Prev Arrow
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      >
        <img src={IMAGES.LEFT_ARROW} alt="Previous" className="custom-arrow" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // slidesToShow: 3,
    // slidesToScroll: 1,
    // centerMode: true,
    // infinite: true,
    // speed: 500,
    // focusOnSelect: true,
    nextArrow: <NextArrow />, // Using custom Next arrow
    prevArrow: <PrevArrow />, // Using custom Prev arrow
  };

  const TestimonialCard = ({img, rating, name, title, testimony}) => {
    return (
      <div className='border border-red-800 bg-white py-3'>
        <div className='flex flex-col items-center'>
          <div><img src={img} alt={name} className='w-full' /></div>
          <div className='flex items-center'>
            {[...Array(rating)].map((_,i) => <span key={i} className='text-[#FFC107] text-2xl'>&#9733;</span>)}
          </div>
          <div className='text-[20px] font-[700] p_color'>{name}</div>
          <div className='text-[18px] font-[700] p_color'>{title}</div>
          <div className='text-[18px] text-center font-[Raleway]'>{testimony}</div>
        </div>
      </div>
    )
  }
  return (
    <div>

        <div className='w-[60%] mx-auto'>
            <div className='text-[72px] font-[700] p_color text-center leading-[82.08px]'>Testimonials </div>
            <div className='leading-[24px] text-[20px] text-center font-[Raleway]'>Hear From Farmers Who Have Transformed Their Operations—Discover How iFarmr is Making a Real Difference in the Lives of Agricultural Professionals Everywhere.</div>
        </div>

        {/* <div className='flex flex-wrap justify-center gap-[20px] mt-[50px]'> */}
        <div className='border border-red-900 w-[50%] mx-auto'>
          <Slider {...settings}>
            {testimonialData.map((testimonial, i) => <TestimonialCard key={i} {...testimonial} />)}
          </Slider>
        </div>

    </div>
  )
}

// https://www.youtube.com/watch?v=6YnryDjEGr8